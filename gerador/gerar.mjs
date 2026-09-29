// Gera o site estático em ../site a partir do conteúdo desta pasta.
// Uso: node gerador/gerar.mjs   (Node 18 ou mais novo, sem dependências)
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, HOJE } from './dados.mjs';
import { pagina } from './layout.mjs';
import { home } from './home.mjs';
import { PAGINAS_SERVICO, paginaServico } from './servicos.mjs';
import { sobre, servicosHub, contato, blogIndex, artigo, ARTIGOS, privacidade, naoEncontrada } from './outras.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');

const paginas = [
  home(),
  servicosHub(),
  ...PAGINAS_SERVICO.map(paginaServico),
  sobre(),
  blogIndex(),
  ...ARTIGOS.map(artigo),
  contato(),
  privacidade(),
  naoEncontrada(),
];

for (const p of paginas) {
  const arquivo = p.arquivo || join(p.url.replace(/^\//, ''), 'index.html');
  const destino = join(RAIZ, arquivo);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, pagina(p), 'utf8');
  console.log('gerado', arquivo);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${SITE}${p.url}</loc><lastmod>${HOJE}</lastmod><priority>${p.prioridade || '0.5'}</priority></url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(join(RAIZ, 'sitemap.xml'), sitemap, 'utf8');

writeFileSync(join(RAIZ, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`, 'utf8');
console.log(`ok: ${paginas.length} páginas, sitemap.xml e robots.txt`);
