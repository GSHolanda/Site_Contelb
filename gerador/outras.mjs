// Sobre, hub de serviços, contato, blog, política de privacidade e 404.
import { SITE, HOJE, EMPRESA, UNIDADES, SERVICOS, whats } from './dados.mjs';
import { icone, linha, btnWhats, btnLink, btnTel, topoPagina, faqHtml, ctaFaixa, relacionados, formulario, trilhaSchema, faqSchema, esc } from './layout.mjs';
import { foto } from './home.mjs';

const T = (nome, url) => [{ nome: 'Início', url: '/' }, { nome, url }];

// ---------------------------------------------------------------- Sobre
export function sobre() {
  const url = '/sobre/';
  const trilha = T('Sobre a Contelb', url);
  const corpo = `${topoPagina({
    trilha,
    kicker: 'Sobre a Contelb',
    h1: 'Contelb: contabilidade e consultoria em Brasília desde 1976',
    intro: [
      'A Contelb nasceu em 1976 com uma visão de gestão integrada: contabilidade e consultoria precisam andar juntas. Quase cinco décadas depois, essa ideia continua guiando cada atendimento do escritório.',
      'Hoje a Contelb reúne contadores e especialistas em direito tributário, trabalhista e financeiro em uma estrutura própria de mais de 600 m² em Águas Claras, Brasília/DF.',
    ],
    ctas: btnWhats('Falar com especialista') + btnLink('/servicos/', 'Ver os serviços', 'btn btn-secundario'),
    imagem: foto('sala-diretoria', 'Sala da diretoria da Contelb em Águas Claras, com mesa em vidro preto, quadros e certificados na parede', 600, 450, '', false),
  })}
<section class="secao historia" aria-labelledby="hist-tit">
  <div class="wrap historia-grade">
    <div class="rv">
      <p class="kicker">Nossa forma de trabalhar</p>
      <h2 id="hist-tit">Contabilidade que ajuda a decidir, não só a cumprir prazo</h2>
    </div>
    <div class="historia-txt rv">
      <p>Cumprir prazos é a base. O que a Contelb busca é ir além: entender a empresa por dentro e usar os números para orientar o dono em cada decisão importante, da escolha do regime tributário à contratação do próximo funcionário.</p>
      <p>Por isso contabilidade e consultoria convivem no mesmo escritório. Os especialistas em direito tributário, trabalhista e financeiro trabalham junto com os contadores, e a recuperação de créditos tributários faz parte da rotina, não de um serviço à parte.</p>
      <p>Cada cliente recebe um atendimento sob medida, dentro de uma relação de parceria de longo prazo. Há clientes que estão com a Contelb há mais de uma década.</p>
    </div>
  </div>
</section>
<section class="secao confianca" aria-label="A Contelb em números">
  <div class="wrap">
    <ul class="livro-razao">
      <li class="razao-item rv" style="--i:0"><span class="razao-num">1976</span><span class="razao-rot">ano de fundação</span><span class="razao-desc">Quase cinco décadas acompanhando empresas do DF.</span></li>
      <li class="razao-item rv" style="--i:1"><span class="razao-num">600 m²</span><span class="razao-rot">de estrutura própria</span><span class="razao-desc">O Edifício Contelb, na ADE de Águas Claras.</span></li>
      <li class="razao-item rv" style="--i:2"><span class="razao-num">2</span><span class="razao-rot">endereços</span><span class="razao-desc">Matriz na ADE e filial no DF Plaza Shopping.</span></li>
      <li class="razao-item rv" style="--i:3"><span class="razao-num">3</span><span class="razao-rot">regimes tributários</span><span class="razao-desc">Simples Nacional, Lucro Presumido e Lucro Real.</span></li>
    </ul>
  </div>
</section>
<section class="secao responsavel" aria-labelledby="resp-tit">
  <div class="wrap responsavel-grade">
    <figure class="responsavel-foto rv">
      ${foto('atendimento', 'Sala de atendimento da Contelb, com mesa de vidro preto e cadeiras para clientes', 600, 450)}
      <figcaption>Sala de atendimento da Contelb, em Águas Claras.</figcaption>
    </figure>
    <div class="rv">
      <p class="kicker">Quem está à frente</p>
      <h2 id="resp-tit">${EMPRESA.responsavel}</h2>
      <p>Bacharel em Ciências Contábeis pela Universidade de Brasília (UnB) e pós-graduado em Perícias Contábeis e Auditoria pelo UDF, ${EMPRESA.responsavel} conduz a Contelb com foco em atendimento próximo, atualização técnica constante e segurança nas informações de cada cliente.</p>
      <p><a class="link-seta" href="https://www.linkedin.com/in/udenildo-donney-amaral-340525158/" target="_blank" rel="noopener">Perfil no LinkedIn${icone('seta')}</a></p>
    </div>
  </div>
</section>
<section class="secao pilares escuro" aria-labelledby="pil-tit">
  ${linha('benef-linha rola')}
  <div class="wrap">
    <div class="cab-secao rv">
      <p class="kicker">O que sustenta o trabalho</p>
      <h2 id="pil-tit">Missão e compromissos da Contelb</h2>
      <p class="lede">Oferecer serviços de consultoria e contabilidade com informação atualizada e direcionada para resolver as necessidades de empresas de serviços, comércio e indústria, com compromisso de excelência e satisfação do cliente.</p>
    </div>
    <ul class="pilares-lista">
      <li class="rv" style="--i:0"><h3>Tecnologia</h3><p>Sistemas atualizados e portal do cliente para documentos, guias e relatórios circularem com segurança.</p></li>
      <li class="rv" style="--i:1"><h3>Pessoas atualizadas</h3><p>Equipe em formação constante, acompanhando cada mudança de legislação que afeta a sua empresa.</p></li>
      <li class="rv" style="--i:2"><h3>Segurança</h3><p>Informações tratadas com sigilo e processos conferidos antes de qualquer entrega.</p></li>
      <li class="rv" style="--i:3"><h3>Parceria</h3><p>Relação de longo prazo, com atendimento rápido, seguro e confiável.</p></li>
    </ul>
  </div>
</section>
<section class="secao atende" aria-labelledby="atende-tit">
  <div class="wrap atende-grade">
    <div class="rv">
      <p class="kicker">Especialidades</p>
      <h2 id="atende-tit">O que a Contelb atende</h2>
    </div>
    <ul class="lista-check lista-2 rv">
      ${['Empresas no Simples Nacional, no Lucro Presumido e no Lucro Real', 'Instituições sem fins lucrativos', 'Condomínios', 'Consultoria econômica e financeira', 'Advocacia tributária, trabalhista e financeira com especialistas parceiros', 'Recuperação de créditos tributários', 'Abertura, alteração e regularização de empresas', 'Apoio em licitações e certidões'].map((t) => `<li>${icone('check')}<span>${t}</span></li>`).join('')}
    </ul>
  </div>
</section>
${ctaFaixa({ titulo: 'Venha conhecer a Contelb', texto: 'Marque uma conversa na matriz, na filial ou pelo WhatsApp. A gente explica como pode ajudar a sua empresa.', link: ['/contato/', 'Ver endereços'] })}
${relacionados(['/servicos/contabilidade-completa/', '/planejamento-tributario/', '/abrir-empresa-brasilia/', '/trocar-de-contador/'], 'Por onde começar')}`;
  return {
    url,
    titulo: 'Sobre a Contelb | Contabilidade desde 1976 em Brasília',
    descricao: 'Conheça a Contelb, escritório de contabilidade em Águas Claras com estrutura de mais de 600 m², consultoria tributária, trabalhista e empresarial.',
    corpo,
    tipo: 'AboutPage',
    schema: [trilhaSchema(SITE + url, trilha)],
    prioridade: '0.8',
  };
}

// ---------------------------------------------------------------- Hub de serviços
export function servicosHub() {
  const url = '/servicos/';
  const trilha = T('Serviços', url);
  const extras = [
    { url: '/abrir-empresa-brasilia/', nome: 'Abrir empresa em Brasília', resumo: 'Viabilidade, CNAE, regime tributário, registro e acompanhamento até o CNPJ liberado.', icone: 'chave' },
    { url: '/trocar-de-contador/', nome: 'Trocar de contador', resumo: 'A Contelb organiza a transição com o contador anterior e assume a rotina da sua empresa.', icone: 'retorno' },
  ];
  const cards = SERVICOS.concat(extras);
  const corpo = `${topoPagina({
    trilha,
    kicker: 'Serviços',
    h1: 'Serviços de contabilidade para empresas em Brasília e Águas Claras',
    intro: ['Contabilidade, departamento pessoal, consultoria tributária e assessoria empresarial com a mesma equipe. Escolha por onde começar, ou fale com um especialista para montar o atendimento da sua empresa.'],
    ctas: btnWhats('Falar com especialista'),
  })}
<section class="secao servicos" aria-label="Lista de serviços">
  <div class="wrap">
    <ul class="cartoes">
      ${cards.map((s, i) => `<li class="cartao rv" style="--i:${i % 3}"><a href="${s.url}">
        <span class="cartao-ic">${icone(s.icone)}</span>
        <h2 class="h3">${s.nome}</h2>
        <p>${s.resumo}</p>
        <span class="cartao-mais">Conhecer o serviço${icone('seta')}</span>
      </a></li>`).join('\n      ')}
    </ul>
  </div>
</section>
${ctaFaixa({})}`;
  return {
    url,
    titulo: 'Serviços de Contabilidade em Brasília | Contelb Contabilidade',
    descricao: 'Contabilidade completa, obrigações trabalhistas, assessoria empresarial, planejamento tributário, abertura de empresa e troca de contador em Brasília/DF.',
    corpo,
    tipo: 'CollectionPage',
    schema: [trilhaSchema(SITE + url, trilha)],
    prioridade: '0.9',
  };
}

// ---------------------------------------------------------------- Contato
export function contato() {
  const url = '/contato/';
  const trilha = T('Contato', url);
  const faq = [
    ['Qual é o telefone da Contelb?', `O telefone e o WhatsApp da Contelb são o mesmo número: ${EMPRESA.telefone}.`],
    ['Onde fica a Contelb?', 'A matriz fica no Edifício Contelb, na ADE Conjunto 23, Lote 16, em Águas Claras. A filial fica no DF Plaza Shopping, Rua Copaíba, Lote 1, Sala 2412, Torre B, também em Águas Claras, Brasília/DF.'],
    ['Como acesso a Área do Cliente?', 'Clientes acessam documentos, guias e relatórios pelo portal da Contelb, no botão Área do Cliente no topo do site. Se ainda não tem acesso, peça para a equipe.'],
  ];
  const unid = UNIDADES.map((u) => `<article class="unidade-mapa rv" aria-labelledby="u-${u.id}">
      <div class="unidade-info">
        <p class="unidade-rot">${icone('mapa')}${u.nome}</p>
        <h2 id="u-${u.id}" class="h3">${u.titulo}</h2>
        <address>${EMPRESA.nome}<br>${u.linhas.join('<br>')}</address>
        <a class="btn btn-secundario btn-p" href="${u.mapa}" target="_blank" rel="noopener">${icone('mapa')}<span>Como chegar</span></a>
      </div>
      <div class="mapa-caixa" data-mapa="${esc(u.embed)}" data-titulo="Mapa da ${u.nome.toLowerCase()} da Contelb">
        <button class="mapa-btn" type="button">${icone('mapa')}<span>Carregar mapa da ${u.nome.toLowerCase()}</span></button>
      </div>
    </article>`).join('\n    ');
  const corpo = `${topoPagina({
    trilha,
    kicker: 'Contato',
    h1: 'Fale com a Contelb em Águas Claras, Brasília/DF',
    intro: ['Telefone, WhatsApp, e-mail ou uma visita. Escolha o jeito mais fácil para você, e um especialista da Contelb responde.'],
    ctas: btnWhats('Chamar no WhatsApp') + btnTel(),
  })}
<section class="secao contato-canais" aria-label="Canais de atendimento">
  <div class="wrap contato-grade">
    <ul class="canais rv">
      <li><a href="${EMPRESA.telefoneLink}">${icone('telefone')}<span><small>Telefone</small><b>${EMPRESA.telefone}</b></span></a></li>
      <li><a href="${esc(whats())}" target="_blank" rel="noopener">${icone('whatsapp')}<span><small>WhatsApp</small><b>${EMPRESA.telefone}</b></span></a></li>
      <li><a href="mailto:${EMPRESA.email}">${icone('email')}<span><small>E-mail</small><b>${EMPRESA.email}</b></span></a></li>
      <li><a href="${EMPRESA.portal}" target="_blank" rel="noopener">${icone('chave')}<span><small>Clientes</small><b>Área do Cliente</b></span></a></li>
      <li><span class="canal-fixo">${icone('relogio')}<span><small>Atendimento</small><b>${EMPRESA.horario}</b></span></span></li>
    </ul>
    <div class="rv">${formulario({ id: 'form-contato', titulo: 'Envie sua mensagem' })}</div>
  </div>
</section>
<section class="secao enderecos" aria-label="Endereços da Contelb">
  <div class="wrap enderecos-grade">
    ${unid}
  </div>
</section>
${faqHtml(faq, { titulo: 'Dúvidas sobre o atendimento' })}`;
  return {
    url,
    titulo: 'Contato | Contelb Contabilidade em Águas Claras, Brasília/DF',
    descricao: 'Fale com a Contelb: telefone (61) 3022-9700, WhatsApp, e-mail e endereços da matriz e da filial em Águas Claras, Brasília/DF.',
    corpo,
    tipo: 'ContactPage',
    schema: [trilhaSchema(SITE + url, trilha), faqSchema(SITE + url, faq)],
    prioridade: '0.8',
  };
}

// ---------------------------------------------------------------- Blog
// ---------------------------------------------------------------- Privacidade
export function privacidade() {
  const url = '/politica-de-privacidade/';
  const trilha = T('Política de privacidade', url);
  const corpo = `${topoPagina({ trilha, kicker: 'LGPD', h1: 'Política de privacidade da Contelb', intro: ['Como a Contelb Contabilidade trata os dados que você informa neste site, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).'] })}
<section class="secao artigo-corpo">
  <div class="wrap">
    <div class="prosa rv">
      <h2>Quais dados coletamos</h2>
      <p>Pelo formulário de contato, você pode informar nome, telefone, e-mail, nome da empresa, assunto e mensagem. O site não usa cookies de publicidade.</p>
      <h2>Como o formulário funciona</h2>
      <p>O formulário não guarda seus dados em um servidor. Ao enviar, ele monta uma mensagem e abre o WhatsApp ou o seu aplicativo de e-mail, e você decide se envia. A partir daí, a mensagem é tratada pelos serviços que você escolheu.</p>
      <h2>Para que usamos os dados</h2>
      <p>Usamos as informações apenas para responder ao seu contato e, se você se tornar cliente, para prestar os serviços contratados. Não vendemos nem compartilhamos seus dados com terceiros para fins de publicidade.</p>
      <h2>Seus direitos</h2>
      <p>Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a> ou pelo telefone <a href="${EMPRESA.telefoneLink}">${EMPRESA.telefone}</a>.</p>
      <h2>Mapas e links externos</h2>
      <p>Os mapas da página de contato só carregam quando você toca no botão, e então passam a seguir a política do Google. Links para redes sociais e para a Área do Cliente levam a serviços de terceiros, com políticas próprias.</p>
      <p class="artigo-meta">Atualizada em 29 de setembro de 2026.</p>
    </div>
  </div>
</section>`;
  return {
    url,
    titulo: 'Política de Privacidade | Contelb Contabilidade',
    descricao: 'Saiba como a Contelb Contabilidade trata os dados informados no site, de acordo com a Lei Geral de Proteção de Dados.',
    corpo,
    schema: [trilhaSchema(SITE + url, trilha)],
    prioridade: '0.3',
  };
}

// ---------------------------------------------------------------- 404
export function naoEncontrada() {
  const corpo = `<section class="pagina-topo pagina-404">
  ${linha('pagina-linha desenha')}
  <div class="wrap">
    <p class="kicker">Erro 404</p>
    <h1>Esta página não existe mais, mas a Contelb continua aqui</h1>
    <p class="lede">O endereço pode ter mudado com o novo site. Escolha um caminho abaixo ou fale direto com a equipe.</p>
    <div class="acoes">${btnLink('/', 'Ir para o início', 'btn btn-primario')}${btnWhats('Falar no WhatsApp', undefined, 'btn btn-secundario')}</div>
  </div>
</section>
${relacionados(SERVICOS.map((s) => s.url).concat(['/abrir-empresa-brasilia/', '/trocar-de-contador/']), 'Páginas mais procuradas')}`;
  return {
    url: '/404.html',
    arquivo: '404.html',
    titulo: 'Página não encontrada | Contelb Contabilidade',
    descricao: 'A página que você procurou não foi encontrada. Veja os serviços da Contelb Contabilidade em Águas Claras, Brasília/DF.',
    corpo,
    noindex: true,
  };
}
