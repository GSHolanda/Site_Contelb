// Blog: os mesmos posts, datas, categorias, resumos e textos do blog original da Contelb
// (contelb.com.br/blog/pagina e /blog/pagina/2), na mesma ordem e com 8 posts por página.
// O texto completo de cada post vem de gerador/posts/<slug>.html (limpo por ferramentas/limpar-posts.py).
// Os endereços seguem os do blog antigo: /blog/<slug>/.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from './dados.mjs';
import { icone, topoPagina, relacionados, trilhaSchema, ctaFaixa, btnWhats, esc } from './layout.mjs';

const PASTA_POSTS = join(dirname(fileURLToPath(import.meta.url)), 'posts');

// Imagens de capa recebidas da Contelb, na mesma relação post/imagem do blog antigo
// (os demais posts usam a capa desenhada da categoria)
const IMAGENS = {
  'novo-padrao-amplia-as-possibilidades-de-registro-de-empresas-sem-impactar-os-cnpjs-ja-existentes-que-permanecem-validos': ['cnpj-alfanumerico', 541, 429],
  'nfs-e-nacional-passa-a-ser-obrigatoria-para-empresas-do-simples-nacional-saiba-o-que-muda': ['nfs-e-nacional', 1200, 800],
  'stf-confirma-suspensao-de-penalidades-sobre-saude-mental-no-trabalho': ['nr1-saude-mental', 600, 400],
  '6-obrigacoes-que-todo-mei-precisa-cumprir': ['mei', 447, 447],
  'receita-federal-publica-primeiros-devedores-contumazes-e-acende-alerta-para-empresas-com-dividas-fiscais-recorrentes': ['devedores-contumazes', 1199, 626],
  'saque-aniversario-do-fgts-libera-pagamento-para-nascidos-em-agosto-na-segunda-feira-3-8': ['fgts-saque-aniversario', 870, 450],
  '5-riscos-graves-de-nao-fazer-uma-gestao-adequada-da-nova-nr-1': ['nr-01', 750, 409],
  'parametrizacao-do-ibs-e-da-cbs-nos-documentos-fiscais-eletronicos': ['ibs', 556, 359],
  'fim-da-escala-6x1-presidente-do-senado-sinaliza-apoio-a-pec-e-defende-reducao-da-jornada-sem-periodo-de-transicao': ['logo-contelb-blog', 491, 508, 'logo'],
};
export const POR_PAGINA = 8;

export const CATEGORIAS = {
  noticia: { nome: 'Notícia', icone: 'livro' },
  'gestao-de-pessoas': { nome: 'Gestão de Pessoas', icone: 'pessoas' },
  'reforma-tributaria': { nome: 'Reforma Tributária', icone: 'balanca' },
};

// [slug, título, data, categoria, resumo]
export const POSTS = [
  ['6-obrigacoes-que-todo-mei-precisa-cumprir', '6 obrigações que todo MEI precisa cumprir', '26/08/2026 17:00', 'noticia', 'Caso não cumpra com as regras, o empreendedor pode ser desenquadrado da categoria. Os Microempreendedores Individuais (MEIs) se enquadram em um...'],
  ['stf-confirma-suspensao-de-penalidades-sobre-saude-mental-no-trabalho', 'STF confirma suspensão de penalidades sobre saúde mental no trabalho', '26/08/2026 16:58', 'gestao-de-pessoas', 'O Plenário do Supremo Tribunal Federal formou maioria, na tarde desta terça-feira (18/8), para manter a suspensão da aplicação das punições...'],
  ['saque-aniversario-do-fgts-libera-pagamento-para-nascidos-em-agosto-na-segunda-feira-3-8', 'Saque-aniversário do FGTS libera pagamento para nascidos em agosto na segunda-feira (3/8)', '12/08/2026 13:14', 'noticia', 'Modalidade permite retirada anual de parte do saldo do FGTS e segue calendário da Caixa Econômica Federal; valores ficam disponíveis até 30 de...'],
  ['receita-federal-publica-primeiros-devedores-contumazes-e-acende-alerta-para-empresas-com-dividas-fiscais-recorrentes', 'Receita Federal publica primeiros devedores contumazes e acende alerta para empresas com dívidas fiscais recorrentes', '12/08/2026 13:10', 'noticia', 'Entenda a Lei Complementar 225/2026 e os riscos para sua empresa. A Receita Federal publicou a primeira lista de contribuintes considerados devedores...'],
  ['novo-padrao-amplia-as-possibilidades-de-registro-de-empresas-sem-impactar-os-cnpjs-ja-existentes-que-permanecem-validos', 'Novo padrão amplia as possibilidades de registro de empresas sem impactar os CNPJs já existentes, que permanecem válidos.', '07/08/2026 08:43', 'noticia', 'A Receita Federal informa que, hoje, 31 de julho de 2026, foi gerado o primeiro CNPJ alfanumérico do país, conforme o cronograma de implantação...'],
  ['reforma-tributaria-95-das-empresas-correm-risco-de-ter-notas-fiscais-rejeitadas-por-falta-de-adequacao-a-nova-legislacao', 'Reforma Tributária: 95% das empresas correm risco de ter notas fiscais rejeitadas por falta de adequação à nova legislação', '04/08/2026 09:30', 'reforma-tributaria', 'Estudo da IOB com 967 empresas revela baixo nível de preparação para as novas exigências e demanda por soluções automatizadas de controle...'],
  ['parametrizacao-do-ibs-e-da-cbs-nos-documentos-fiscais-eletronicos', 'Parametrização do IBS e da CBS nos documentos fiscais eletrônicos', '30/07/2026 12:01', 'reforma-tributaria', 'Mesmo com sistema atualizado, falhas em CST, cClassTrib afetam créditos e...'],
  ['nfs-e-nacional-passa-a-ser-obrigatoria-para-empresas-do-simples-nacional-saiba-o-que-muda', 'NFS-e Nacional passa a ser obrigatória para empresas do Simples Nacional: saiba o que muda', '17/07/2026 10:21', 'reforma-tributaria', 'A partir de 1º de setembro de 2026, as empresas optantes...'],
  ['novas-regras-do-credito-do-trabalhador-exigem-adequacao-imediata-na-rotina-contabil', 'Novas regras do Crédito do Trabalhador exigem adequação imediata na rotina contábil', '15/07/2026 12:46', 'gestao-de-pessoas', 'Alteração no eSocial muda tratamento de consignados em rescisões contratuais e impõe consulta obrigatória ao Portal Emprega Brasil. Uma...'],
  ['fim-da-escala-6x1-presidente-do-senado-sinaliza-apoio-a-pec-e-defende-reducao-da-jornada-sem-periodo-de-transicao', 'Fim da escala 6x1: presidente do Senado sinaliza apoio à PEC e defende redução da jornada sem período de transição', '15/07/2026 12:46', 'gestao-de-pessoas', 'Senado retoma debate sobre o fim da escala 6x1. Presidente da Casa defende aplicação imediata das duas folgas semanais, sem transição. Entenda os...'],
  ['cbs-passa-a-incidir-sobre-comprinhas-a-partir-de-2027-e-pode-elevar-custo-das-importacoes-de-baixo-valor', 'CBS passa a incidir sobre “comprinhas” a partir de 2027 e pode elevar custo das importações de baixo valor', '15/07/2026 12:45', 'reforma-tributaria', 'Nova tributação prevista na reforma tributária fará com que compras internacionais de baixo valor passem a ter incidência da CBS a partir de...'],
  ['receita-federal-e-comite-gestor-do-ibs-elaboram-ato-conjunto-que-definira-novos-modelos-das-notas-fiscais', 'Receita Federal e Comitê Gestor do IBS elaboram ato conjunto que definirá novos modelos das notas fiscais', '15/07/2026 12:44', 'reforma-tributaria', 'Documento definirá datas de obrigatoriedade de modelos como NFAg e NF-e ABI e servirá de base para a adaptação de empresas ao novo sistema...'],
  ['mei-reajuste-exclusivo-do-teto-de-faturamento-pode-gerar-distorcoes-no-simples-nacional-alertam-deputados', 'MEI: reajuste exclusivo do teto de faturamento pode gerar distorções no Simples Nacional, alertam deputados', '09/07/2026 16:59', 'noticia', 'Projeto do governo eleva teto do...'],
  ['stj-regulamenta-o-julgamento-de-conflitos-federativos-relacionados-ao-ibs', 'STJ regulamenta o julgamento de conflitos federativos relacionados ao IBS', '09/07/2026 16:49', 'reforma-tributaria', 'A Reforma Tributária avançou mais uma etapa com a regulamentação,...'],
  ['5-riscos-graves-de-nao-fazer-uma-gestao-adequada-da-nova-nr-1', '5 riscos graves de não fazer uma gestão adequada da nova NR-1', '09/07/2026 10:49', 'gestao-de-pessoas', 'A nova NR-1 entrou em vigor e trouxe uma mudança que está transformando a forma como as empresas lidam com saúde e segurança no trabalho. Fatores...'],
].map(([slug, titulo, data, cat, resumo]) => ({ slug, titulo, data, cat, resumo, url: `/blog/${slug}/`, abs: `${SITE}/blog/${slug}/`, img: IMAGENS[slug] }));

const isoData = (d) => { const [dia, mes, resto] = d.split('/'); const [ano, hora] = resto.split(' '); return `${ano}-${mes}-${dia}T${hora}:00-03:00`; };

function compartilhar(p) {
  const u = encodeURIComponent(p.abs);
  const t = encodeURIComponent(p.titulo);
  const redes = [
    ['facebook', 'Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['linkedin', 'LinkedIn', `https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${t}`],
    ['x', 'X (Twitter)', `https://twitter.com/intent/tweet?url=${u}&text=${t}`],
    ['whatsapp', 'WhatsApp', `https://wa.me/?text=${t}%20${u}`],
  ];
  return `<details class="post-share">
          <summary aria-label="Compartilhar: ${esc(p.titulo)}">${icone('compartilhar')}<span>Compartilhar</span></summary>
          <ul>${redes.map(([id, nome, href]) => `<li><a href="${esc(href)}" target="_blank" rel="noopener">${icone(id === 'x' ? 'xis' : id)}${nome}</a></li>`).join('')}</ul>
        </details>`;
}

function capa(p, c, lazy = true) {
  if (p.img) {
    const [nome, w, h] = p.img;
    return `<picture><source type="image/webp" srcset="/assets/img/blog/${nome}.webp"><img src="/assets/img/blog/${nome}.jpg" width="${w}" height="${h}" alt=""${lazy ? ' loading="lazy"' : ''} decoding="async"></picture>`;
  }
  return `<svg class="post-capa-linha" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150C30 140 48 92 72 90C96 88 104 122 128 122C156 122 174 80 200 70"/></svg>
          ${icone(c.icone, 'ic post-capa-ic')}`;
}

function cartao(p, i) {
  const c = CATEGORIAS[p.cat];
  return `<li class="post rv" style="--i:${i % 4}">
      <article class="post-in" aria-labelledby="post-${i}">
        <a class="post-capa post-capa-${p.cat}${p.img ? ' com-foto' + (p.img[3] ? ' foto-logo' : '') : ''}" href="${p.url}" tabindex="-1" aria-hidden="true">
          ${capa(p, c)}
          <span class="post-capa-cat">${c.nome}</span>
        </a>
        <div class="post-corpo">
          <h2 class="post-tit" id="post-${i}"><a href="${p.url}">${p.titulo}</a></h2>
          <p class="post-meta"><span>${icone('calendario')}<time datetime="${isoData(p.data)}">${p.data}</time></span><a href="/blog/categoria/${p.cat}/">${icone('etiqueta')}${c.nome}</a></p>
          <p class="post-resumo">${p.resumo}</p>
        </div>
        <div class="post-rodape">
          ${compartilhar(p)}
          <a class="btn btn-primario btn-p" href="${p.url}">Leia mais${icone('seta')}</a>
        </div>
      </article>
    </li>`;
}

function paginacao(atual, total, base) {
  if (total < 2) return '';
  const link = (n) => (n === 1 ? base : `${base}pagina/${n}/`);
  const itens = [];
  if (atual > 1) itens.push(`<li><a class="pag-seta" href="${link(atual - 1)}" rel="prev" aria-label="Página anterior">${icone('seta', 'ic ic-volta')}</a></li>`);
  for (let n = 1; n <= total; n++) itens.push(n === atual ? `<li><span aria-current="page">${n}</span></li>` : `<li><a href="${link(n)}">${n}</a></li>`);
  if (atual < total) itens.push(`<li><a class="pag-seta" href="${link(atual + 1)}" rel="next" aria-label="Próxima página">${icone('seta')}</a></li>`);
  return `<nav class="paginacao" aria-label="Páginas do blog"><ul>${itens.join('')}</ul></nav>`;
}

function listagem({ posts, pagina, total, base, url, trilha, h1, intro, catAtual }) {
  const filtros = [`<li><a href="/blog/"${!catAtual ? ' aria-current="page"' : ''}>Todos</a></li>`]
    .concat(Object.entries(CATEGORIAS).map(([id, c]) => `<li><a href="/blog/categoria/${id}/"${catAtual === id ? ' aria-current="page"' : ''}>${c.nome}</a></li>`))
    .join('');
  return `${topoPagina({ trilha, kicker: 'Blog da Contelb', h1, intro })}
<section class="secao blog" aria-label="Posts">
  <div class="wrap">
    <nav class="blog-filtros rv" aria-label="Categorias do blog"><ul>${filtros}</ul></nav>
    <ul class="blog-grade">
    ${posts.map(cartao).join('\n    ')}
    </ul>
    ${paginacao(pagina, total, base)}
  </div>
</section>
${relacionados(['/servicos/contabilidade-completa/', '/servicos/obrigacoes-trabalhistas/', '/planejamento-tributario/', '/servicos/migrar-mei-para-me/'], 'Precisa de ajuda com algum desses temas?')}`;
}

function paginasDe(lista, base, rotulo, catAtual, meta) {
  const total = Math.ceil(lista.length / POR_PAGINA);
  const out = [];
  for (let n = 1; n <= total; n++) {
    const url = n === 1 ? base : `${base}pagina/${n}/`;
    const trilha = [{ nome: 'Início', url: '/' }, { nome: 'Blog', url: '/blog/' }];
    if (catAtual) trilha.push({ nome: rotulo, url: base });
    if (n > 1) trilha.push({ nome: `Página ${n}`, url });
    const posts = lista.slice((n - 1) * POR_PAGINA, n * POR_PAGINA);
    out.push({
      url,
      titulo: meta.titulo + (n > 1 ? ` | Página ${n}` : ''),
      descricao: meta.descricao,
      corpo: listagem({ posts, pagina: n, total, base, url, trilha, h1: meta.h1 + (n > 1 ? `, página ${n}` : ''), intro: [meta.intro], catAtual }),
      tipo: 'CollectionPage',
      classe: 'pg-blog',
      schema: [
        trilhaSchema(SITE + url, trilha),
        { '@type': 'ItemList', '@id': `${SITE}${url}#posts`, itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: (n - 1) * POR_PAGINA + i + 1, url: p.url, name: p.titulo })) },
      ],
      prioridade: n === 1 && !catAtual ? '0.7' : '0.4',
    });
  }
  return out;
}

function paginaPost(p) {
  const c = CATEGORIAS[p.cat];
  const trilha = [{ nome: 'Início', url: '/' }, { nome: 'Blog', url: '/blog/' }, { nome: c.nome, url: `/blog/categoria/${p.cat}/` }, { nome: p.titulo, url: p.url }];
  const corpoPost = readFileSync(join(PASTA_POSTS, `${p.slug}.html`), 'utf8');
  const mesmos = POSTS.filter((o) => o.cat === p.cat && o.slug !== p.slug).slice(0, 4);
  const resumoLimpo = p.resumo.replace(/\.\.\.$/, '').replace(/[,;]$/, '');
  const descricao = (resumoLimpo.length > 150 ? resumoLimpo.slice(0, 150).replace(/\s+\S*$/, '') : resumoLimpo) + '.';
  const figura = p.img
    ? `<figure class="post-figura${p.img[3] ? ' foto-logo' : ''}">${capa(p, c, false).replace('alt=""', `alt="${esc(p.titulo)}"`)}</figure>`
    : '';
  const corpo = `<section class="pagina-topo post-topo">
  <div class="wrap">
    <nav class="trilha" aria-label="Você está em"><ol>${trilha.map((t, i) => (i === trilha.length - 1 ? `<li><span aria-current="page">Post</span></li>` : `<li><a href="${t.url}">${t.nome}</a></li>`)).join('')}</ol></nav>
    <p class="kicker">${c.nome}</p>
    <h1 class="post-h1">${p.titulo}</h1>
    <p class="post-meta post-meta-topo"><span>${icone('calendario')}<time datetime="${isoData(p.data)}">${p.data}</time></span><span>Por Contelb Contabilidade</span></p>
  </div>
</section>
<section class="secao artigo-corpo">
  <div class="wrap artigo-grade">
    <article class="prosa post-prosa">
      ${figura}
      ${corpoPost}
      <div class="post-fim">
        ${compartilhar(p)}
        <a class="link-seta" href="/blog/">Ver todos os posts${icone('seta')}</a>
      </div>
    </article>
    <aside class="artigo-lado">
      <div class="alerta alerta-cta">
        <p class="alerta-tit">Dúvidas sobre este assunto?</p>
        <p>Um especialista da Contelb explica o que muda para a sua empresa.</p>
        ${btnWhats('Falar com especialista', `Olá! Li o post "${p.titulo}" no site e tenho uma dúvida.`, 'btn btn-primario')}
      </div>
      ${mesmos.length ? `<nav class="artigo-outros" aria-label="Mais posts de ${c.nome}">
        <p class="alerta-tit">Mais de ${c.nome}</p>
        <ul>${mesmos.map((o) => `<li><a href="${o.url}">${o.titulo}</a></li>`).join('')}</ul>
      </nav>` : ''}
    </aside>
  </div>
</section>
${ctaFaixa({ msg: `Olá! Li o post "${p.titulo}" no site e quero conversar com um especialista.` })}`;
  return {
    url: p.url,
    titulo: `${p.titulo.length > 62 ? p.titulo.slice(0, 62).replace(/\s+\S*$/, '') + '...' : p.titulo} | Blog Contelb`,
    descricao,
    corpo,
    ogTipo: 'article',
    og: p.img ? `${SITE}/assets/img/blog/${p.img[0]}.jpg` : undefined,
    classe: 'pg-post',
    schema: [
      trilhaSchema(p.abs, trilha),
      {
        '@type': 'BlogPosting',
        '@id': `${p.abs}#post`,
        headline: p.titulo,
        description: descricao,
        articleSection: c.nome,
        inLanguage: 'pt-BR',
        datePublished: isoData(p.data),
        dateModified: isoData(p.data),
        mainEntityOfPage: { '@id': `${p.abs}#pagina` },
        author: { '@id': `${SITE}/#organizacao` },
        publisher: { '@id': `${SITE}/#organizacao` },
        image: p.img ? `${SITE}/assets/img/blog/${p.img[0]}.jpg` : `${SITE}/assets/img/og-contelb.jpg`,
      },
    ],
    prioridade: '0.6',
  };
}

export function paginasBlog() {
  const geral = paginasDe(POSTS, '/blog/', 'Blog', null, {
    titulo: 'Blog da Contelb | Notícias de Contabilidade, Tributos e Gestão de Pessoas',
    descricao: 'Notícias e orientações da Contelb Contabilidade sobre MEI, Reforma Tributária, eSocial, FGTS e gestão de pessoas para empresas de Brasília e do DF.',
    h1: 'Blog da Contelb: notícias de contabilidade, tributos e gestão de pessoas',
    intro: 'O que muda na legislação e o que isso significa para a sua empresa, com atualização da equipe da Contelb.',
  });
  const porCat = Object.entries(CATEGORIAS).flatMap(([id, c]) =>
    paginasDe(POSTS.filter((p) => p.cat === id), `/blog/categoria/${id}/`, c.nome, id, {
      titulo: `${c.nome} | Blog da Contelb Contabilidade`,
      descricao: `Posts da categoria ${c.nome} no blog da Contelb Contabilidade, escritório de contabilidade em Águas Claras, Brasília/DF.`,
      h1: `Blog da Contelb: ${c.nome}`,
      intro: `Todos os posts da categoria ${c.nome}.`,
    })
  );
  return [...geral, ...porCat, ...POSTS.map(paginaPost)];
}
