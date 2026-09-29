// Moldura compartilhada: <head>, cabeçalho, rodapé, blocos reutilizáveis e dados estruturados.
import { SITE, HOJE, EMPRESA, REDES, UNIDADES, NAV, SERVICOS, whats } from './dados.mjs';

export const VERSAO = '3';
export const OG_PADRAO = `${SITE}/assets/img/og-contelb.jpg`;

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- Ícones (linha, herdam a cor do texto) ----------
const P = {
  livro: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M8 8h8M8 12h6"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16.5 14.6c2.6.1 4.3 1.8 5 4.9"/>',
  bussola: '<circle cx="12" cy="12" r="9.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  degrau: '<path d="M3 20h5v-5h5v-5h5V5h3"/><path d="M15 5h6v6"/>',
  balanca: '<path d="M12 3v18M6 21h12M5 7h14"/><path d="m5 7-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0z"/>',
  retorno: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/><path d="M12 8v4l3 2"/>',
  whatsapp: '<path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2a8.5 8.5 0 1 1 15.6-4.5z"/><path d="M9 8.6c.2-.5.5-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.1.7l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.5-.2.7-.1l1.7.7c.3.1.4.3.4.5v.5c0 .4-.2.7-.6.9-.7.4-1.6.5-2.5.2-2.4-.8-4.3-2.7-5.1-5.1-.3-.9-.2-1.8.1-2.4z"/>',
  telefone: '<path d="M5 3.5h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.8 6.8l1.4-2.2 4.3 1.7V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  mapa: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3.5 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  chave: '<circle cx="8" cy="15" r="4.5"/><path d="m11.5 11.5 8-8M16 7l2.5 2.5M18.5 4.5 21 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>',
  facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8h1.9V3a24 24 0 0 0-2.8-.2C12.2 2.8 10.5 4.4 10.5 7.4v2.1h-3V13h3v8"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M11.5 17v-3.8c0-1.6 1-2.7 2.4-2.7s2.1 1 2.1 2.7V17M11.5 10.5V17"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="m10 9 5 3-5 3z"/>',
};
export const icone = (nome, cls = 'ic') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[nome] || ''}</svg>`;

// ---------- A marca e a linha Contelb (a curva do logotipo, elemento assinatura) ----------
export const logoMarca = (id) => `<svg class="marca-simbolo" viewBox="0 0 176 128" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B84C7"/><stop offset="1" stop-color="#74C5F2"/></linearGradient></defs><rect x="24" y="1" width="126" height="126" rx="14" fill="url(#${id})"/><path d="M5 97C21 81 36 58 52 57C68 56 80 78 96 78C116 78 140 41 171 28" fill="none" stroke="#193B85" stroke-width="17" stroke-linecap="round"/></svg>`;

export const LINHA_D = 'M0 170C140 150 250 64 380 60C510 56 560 128 700 128C860 128 1010 42 1200 22';
export const linha = (cls = '', extra = '') =>
  `<svg class="linha ${cls}" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true" focusable="false"${extra}><path class="linha-sombra" d="${LINHA_D}" pathLength="1"/><path class="linha-traco" d="${LINHA_D}" pathLength="1"/></svg>`;

// ---------- Botões ----------
export const btnWhats = (texto = 'Falar com especialista', msg, cls = 'btn btn-primario') =>
  `<a class="${cls}" href="${esc(whats(msg))}" target="_blank" rel="noopener" data-evento="whatsapp">${icone('whatsapp')}<span>${texto}</span></a>`;
export const btnLink = (url, texto, cls = 'btn btn-secundario') =>
  `<a class="${cls}" href="${url}"><span>${texto}</span>${icone('seta')}</a>`;
export const btnTel = (cls = 'btn btn-secundario') =>
  `<a class="${cls}" href="${EMPRESA.telefoneLink}" data-evento="telefone">${icone('telefone')}<span>${EMPRESA.telefone}</span></a>`;

// ---------- Cabeçalho ----------
function cabecalho(atual) {
  const item = (n) => {
    const ativo = atual === n.url || (n.sub && n.sub.some((s) => s.url === atual)) || (n.url !== '/' && atual.startsWith(n.url));
    const aria = ativo ? ' aria-current="page"' : '';
    if (!n.sub) return `<li><a href="${n.url}"${aria}>${n.nome}</a></li>`;
    const subs = n.sub.map((s) => `<li><a href="${s.url}"${atual === s.url ? ' aria-current="page"' : ''}>${icone(s.icone)}<span><b>${s.nome}</b><small>${s.resumo}</small></span></a></li>`).join('');
    return `<li class="tem-sub"><a href="${n.url}"${aria}>${n.nome}</a><button class="sub-btn" type="button" aria-expanded="false" aria-controls="sub-servicos" aria-label="Mostrar serviços">${icone('chev')}</button><ul class="sub" id="sub-servicos">${subs}</ul></li>`;
  };
  return `<a class="pular" href="#main">Pular para o conteúdo</a>
<header class="topo" id="topo">
  <div class="topo-in">
    <a class="marca" href="/" aria-label="Contelb Contabilidade, página inicial">${logoMarca('lg-topo')}<span class="marca-txt"><b>Contelb</b><small>Contabilidade e Auditoria</small></span></a>
    <nav class="menu" id="menu" aria-label="Principal">
      <ul class="menu-lista">${NAV.map(item).join('')}</ul>
      <div class="menu-extra">
        <a class="btn btn-secundario" href="${EMPRESA.telefoneLink}">${icone('telefone')}<span>${EMPRESA.telefone}</span></a>
        <a class="btn btn-secundario" href="${EMPRESA.portal}" target="_blank" rel="noopener">${icone('chave')}<span>Área do Cliente</span></a>
      </div>
    </nav>
    <div class="topo-acoes">
      <a class="topo-tel" href="${EMPRESA.telefoneLink}" data-evento="telefone">${icone('telefone')}<span>${EMPRESA.telefone}</span></a>
      <a class="btn btn-fantasma btn-p topo-portal" href="${EMPRESA.portal}" target="_blank" rel="noopener">${icone('chave')}<span>Área do Cliente</span></a>
      <a class="btn btn-primario btn-p" href="${esc(whats())}" target="_blank" rel="noopener" data-evento="whatsapp">${icone('whatsapp')}<span>WhatsApp</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${icone('menu', 'ic ic-abrir')}${icone('fechar', 'ic ic-fechar')}</button>
    </div>
  </div>
</header>`;
}

// ---------- Rodapé (NAP completo) ----------
function rodape() {
  const redes = REDES.map((r) => `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nome} da Contelb">${icone(r.nome.toLowerCase())}</a>`).join('');
  const unid = UNIDADES.map((u) => `<address class="nap">
        <p class="nap-rotulo">${u.nome}</p>
        <p><b>${EMPRESA.nome}</b><br>${u.linhas.join('<br>')}</p>
        <a class="link-seta" href="${u.mapa}" target="_blank" rel="noopener">Como chegar${icone('seta')}</a>
      </address>`).join('');
  return `<footer class="rodape">
  ${linha('rodape-linha')}
  <div class="wrap rodape-grade">
    <div class="rodape-marca">
      <a class="marca marca-clara" href="/" aria-label="Contelb Contabilidade, página inicial">${logoMarca('lg-rodape')}<span class="marca-txt"><b>Contelb</b><small>Contabilidade e Auditoria</small></span></a>
      <p>Contabilidade, consultoria tributária e assessoria empresarial em Águas Claras, Brasília/DF, desde 1976.</p>
      <div class="redes">${redes}</div>
    </div>
    <div>
      <h2 class="rodape-tit">Serviços</h2>
      <ul class="rodape-lista">${SERVICOS.map((s) => `<li><a href="${s.url}">${s.nome}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="rodape-tit">A Contelb</h2>
      <ul class="rodape-lista">
        <li><a href="/abrir-empresa-brasilia/">Abrir empresa em Brasília</a></li>
        <li><a href="/trocar-de-contador/">Trocar de contador</a></li>
        <li><a href="/sobre/">Sobre a Contelb</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/contato/">Contato</a></li>
        <li><a href="${EMPRESA.portal}" target="_blank" rel="noopener">Área do Cliente</a></li>
      </ul>
    </div>
    <div>
      <h2 class="rodape-tit">Fale com a gente</h2>
      <ul class="rodape-lista rodape-contato">
        <li><a href="${EMPRESA.telefoneLink}">${icone('telefone')}${EMPRESA.telefone}</a></li>
        <li><a href="${esc(whats())}" target="_blank" rel="noopener">${icone('whatsapp')}WhatsApp</a></li>
        <li><a href="mailto:${EMPRESA.email}">${icone('email')}${EMPRESA.email}</a></li>
        <li><span>${icone('relogio')}${EMPRESA.horario}</span></li>
      </ul>
    </div>
  </div>
  <div class="wrap rodape-nap">${unid}</div>
  <div class="wrap rodape-base">
    <p>© 2026 ${EMPRESA.nome}. Todos os direitos reservados.</p>
    <p><a href="/politica-de-privacidade/">Política de privacidade</a></p>
  </div>
</footer>`;
}

// ---------- Dados estruturados ----------
const endereco = (u) => ({
  '@type': 'PostalAddress',
  streetAddress: u.rua,
  addressLocality: 'Brasília',
  addressRegion: 'DF',
  postalCode: u.cep,
  addressCountry: 'BR',
});

export function grafoBase() {
  const org = {
    '@type': 'Organization',
    '@id': `${SITE}/#organizacao`,
    name: EMPRESA.nome,
    alternateName: ['Contelb', 'Contelb Contabilidade e Auditoria'],
    url: `${SITE}/`,
    logo: { '@type': 'ImageObject', url: `${SITE}/assets/img/logo-contelb.png`, width: 512, height: 512 },
    image: OG_PADRAO,
    email: EMPRESA.email,
    telephone: EMPRESA.telefoneSchema,
    foundingDate: EMPRESA.fundacao,
    address: endereco(UNIDADES[0]),
    sameAs: REDES.filter((r) => r.nome !== 'LinkedIn').map((r) => r.url),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: EMPRESA.telefoneSchema,
      email: EMPRESA.email,
      contactType: 'customer service',
      areaServed: 'BR-DF',
      availableLanguage: 'Portuguese',
    },
    subOrganization: UNIDADES.map((u) => ({ '@id': `${SITE}/#${u.id}` })),
  };
  const locais = UNIDADES.map((u) => ({
    '@type': 'AccountingService',
    '@id': `${SITE}/#${u.id}`,
    name: `${EMPRESA.nome} (${u.nome.toLowerCase()})`,
    url: `${SITE}/contato/`,
    image: OG_PADRAO,
    telephone: EMPRESA.telefoneSchema,
    email: EMPRESA.email,
    address: endereco(u),
    hasMap: u.mapa,
    areaServed: [
      { '@type': 'Place', name: 'Águas Claras, Brasília/DF' },
      { '@type': 'City', name: 'Brasília' },
      { '@type': 'AdministrativeArea', name: 'Distrito Federal' },
    ],
    parentOrganization: { '@id': `${SITE}/#organizacao` },
    knowsAbout: ['Contabilidade empresarial', 'Planejamento tributário', 'Abertura de empresas', 'Departamento pessoal', 'Recuperação de créditos tributários'],
  }));
  const site = {
    '@type': 'WebSite',
    '@id': `${SITE}/#site`,
    url: `${SITE}/`,
    name: EMPRESA.nome,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${SITE}/#organizacao` },
  };
  return [org, ...locais, site];
}

export const trilhaSchema = (url, trilha) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#trilha`,
  itemListElement: trilha.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.nome, item: SITE + t.url })),
});

export const faqSchema = (url, itens) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  isPartOf: { '@id': `${url}#pagina` },
  mainEntity: itens.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') },
  })),
});

export const servicoSchema = (url, nome, descricao, tipo) => ({
  '@type': 'Service',
  '@id': `${url}#servico`,
  name: nome,
  serviceType: tipo || nome,
  description: descricao,
  url,
  provider: { '@id': `${SITE}/#organizacao` },
  areaServed: [{ '@type': 'City', name: 'Brasília' }, { '@type': 'AdministrativeArea', name: 'Distrito Federal' }],
  availableChannel: { '@type': 'ServiceChannel', servicePhone: { '@type': 'ContactPoint', telephone: EMPRESA.telefoneSchema }, serviceLocation: { '@id': `${SITE}/#matriz` } },
});

// ---------- Blocos de conteúdo ----------
export const trilhaHtml = (trilha) =>
  `<nav class="trilha" aria-label="Você está em"><ol>${trilha
    .map((t, i) => (i === trilha.length - 1 ? `<li><span aria-current="page">${t.nome}</span></li>` : `<li><a href="${t.url}">${t.nome}</a></li>`))
    .join('')}</ol></nav>`;

export function topoPagina({ trilha, kicker, h1, intro = [], ctas = '', ficha, imagem }) {
  const lado = imagem
    ? `<figure class="pagina-foto rv">${imagem}</figure>`
    : ficha
      ? `<aside class="ficha rv" aria-label="Resumo">
        <p class="ficha-tit">Em resumo</p>
        <dl>${ficha.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      </aside>`
      : '';
  return `<section class="pagina-topo">
  ${linha('pagina-linha desenha')}
  <div class="wrap pagina-topo-grade${lado ? '' : ' so-texto'}">
    <div class="pagina-topo-txt">
      ${trilhaHtml(trilha)}
      ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
      <h1>${h1}</h1>
      ${intro.map((p, i) => `<p class="${i === 0 ? 'lede' : ''}">${p}</p>`).join('\n      ')}
      ${ctas ? `<div class="acoes">${ctas}</div>` : ''}
    </div>
    ${lado}
  </div>
</section>`;
}

export function faqHtml(itens, { titulo = 'Perguntas frequentes', lede = '', id = 'perguntas' } = {}) {
  return `<section class="secao faq" id="${id}" aria-labelledby="${id}-tit">
  <div class="wrap faq-grade">
    <div class="faq-cab rv">
      <p class="kicker">Dúvidas</p>
      <h2 id="${id}-tit">${titulo}</h2>
      ${lede ? `<p>${lede}</p>` : ''}
      <p class="faq-mais">Não achou sua pergunta? ${btnWhats('Pergunte no WhatsApp', 'Olá! Vim pelo site e tenho uma dúvida.', 'link-seta')}</p>
    </div>
    <div class="faq-lista">
      ${itens.map(([q, a]) => `<details class="faq-item rv"><summary><h3>${q}</h3><span class="faq-sinal" aria-hidden="true"></span></summary><div class="faq-resp"><p>${a}</p></div></details>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function passosLinha(passos, { titulo, kicker = 'Como funciona', lede = '', id = 'como-funciona', h = 'h2' } = {}) {
  return `<section class="secao passos" id="${id}" aria-labelledby="${id}-tit">
  <div class="wrap">
    <div class="cab-secao rv">
      <p class="kicker">${kicker}</p>
      <${h} id="${id}-tit">${titulo}</${h}>
      ${lede ? `<p class="lede">${lede}</p>` : ''}
    </div>
    <div class="passos-trilho" style="--n:${passos.length}">
      ${linha('passos-linha rola')}
      <ol class="passos-lista">
        ${passos.map(([t, d], i) => `<li class="passo rv" style="--i:${i}"><span class="passo-num">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </div>
</section>`;
}

export function ctaFaixa({ titulo = 'Vamos colocar sua empresa em dia?', texto = 'Fale com um especialista da Contelb. A gente escuta, entende o seu caso e mostra o caminho.', msg, link } = {}) {
  return `<section class="cta-faixa" aria-labelledby="cta-tit">
  ${linha('cta-linha rola')}
  <div class="wrap cta-in rv">
    <h2 id="cta-tit">${titulo}</h2>
    <p>${texto}</p>
    <div class="acoes">${btnWhats('Falar com especialista', msg, 'btn btn-claro')}${btnTel('btn btn-contorno-claro')}${link ? btnLink(link[0], link[1], 'btn btn-contorno-claro') : ''}</div>
  </div>
</section>`;
}

export function relacionados(urls, titulo = 'Serviços relacionados') {
  const lista = SERVICOS.concat([
    { url: '/abrir-empresa-brasilia/', nome: 'Abrir empresa em Brasília', resumo: 'CNAE, regime tributário, registro e acompanhamento até o CNPJ liberado.', icone: 'chave' },
    { url: '/trocar-de-contador/', nome: 'Trocar de contador', resumo: 'A Contelb organiza a transição com o contador anterior para você.', icone: 'retorno' },
  ]).filter((s) => urls.includes(s.url));
  return `<section class="secao relacionados" aria-labelledby="rel-tit">
  <div class="wrap">
    <h2 id="rel-tit" class="rv">${titulo}</h2>
    <ul class="rel-lista">${lista.map((s) => `<li class="rv"><a href="${s.url}">${icone(s.icone)}<span><b>${s.nome}</b><small>${s.resumo}</small></span>${icone('seta', 'ic ic-seta')}</a></li>`).join('')}</ul>
  </div>
</section>`;
}

// Formulário: sem servidor, o envio abre o WhatsApp com a mensagem pronta (e oferece o e-mail).
export function formulario({ id = 'contato-form', titulo = 'Conte o que sua empresa precisa', h = 'h2', interesse = '' } = {}) {
  const opcoes = ['Abrir empresa', 'Trocar de contador', 'Contabilidade completa', 'Obrigações trabalhistas', 'Assessoria empresarial', 'Migrar de MEI para ME', 'Planejamento tributário', 'Recuperação de créditos tributários', 'Outro assunto'];
  return `<form class="form" id="${id}" action="mailto:${EMPRESA.email}" method="post" enctype="text/plain" novalidate data-whats="${EMPRESA.whatsNumero}" data-email="${EMPRESA.email}">
  <${h} class="form-tit">${titulo}</${h}>
  <p class="form-sub">Responda em um minuto. Ao enviar, o WhatsApp abre com a sua mensagem pronta para a equipe da Contelb.</p>
  <div class="campos">
    <div class="campo"><label for="${id}-nome">Nome</label><input id="${id}-nome" name="nome" type="text" autocomplete="name" required placeholder="Seu nome"></div>
    <div class="campo"><label for="${id}-tel">Telefone ou WhatsApp</label><input id="${id}-tel" name="telefone" type="tel" autocomplete="tel" inputmode="tel" required placeholder="(61) 90000-0000"></div>
    <div class="campo"><label for="${id}-email">E-mail</label><input id="${id}-email" name="email" type="email" autocomplete="email" placeholder="voce@empresa.com.br"></div>
    <div class="campo"><label for="${id}-empresa">Empresa <span class="opc">(opcional)</span></label><input id="${id}-empresa" name="empresa" type="text" autocomplete="organization" placeholder="Nome da empresa ou do projeto"></div>
    <div class="campo campo-cheio"><label for="${id}-interesse">Assunto</label><select id="${id}-interesse" name="interesse" required>
      <option value="">Escolha uma opção</option>
      ${opcoes.map((o) => `<option${o === interesse ? ' selected' : ''}>${o}</option>`).join('')}
    </select></div>
    <div class="campo campo-cheio"><label for="${id}-msg">Mensagem <span class="opc">(opcional)</span></label><textarea id="${id}-msg" name="mensagem" rows="4" placeholder="Ex.: tenho um comércio no Simples Nacional e quero revisar meus impostos."></textarea></div>
  </div>
  <p class="form-erro" role="alert" hidden>Preencha nome, telefone e assunto para a gente conseguir responder.</p>
  <div class="form-acoes">
    <button class="btn btn-primario" type="submit">${icone('whatsapp')}<span>Enviar pelo WhatsApp</span></button>
    <a class="link-seta form-email" href="mailto:${EMPRESA.email}">Prefiro enviar por e-mail${icone('seta')}</a>
  </div>
  <p class="form-nota">Usamos seus dados só para responder ao seu contato. Veja a <a href="/politica-de-privacidade/">política de privacidade</a>.</p>
  <div class="form-ok" role="status" hidden>
    <p class="form-ok-tit">${icone('check')}Mensagem pronta no WhatsApp.</p>
    <p>Se o WhatsApp abriu, é só tocar em enviar por lá. Se não abriu, <a class="form-ok-link" href="#">toque aqui</a> ou ligue para <a href="${EMPRESA.telefoneLink}">${EMPRESA.telefone}</a>.</p>
  </div>
</form>`;
}

// ---------- A página inteira ----------
export function pagina({ url, titulo, descricao, corpo, schema = [], tipo = 'WebPage', og = OG_PADRAO, ogTipo = 'website', classe = '', preload = '', noindex = false }) {
  const abs = SITE + url;
  const webpage = {
    '@type': tipo,
    '@id': `${abs}#pagina`,
    url: abs,
    name: titulo,
    description: descricao,
    isPartOf: { '@id': `${SITE}/#site` },
    about: { '@id': `${SITE}/#organizacao` },
    inLanguage: 'pt-BR',
    dateModified: HOJE,
  };
  if (schema.some((s) => s['@type'] === 'BreadcrumbList')) webpage.breadcrumb = { '@id': `${abs}#trilha` };
  const grafo = { '@context': 'https://schema.org', '@graph': [...grafoBase(), webpage, ...schema] };
  const json = JSON.stringify(grafo).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${abs}">\n<meta name="robots" content="index, follow, max-image-preview:large">`}
<meta name="theme-color" content="#193B85">
<meta name="geo.region" content="BR-DF">
<meta name="geo.placename" content="Águas Claras, Brasília">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/sourcesans3.woff2" as="font" type="font/woff2" crossorigin>
${preload}<link rel="stylesheet" href="/assets/css/site.css?v=${VERSAO}">
<meta property="og:type" content="${ogTipo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${EMPRESA.nome}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${abs}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Contelb Contabilidade, contabilidade em Águas Claras e Brasília desde 1976">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(descricao)}">
<meta name="twitter:image" content="${og}">
<script type="application/ld+json">${json}</script>
<script src="/assets/js/site.js?v=${VERSAO}" defer></script>
</head>
<body class="${classe}">
<div class="ambiente" aria-hidden="true"></div>
${cabecalho(url)}
<main id="main" tabindex="-1">
${corpo}
</main>
${rodape()}
</body>
</html>
`;
}
