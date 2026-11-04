<?php
// Blog da Contelb no servidor (KingHost, PHP 8.2): dados, segurança e HTML das páginas.
// O HTML reproduz exatamente o que gerador/blog.mjs produz; os pedaços fixos vêm de moldes.json,
// exportado pelo gerador (node gerador/gerar.mjs). Esta pasta é bloqueada para acesso pela web.
declare(strict_types=1);

const BLOG_CATEGORIAS_IDS = ['noticia', 'gestao-de-pessoas', 'reforma-tributaria'];
const BLOG_LIMITE_ARQUIVO = 3 * 1024 * 1024;
const BLOG_TIPOS_MIDIA = [
  'image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp',
  'application/pdf' => 'pdf', 'video/mp4' => 'mp4', 'video/webm' => 'webm',
];

// ---------------------------------------------------------------- dados

function blog_moldes(): array {
  static $m = null;
  if ($m === null) $m = json_decode((string) file_get_contents(__DIR__ . '/moldes.json'), true, 512, JSON_THROW_ON_ERROR);
  return $m;
}

// Os dados ficam FORA da pasta pública (/home/contelb/dados-blog) para nunca serem baixados pela web.
// Se o servidor não permitir, usa _blog/dados, que também é bloqueada pelo .htaccess desta pasta.
function blog_dir(): string {
  static $dir = null;
  if ($dir !== null) return $dir;
  $candidatas = array_filter([getenv('BLOG_DADOS') ?: null, dirname(__DIR__, 2) . '/dados-blog', __DIR__ . '/dados']);
  foreach ($candidatas as $c) {
    if ((is_dir($c) || @mkdir($c, 0750, true)) && is_writable($c)) { $dir = $c; break; }
  }
  if ($dir === null) throw new RuntimeException('Sem pasta gravável para os dados do blog.');
  foreach (['posts', 'midia'] as $sub) if (!is_dir("$dir/$sub")) mkdir("$dir/$sub", 0750, true);
  if (!is_file("$dir/.htaccess")) file_put_contents("$dir/.htaccess", "Require all denied\n");
  blog_semear($dir);
  return $dir;
}

// Na primeira execução, copia os 15 posts do site anterior para a pasta de dados.
function blog_semear(string $dir): void {
  if (is_file("$dir/semeado")) return;
  $iniciais = json_decode((string) file_get_contents(__DIR__ . '/posts-iniciais.json'), true, 512, JSON_THROW_ON_ERROR);
  foreach ($iniciais as $p) {
    $arq = "$dir/posts/{$p['slug']}.json";
    if (!is_file($arq)) {
      $p['criado'] = $p['atualizado'] = date('c');
      $p['autor'] = 'site anterior';
      file_put_contents($arq, json_encode($p, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), LOCK_EX);
    }
  }
  file_put_contents("$dir/semeado", date('c'));
}

function blog_slug_valido(string $slug): bool {
  return (bool) preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $slug) && strlen($slug) <= 240;
}

function blog_ler(string $slug): ?array {
  if (!blog_slug_valido($slug)) return null;
  $arq = blog_dir() . "/posts/$slug.json";
  if (!is_file($arq)) return null;
  $p = json_decode((string) file_get_contents($arq), true);
  return is_array($p) ? $p : null;
}

// "dd/mm/aaaa hh:mm" -> "aaaa-mm-ddThh:mm"
function blog_ordem_data(string $d): string {
  return substr($d, 6, 4) . substr($d, 3, 2) . substr($d, 0, 2) . substr($d, 11, 5);
}

function blog_todos(bool $soPublicados = true): array {
  static $cache = [];
  $chave = $soPublicados ? 'pub' : 'todos';
  if (isset($cache[$chave])) return $cache[$chave];
  $lista = [];
  foreach (glob(blog_dir() . '/posts/*.json') ?: [] as $arq) {
    $p = json_decode((string) file_get_contents($arq), true);
    if (!is_array($p) || empty($p['slug'])) continue;
    if ($soPublicados && ($p['status'] ?? '') !== 'published') continue;
    $lista[] = $p;
  }
  usort($lista, fn($a, $b) => [blog_ordem_data($b['data']), $b['seq'] ?? 0] <=> [blog_ordem_data($a['data']), $a['seq'] ?? 0]);
  return $cache[$chave] = $lista;
}

function blog_gravar(array $p): void {
  $dir = blog_dir();
  $fp = fopen("$dir/.trava", 'c');
  flock($fp, LOCK_EX);
  $tmp = "$dir/posts/.{$p['slug']}.tmp";
  file_put_contents($tmp, json_encode($p, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
  rename($tmp, "$dir/posts/{$p['slug']}.json");
  flock($fp, LOCK_UN);
  fclose($fp);
}

// ---------------------------------------------------------------- limpeza do HTML vindo do painel

// Mantém só o que um artigo precisa. Tudo o que não está na lista é removido ou desembrulhado.
function blog_limpar_html(string $html): string {
  $permitidas = ['p', 'h2', 'h3', 'strong', 'em', 'u', 'br', 'ul', 'ol', 'li', 'a', 'img', 'video', 'iframe',
    'blockquote', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div'];
  $trocar = ['b' => 'strong', 'i' => 'em', 'h1' => 'h2', 'h4' => 'h3', 'h5' => 'h3', 'h6' => 'h3'];
  $remover = ['script', 'style', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select', 'svg', 'math', 'link', 'meta', 'base', 'noscript', 'template'];

  $doc = new DOMDocument('1.0', 'UTF-8');
  libxml_use_internal_errors(true);
  $doc->loadHTML('<?xml encoding="UTF-8"><div id="raiz-blog">' . $html . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NONET);
  libxml_clear_errors();
  $raiz = $doc->getElementById('raiz-blog');
  if (!$raiz) return '';

  $percorrer = function (DOMNode $no) use (&$percorrer, $doc, $permitidas, $trocar, $remover): void {
    foreach (iterator_to_array($no->childNodes) as $filho) {
      if ($filho instanceof DOMComment || $filho instanceof DOMProcessingInstruction) { $no->removeChild($filho); continue; }
      if (!$filho instanceof DOMElement) continue;
      $tag = strtolower($filho->tagName);
      if (in_array($tag, $remover, true)) { $no->removeChild($filho); continue; }
      if (isset($trocar[$tag])) {
        $novo = $doc->createElement($trocar[$tag]);
        while ($filho->firstChild) $novo->appendChild($filho->firstChild);
        $no->replaceChild($novo, $filho);
        $filho = $novo; $tag = $trocar[$tag];
      }
      // div só fica como invólucro de tabela; as outras viram parágrafo (o editor do navegador cria divs)
      if ($tag === 'div' && $filho->getAttribute('class') !== 'tabela') {
        $novo = $doc->createElement('p');
        while ($filho->firstChild) $novo->appendChild($filho->firstChild);
        $no->replaceChild($novo, $filho);
        $filho = $novo; $tag = 'p';
      }
      if (!in_array($tag, $permitidas, true)) {
        $percorrer($filho);
        while ($filho->firstChild) $no->insertBefore($filho->firstChild, $filho);
        $no->removeChild($filho);
        continue;
      }
      $percorrer($filho);            // limpa o conteúdo antes, para nada escapar se o elemento for desembrulhado
      blog_limpar_atributos($filho, $tag);
    }
  };
  $percorrer($raiz);

  $saida = '';
  foreach ($raiz->childNodes as $filho) $saida .= $doc->saveHTML($filho);
  $saida = preg_replace('#<p>(\s|&nbsp;|<br>)*</p>#u', '', $saida);
  return trim((string) $saida);
}

function blog_url_segura(string $url, bool $soInterna = false): bool {
  if ($url === '') return false;
  if (preg_match('#^/(blog-media|assets)/[A-Za-z0-9._/-]+$#', $url) && !str_contains($url, '..')) return true;
  if ($soInterna) return false;
  if (preg_match('#^/[A-Za-z0-9._/#?=&%-]*$#', $url)) return true;
  return (bool) preg_match('#^(https?://|mailto:)#i', $url) && filter_var(preg_replace('#^mailto:#i', 'mailto://', $url), FILTER_VALIDATE_URL) !== false;
}

function blog_limpar_atributos(DOMElement $el, string $tag): void {
  $manter = [];
  foreach (iterator_to_array($el->attributes) as $at) $manter[strtolower($at->name)] = $at->value;
  foreach (array_keys($manter) as $nome) $el->removeAttribute($nome);
  $pai = $el->parentNode;
  switch ($tag) {
    case 'a':
      $href = trim($manter['href'] ?? '');
      if (!blog_url_segura($href)) { while ($el->firstChild) $pai->insertBefore($el->firstChild, $el); $pai->removeChild($el); return; }
      $el->setAttribute('href', $href);
      if (preg_match('#^https?://#i', $href) || str_starts_with($href, '/blog-media/')) { $el->setAttribute('target', '_blank'); $el->setAttribute('rel', 'noopener'); }
      break;
    case 'img':
      $src = trim($manter['src'] ?? '');
      if (!blog_url_segura($src, true)) { $pai->removeChild($el); return; }
      $el->setAttribute('src', $src);
      $el->setAttribute('alt', mb_substr($manter['alt'] ?? '', 0, 300));
      foreach (['width', 'height'] as $d) if (isset($manter[$d]) && ctype_digit($manter[$d])) $el->setAttribute($d, $manter[$d]);
      $el->setAttribute('loading', 'lazy');
      $el->setAttribute('decoding', 'async');
      break;
    case 'video':
      $src = trim($manter['src'] ?? '');
      if (!str_starts_with($src, '/blog-media/') || !blog_url_segura($src, true)) { $pai->removeChild($el); return; }
      $el->setAttribute('src', $src);
      $el->setAttribute('controls', '');
      $el->setAttribute('preload', 'metadata');
      while ($el->firstChild) $el->removeChild($el->firstChild);
      break;
    case 'iframe':
      $src = trim($manter['src'] ?? '');
      if (!preg_match('#^https://(www\.youtube-nocookie\.com/embed/[\w-]{11}|player\.vimeo\.com/video/\d+)$#', $src)) { $pai->removeChild($el); return; }
      $el->setAttribute('src', $src);
      $el->setAttribute('title', mb_substr($manter['title'] ?? 'Vídeo do artigo', 0, 120));
      $el->setAttribute('loading', 'lazy');
      $el->setAttribute('allowfullscreen', '');
      $el->setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      while ($el->firstChild) $el->removeChild($el->firstChild);
      break;
    case 'div':
      $el->setAttribute('class', 'tabela');
      break;
    case 'th': case 'td':
      foreach (['colspan', 'rowspan'] as $d) if (isset($manter[$d]) && ctype_digit($manter[$d])) $el->setAttribute($d, $manter[$d]);
      break;
  }
}

// ---------------------------------------------------------------- HTML (mesmo resultado de gerador/blog.mjs)

function blog_esc(string $s): string {
  return str_replace(['&', '<', '>', '"'], ['&amp;', '&lt;', '&gt;', '&quot;'], $s);
}

// equivalente ao encodeURIComponent do JavaScript
function blog_uri(string $s): string {
  return strtr(rawurlencode($s), ['%21' => '!', '%2A' => '*', '%27' => "'", '%28' => '(', '%29' => ')']);
}

function blog_icone(string $nome, string $cls = 'ic'): string {
  $p = blog_moldes()['icones'][$nome] ?? '';
  return '<svg class="' . $cls . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' . $p . '</svg>';
}

function blog_iso(string $d): string {
  return substr($d, 6, 4) . '-' . substr($d, 3, 2) . '-' . substr($d, 0, 2) . 'T' . substr($d, 11, 5) . ':00-03:00';
}

function blog_cat_nome(string $cat): string {
  return blog_moldes()['categorias'][$cat]['nome'] ?? $cat;
}

function blog_url(array $p): string { return '/blog/' . $p['slug'] . '/'; }
function blog_abs(string $url): string { return blog_moldes()['site'] . $url; }

function blog_capa_url_abs(array $p): ?string {
  return ($p['capa'] ?? '') !== '' ? blog_abs($p['capa']) : null;
}

function blog_compartilhar(array $p): string {
  $u = blog_uri(blog_abs(blog_url($p)));
  $t = blog_uri($p['titulo']);
  $redes = [
    ['facebook', 'Facebook', "https://www.facebook.com/sharer/sharer.php?u=$u"],
    ['linkedin', 'LinkedIn', "https://www.linkedin.com/shareArticle?mini=true&url=$u&title=$t"],
    ['xis', 'X (Twitter)', "https://twitter.com/intent/tweet?url=$u&text=$t"],
    ['whatsapp', 'WhatsApp', "https://wa.me/?text=$t%20$u"],
  ];
  $itens = '';
  foreach ($redes as [$ic, $nome, $href]) $itens .= '<li><a href="' . blog_esc($href) . '" target="_blank" rel="noopener">' . blog_icone($ic) . $nome . '</a></li>';
  return '<details class="post-share">
          <summary aria-label="Compartilhar: ' . blog_esc($p['titulo']) . '">' . blog_icone('compartilhar') . '<span>Compartilhar</span></summary>
          <ul>' . $itens . '</ul>
        </details>';
}

function blog_capa(array $p, bool $lazy = true, string $alt = ''): string {
  if (($p['capa'] ?? '') !== '') {
    $capa = $p['capa'];
    $lz = $lazy ? ' loading="lazy"' : '';
    $dim = (!empty($p['capaW']) && !empty($p['capaH'])) ? ' width="' . (int) $p['capaW'] . '" height="' . (int) $p['capaH'] . '"' : '';
    $img = '<img src="' . blog_esc($capa) . '"' . $dim . ' alt="' . blog_esc($alt) . '"' . $lz . ' decoding="async">';
    // capas do site anterior têm versão WebP ao lado do JPG
    if (preg_match('#^/assets/img/blog/([a-z0-9-]+)\.jpg$#', $capa, $m)) {
      return '<picture><source type="image/webp" srcset="/assets/img/blog/' . $m[1] . '.webp">' . $img . '</picture>';
    }
    return '<picture>' . $img . '</picture>';
  }
  $ic = blog_moldes()['categorias'][$p['cat']]['icone'] ?? 'livro';
  return '<svg class="post-capa-linha" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150C30 140 48 92 72 90C96 88 104 122 128 122C156 122 174 80 200 70"/></svg>
          ' . blog_icone($ic, 'ic post-capa-ic');
}

function blog_cartao(array $p, int $i): string {
  $url = blog_url($p);
  $nomeCat = blog_cat_nome($p['cat']);
  $classes = 'post-capa post-capa-' . $p['cat'] . (($p['capa'] ?? '') !== '' ? ' com-foto' . (!empty($p['capaLogo']) ? ' foto-logo' : '') : '');
  return '<li class="post rv" style="--i:' . ($i % 4) . '">
      <article class="post-in" aria-labelledby="post-' . $i . '">
        <a class="' . $classes . '" href="' . $url . '" tabindex="-1" aria-hidden="true">
          ' . blog_capa($p) . '
          <span class="post-capa-cat">' . $nomeCat . '</span>
        </a>
        <div class="post-corpo">
          <h2 class="post-tit" id="post-' . $i . '"><a href="' . $url . '">' . blog_esc($p['titulo']) . '</a></h2>
          <p class="post-meta"><span>' . blog_icone('calendario') . '<time datetime="' . blog_iso($p['data']) . '">' . blog_esc($p['data']) . '</time></span><a href="/blog/categoria/' . $p['cat'] . '/">' . blog_icone('etiqueta') . $nomeCat . '</a></p>
          <p class="post-resumo">' . blog_esc($p['resumo']) . '</p>
        </div>
        <div class="post-rodape">
          ' . blog_compartilhar($p) . '
          <a class="btn btn-primario btn-p" href="' . $url . '">Leia mais' . blog_icone('seta') . '</a>
        </div>
      </article>
    </li>';
}

function blog_paginacao(int $atual, int $total, string $base): string {
  if ($total < 2) return '';
  $link = fn(int $n) => $n === 1 ? $base : "{$base}pagina/$n/";
  $itens = [];
  if ($atual > 1) $itens[] = '<li><a class="pag-seta" href="' . $link($atual - 1) . '" rel="prev" aria-label="Página anterior">' . blog_icone('seta', 'ic ic-volta') . '</a></li>';
  for ($n = 1; $n <= $total; $n++) $itens[] = $n === $atual ? '<li><span aria-current="page">' . $n . '</span></li>' : '<li><a href="' . $link($n) . '">' . $n . '</a></li>';
  if ($atual < $total) $itens[] = '<li><a class="pag-seta" href="' . $link($atual + 1) . '" rel="next" aria-label="Próxima página">' . blog_icone('seta') . '</a></li>';
  return '<nav class="paginacao" aria-label="Páginas do blog"><ul>' . implode('', $itens) . '</ul></nav>';
}

function blog_trilha_html(array $trilha): string {
  $out = [];
  foreach ($trilha as $i => $t) $out[] = $i === count($trilha) - 1 ? '<li><span aria-current="page">' . $t['nome'] . '</span></li>' : '<li><a href="' . $t['url'] . '">' . $t['nome'] . '</a></li>';
  return '<nav class="trilha" aria-label="Você está em"><ol>' . implode('', $out) . '</ol></nav>';
}

function blog_trilha_schema(string $abs, array $trilha): array {
  $itens = [];
  foreach ($trilha as $i => $t) $itens[] = ['@type' => 'ListItem', 'position' => $i + 1, 'name' => $t['nome'], 'item' => blog_moldes()['site'] . $t['url']];
  return ['@type' => 'BreadcrumbList', '@id' => "$abs#trilha", 'itemListElement' => $itens];
}

function blog_topo_listagem(array $trilha, string $h1, string $intro): string {
  return '<section class="pagina-topo">
  ' . blog_moldes()['fragmentos']['linhaTopo'] . '
  <div class="wrap pagina-topo-grade so-texto">
    <div class="pagina-topo-txt">
      ' . blog_trilha_html($trilha) . '
      <p class="kicker">Blog da Contelb</p>
      <h1>' . $h1 . '</h1>
      <p class="lede">' . $intro . '</p>
      
    </div>
    
  </div>
</section>';
}

// Uma página de listagem (todos os posts ou uma categoria), já com o HTML completo
function blog_pagina_listagem(?string $cat, int $n): ?array {
  $porPagina = (int) blog_moldes()['porPagina'];
  $lista = array_values(array_filter(blog_todos(), fn($p) => $cat === null || $p['cat'] === $cat));
  $total = max(1, (int) ceil(count($lista) / $porPagina));
  if ($n < 1 || $n > $total) return null;
  $base = $cat === null ? '/blog/' : "/blog/categoria/$cat/";
  $url = $n === 1 ? $base : "{$base}pagina/$n/";
  if ($cat === null) {
    $meta = [
      'titulo' => 'Blog da Contelb | Contabilidade, Tributos e Gestão de Pessoas',
      'descricao' => 'Notícias e orientações da Contelb Contabilidade sobre MEI, Reforma Tributária, eSocial, FGTS e gestão de pessoas para empresas de Brasília e do DF.',
      'h1' => 'Blog da Contelb: notícias de contabilidade, tributos e gestão de pessoas',
      'intro' => 'O que muda na legislação e o que isso significa para a sua empresa, com atualização da equipe da Contelb.',
    ];
  } else {
    $nome = blog_cat_nome($cat);
    $meta = [
      'titulo' => "$nome | Blog da Contelb Contabilidade",
      'descricao' => "Posts da categoria $nome no blog da Contelb Contabilidade, escritório de contabilidade em Águas Claras, Brasília/DF.",
      'h1' => "Blog da Contelb: $nome",
      'intro' => "Todos os posts da categoria $nome.",
    ];
  }
  $trilha = [['nome' => 'Início', 'url' => '/'], ['nome' => 'Blog', 'url' => '/blog/']];
  if ($cat !== null) $trilha[] = ['nome' => blog_cat_nome($cat), 'url' => $base];
  if ($n > 1) $trilha[] = ['nome' => "Página $n", 'url' => $url];
  $posts = array_slice($lista, ($n - 1) * $porPagina, $porPagina);

  $filtros = '<li><a href="/blog/"' . ($cat === null ? ' aria-current="page"' : '') . '>Todos</a></li>';
  foreach (blog_moldes()['categorias'] as $id => $c) $filtros .= '<li><a href="/blog/categoria/' . $id . '/"' . ($cat === $id ? ' aria-current="page"' : '') . '>' . $c['nome'] . '</a></li>';
  $cartoes = [];
  foreach ($posts as $i => $p) $cartoes[] = blog_cartao($p, $i);

  $corpo = blog_topo_listagem($trilha, $meta['h1'] . ($n > 1 ? ", página $n" : ''), $meta['intro']) . '
<section class="secao blog" aria-label="Posts">
  <div class="wrap">
    <nav class="blog-filtros rv" aria-label="Categorias do blog"><ul>' . $filtros . '</ul></nav>
    <ul class="blog-grade">
    ' . implode("\n    ", $cartoes) . '
    </ul>
    ' . blog_paginacao($n, $total, $base) . '
  </div>
</section>
' . blog_moldes()['fragmentos']['relacionados'];

  $titulo = $n > 1 ? preg_replace('/\s\|\s[^|]+$/u', '', preg_replace('/ \| /', " | Página $n | ", $meta['titulo'], 1)) : $meta['titulo'];
  $itemList = [];
  foreach ($posts as $i => $p) $itemList[] = ['@type' => 'ListItem', 'position' => ($n - 1) * $porPagina + $i + 1, 'url' => blog_url($p), 'name' => $p['titulo']];
  return [
    'url' => $url,
    'titulo' => $titulo,
    'descricao' => $n > 1 ? "Página $n do blog. {$meta['descricao']}" : $meta['descricao'],
    'corpo' => $corpo,
    'tipo' => 'CollectionPage',
    'classe' => 'pg-blog',
    'ogTipo' => 'website',
    'schema' => [blog_trilha_schema(blog_abs($url), $trilha), ['@type' => 'ItemList', '@id' => blog_abs($url) . '#posts', 'itemListElement' => $itemList]],
  ];
}

function blog_titulo_curto(string $t, int $max): string {
  if (mb_strlen($t) <= $max) return $t;
  $c = mb_substr($t, 0, $max - 3);
  $c = preg_replace('/[\s,;:.]+\S*$/u', '', $c);
  $c = preg_replace('/[\s,;:]+$/u', '', $c);
  return $c . '...';
}

function blog_descricao_do_texto(string $body): string {
  $t = preg_replace('#<h[23]>.*?</h[23]>#su', ' ', $body);
  $t = preg_replace('#<[^>]+>#u', ' ', $t);
  $t = str_replace(['&nbsp;', '&amp;'], [' ', '&'], $t);
  $t = trim(preg_replace('/\s+/u', ' ', $t));
  if (mb_strlen($t) <= 155) return $t;
  return preg_replace('/[\s,;:.]+\S*$/u', '', mb_substr($t, 0, 152)) . '...';
}

function blog_pagina_post(array $p): array {
  $nomeCat = blog_cat_nome($p['cat']);
  $url = blog_url($p);
  $abs = blog_abs($url);
  $trilha = [['nome' => 'Início', 'url' => '/'], ['nome' => 'Blog', 'url' => '/blog/'], ['nome' => $nomeCat, 'url' => "/blog/categoria/{$p['cat']}/"], ['nome' => $p['titulo'], 'url' => $url]];
  $mesmos = array_slice(array_values(array_filter(blog_todos(), fn($o) => $o['cat'] === $p['cat'] && $o['slug'] !== $p['slug'])), 0, 4);
  $descricao = blog_descricao_do_texto($p['body']);
  $tituloEsc = blog_esc($p['titulo']);
  $figura = ($p['capa'] ?? '') !== '' ? '<figure class="post-figura' . (!empty($p['capaLogo']) ? ' foto-logo' : '') . '">' . blog_capa($p, false, $p['titulo']) . '</figure>' : '';
  $trilhaHtml = '';
  foreach ($trilha as $i => $t) $trilhaHtml .= $i === count($trilha) - 1 ? '<li><span aria-current="page">Post</span></li>' : '<li><a href="' . $t['url'] . '">' . $t['nome'] . '</a></li>';
  $outros = '';
  if ($mesmos) {
    $li = '';
    foreach ($mesmos as $o) $li .= '<li><a href="' . blog_url($o) . '">' . blog_esc($o['titulo']) . '</a></li>';
    $outros = '<nav class="artigo-outros" aria-label="Mais posts de ' . $nomeCat . '">
        <p class="alerta-tit">Mais de ' . $nomeCat . '</p>
        <ul>' . $li . '</ul>
      </nav>';
  }
  $f = blog_moldes()['fragmentos'];
  $corpo = '<section class="pagina-topo post-topo">
  <div class="wrap">
    <nav class="trilha" aria-label="Você está em"><ol>' . $trilhaHtml . '</ol></nav>
    <p class="kicker">' . $nomeCat . '</p>
    <h1 class="post-h1">' . $tituloEsc . '</h1>
    <p class="post-meta post-meta-topo"><span>' . blog_icone('calendario') . '<time datetime="' . blog_iso($p['data']) . '">' . blog_esc($p['data']) . '</time></span><span>Por Contelb Contabilidade</span></p>
  </div>
</section>
<section class="secao artigo-corpo">
  <div class="wrap artigo-grade">
    <article class="prosa post-prosa">
      ' . $figura . '
      ' . $p['body'] . '
      <p class="post-aviso">Conteúdo informativo, de acordo com as regras em vigor em ' . blog_esc(substr($p['data'], 0, 10)) . '. As normas mudam com frequência, e este texto não substitui a orientação de um contador sobre o seu caso.</p>
      <div class="post-fim">
        ' . blog_compartilhar($p) . '
        <a class="link-seta" href="/blog/">Ver todos os posts' . blog_icone('seta') . '</a>
      </div>
    </article>
    <aside class="artigo-lado">
      <div class="alerta alerta-cta">
        <p class="alerta-tit">Dúvidas sobre este assunto?</p>
        <p>Um especialista da Contelb explica o que muda para a sua empresa.</p>
        ' . str_replace('XMSGX', blog_uri('Olá! Li o post "' . $p['titulo'] . '" no site e tenho uma dúvida.'), $f['whatsLado']) . '
      </div>
      ' . $outros . '
    </aside>
  </div>
</section>
' . str_replace('XMSGX', blog_uri('Olá! Li o post "' . $p['titulo'] . '" no site e quero conversar com um especialista.'), $f['ctaPost']);
  $imagem = blog_capa_url_abs($p);
  return [
    'url' => $url,
    'titulo' => blog_titulo_curto($p['titulo'], 58) . ' | Contelb',
    'descricao' => $descricao,
    'corpo' => $corpo,
    'tipo' => 'WebPage',
    'classe' => 'pg-post',
    'ogTipo' => 'article',
    'og' => $imagem,
    'modificado' => substr((string) ($p['atualizado'] ?? ''), 0, 10),
    'schema' => [
      blog_trilha_schema($abs, $trilha),
      [
        '@type' => 'BlogPosting', '@id' => "$abs#post", 'headline' => $p['titulo'], 'description' => $descricao,
        'articleSection' => $nomeCat, 'inLanguage' => 'pt-BR', 'datePublished' => blog_iso($p['data']), 'dateModified' => blog_iso($p['data']),
        'mainEntityOfPage' => ['@id' => "$abs#pagina"],
        'author' => ['@id' => blog_moldes()['site'] . '/#organizacao'], 'publisher' => ['@id' => blog_moldes()['site'] . '/#organizacao'],
        'image' => $imagem ?? blog_moldes()['site'] . '/assets/img/og-contelb.jpg',
      ],
    ],
  ];
}

// Monta a página inteira a partir do molde exportado pelo gerador
function blog_html(array $pg): string {
  $m = blog_moldes();
  $abs = blog_abs($pg['url']);
  $webpage = [
    '@type' => $pg['tipo'], '@id' => "$abs#pagina", 'url' => $abs, 'name' => $pg['titulo'], 'description' => $pg['descricao'],
    'isPartOf' => ['@id' => $m['site'] . '/#site'], 'about' => ['@id' => $m['site'] . '/#organizacao'], 'inLanguage' => 'pt-BR',
    'dateModified' => ($pg['modificado'] ?? '') ?: $m['hoje'],
  ];
  foreach ($pg['schema'] as $s) if (($s['@type'] ?? '') === 'BreadcrumbList') $webpage['breadcrumb'] = ['@id' => "$abs#trilha"];
  $grafo = ['@context' => 'https://schema.org', '@graph' => array_merge($m['grafoBase'], [$webpage], $pg['schema'])];
  $json = str_replace('<', '<', json_encode($grafo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
  $molde = (string) file_get_contents(__DIR__ . '/molde.html');
  return strtr($molde, [
    '__ROTA__' => substr($pg['url'], strlen('/blog/')),
    '__TITULO__' => blog_esc($pg['titulo']),
    '__DESCRICAO__' => blog_esc($pg['descricao']),
    '__OGIMAGE__' => blog_esc($pg['og'] ?? $m['site'] . '/assets/img/og-contelb.jpg'),
    '__OGTIPO__' => $pg['ogTipo'],
    '__CLASSE__' => $pg['classe'],
    '__SCHEMA__' => $json,
    '__CORPO__' => $pg['corpo'],
  ]);
}

function blog_sitemap(): string {
  $site = blog_moldes()['site'];
  $urls = [['/blog/', blog_moldes()['hoje'], '0.7']];
  $porPagina = (int) blog_moldes()['porPagina'];
  $todos = blog_todos();
  for ($n = 2; $n <= (int) ceil(count($todos) / $porPagina); $n++) $urls[] = ["/blog/pagina/$n/", blog_moldes()['hoje'], '0.4'];
  foreach (BLOG_CATEGORIAS_IDS as $c) {
    $qtd = count(array_filter($todos, fn($p) => $p['cat'] === $c));
    if ($qtd) $urls[] = ["/blog/categoria/$c/", blog_moldes()['hoje'], '0.4'];
  }
  foreach ($todos as $p) $urls[] = [blog_url($p), substr((string) ($p['atualizado'] ?? ''), 0, 10) ?: blog_moldes()['hoje'], '0.6'];
  $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
  foreach ($urls as [$u, $d, $pr]) $xml .= "  <url><loc>$site$u</loc><lastmod>$d</lastmod><priority>$pr</priority></url>\n";
  return $xml . "</urlset>\n";
}
