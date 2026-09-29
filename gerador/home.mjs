// A página inicial: hero guiado por scroll, depois o site de verdade afunilando para o contato.
import { EMPRESA, UNIDADES, SERVICOS, whats } from './dados.mjs';
import { icone, linha, btnWhats, btnLink, btnTel, faqHtml, passosLinha, formulario, faqSchema, esc } from './layout.mjs';
import { SITE } from './dados.mjs';

const foto = (nome, alt, w, h, cls = '', lazy = true) => `<picture class="${cls}">
  <source type="image/avif" srcset="/assets/img/${nome}.avif">
  <source type="image/webp" srcset="/assets/img/${nome}.webp">
  <img src="/assets/img/${nome}.jpg" width="${w}" height="${h}" alt="${alt}"${lazy ? ' loading="lazy"' : ''} decoding="async">
</picture>`;
export { foto };

export const FAQ_HOME = [
  ['Quanto tempo leva para abrir minha empresa em Brasília?', 'Depende da atividade, do tipo de empresa e dos órgãos envolvidos. Atividades de baixo risco costumam ser liberadas mais rápido, enquanto atividades que pedem licenças específicas levam mais tempo. No primeiro contato a Contelb faz a consulta de viabilidade e informa o prazo estimado para o seu caso, antes de você assumir qualquer compromisso.'],
  ['Quais documentos preciso para abrir uma empresa?', 'Para começar: RG e CPF de cada sócio (pode ser foto ou arquivo digitalizado), comprovante de endereço dos sócios e o código cartográfico ou o IPTU do endereço onde a empresa vai funcionar. Com isso a equipe já consegue consultar a viabilidade e montar o restante com você.'],
  ['Posso registrar a empresa no meu endereço residencial?', 'Em muitos casos, sim, principalmente em atividades que não recebem clientes nem guardam estoque no local. A resposta final vem da consulta de viabilidade, que confere as regras de uso do endereço no DF. A Contelb faz essa consulta antes do registro, para você não ter surpresa depois.'],
  ['Como funciona a troca de contador? Preciso falar com o contador atual?', 'Você comunica a decisão ao seu contador atual, respeitando o aviso do seu contrato. Daí em diante a Contelb assume a conversa: pede os documentos e o termo de transferência, confere o que foi entregue e organiza a transição para a empresa seguir em dia desde o primeiro mês.'],
  ['A Contelb atende empresas de qualquer região do DF?', 'Sim. A Contelb fica em Águas Claras, com matriz na ADE e filial no DF Plaza Shopping, e atende empresas de Brasília e de todo o Distrito Federal. Boa parte da rotina circula pelo portal do cliente, e sempre que você quiser conversar pessoalmente é recebido em um dos dois endereços.'],
  ['Qual é o melhor regime tributário para a minha empresa?', 'Não existe uma resposta única. Simples Nacional, Lucro Presumido e Lucro Real mudam de acordo com a atividade, o faturamento, a folha de pagamento e a margem de lucro. A Contelb simula os cenários com os números da sua empresa e mostra, lado a lado, quanto você pagaria em cada um.'],
];

const MOMENTOS = [
  {
    id: 'abrir',
    aba: 'Quero abrir minha empresa',
    titulo: 'Da ideia ao CNPJ, com o regime certo desde o primeiro dia.',
    passos: [
      ['Viabilidade', 'Conferimos se a atividade pode funcionar no endereço escolhido.'],
      ['Estrutura', 'Definimos CNAEs, tipo de empresa e o regime tributário mais econômico.'],
      ['Registro', 'Cuidamos dos protocolos e acompanhamos até a empresa estar pronta para faturar.'],
    ],
    link: ['/abrir-empresa-brasilia/', 'Ver como abrir empresa'],
  },
  {
    id: 'trocar',
    aba: 'Quero trocar de contador',
    titulo: 'Você decide. A transição com o contador anterior fica com a gente.',
    passos: [
      ['Diagnóstico', 'Entendemos a situação atual da empresa e o que precisa de atenção.'],
      ['Transição', 'Falamos com o contador anterior e recebemos toda a documentação.'],
      ['Rotina em dia', 'A partir do mês combinado, a contabilidade segue com a Contelb.'],
    ],
    link: ['/trocar-de-contador/', 'Ver como trocar de contador'],
  },
  {
    id: 'mei',
    aba: 'Sou MEI e meu negócio cresceu',
    titulo: 'Crescer é bom. A mudança para Microempresa precisa ser no tempo certo.',
    passos: [
      ['Análise', 'Olhamos o faturamento do ano e o motivo da mudança.'],
      ['Desenquadramento', 'Fazemos a comunicação no prazo, para evitar imposto retroativo.'],
      ['Nova rotina', 'Enquadramos a ME no regime mais econômico e começamos a contabilidade.'],
    ],
    link: ['/servicos/migrar-mei-para-me/', 'Ver como migrar de MEI para ME'],
  },
  {
    id: 'organizar',
    aba: 'Já tenho empresa e quero organizar',
    titulo: 'Números claros para pagar o imposto certo e decidir com calma.',
    passos: [
      ['Revisão', 'Conferimos impostos, obrigações e pendências dos últimos períodos.'],
      ['Planejamento', 'Simulamos regimes e ajustes para reduzir impostos dentro da lei.'],
      ['Acompanhamento', 'Relatórios em dia e um contador para explicar cada número.'],
    ],
    link: ['/planejamento-tributario/', 'Ver planejamento tributário'],
  },
];

function hero() {
  const srcset = (ext) => [800, 1280, 1920].map((w) => `/assets/img/escritorio-${w}.${ext} ${w}w`).join(', ');
  return `<section class="hero" id="inicio" aria-labelledby="hero-h1">
  <div class="hero-palco">
    <div class="hero-midia">
      <picture>
        <source type="image/avif" srcset="${srcset('avif')}" sizes="100vw">
        <source type="image/webp" srcset="${srcset('webp')}" sizes="100vw">
        <img src="/assets/img/escritorio-1280.jpg" width="1920" height="1076" alt="Sala de reunião empresarial com mesa de madeira, poltronas e janelas de vidro voltadas para prédios" fetchpriority="high" decoding="async">
      </picture>
    </div>
    <div class="hero-scrim" aria-hidden="true"></div>
    ${linha('hero-linha')}
    <div class="hero-faixas">
      <div class="band band-1" data-a="0" data-b="0.32">
        <p class="chip hero-kicker">Contelb Contabilidade · Águas Claras, Brasília/DF</p>
        <h1 id="hero-h1" class="hero-h1" data-split>Contabilidade em Águas Claras e Brasília para empresas que querem crescer com segurança</h1>
        <p class="hero-sub">Desde 1976, a Contelb une contabilidade, consultoria e planejamento tributário para manter sua empresa regular, econômica e pronta para crescer.</p>
        <div class="acoes hero-acoes">${btnWhats('Falar com especialista')}${btnLink('/abrir-empresa-brasilia/', 'Abrir minha empresa', 'btn btn-contorno-claro')}</div>
      </div>
      <div class="band band-2" data-a="0.34" data-b="0.74">
        <p class="hero-marco" aria-hidden="true">600 m²</p>
        <p class="hero-frase aproxima" data-split>Uma estrutura própria em Águas Claras, com gente que conhece a sua empresa pelo nome.</p>
        <p class="hero-sub">Contabilidade, rotina fiscal, departamento pessoal e consultoria tributária sob o mesmo teto. São mais de 600 m² dedicados aos números de quem faz o DF crescer.</p>
      </div>
      <div class="band band-3" data-a="0.76" data-b="1">
        <p class="hero-frase em-etapas" data-split>Sua empresa em dia. A gente cuida disso de perto.</p>
        <ul class="hero-provas">
          <li class="chip">Desde 1976</li>
          <li class="chip">Mais de 600 m² de estrutura</li>
          <li class="chip">Matriz e filial em Águas Claras</li>
          <li class="chip">Atendimento consultivo</li>
        </ul>
        <div class="acoes hero-acoes-fim">${btnWhats('Falar com especialista')}${btnLink('/servicos/', 'Ver os serviços', 'btn btn-contorno-claro')}</div>
      </div>
    </div>
    <p class="hero-dica chip" aria-hidden="true">Role para conhecer ${icone('chev')}</p>
  </div>
</section>`;
}

function confianca() {
  const itens = [
    ['1976', 'ano de fundação', 'Quase cinco décadas acompanhando empresas do Distrito Federal.'],
    ['600 m²', 'de estrutura própria', 'O Edifício Contelb, na ADE de Águas Claras, é a nossa matriz.'],
    ['2', 'endereços em Águas Claras', 'Matriz na ADE e filial no DF Plaza Shopping, perto de você.'],
    ['4', 'frentes sob o mesmo teto', 'Contábil, fiscal, trabalhista e tributária conversando entre si.'],
  ];
  return `<section class="secao confianca" aria-label="A Contelb em números">
  <div class="wrap">
    <ul class="livro-razao">
      ${itens.map(([n, r, d], i) => `<li class="razao-item rv" style="--i:${i}"><span class="razao-num">${n}</span><span class="razao-rot">${r}</span><span class="razao-desc">${d}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
}

function servicos() {
  return `<section class="secao servicos" id="servicos" aria-labelledby="serv-tit">
  <div class="wrap">
    <div class="cab-secao cab-dupla rv">
      <div>
        <p class="kicker">Serviços</p>
        <h2 id="serv-tit">Tudo o que a contabilidade da sua empresa precisa, em um só escritório</h2>
      </div>
      <p class="lede">Do primeiro registro ao planejamento de impostos, a mesma equipe acompanha a sua empresa. Você não precisa explicar a sua história duas vezes.</p>
    </div>
    <ul class="cartoes">
      ${SERVICOS.map((s, i) => `<li class="cartao rv" style="--i:${i}"><a href="${s.url}">
        <span class="cartao-ic">${icone(s.icone)}</span>
        <h3>${s.nome}</h3>
        <p>${s.resumo}</p>
        <span class="cartao-mais">Conhecer o serviço${icone('seta')}</span>
      </a></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
}

function momento() {
  const abas = MOMENTOS.map((m, i) => `<button class="momento-aba" type="button" role="tab" id="aba-${m.id}" aria-controls="painel-${m.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="momento-bola" aria-hidden="true"></span>${m.aba}</button>`).join('');
  const paineis = MOMENTOS.map((m, i) => `<div class="momento-painel${i === 0 ? ' ativo' : ''}" role="tabpanel" id="painel-${m.id}" aria-labelledby="aba-${m.id}"${i === 0 ? '' : ' hidden'}>
        <p class="momento-titulo">${m.titulo}</p>
        <div class="momento-trilho">
          ${linha('momento-linha')}
          <ol class="momento-passos">${m.passos.map(([t, d], j) => `<li style="--j:${j}"><span class="momento-num">${j + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
        </div>
        <div class="acoes">${btnLink(m.link[0], m.link[1], 'btn btn-primario')}${btnWhats('Conversar sobre o meu caso', `Olá! Vim pelo site. ${m.aba}.`, 'btn btn-secundario')}</div>
      </div>`).join('\n      ');
  return `<section class="secao momento" id="seu-momento" aria-labelledby="momento-tit">
  <div class="wrap">
    <div class="cab-secao rv">
      <p class="kicker">Seu momento</p>
      <h2 id="momento-tit">Conte em que ponto sua empresa está. A gente mostra o caminho.</h2>
    </div>
    <div class="momento-caixa rv">
      <div class="momento-abas" role="tablist" aria-label="Escolha o seu momento">${abas}</div>
      <div class="momento-conteudo">
      ${paineis}
      </div>
    </div>
  </div>
</section>`;
}

function abrirEmpresa() {
  const etapas = [
    ['Consulta de viabilidade', 'Análise junto aos órgãos do local de abertura, para saber se a atividade pode funcionar ali.'],
    ['Consultoria tributária', 'Escolha do regime de tributação mais econômico antes mesmo da fundação.'],
    ['Organização societária', 'Definição do tipo de empresa e da participação de cada sócio.'],
    ['Registro empresarial', 'Registro, certificado digital e licenciamento, com acompanhamento de cada protocolo.'],
    ['Contabilidade mensal', 'Balanço de abertura, rotina fiscal, funcionários, tributos, certidões e apoio em licitações.'],
  ];
  return `<section class="secao abrir escuro" id="abrir-empresa" aria-labelledby="abrir-tit">
  ${linha('abrir-linha rola')}
  <div class="wrap abrir-grade">
    <div class="abrir-txt rv">
      <p class="kicker">Abrir empresa</p>
      <h2 id="abrir-tit">Abrir empresa em Brasília, com cada etapa explicada</h2>
      <p class="lede">Uma empresa bem aberta paga menos imposto por anos. Por isso a Contelb começa pela viabilidade e pelo regime tributário, e só depois parte para o registro.</p>
      <div class="acoes">${btnLink('/abrir-empresa-brasilia/', 'Abrir minha empresa', 'btn btn-claro')}${btnWhats('Tirar uma dúvida', 'Olá! Vim pelo site e quero abrir uma empresa.', 'btn btn-contorno-claro')}</div>
    </div>
    <ol class="etapas">
      ${etapas.map(([t, d], i) => `<li class="etapa rv" style="--i:${i}"><span class="etapa-num">${String(i + 1).padStart(2, '0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('\n      ')}
    </ol>
  </div>
</section>`;
}

function trocar() {
  const passos = [
    ['Comece agora', 'Preencha o cadastro ou chame no WhatsApp. Leva poucos minutos.'],
    ['Buscamos as informações', 'A equipe entra em contato e entende a necessidade da sua empresa.'],
    ['Apoio total', 'Fazemos a transferência contábil direto com o seu contador anterior.'],
    ['Parceria', 'Sua empresa em dia, com contabilidade completa e alguém para responder.'],
  ];
  return `<section class="secao trocar" id="trocar-de-contador" aria-labelledby="trocar-tit">
  <div class="wrap trocar-grade">
    <figure class="trocar-foto rv">
      ${foto('atendimento', 'Sala de atendimento da Contelb em Águas Claras, com mesa de vidro preto e cadeiras para clientes', 600, 450)}
      <figcaption>Atendimento na Contelb, em Águas Claras.</figcaption>
    </figure>
    <div class="trocar-txt">
      <div class="rv">
        <p class="kicker">Trocar de contador</p>
        <h2 id="trocar-tit">Trocar de contador sem dor de cabeça</h2>
        <p class="lede">Resposta que demora, guia que chega no dia do vencimento, imposto que parece alto demais. Se isso já virou rotina, a troca é mais simples do que parece, e a parte chata fica com a gente.</p>
      </div>
      <ol class="checklist">
        ${passos.map(([t, d], i) => `<li class="rv" style="--i:${i}">${icone('check')}<div><h3>${t}</h3><p>${d}</p></div></li>`).join('\n        ')}
      </ol>
      <div class="acoes rv">${btnLink('/trocar-de-contador/', 'Quero trocar de contador', 'btn btn-primario')}</div>
    </div>
  </div>
</section>`;
}

function publico() {
  const tipos = ['Empresas de serviços', 'Comércio', 'Indústria', 'Condomínios', 'Instituições sem fins lucrativos', 'MEI em crescimento', 'Empresas que participam de licitações'];
  const regimes = [['Simples Nacional', 'Para micro e pequenas empresas, com guia única.'], ['Lucro Presumido', 'Imposto calculado sobre uma margem fixada em lei.'], ['Lucro Real', 'Imposto sobre o lucro de fato, obrigatório para alguns negócios.']];
  return `<section class="secao publico" aria-labelledby="publico-tit">
  <div class="wrap publico-grade">
    <div class="rv">
      <p class="kicker">Para quem atendemos</p>
      <h2 id="publico-tit">Do MEI que acabou de crescer à indústria no Lucro Real</h2>
      <p class="lede">Cada negócio tem uma rotina fiscal diferente. A Contelb atende empresas de Brasília e de todo o DF, em todos os regimes de tributação.</p>
    </div>
    <div class="publico-listas">
      <ul class="etiquetas rv" aria-label="Tipos de negócio">${tipos.map((t) => `<li>${t}</li>`).join('')}</ul>
      <ul class="regimes">${regimes.map(([t, d], i) => `<li class="rv" style="--i:${i}"><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
    </div>
  </div>
</section>`;
}

function estrutura() {
  return `<section class="secao estrutura" aria-labelledby="estr-tit">
  <div class="wrap estrutura-grade">
    <div class="estrutura-txt rv">
      <p class="kicker">A Contelb</p>
      <h2 id="estr-tit">Uma casa de contabilidade com endereço próprio em Águas Claras</h2>
      <p>A Contelb nasceu em 1976 com uma ideia que continua valendo: contabilidade e consultoria precisam andar juntas. Quem cuida dos seus números também deve ajudar você a decidir o que fazer com eles.</p>
      <p>À frente do escritório está ${EMPRESA.responsavel}, bacharel em Ciências Contábeis pela Universidade de Brasília (UnB) e pós-graduado em Perícias Contábeis e Auditoria pelo UDF. Ao lado dele, especialistas em direito tributário, trabalhista e financeiro.</p>
      <div class="acoes">${btnLink('/sobre/', 'Conhecer a Contelb', 'btn btn-secundario')}</div>
    </div>
    <figure class="estrutura-foto rv">
      ${foto('sala-diretoria', 'Sala da diretoria da Contelb, com mesa em vidro preto, quadros e certificados na parede', 600, 450)}
      <figcaption>Sala da diretoria, no Edifício Contelb.</figcaption>
    </figure>
  </div>
</section>`;
}

function depoimentos() {
  const itens = [
    ['Bid Vilas Boas', 'BV', 'Cliente desde 2011', 'Destaca a parceria de longa data com a Contelb e a sensação de ter a empresa protegida, com confiança construída ao longo dos anos.'],
    ['Breno Pessoa', 'BP', 'Cliente Contelb', 'Elogia os profissionais qualificados e atenciosos, e conta que o planejamento tributário e a recuperação de tributos fizeram diferença para a empresa.'],
    ['Priscylla Antonelli', 'PA', 'Instituto Acontecer', 'Fala do cuidado da equipe, que resolveu problemas deixados por um atendimento anterior e apoia o Instituto Acontecer no dia a dia.'],
  ];
  const mapa = UNIDADES[0].mapa;
  return `<section class="secao depoimentos" aria-labelledby="dep-tit">
  <div class="wrap">
    <div class="cab-secao cab-dupla rv">
      <div>
        <p class="kicker">Clientes</p>
        <h2 id="dep-tit">O que os clientes destacam na Contelb</h2>
      </div>
      <p class="lede">Resumo das avaliações de clientes. Os textos completos estão no Google. <a class="link-seta" href="${mapa}" target="_blank" rel="noopener">Ver avaliações${icone('seta')}</a></p>
    </div>
    <ul class="deps">
      ${itens.map(([n, ini, rot, t], i) => `<li class="dep rv" style="--i:${i}">
        <p>${t}</p>
        <div class="dep-quem"><span class="dep-ini" aria-hidden="true">${ini}</span><span><b>${n}</b><small>${rot}</small></span></div>
      </li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
}

function local() {
  const cards = UNIDADES.map((u) => `<address class="unidade rv">
      <p class="unidade-rot">${icone('mapa')}${u.nome}</p>
      <h3>${u.titulo}</h3>
      <p>${u.linhas.join('<br>')}</p>
      <a class="link-seta" href="${u.mapa}" target="_blank" rel="noopener">Abrir no mapa${icone('seta')}</a>
    </address>`).join('\n    ');
  return `<section class="secao local" id="enderecos" aria-labelledby="local-tit">
  <div class="wrap local-grade">
    <div class="local-txt rv">
      <p class="kicker">Onde estamos</p>
      <h2 id="local-tit">Dois endereços em Águas Claras, perto da sua empresa</h2>
      <p class="lede">Atendemos empresas de Brasília e de todo o DF. Venha conversar pessoalmente, ou resolva tudo pelo telefone, pelo WhatsApp e pelo portal do cliente.</p>
      <ul class="local-canais">
        <li><a href="${EMPRESA.telefoneLink}">${icone('telefone')}${EMPRESA.telefone}</a></li>
        <li><a href="${esc(whats())}" target="_blank" rel="noopener">${icone('whatsapp')}WhatsApp</a></li>
        <li><a href="mailto:${EMPRESA.email}">${icone('email')}${EMPRESA.email}</a></li>
        <li><span>${icone('relogio')}${EMPRESA.horario}</span></li>
      </ul>
    </div>
    <div class="unidades">
    ${cards}
    </div>
  </div>
</section>`;
}

function contatoFinal() {
  return `<section class="secao final" id="contato" aria-labelledby="final-tit">
  ${linha('final-linha rola')}
  <div class="wrap final-grade">
    <div class="final-txt rv">
      <p class="kicker">Contato</p>
      <h2 id="final-tit">Vamos colocar sua empresa em dia?</h2>
      <p class="lede">Conte o que você precisa. Um especialista da Contelb responde e mostra o caminho, sem compromisso.</p>
      <div class="acoes">${btnTel('btn btn-secundario')}</div>
    </div>
    <div class="final-form rv">${formulario({ id: 'form-home', titulo: 'Fale com um especialista', h: 'h3' })}</div>
  </div>
</section>`;
}

export function home() {
  const corpo = [
    hero(),
    confianca(),
    servicos(),
    momento(),
    passosLinha(
      [
        ['Diagnóstico', 'Entendemos a atividade, o regime tributário e a situação atual da empresa, sem pressa e sem jargão.'],
        ['Organização', 'Arrumamos pendências, definimos o calendário de documentos e os acessos ao portal do cliente.'],
        ['Execução', 'Escrituração, impostos, folha e obrigações entregues dentro do prazo, todo mês.'],
        ['Acompanhamento', 'Relatórios claros e conversa com o contador para revisar números e planejar os próximos passos.'],
      ],
      { titulo: 'Como a Contelb trabalha', kicker: 'Método', lede: 'Quatro etapas, sempre na mesma ordem. É assim que a sua empresa fica em dia e continua em dia.', id: 'como-trabalhamos' }
    ),
    abrirEmpresa(),
    trocar(),
    publico(),
    estrutura(),
    depoimentos(),
    faqHtml(FAQ_HOME, { titulo: 'Perguntas frequentes sobre contabilidade e abertura de empresa', lede: 'As dúvidas que mais ouvimos de quem está abrindo, trocando de contador ou organizando a empresa.' }),
    local(),
    contatoFinal(),
  ].join('\n');
  const preload = `<link rel="preload" as="image" type="image/avif" imagesrcset="${[800, 1280, 1920].map((w) => `/assets/img/escritorio-${w}.avif ${w}w`).join(', ')}" imagesizes="100vw" fetchpriority="high">\n`;
  return {
    url: '/',
    titulo: 'Contabilidade em Águas Claras e Brasília | Contelb Contabilidade',
    descricao: 'Contabilidade, consultoria tributária e assessoria empresarial em Águas Claras, Brasília/DF. Desde 1976, a Contelb ajuda empresas a crescer com segurança.',
    corpo,
    classe: 'pg-home',
    preload,
    schema: [faqSchema(`${SITE}/`, FAQ_HOME)],
    prioridade: '1.0',
  };
}
