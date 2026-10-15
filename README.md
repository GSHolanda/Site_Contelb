# Site da Contelb Contabilidade

Novo site institucional da Contelb Contabilidade (Águas Claras, Brasília/DF), construído com a skill **Site de 10K** e o briefing de redesign e SEO.

Arquivos estáticos puros: HTML, CSS e JavaScript sem framework e sem dependências. A pasta `site/` é exatamente o que vai para o `public_html` da hospedagem.

## Estrutura

```
site/                  pasta de publicação (sobe inteira para public_html)
  index.html           página inicial com o hero guiado por scroll
  sobre/ servicos/ abrir-empresa-brasilia/ trocar-de-contador/ ...
  blog/ contato/ politica-de-privacidade/ 404.html
  assets/css/site.css  todo o visual
  assets/js/site.js    hero, linhas animadas, abas, formulário, mapas
  assets/img/          fotos em AVIF, WebP e JPG, imagem de compartilhamento, logotipo
  assets/fonts/        fontes próprias (Bricolage Grotesque, Source Sans 3, IBM Plex Mono)
  .htaccess            HTTPS, www, redirecionamentos 301 das URLs .php antigas, cache
  sitemap.xml robots.txt favicon.svg favicon.ico apple-touch-icon.png
gerador/               conteúdo e moldura das páginas (Node, sem dependências)
publicar.sh            publicação na HostGator via FTP (usa hostgator.env, que nunca vai para o Git)
```

## Como editar

Os textos vivem em `gerador/`:

- `dados.mjs`: telefone, e-mail, endereços, redes sociais, horário, lista de serviços e menu. NAP em um lugar só.
- `home.mjs`: página inicial.
- `servicos.mjs`: as oito páginas de serviço (contabilidade, trabalhista, assessoria, MEI, abrir empresa, trocar de contador, planejamento tributário, recuperação de créditos).
- `outras.mjs`: Sobre, hub de serviços, Contato, Política de privacidade e 404.
- `blog.mjs`: o blog, com os 15 posts do blog original (título, data, categoria, resumo e texto completo), 8 por página, filtros por categoria, compartilhamento e uma página por post em `/blog/<slug>/`, o mesmo endereço do blog antigo.
- `posts/`: o texto de cada post, em HTML limpo. Foi gerado a partir da exportação do blog antigo com `python3 -I gerador/ferramentas/limpar-posts.py <pasta-exportada> gerador/posts`. Para um post novo: crie `posts/<slug>.html` e adicione uma linha no topo da lista `POSTS` em `blog.mjs` (e a imagem em `IMAGENS`, se houver).
- `layout.mjs`: cabeçalho, rodapé, metatags, Open Graph e dados estruturados (JSON-LD).

Depois de editar, gere as páginas de novo:

```
node gerador/gerar.mjs
```

## Pré-visualizar

No Windows, dê dois cliques em `ver-site.bat`. Ele liga um servidor local feito só com o PowerShell do próprio Windows (`ver-site.ps1`, nada para instalar) e abre o navegador em `http://localhost:8080`. Deixe a janela preta aberta enquanto olha o site.

No PowerShell, os comandos vão em linhas separadas:

```
cd site
py -m http.server 8080
```

No Mac ou Linux: `cd site && python3 -m http.server 8080`.

Abra `http://localhost:8080`. Um servidor local é necessário porque os links usam caminhos a partir da raiz (`/sobre/`, `/assets/...`), como no site no ar.

## Publicar (HostGator)

1. Copie `hostgator.env.exemplo` para `hostgator.env` e preencha servidor, usuário e senha do cPanel. Esse arquivo é a chave da hospedagem e está no `.gitignore`.
2. Rode `./publicar.sh`. Ele sobe tudo de `site/` para `public_html`, incluindo o `.htaccess`.

## SEO implementado

- Title e meta description únicos por página, canonical absoluto, um H1 por página, hierarquia H1 > H2 > H3.
- URLs amigáveis sem `.php` e redirecionamento 301 de todas as URLs antigas.
- JSON-LD: `Organization`, dois `AccountingService` (matriz e filial, que são `LocalBusiness`) com `PostalAddress`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` e `BlogPosting`.
- `sitemap.xml`, `robots.txt`, Open Graph e Twitter Cards com imagem 1200x630.
- NAP idêntico no rodapé, na página de contato e nos dados estruturados.
- Imagens AVIF e WebP com dimensões definidas, `lazy` fora da primeira tela e texto alternativo descritivo.

## Pendências para confirmar com a Contelb

- Blog: faltam as imagens de capa de 9 posts (estão com a capa desenhada da categoria). Na publicação, o sistema de blog antigo em `public_html/blog` precisa ser desativado ou renomeado, porque o novo site passa a servir os mesmos endereços.

- Horário de atendimento (hoje: "Segunda a sexta, em horário comercial"), em `gerador/dados.mjs`.
- Número de registro no CRC do escritório e do responsável técnico, para incluir no rodapé.
- Textos completos dos depoimentos (hoje aparecem como resumo, sem aspas, e sem marcação `Review`).
- Quem aparece nas fotos das salas, se for preciso citar no texto.
- A imagem do topo da página inicial é a do banner do site anterior e ilustra um ambiente empresarial; o ideal é trocar por uma foto real do Edifício Contelb.
