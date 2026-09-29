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
export const ARTIGOS = [
  {
    slug: 'quanto-tempo-leva-para-abrir-empresa-no-df',
    categoria: 'Abertura de empresa',
    titulo: 'Quanto tempo leva para abrir uma empresa no DF?',
    seo: 'Quanto Tempo Leva para Abrir Empresa no DF | Blog Contelb',
    descricao: 'Entenda as etapas para abrir empresa em Brasília, o que faz o prazo variar e como evitar atrasos na viabilidade, no registro e nas licenças.',
    resumo: 'As etapas da abertura, o que faz o prazo variar e como evitar atrasos.',
    servico: ['/abrir-empresa-brasilia/', 'Abrir empresa em Brasília com a Contelb'],
    corpo: `<p>Essa é a primeira pergunta de quase todo mundo que decide abrir um negócio. A resposta honesta é: depende. Mas dá para saber exatamente do que depende, e isso ajuda muito a planejar.</p>
<h2>As etapas da abertura</h2>
<p>No Distrito Federal, a abertura de uma empresa costuma seguir esta ordem:</p>
<ol>
<li><strong>Consulta de viabilidade.</strong> Confere se a atividade pode funcionar no endereço escolhido, de acordo com as regras de uso do local.</li>
<li><strong>Definição da estrutura.</strong> Atividades (CNAEs), tipo de empresa, capital social e regime tributário.</li>
<li><strong>Registro.</strong> Registro na Junta Comercial, emissão do CNPJ na Receita Federal e inscrição distrital, quando a atividade exige.</li>
<li><strong>Licenças.</strong> Alvará e licenças específicas, conforme o risco da atividade.</li>
</ol>
<h2>O que faz o prazo variar</h2>
<ul>
<li><strong>O risco da atividade.</strong> Atividades de baixo risco passam por um processo mais simples. Atividades que envolvem vigilância sanitária, meio ambiente ou bombeiros pedem licenças próprias e levam mais tempo.</li>
<li><strong>O endereço.</strong> Um endereço com restrição de uso trava a viabilidade e obriga a recomeçar.</li>
<li><strong>A documentação.</strong> Dados divergentes entre documentos são a causa mais comum de exigência e retrabalho.</li>
<li><strong>A assinatura digital.</strong> Sem certificado digital ou assinatura aceita, o registro não avança.</li>
</ul>
<h2>Como evitar atrasos</h2>
<p>Três cuidados resolvem a maior parte dos problemas: consultar a viabilidade antes de assinar contrato de aluguel, descrever as atividades com precisão e reunir os documentos de todos os sócios de uma vez. Com a documentação completa, cada órgão analisa o pedido sem exigências.</p>
<p>A Contelb faz a consulta de viabilidade logo no primeiro contato e informa o prazo estimado para o seu caso, antes de você assumir qualquer compromisso.</p>`,
  },
  {
    slug: 'mei-passou-do-limite-o-que-fazer',
    categoria: 'Tributos',
    titulo: 'MEI passou do limite de faturamento: o que fazer agora',
    seo: 'MEI Passou do Limite de Faturamento: O Que Fazer | Blog Contelb',
    descricao: 'Seu MEI faturou acima do limite? Veja a regra dos 20%, quando o desenquadramento vale e como migrar para Microempresa sem imposto retroativo.',
    resumo: 'A regra dos 20%, os prazos do desenquadramento e como migrar para ME.',
    servico: ['/servicos/migrar-mei-para-me/', 'Migrar de MEI para ME com a Contelb'],
    corpo: `<p>Passar do limite de faturamento do MEI é sinal de que o negócio cresceu. O importante é agir rápido, porque o tamanho do excesso muda o que acontece com os seus impostos.</p>
<h2>A regra dos 20%</h2>
<p>O MEI tem um limite anual de faturamento definido em lei. Quando esse limite é ultrapassado, existem dois cenários:</p>
<ul>
<li><strong>Excesso de até 20%.</strong> O MEI paga uma guia complementar sobre o valor que passou do limite e deixa de ser MEI a partir de janeiro do ano seguinte.</li>
<li><strong>Excesso acima de 20%.</strong> O desenquadramento volta para o início do ano, ou para o início da atividade se a empresa foi aberta no mesmo ano. Os impostos passam a ser calculados como Microempresa desde então.</li>
</ul>
<p>Na prática, quanto antes você perceber que vai passar do limite, mais opções tem para se organizar.</p>
<h2>Outros motivos para sair do MEI</h2>
<p>O faturamento não é o único motivo. Você também precisa migrar se quiser ter um sócio, contratar mais de um funcionário, abrir uma filial ou exercer uma atividade que não é permitida ao MEI.</p>
<h2>O que muda quando você vira Microempresa</h2>
<ul>
<li>O CNPJ continua o mesmo.</li>
<li>O imposto deixa de ser um valor fixo e passa a ser calculado sobre o faturamento.</li>
<li>A empresa passa a ter contabilidade completa e novas obrigações acessórias.</li>
<li>Você pode escolher entre Simples Nacional, Lucro Presumido e Lucro Real.</li>
</ul>
<h2>Passo a passo para migrar</h2>
<ol>
<li>Some o faturamento do ano até agora e projete os próximos meses.</li>
<li>Faça a comunicação de desenquadramento no prazo correto para o seu caso.</li>
<li>Escolha o regime tributário com uma simulação dos impostos.</li>
<li>Comece a contabilidade da Microempresa desde o primeiro mês.</li>
</ol>
<p>Os valores de limite e as regras podem mudar. Antes de decidir, confirme a situação atual com um contador.</p>`,
  },
  {
    slug: 'como-trocar-de-contador',
    categoria: 'Gestão',
    titulo: 'Como trocar de contador em cinco passos, sem deixar pendências',
    seo: 'Como Trocar de Contador em 5 Passos | Blog Contelb',
    descricao: 'Pensando em trocar de contador? Veja quando vale a pena, o que pedir ao contador anterior e como fazer a transição sem deixar a empresa descoberta.',
    resumo: 'Quando vale a pena, o que pedir ao contador anterior e como fazer a transição.',
    servico: ['/trocar-de-contador/', 'Trocar de contador com a Contelb'],
    corpo: `<p>Muita gente adia a troca de contador por medo de dar trabalho ou de deixar alguma coisa para trás. Com um roteiro simples, a transição é tranquila e a empresa não fica nenhum mês descoberta.</p>
<h2>Sinais de que chegou a hora</h2>
<ul>
<li>Você recebe as guias em cima do vencimento.</li>
<li>As dúvidas demoram dias para ter resposta.</li>
<li>Ninguém explica os relatórios, ou eles nem chegam.</li>
<li>O imposto parece alto e ninguém sugere revisar o regime.</li>
</ul>
<h2>Os cinco passos</h2>
<ol>
<li><strong>Escolha o novo contador antes de avisar o atual.</strong> Assim você já sabe a data de início e evita um período sem responsável.</li>
<li><strong>Comunique a decisão.</strong> Respeite o aviso previsto no contrato com o escritório atual.</li>
<li><strong>Combine a data de corte.</strong> O contador anterior fecha o período dele, e o novo assume a partir do mês seguinte.</li>
<li><strong>Garanta a entrega dos documentos.</strong> Livros contábeis, balanços, declarações entregues, folha e acessos devem ser repassados com um termo de transferência.</li>
<li><strong>Revise o que foi recebido.</strong> Um diagnóstico inicial mostra pendências e oportunidades, como impostos pagos a mais.</li>
</ol>
<h2>O que pedir ao contador anterior</h2>
<ul>
<li>Livros Diário e Razão e os balanços dos últimos anos.</li>
<li>Declarações e obrigações acessórias entregues.</li>
<li>Documentos da folha de pagamento e dos funcionários.</li>
<li>Relação de parcelamentos e pendências em aberto.</li>
</ul>
<p>Na Contelb, depois que você comunica a decisão, a equipe conversa direto com o contador anterior e cuida de toda a documentação.</p>`,
  },
];

export function blogIndex() {
  const url = '/blog/';
  const trilha = T('Blog', url);
  const cats = [...new Set(ARTIGOS.map((a) => a.categoria))];
  const corpo = `${topoPagina({
    trilha,
    kicker: 'Blog da Contelb',
    h1: 'Blog da Contelb: contabilidade e tributos explicados sem complicação',
    intro: ['Conteúdo para quem abre, administra e faz crescer uma empresa em Brasília. Textos curtos, diretos e revisados por quem trabalha com isso todos os dias.'],
  })}
<section class="secao blog" aria-labelledby="blog-tit">
  <div class="wrap">
    <h2 id="blog-tit" class="rv">Artigos recentes</h2>
    <ul class="blog-cats rv" aria-label="Categorias">${cats.map((c) => `<li>${c}</li>`).join('')}</ul>
    <ul class="blog-lista">
      ${ARTIGOS.map((a, i) => `<li class="post rv" style="--i:${i}"><a href="/blog/${a.slug}/">
        <span class="post-cat">${a.categoria}</span>
        <h3>${a.titulo}</h3>
        <p>${a.resumo}</p>
        <span class="cartao-mais">Ler artigo${icone('seta')}</span>
      </a></li>`).join('\n      ')}
    </ul>
  </div>
</section>
${relacionados(['/abrir-empresa-brasilia/', '/servicos/migrar-mei-para-me/', '/trocar-de-contador/', '/planejamento-tributario/'], 'Serviços da Contelb')}`;
  return {
    url,
    titulo: 'Blog da Contelb | Contabilidade e Tributos para Empresas do DF',
    descricao: 'Artigos sobre abertura de empresa, MEI, impostos, troca de contador e gestão para empresas de Brasília e Águas Claras.',
    corpo,
    tipo: 'CollectionPage',
    schema: [trilhaSchema(SITE + url, trilha)],
    prioridade: '0.6',
  };
}

export function artigo(a) {
  const url = `/blog/${a.slug}/`;
  const abs = SITE + url;
  const trilha = [{ nome: 'Início', url: '/' }, { nome: 'Blog', url: '/blog/' }, { nome: a.titulo, url }];
  const outros = ARTIGOS.filter((o) => o.slug !== a.slug);
  const corpo = `${topoPagina({ trilha, kicker: a.categoria, h1: a.titulo, intro: [a.resumo] })}
<section class="secao artigo-corpo">
  <div class="wrap artigo-grade">
    <article class="prosa rv">
      <p class="artigo-meta">Por Contelb Contabilidade · <time datetime="${HOJE}">29 de setembro de 2026</time></p>
      ${a.corpo}
    </article>
    <aside class="artigo-lado">
      <div class="alerta alerta-cta rv">
        <p class="alerta-tit">Precisa de ajuda com isso?</p>
        <p>Um especialista da Contelb olha o seu caso e explica o próximo passo.</p>
        ${btnLink(a.servico[0], a.servico[1], 'btn btn-primario')}
      </div>
      <nav class="artigo-outros rv" aria-label="Outros artigos">
        <p class="alerta-tit">Leia também</p>
        <ul>${outros.map((o) => `<li><a href="/blog/${o.slug}/">${o.titulo}</a></li>`).join('')}</ul>
      </nav>
    </aside>
  </div>
</section>
${ctaFaixa({ msg: `Olá! Li o artigo "${a.titulo}" no site e tenho uma dúvida.` })}`;
  return {
    url,
    titulo: a.seo,
    descricao: a.descricao,
    corpo,
    ogTipo: 'article',
    schema: [
      trilhaSchema(abs, trilha),
      {
        '@type': 'BlogPosting',
        '@id': `${abs}#artigo`,
        headline: a.titulo,
        description: a.descricao,
        articleSection: a.categoria,
        inLanguage: 'pt-BR',
        datePublished: HOJE,
        dateModified: HOJE,
        mainEntityOfPage: { '@id': `${abs}#pagina` },
        author: { '@id': `${SITE}/#organizacao` },
        publisher: { '@id': `${SITE}/#organizacao` },
        image: `${SITE}/assets/img/og-contelb.jpg`,
      },
    ],
    prioridade: '0.6',
  };
}

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
