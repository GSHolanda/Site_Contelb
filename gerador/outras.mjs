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
      'A Contelb nasceu em 1976 com uma visão de gestão integrada: contabilidade e consultoria precisam andar juntas. Desde então, essa ideia guia cada atendimento do escritório.',
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
      <li class="razao-item rv" style="--i:0"><span class="razao-num">1976</span><span class="razao-rot">ano de fundação</span><span class="razao-desc">Desde 1976 acompanhando empresas do DF.</span></li>
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
      ${['Empresas no Simples Nacional, no Lucro Presumido e no Lucro Real', 'Instituições sem fins lucrativos', 'Condomínios', 'Consultoria econômica e financeira', 'Especialistas em advocacia tributária, trabalhista e financeira', 'Recuperação de créditos tributários', 'Abertura, alteração e regularização de empresas', 'Apoio em licitações e certidões'].map((t) => `<li>${icone('check')}<span>${t}</span></li>`).join('')}
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
        <button class="mapa-btn" type="button" aria-describedby="mapa-aviso-${u.id}">${icone('mapa')}<span>Carregar mapa da ${u.nome.toLowerCase()}</span></button>
        <p class="mapa-aviso" id="mapa-aviso-${u.id}">O mapa é do Google e só carrega se você tocar no botão. A partir daí, o Google pode usar cookies, conforme a política dele.</p>
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
  const m = UNIDADES[0];
  const ident = [EMPRESA.razaoSocial || EMPRESA.nome, EMPRESA.cnpj && `CNPJ ${EMPRESA.cnpj}`].filter(Boolean).join(', ');
  const corpo = `${topoPagina({ trilha, kicker: 'LGPD', h1: 'Política de privacidade da Contelb', intro: ['Como a Contelb Contabilidade trata os dados pessoais de quem visita este site e entra em contato pelos canais dele, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).'] })}
<section class="secao artigo-corpo">
  <div class="wrap">
    <div class="prosa rv">
      <h2>1. Quem é responsável pelos seus dados</h2>
      <p>O controlador dos dados é ${ident}, com sede em ${m.rua}, ${m.bairro}, Brasília/DF, CEP ${m.cep}. Contato: <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a> e <a href="${EMPRESA.telefoneLink}">${EMPRESA.telefone}</a>.</p>
      <h2>2. Quais dados este site trata</h2>
      <ul>
        <li><strong>Dados que você escolhe enviar.</strong> No formulário de contato: nome e assunto (obrigatórios) e, se quiser, telefone, e-mail, nome da empresa e mensagem. Também os dados que você mesmo envia quando fala com a Contelb pelo WhatsApp, por e-mail ou por telefone.</li>
        <li><strong>Dados técnicos de acesso.</strong> Como em qualquer site, o servidor de hospedagem registra automaticamente dados de cada acesso, como endereço IP, data e hora, página visitada e tipo de navegador. Esses registros servem para manter o site seguro e funcionando.</li>
      </ul>
      <p>O site não pede dados sensíveis e não usa ferramentas de análise de audiência, como o Google Analytics, nem pixels de publicidade.</p>
      <h2>3. Como o formulário funciona</h2>
      <p>O formulário não grava o que você digita em nenhum servidor da Contelb. Ao enviar, ele monta a mensagem e abre o WhatsApp ou o seu aplicativo de e-mail, e você decide se a envia. A partir desse momento, a mensagem também passa pelo serviço que você escolheu (WhatsApp, da Meta, ou o seu provedor de e-mail), que tem política de privacidade própria.</p>
      <h2>4. Para que usamos os dados e com qual base legal</h2>
      <ul>
        <li><strong>Responder ao seu contato e preparar uma proposta.</strong> Base legal: procedimentos preliminares relacionados a um contrato, a pedido do titular (art. 7º, V, da LGPD).</li>
        <li><strong>Prestar os serviços contratados</strong>, se você se tornar cliente. Bases legais: execução de contrato e cumprimento de obrigações legais e regulatórias da atividade contábil (art. 7º, V e II).</li>
        <li><strong>Manter os registros de acesso e a segurança do site.</strong> Bases legais: cumprimento de obrigação legal, pelo Marco Civil da Internet (Lei nº 12.965/2014), e legítimo interesse (art. 7º, II e IX).</li>
      </ul>
      <p>Não usamos seus dados para outras finalidades sem avisar você antes, e não vendemos dados pessoais.</p>
      <h2>5. Com quem os dados podem ser compartilhados</h2>
      <ul>
        <li>A empresa que hospeda o site, que guarda os registros técnicos de acesso.</li>
        <li>O WhatsApp (Meta) ou o seu provedor de e-mail, quando você escolhe esses canais para falar com a Contelb.</li>
        <li>O Google, apenas se você carregar um dos mapas da página de contato.</li>
        <li>Autoridades públicas, quando houver obrigação legal ou ordem judicial.</li>
      </ul>
      <p>Alguns desses serviços podem guardar dados em servidores fora do Brasil, de acordo com as políticas deles e com o que a LGPD permite para transferências internacionais.</p>
      <h2>6. Por quanto tempo guardamos</h2>
      <p>Os dados de um contato ficam guardados pelo tempo necessário para responder e acompanhar a conversa. Se você se tornar cliente, os dados ficam guardados pelos prazos exigidos pelas leis contábeis, fiscais e trabalhistas. Os registros de acesso ao site são guardados pelo prazo previsto no Marco Civil da Internet. Depois disso, os dados são apagados ou anonimizados, exceto quando a lei exigir que sejam mantidos.</p>
      <h2>7. Cookies</h2>
      <p>Este site não grava cookies no seu navegador. Os mapas da página de contato são do Google e só carregam se você tocar no botão de carregar o mapa. A partir daí, o Google pode usar cookies, conforme a política dele. Os botões de redes sociais, do WhatsApp e da Área do Cliente são links comuns: só levam você ao serviço quando você clica neles.</p>
      <p>Se um dia o site passar a usar ferramentas de medição ou de publicidade, esta política será atualizada e o site vai pedir a sua autorização antes de ativá-las.</p>
      <h2>8. Segurança</h2>
      <p>O site funciona com conexão criptografada (HTTPS) e não guarda dados digitados nos formulários. Nos atendimentos, a Contelb adota medidas técnicas e administrativas para proteger os dados pessoais contra acesso não autorizado, perda ou uso indevido.</p>
      <h2>9. Seus direitos</h2>
      <p>Pela LGPD (art. 18), você pode pedir à Contelb, a qualquer momento:</p>
      <ul>
        <li>a confirmação de que tratamos dados seus e o acesso a eles;</li>
        <li>a correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados em desacordo com a lei;</li>
        <li>a portabilidade dos dados a outro fornecedor;</li>
        <li>informações sobre com quem compartilhamos seus dados;</li>
        <li>a eliminação de dados tratados com base no seu consentimento, e a revogação desse consentimento;</li>
        <li>a oposição a um tratamento que considere irregular.</li>
      </ul>
      <p>Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</p>
      <h2>10. Canal sobre dados pessoais</h2>
      <p>Para exercer seus direitos ou tirar dúvidas sobre esta política, escreva para <a href="mailto:${EMPRESA.email}?subject=${encodeURIComponent('Dados pessoais')}">${EMPRESA.email}</a> com o assunto "Dados pessoais", ou ligue para <a href="${EMPRESA.telefoneLink}">${EMPRESA.telefone}</a>. Respondemos dentro dos prazos da LGPD.</p>
      <h2>11. Alterações</h2>
      <p>Esta política pode ser atualizada quando o site ou a lei mudarem. A versão em vigor é sempre a publicada nesta página. Veja também os <a href="/termos-de-uso/">termos de uso do site</a>.</p>
      <p class="artigo-meta">Atualizada em 21 de outubro de 2026.</p>
    </div>
  </div>
</section>`;
  return {
    url,
    titulo: 'Política de Privacidade | Contelb Contabilidade',
    descricao: 'Como a Contelb Contabilidade trata os dados pessoais de quem visita o site e entra em contato, de acordo com a Lei Geral de Proteção de Dados.',
    corpo,
    schema: [trilhaSchema(SITE + url, trilha)],
    prioridade: '0.3',
  };
}

// ---------------------------------------------------------------- Termos de uso
export function termos() {
  const url = '/termos-de-uso/';
  const trilha = T('Termos de uso', url);
  const dono = [EMPRESA.razaoSocial || EMPRESA.nome, EMPRESA.cnpj && `CNPJ ${EMPRESA.cnpj}`].filter(Boolean).join(', ');
  const corpo = `${topoPagina({ trilha, kicker: 'Termos', h1: 'Termos de uso do site da Contelb', intro: ['As regras para usar este site. Ao navegar por ele, você concorda com estes termos.'] })}
<section class="secao artigo-corpo">
  <div class="wrap">
    <div class="prosa rv">
      <h2>1. Sobre este site</h2>
      <p>Este é o site institucional de ${dono}, escritório de contabilidade com sede em Águas Claras, Brasília/DF. Ele apresenta os serviços da Contelb, publica conteúdos informativos no blog e oferece canais de contato.</p>
      <h2>2. Conteúdo informativo</h2>
      <p>Os textos do site e do blog têm caráter informativo e refletem as normas em vigor na data de publicação de cada um. A legislação tributária, trabalhista e contábil muda com frequência, e cada empresa tem uma situação própria. Por isso, esses textos não substituem a orientação de um profissional sobre o seu caso. Antes de tomar decisões, fale com um contador.</p>
      <h2>3. Contato não é contratação</h2>
      <p>Enviar uma mensagem pelo site, pelo WhatsApp ou por e-mail não cria uma relação de prestação de serviços. A contratação da Contelb acontece por proposta e contrato próprios, que definem o escopo do trabalho, os honorários, os prazos e as condições de cancelamento. O site não vende produtos nem recebe pagamentos.</p>
      <h2>4. Propriedade intelectual</h2>
      <p>A marca, o logotipo, os textos e o visual deste site pertencem à Contelb ou aos respectivos titulares. Você pode compartilhar os links das páginas e dos posts à vontade. A reprodução do conteúdo em outros lugares depende de autorização prévia.</p>
      <h2>5. Links e serviços de terceiros</h2>
      <p>O site tem links para serviços de outras empresas, como WhatsApp, redes sociais, Google Maps e o portal da Área do Cliente. Esses serviços têm termos e políticas próprios, e a Contelb não responde pelo conteúdo nem pelo funcionamento deles.</p>
      <h2>6. Área do Cliente</h2>
      <p>A Área do Cliente funciona em um portal de terceiros, com acesso por usuário e senha individuais. Guarde sua senha com cuidado e avise a Contelb se suspeitar de qualquer uso indevido.</p>
      <h2>7. Disponibilidade</h2>
      <p>A Contelb se esforça para manter o site no ar e atualizado, mas ele pode ficar fora do ar por manutenção ou por falhas técnicas, e algumas informações podem ficar desatualizadas até a próxima revisão.</p>
      <h2>8. Privacidade</h2>
      <p>O tratamento de dados pessoais está descrito na <a href="/politica-de-privacidade/">política de privacidade</a>.</p>
      <h2>9. Lei aplicável e foro</h2>
      <p>Estes termos seguem as leis brasileiras. Fica eleito o foro de Brasília/DF, sem prejuízo do direito do consumidor de propor ações no foro do seu domicílio.</p>
      <p class="artigo-meta">Atualizados em 21 de outubro de 2026.</p>
    </div>
  </div>
</section>`;
  return {
    url,
    titulo: 'Termos de Uso | Contelb Contabilidade',
    descricao: 'Regras de uso do site da Contelb Contabilidade: conteúdo informativo, contato e contratação, propriedade intelectual, links de terceiros e foro.',
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
