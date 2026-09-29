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
- `outras.mjs`: Sobre, hub de serviços, Contato, Blog e artigos, Política de privacidade e 404.
- `layout.mjs`: cabeçalho, rodapé, metatags, Open Graph e dados estruturados (JSON-LD).

Depois de editar, gere as páginas de novo:

```
node gerador/gerar.mjs
```

## Pré-visualizar

```
cd site && python3 -m http.server 8080
```

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

- Horário de atendimento (hoje: "Segunda a sexta, em horário comercial"), em `gerador/dados.mjs`.
- Número de registro no CRC do escritório e do responsável técnico, para incluir no rodapé.
- Textos completos dos depoimentos (hoje aparecem como resumo, sem aspas, e sem marcação `Review`).
- Quem aparece nas fotos das salas, se for preciso citar no texto.
- A imagem do topo da página inicial é a do banner do site anterior e ilustra um ambiente empresarial; o ideal é trocar por uma foto real do Edifício Contelb.
