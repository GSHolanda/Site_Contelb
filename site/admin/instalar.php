<?php
// Cria (ou redefine) as contas do painel do blog. Só funciona com o código de instalação,
// um arquivo "instalar.codigo" que o script de publicação grava na pasta de dados do blog
// (ou que a pessoa cria pelo FTP). O código vale 24 horas e é apagado depois do uso.
declare(strict_types=1);
require dirname(__DIR__) . '/_blog/lib.php';

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function arquivo_codigo(): ?string {
  foreach ([blog_dir() . '/instalar.codigo', dirname(__DIR__, 2) . '/dados-blog/instalar.codigo'] as $a) {
    if (is_file($a) && filemtime($a) > time() - 86400) return $a;
  }
  return null;
}
$e = fn(string $s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
$mensagem = '';
$feito = false;
$arquivo = arquivo_codigo();

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && $arquivo) {
  $codigo = trim((string) file_get_contents($arquivo));
  if (strlen($codigo) < 16 || !hash_equals($codigo, trim((string) ($_POST['codigo'] ?? '')))) {
    sleep(2);
    $mensagem = 'Código de instalação incorreto.';
  } else {
    $contas = [];
    $erros = [];
    foreach ([1, 2] as $n) {
      $email = mb_strtolower(trim((string) ($_POST["email$n"] ?? '')));
      $senha = (string) ($_POST["senha$n"] ?? '');
      if ($email === '' && $n === 2) continue;
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $erros[] = "O e-mail da conta $n não é válido.";
      elseif (mb_strlen($senha) < 10) $erros[] = "A senha da conta $n precisa ter pelo menos 10 caracteres.";
      elseif ($senha !== (string) ($_POST["confirma$n"] ?? '')) $erros[] = "A confirmação da senha da conta $n não confere.";
      else $contas[] = ['email' => $email, 'hash' => password_hash($senha, PASSWORD_DEFAULT), 'criado' => date('c')];
    }
    if ($erros) {
      $mensagem = implode(' ', $erros);
    } else {
      file_put_contents(blog_dir() . '/usuarios.json', json_encode($contas, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
      @unlink($arquivo);
      $feito = true;
    }
  }
}
?><!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Contas do painel | Contelb</title>
<link rel="stylesheet" href="/admin/painel.css">
</head>
<body>
<header><a href="/" class="brand">CONTELB <span>PAINEL DO BLOG</span></a></header>
<main>
<section class="welcome">
<?php if ($feito): ?>
  <p class="eyebrow">PRONTO</p>
  <h1>Contas criadas.</h1>
  <p>O código de instalação foi apagado. Agora é só entrar no painel com o e-mail e a senha que você acabou de criar.</p>
  <p><a class="primary botao" href="/admin/">Ir para o painel</a></p>
<?php elseif (!$arquivo): ?>
  <p class="eyebrow">INSTALAÇÃO FECHADA</p>
  <h1>Sem código de instalação ativo.</h1>
  <p>Esta página só abre quando existe um código de instalação válido na hospedagem. Se você precisa criar ou redefinir as contas do painel, rode de novo o script de publicação com a opção de nova instalação.</p>
  <p><a href="/admin/">Voltar ao painel</a></p>
<?php else: ?>
  <p class="eyebrow">CONTAS DO PAINEL</p>
  <h1>Criar os acessos ao painel</h1>
  <p>Crie até duas contas. Use senhas fortes, com pelo menos 10 caracteres, e guarde em um lugar seguro. Se já existiam contas, elas serão substituídas por estas.</p>
  <?php if ($mensagem): ?><p class="alerta-erro" role="alert"><?= $e($mensagem) ?></p><?php endif; ?>
  <form method="post" autocomplete="off" class="instalar">
    <label for="codigo">Código de instalação</label>
    <input id="codigo" name="codigo" required autocomplete="off">
    <?php foreach ([1, 2] as $n): ?>
    <fieldset>
      <legend>Conta <?= $n ?><?= $n === 2 ? ' (opcional)' : '' ?></legend>
      <label for="email<?= $n ?>">E-mail</label>
      <input id="email<?= $n ?>" name="email<?= $n ?>" type="email" <?= $n === 1 ? 'required' : '' ?> autocomplete="off" value="<?= $e((string) ($_POST["email$n"] ?? '')) ?>">
      <label for="senha<?= $n ?>">Senha (mínimo 10 caracteres)</label>
      <input id="senha<?= $n ?>" name="senha<?= $n ?>" type="password" minlength="10" <?= $n === 1 ? 'required' : '' ?> autocomplete="new-password">
      <label for="confirma<?= $n ?>">Repita a senha</label>
      <input id="confirma<?= $n ?>" name="confirma<?= $n ?>" type="password" minlength="10" <?= $n === 1 ? 'required' : '' ?> autocomplete="new-password">
    </fieldset>
    <?php endforeach; ?>
    <button class="primary" type="submit">Criar contas</button>
  </form>
<?php endif; ?>
</section>
</main>
</body>
</html>
