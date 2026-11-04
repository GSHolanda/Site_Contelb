<?php
// API do painel do blog (login, lista, salvar, enviar arquivos, trocar senha).
// Contas ficam em <dados>/usuarios.json com senha criptografada (password_hash); nenhuma senha fica no código.
declare(strict_types=1);
require dirname(__DIR__) . '/_blog/lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');

function responder(array $dados, int $status = 200): never {
  http_response_code($status);
  echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}
function falha(string $msg, int $status = 400): never { responder(['error' => $msg], $status); }

function corpo_json(int $limite = 2_000_000): array {
  $bruto = file_get_contents('php://input', false, null, 0, $limite + 1);
  if ($bruto === false || strlen($bruto) > $limite) falha('Conteúdo grande demais.', 413);
  $dados = json_decode($bruto, true);
  if (!is_array($dados)) falha('Dados inválidos.');
  return $dados;
}

function usuarios(): array {
  $arq = blog_dir() . '/usuarios.json';
  return is_file($arq) ? (json_decode((string) file_get_contents($arq), true) ?: []) : [];
}
function salvar_usuarios(array $lista): void {
  file_put_contents(blog_dir() . '/usuarios.json', json_encode(array_values($lista), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

// Limita tentativas de login: 5 erros em 15 minutos por endereço IP
function tentativas(string $acao): bool {
  $arq = blog_dir() . '/tentativas.json';
  $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'contelb');
  $fp = fopen($arq, 'c+');
  flock($fp, LOCK_EX);
  $dados = json_decode((string) stream_get_contents($fp), true) ?: [];
  $agora = time();
  foreach ($dados as $k => $lista) { $dados[$k] = array_values(array_filter($lista, fn($t) => $t > $agora - 900)); if (!$dados[$k]) unset($dados[$k]); }
  $bloqueado = count($dados[$ip] ?? []) >= 5;
  if ($acao === 'erro') $dados[$ip][] = $agora;
  if ($acao === 'ok') unset($dados[$ip]);
  ftruncate($fp, 0); rewind($fp);
  fwrite($fp, json_encode($dados));
  flock($fp, LOCK_UN); fclose($fp);
  return $bloqueado;
}

// ---------------------------------------------------------------- sessão

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
$pastaSessoes = blog_dir() . '/sessoes';
if (!is_dir($pastaSessoes)) mkdir($pastaSessoes, 0700, true);
session_save_path($pastaSessoes);
session_name('contelb_painel');
ini_set('session.use_strict_mode', '1');
ini_set('session.gc_maxlifetime', '7200');
session_set_cookie_params(['lifetime' => 0, 'path' => '/admin/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Strict']);
session_start();
if (isset($_SESSION['ultimo']) && time() - $_SESSION['ultimo'] > 7200) { $_SESSION = []; session_regenerate_id(true); }
if (isset($_SESSION['email'])) $_SESSION['ultimo'] = time();

$acao = $_GET['acao'] ?? '';
$metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($metodo === 'POST') {
  // pedidos só da própria página do painel
  $origem = $_SERVER['HTTP_ORIGIN'] ?? '';
  if ($origem !== '') {
    $o = parse_url($origem);
    $autoridade = strtolower(($o['host'] ?? '') . (isset($o['port']) ? ':' . $o['port'] : ''));
    if ($autoridade !== strtolower($_SERVER['HTTP_HOST'] ?? '')) falha('Origem não permitida.', 403);
  }
  if ($acao !== 'entrar' && (!isset($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $_SERVER['HTTP_X_CSRF_TOKEN'] ?? ''))) falha('Sessão expirada. Entre novamente.', 401);
}

function exigir_login(): string {
  if (empty($_SESSION['email'])) falha('Entre com seu e-mail e senha.', 401);
  return $_SESSION['email'];
}

function para_painel(array $p): array {
  $p['url'] = blog_url($p);
  unset($p['seq']);
  return $p;
}

// ---------------------------------------------------------------- ações

switch ("$metodo $acao") {

  case 'GET sessao':
    responder(['email' => $_SESSION['email'] ?? null, 'csrf' => isset($_SESSION['email']) ? $_SESSION['csrf'] : null, 'instalado' => (bool) usuarios()]);

  case 'POST entrar':
    if (!str_starts_with($_SERVER['CONTENT_TYPE'] ?? '', 'application/json')) falha('Dados inválidos.');
    if (tentativas('ver')) falha('Muitas tentativas. Aguarde 15 minutos e tente de novo.', 429);
    $d = corpo_json(10_000);
    $email = mb_strtolower(trim((string) ($d['email'] ?? '')));
    $senha = (string) ($d['senha'] ?? '');
    $conta = null;
    foreach (usuarios() as $u) if (hash_equals($u['email'], $email)) $conta = $u;
    $hash = $conta['hash'] ?? '$2y$10$XpdyKVrQNYieeac6IIaJiufHieBoKMyRM1BiREIsONPVXfTbD3vjW';  // compara mesmo sem conta, para não revelar quais e-mails existem
    if (!password_verify($senha, $hash) || !$conta) { tentativas('erro'); falha('E-mail ou senha incorretos.', 401); }
    tentativas('ok');
    session_regenerate_id(true);
    $_SESSION = ['email' => $conta['email'], 'csrf' => bin2hex(random_bytes(32)), 'ultimo' => time()];
    responder(['email' => $conta['email'], 'csrf' => $_SESSION['csrf']]);

  case 'POST sair':
    $_SESSION = [];
    session_destroy();
    responder(['ok' => true]);

  case 'POST senha':
    $email = exigir_login();
    $d = corpo_json(10_000);
    $nova = (string) ($d['nova'] ?? '');
    if (mb_strlen($nova) < 10) falha('A nova senha precisa ter pelo menos 10 caracteres.');
    $lista = usuarios();
    foreach ($lista as &$u) {
      if ($u['email'] !== $email) continue;
      if (!password_verify((string) ($d['atual'] ?? ''), $u['hash'])) falha('A senha atual não confere.', 403);
      $u['hash'] = password_hash($nova, PASSWORD_DEFAULT);
    }
    unset($u);
    salvar_usuarios($lista);
    session_regenerate_id(true);
    responder(['ok' => true]);

  case 'GET posts':
    exigir_login();
    responder(['posts' => array_map('para_painel', blog_todos(false))]);

  case 'POST salvar':
    $email = exigir_login();
    $d = corpo_json();
    $slug = (string) ($d['slug'] ?? '');
    if (!blog_slug_valido($slug)) falha('Endereço do artigo inválido. Use letras minúsculas, números e hífens.');
    $existente = blog_ler($slug);
    $novo = !empty($d['novo']);
    if ($novo && $existente) falha('Já existe um artigo com esse endereço. Mude o endereço.', 409);
    if (!$novo && !$existente) falha('Artigo não encontrado.', 404);

    $titulo = trim(strip_tags((string) ($d['titulo'] ?? '')));
    $resumo = trim(preg_replace('/\s+/u', ' ', strip_tags((string) ($d['resumo'] ?? ''))));
    $cat = (string) ($d['cat'] ?? '');
    $data = (string) ($d['data'] ?? '');
    $status = ($d['status'] ?? '') === 'published' ? 'published' : 'draft';
    $capa = trim((string) ($d['capa'] ?? ''));
    if ($titulo === '' || mb_strlen($titulo) > 220) falha('Preencha o título (até 220 caracteres).');
    if ($resumo === '' || mb_strlen($resumo) > 600) falha('Preencha o resumo (até 600 caracteres).');
    if (!in_array($cat, BLOG_CATEGORIAS_IDS, true)) falha('Escolha uma categoria.');
    if (!preg_match('#^(\d{2})/(\d{2})/(\d{4}) (\d{2}):(\d{2})$#', $data, $m) || !checkdate((int) $m[2], (int) $m[1], (int) $m[3]) || (int) $m[4] > 23 || (int) $m[5] > 59) falha('Data inválida.');
    if ($capa !== '' && (!blog_url_segura($capa, true) || !preg_match('/\.(jpe?g|png|webp)$/i', $capa))) falha('Use uma imagem enviada pelo botão "Enviar capa".');
    $body = blog_limpar_html((string) ($d['body'] ?? ''));
    if (trim(strip_tags($body, '<img><video><iframe>')) === '') falha('Escreva o conteúdo do artigo.');

    $p = $existente ?? ['slug' => $slug, 'criado' => date('c'), 'seq' => time()];
    $capaAnterior = $p['capa'] ?? '';
    $p = array_merge($p, ['titulo' => $titulo, 'resumo' => $resumo, 'cat' => $cat, 'data' => $data, 'status' => $status, 'capa' => $capa, 'body' => $body, 'atualizado' => date('c'), 'autor' => $email]);
    if ($capa !== $capaAnterior) {
      $p['capaLogo'] = false;
      $arquivo = str_starts_with($capa, '/blog-media/') ? blog_dir() . '/midia/' . basename($capa) : dirname(__DIR__) . $capa;
      $dim = $capa !== '' && is_file($arquivo) ? @getimagesize($arquivo) : false;
      $p['capaW'] = $dim ? $dim[0] : 0;
      $p['capaH'] = $dim ? $dim[1] : 0;
    }
    blog_gravar($p);
    responder(['post' => para_painel($p)]);

  case 'POST midia':
    exigir_login();
    $bruto = file_get_contents('php://input', false, null, 0, BLOG_LIMITE_ARQUIVO + 1);
    if ($bruto === false || $bruto === '') falha('Nenhum arquivo recebido.');
    if (strlen($bruto) > BLOG_LIMITE_ARQUIVO) falha('O limite é 3 MB. Para vídeos maiores, use YouTube ou Vimeo.', 413);
    $tipo = (new finfo(FILEINFO_MIME_TYPE))->buffer($bruto);
    if (!isset(BLOG_TIPOS_MIDIA[$tipo])) falha('Tipo de arquivo não aceito. Use JPG, PNG, WebP, PDF, MP4 ou WebM.', 415);
    $w = $h = 0;
    if (str_starts_with($tipo, 'image/')) {
      $dim = @getimagesizefromstring($bruto);
      if (!$dim) falha('A imagem parece corrompida.');
      [$w, $h] = $dim;
    }
    $nome = date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . BLOG_TIPOS_MIDIA[$tipo];
    file_put_contents(blog_dir() . '/midia/' . $nome, $bruto, LOCK_EX);
    responder(['url' => '/blog-media/' . $nome, 'w' => $w, 'h' => $h]);

  default:
    falha('Ação desconhecida.', 404);
}
