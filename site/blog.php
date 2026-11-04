<?php
// Blog da Contelb no servidor: atende /blog/... e /blog-media/... (ver .htaccess).
declare(strict_types=1);
require __DIR__ . '/_blog/lib.php';

function blog_404(): never {
  http_response_code(404);
  header('Content-Type: text/html; charset=utf-8');
  readfile(__DIR__ . '/404.html');
  exit;
}

function blog_redirecionar(string $url): never {
  header('Location: ' . $url, true, 301);
  exit;
}

$caminho = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

// Arquivos enviados pelo painel (imagens, PDF, vídeo)
if (str_starts_with($caminho, '/blog-media/')) {
  $nome = substr($caminho, strlen('/blog-media/'));
  if (!preg_match('/^[a-z0-9-]+\.(jpg|png|webp|pdf|mp4|webm)$/', $nome)) blog_404();
  $arq = blog_dir() . '/midia/' . $nome;
  if (!is_file($arq)) blog_404();
  $tipo = array_search(pathinfo($nome, PATHINFO_EXTENSION), BLOG_TIPOS_MIDIA, true);
  header('Content-Type: ' . $tipo);
  header('Content-Length: ' . filesize($arq));
  header('Cache-Control: public, max-age=31536000, immutable');
  header('X-Content-Type-Options: nosniff');
  header("Content-Security-Policy: default-src 'none'; img-src 'self'; media-src 'self'; style-src 'unsafe-inline'; sandbox");
  readfile($arq);
  exit;
}

if (!preg_match('#^/blog(/.*)?$#', $caminho, $m)) blog_404();
$rota = trim($m[1] ?? '', '/');

if ($rota === 'sitemap.xml') {
  header('Content-Type: application/xml; charset=utf-8');
  echo blog_sitemap();
  exit;
}

// endereço sempre com barra no final, como no restante do site
if (!str_ends_with($caminho, '/')) blog_redirecionar($caminho . '/');

$partes = $rota === '' ? [] : explode('/', $rota);
$pagina = null;
if (count($partes) === 0) {
  $pagina = blog_pagina_listagem(null, 1);
} elseif ($partes[0] === 'pagina' && count($partes) === 2 && ctype_digit($partes[1])) {
  if ((int) $partes[1] === 1) blog_redirecionar('/blog/');
  $pagina = blog_pagina_listagem(null, (int) $partes[1]);
} elseif ($partes[0] === 'categoria' && isset($partes[1]) && in_array($partes[1], BLOG_CATEGORIAS_IDS, true)) {
  if (count($partes) === 2) $pagina = blog_pagina_listagem($partes[1], 1);
  elseif (count($partes) === 4 && $partes[2] === 'pagina' && ctype_digit($partes[3])) {
    if ((int) $partes[3] === 1) blog_redirecionar("/blog/categoria/{$partes[1]}/");
    $pagina = blog_pagina_listagem($partes[1], (int) $partes[3]);
  }
} elseif (count($partes) === 1) {
  $post = blog_ler($partes[0]);
  if ($post && ($post['status'] ?? '') === 'published') $pagina = blog_pagina_post($post);
}

if ($pagina === null) blog_404();
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: public, max-age=60');   // post novo aparece em até 1 minuto, mesmo com o cache da hospedagem
echo blog_html($pagina);
