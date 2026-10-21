// Páginas de serviço. Cada uma com title e description próprios, H1 com local,
// dor do cliente, entregas, benefícios, como funciona, documentos, diferenciais, FAQ e CTA.
import { SITE } from './dados.mjs';
import { icone, linha, btnWhats, btnLink, topoPagina, faqHtml, passosLinha, ctaFaixa, relacionados, trilhaSchema, faqSchema, servicoSchema } from './layout.mjs';

const DIFERENCIAIS_PADRAO = [
  ['Desde 1976 no DF', 'Atendendo empresas de Brasília desde 1976, com a experiência de quem já acompanhou muitas mudanças de regra.'],
  ['Equipe que conhece você', 'Você fala com pessoas que acompanham a sua empresa de perto, não com um atendimento genérico.'],
  ['Tudo no mesmo escritório', 'Contábil, fiscal, trabalhista e tributário conversando entre si, sem informação perdida no caminho.'],
];

export const PAGINAS_SERVICO = [
  // ------------------------------------------------------------------
  {
    url: '/servicos/contabilidade-completa/',
    sobre: 'contabilidade completa',
    nome: 'Contabilidade completa',
    titulo: 'Contabilidade Completa para Empresas em Brasília | Contelb',
    descricao: 'Relatórios contábeis, impostos, folha, fluxo de caixa e planejamento tributário para empresas em Brasília e Águas Claras.',
    h1: 'Contabilidade completa para empresas em Brasília e Águas Claras',
    kicker: 'Serviço · Contabilidade',
    tipo: 'Serviço de contabilidade empresarial',
    msg: 'Olá! Vim pelo site e quero falar sobre contabilidade completa para a minha empresa.',
    intro: [
      'Guia vencendo, nota fiscal perdida, balanço que ninguém explica. Quando a contabilidade vira só uma pilha de papel, o dono da empresa perde tempo e corre risco de multa.',
      'Na Contelb, a contabilidade da sua empresa fica com uma equipe dedicada, com prazos acompanhados de perto e relatórios que você entende. Você recebe os números em dia e alguém para explicar o que eles dizem.',
    ],
    ficha: [['Regimes', 'Simples Nacional, Lucro Presumido e Lucro Real'], ['Rotina', 'Mensal, com calendário de prazos'], ['Atendimento', 'Equipe dedicada em Águas Claras']],
    entregasTitulo: 'O que está incluído na contabilidade completa',
    entregas: [
      ['Escrituração contábil e fiscal', 'Registro dos fatos contábeis e fiscais do mês, dentro das normas e dos prazos.'],
      ['Balanço patrimonial e DRE', 'Relatórios que mostram a saúde da empresa e servem para banco, licitação e sócios.'],
      ['Apuração e guias de impostos', 'Cálculo dos tributos devidos e envio das guias antes do vencimento.'],
      ['Folha de pagamento e encargos', 'Salários, pró-labore, férias, 13º e encargos calculados e conferidos.'],
      ['Controle de fluxo de caixa', 'Apoio para acompanhar entradas e saídas e enxergar o caixa dos próximos meses.'],
      ['Planejamento tributário', 'Revisão do regime e das operações para pagar só o imposto que a lei exige.'],
      ['Obrigações acessórias', 'Declarações e arquivos digitais exigidos pelo seu regime, entregues no prazo.'],
      ['Certidões e licitações', 'Acompanhamento da regularidade fiscal, para ter certidões quando precisar.'],
    ],
    beneficiosTitulo: 'O que muda na sua rotina',
    beneficios: [
      ['Menos risco de multa', 'Cada prazo entra no calendário da equipe. Você é avisado antes, não depois.'],
      ['Imposto no tamanho certo', 'Com a contabilidade em dia, fica fácil ver se a empresa está pagando mais do que deveria.'],
      ['Números para decidir', 'Balanço e DRE deixam de ser burocracia e viram base para preço, contratação e investimento.'],
      ['Tempo de volta', 'A parte chata fica com a Contelb. Você cuida do que faz a empresa vender.'],
    ],
    passos: [
      ['Diagnóstico', 'Entendemos a atividade, o regime tributário e a situação atual da empresa.'],
      ['Organização', 'Definimos o calendário de envio de documentos e os acessos ao portal do cliente.'],
      ['Rotina mensal', 'Escrituração, impostos, folha e obrigações entregues dentro do prazo.'],
      ['Acompanhamento', 'Relatórios periódicos e conversa com o contador para revisar números e próximos passos.'],
    ],
    documentosTitulo: 'O que a sua empresa envia todo mês',
    documentos: ['Notas fiscais de entrada e de saída', 'Extratos bancários de todas as contas da empresa', 'Contratos, recibos e comprovantes de despesas', 'Informações de funcionários e pró-labore, quando houver'],
    faq: [
      ['O que está incluído na contabilidade completa?', 'Escrituração contábil e fiscal, apuração de impostos, folha de pagamento, obrigações acessórias, balanço patrimonial, DRE e acompanhamento da regularidade fiscal. O escopo exato é combinado no início, de acordo com o porte e a atividade da empresa.'],
      ['Minha empresa é do Simples Nacional. Preciso de contabilidade completa?', 'Sim. Mesmo no Simples Nacional a empresa tem obrigações fiscais, trabalhistas e contábeis. A contabilidade completa organiza tudo isso e ainda dá base para distribuir lucros aos sócios com segurança, pedir crédito e participar de licitações.'],
      ['Com que frequência recebo relatórios?', 'A periodicidade dos relatórios é combinada com você no começo do trabalho. E sempre que precisar de um número para tomar uma decisão, é só pedir para a equipe.'],
      ['Vocês atendem empresas fora de Águas Claras?', 'Sim. A Contelb atende empresas de Brasília e de todo o Distrito Federal. A rotina de documentos circula pelo portal do cliente, e as reuniões podem acontecer na matriz ou na filial.'],
    ],
    relacionados: ['/planejamento-tributario/', '/servicos/obrigacoes-trabalhistas/', '/trocar-de-contador/'],
  },
  // ------------------------------------------------------------------
  {
    url: '/servicos/obrigacoes-trabalhistas/',
    sobre: 'obrigações trabalhistas',
    nome: 'Obrigações trabalhistas',
    titulo: 'Assessoria Trabalhista em Brasília | Folha e Encargos | Contelb',
    descricao: 'Suporte para registro de funcionários, folha de pagamento, férias, rescisões, FGTS, INSS e conformidade trabalhista.',
    h1: 'Obrigações trabalhistas e folha de pagamento para empresas em Brasília',
    kicker: 'Serviço · Departamento pessoal',
    tipo: 'Assessoria trabalhista e folha de pagamento',
    msg: 'Olá! Vim pelo site e quero falar sobre folha de pagamento e obrigações trabalhistas.',
    intro: [
      'Contratar alguém traz junto uma lista longa: registro, eSocial, folha, férias, 13º, FGTS e INSS. Um prazo perdido vira multa, e um cálculo errado pode virar processo.',
      'A Contelb cuida da rotina do departamento pessoal da sua empresa, do primeiro registro à rescisão, com cálculos conferidos e prazos acompanhados.',
    ],
    ficha: [['Cobre', 'Admissão, folha, férias, 13º e rescisão'], ['Encargos', 'FGTS, INSS e eSocial'], ['Para quem', 'Empresas com um ou muitos funcionários']],
    entregasTitulo: 'O que a Contelb faz pelo seu departamento pessoal',
    entregas: [
      ['Registro de funcionários', 'Admissão, contrato de trabalho e envio das informações ao eSocial.'],
      ['Folha de pagamento mensal', 'Salários, horas extras, adicionais e descontos calculados e conferidos.'],
      ['Férias, 13º e rescisões', 'Cálculo das verbas, prazos de pagamento e documentos de cada evento.'],
      ['FGTS e INSS', 'Guias de encargos sociais emitidas e conferidas todo mês.'],
      ['Pró-labore dos sócios', 'Definição e cálculo da retirada dos sócios com os encargos corretos.'],
      ['Saúde e segurança do trabalho', 'Orientação sobre as normas e os exames que se aplicam à sua atividade.'],
      ['Prevenção de riscos', 'Revisão das rotinas para reduzir multas, autuações e ações trabalhistas.'],
    ],
    beneficiosTitulo: 'Por que terceirizar o departamento pessoal com a Contelb',
    beneficios: [
      ['Prazos do eSocial em dia', 'Os envios seguem o calendário oficial, sem correria no último dia.'],
      ['Cálculos conferidos', 'Cada folha passa por conferência antes de chegar até você.'],
      ['Menos risco de ação trabalhista', 'Rotinas corretas desde a admissão são a melhor defesa da empresa.'],
      ['Um contato para dúvidas de RH', 'Contratar, afastar, demitir: você pergunta antes de agir.'],
    ],
    passos: [
      ['Levantamento', 'Conhecemos os funcionários, os contratos e a convenção coletiva da categoria.'],
      ['Organização', 'Combinamos o calendário da folha e o envio de ponto e variáveis do mês.'],
      ['Processamento', 'Folha, guias e eventos do eSocial preparados e conferidos.'],
      ['Acompanhamento', 'Férias, 13º, afastamentos e rescisões tratados com antecedência.'],
    ],
    documentosTitulo: 'Documentos para admitir um funcionário',
    documentos: ['Documento de identidade e CPF', 'Carteira de Trabalho Digital', 'Comprovante de residência', 'Dados bancários para o pagamento do salário', 'Atestado de saúde ocupacional (exame admissional)'],
    faq: [
      ['A Contelb cuida do eSocial da minha empresa?', 'Sim. Admissões, folha, férias, afastamentos e desligamentos são enviados ao eSocial pela equipe, dentro dos prazos.'],
      ['Como funciona uma rescisão com a Contelb?', 'Você avisa a equipe, conferimos o tipo de desligamento, calculamos as verbas e orientamos sobre os prazos de pagamento e os documentos que o funcionário deve receber.'],
      ['A convenção coletiva interfere na folha?', 'Sim. Piso salarial, reajustes, benefícios e algumas regras de jornada vêm da convenção coletiva da categoria. Por isso ela faz parte do levantamento inicial.'],
      ['Minha empresa tem só um funcionário. Vale a pena?', 'Vale. As obrigações de uma empresa com um funcionário são praticamente as mesmas de uma empresa maior, e o risco de errar é igual.'],
    ],
    relacionados: ['/servicos/contabilidade-completa/', '/servicos/assessoria-empresarial/', '/servicos/migrar-mei-para-me/'],
  },
  // ------------------------------------------------------------------
  {
    url: '/servicos/assessoria-empresarial/',
    sobre: 'assessoria empresarial',
    nome: 'Assessoria empresarial',
    titulo: 'Assessoria Empresarial em Brasília | Gestão, Fiscal e Contábil',
    descricao: 'Assessoria empresarial para melhorar gestão, reduzir riscos tributários e apoiar decisões financeiras com acompanhamento contábil especializado.',
    h1: 'Assessoria empresarial em Brasília para decidir com números na mão',
    kicker: 'Serviço · Gestão',
    tipo: 'Assessoria empresarial e consultoria financeira',
    msg: 'Olá! Vim pelo site e quero falar sobre assessoria empresarial.',
    intro: [
      'Muita empresa cresce no improviso: preço definido no olho, caixa misturado com a conta pessoal, decisão importante tomada sem saber o impacto no imposto.',
      'A assessoria empresarial da Contelb junta contabilidade, consultoria fiscal e gestão financeira para você enxergar o negócio com clareza e planejar os próximos passos.',
    ],
    ficha: [['Foco', 'Gestão, finanças e riscos fiscais'], ['Formato', 'Plano de ação e reuniões periódicas'], ['Base', 'Os números reais da sua empresa']],
    entregasTitulo: 'O que a assessoria empresarial cobre',
    entregas: [
      ['Planejamento estratégico', 'Metas e prioridades definidas a partir da realidade da empresa.'],
      ['Gestão financeira', 'Fluxo de caixa, análise de custos e margens, e separação entre empresa e sócios.'],
      ['Consultoria contábil e fiscal', 'Orientação antes das decisões que mexem com impostos e com o balanço.'],
      ['Consultoria econômica', 'Análise de cenários, investimentos e viabilidade de novos projetos.'],
      ['Recursos humanos', 'Apoio em contratações, políticas internas e conformidade trabalhista.'],
      ['Tecnologia na gestão', 'Apoio na escolha e na implantação de sistemas de gestão e de emissão de notas.'],
    ],
    beneficiosTitulo: 'O que a sua empresa ganha',
    beneficios: [
      ['Clareza sobre o caixa', 'Você sabe quanto entra, quanto sai e quanto sobra, mês a mês.'],
      ['Menos risco fiscal', 'Decisões avaliadas antes, e não corrigidas depois de uma autuação.'],
      ['Preço com base em custo', 'Margens calculadas com os números reais, não com estimativas.'],
      ['Um parceiro para pensar junto', 'Alguém que conhece a empresa por dentro para discutir os próximos passos.'],
    ],
    passos: [
      ['Diagnóstico da gestão', 'Levantamos números, processos e os principais pontos de atenção.'],
      ['Plano de ação', 'Definimos prioridades, metas e o que muda primeiro.'],
      ['Implantação', 'Colocamos controles, relatórios e rotinas para funcionar.'],
      ['Reuniões de acompanhamento', 'Revisamos resultados e ajustamos o plano com você.'],
    ],
    faq: [
      ['Assessoria empresarial serve para empresa pequena?', 'Serve, e muitas vezes é onde ela faz mais diferença. Organizar o caixa e o preço cedo evita que o crescimento venha acompanhado de dívida.'],
      ['Preciso ser cliente de contabilidade da Contelb?', 'A assessoria funciona melhor junto com a contabilidade, porque os números já chegam organizados. Converse com a equipe para avaliar o seu caso.'],
      ['Como são as reuniões de acompanhamento?', 'A frequência é definida no plano de ação, de acordo com o momento da empresa. As reuniões podem acontecer na matriz, na filial ou à distância.'],
    ],
    relacionados: ['/planejamento-tributario/', '/servicos/contabilidade-completa/', '/recuperacao-de-creditos-tributarios/'],
  },
  // ------------------------------------------------------------------
  {
    url: '/servicos/migrar-mei-para-me/',
    sobre: 'migração de MEI para ME',
    nome: 'Migrar de MEI para ME',
    titulo: 'Migrar de MEI para ME em Brasília | Contelb Contabilidade',
    descricao: 'Faturou acima do limite do MEI ou precisa crescer? A Contelb orienta sua migração para ME com regularização, regime tributário e contabilidade completa.',
    h1: 'Migrar de MEI para ME em Brasília com o imposto planejado',
    kicker: 'Serviço · MEI em crescimento',
    tipo: 'Migração de MEI para Microempresa',
    msg: 'Olá! Vim pelo site. Sou MEI e quero migrar para Microempresa.',
    intro: [
      'O negócio cresceu. O faturamento passou do limite do MEI, ou você precisa contratar mais gente, ter um sócio ou exercer uma atividade que o MEI não permite. Chegou a hora de virar Microempresa.',
      'A migração tem prazos e regras. Feita com calma e com um contador ao lado, ela evita cobrança retroativa de impostos e já coloca a nova empresa no regime tributário mais econômico.',
    ],
    ficha: [['CNPJ', 'Continua o mesmo'], ['Muda', 'Enquadramento, impostos e obrigações'], ['Atenção', 'Prazo de comunicação do desenquadramento']],
    extra: {
      titulo: 'Sinais de que chegou a hora de sair do MEI',
      itens: ['O faturamento do ano passou ou vai passar do limite do MEI', 'Você precisa de mais de um funcionário', 'Quer ter um sócio no negócio', 'Vai exercer uma atividade que o MEI não permite', 'Quer abrir uma filial'],
      alerta: ['Atenção ao tamanho do excesso', 'Se o faturamento passou do limite anual em até 20%, o desenquadramento vale a partir de janeiro do ano seguinte, com o pagamento de uma guia complementar sobre o excesso. Acima de 20%, os efeitos voltam para o início do ano, e os impostos passam a ser calculados como Microempresa desde janeiro. Por isso vale falar com o contador assim que perceber que vai passar do limite.'],
    },
    entregasTitulo: 'O que a Contelb faz na sua migração',
    entregas: [
      ['Desenquadramento do MEI', 'Comunicação no prazo certo, de acordo com o motivo da saída.'],
      ['Regularização da ME', 'Ajuste do registro, das inscrições e do enquadramento da nova empresa.'],
      ['Escolha do regime tributário', 'Comparação entre Simples Nacional, Lucro Presumido e Lucro Real.'],
      ['Contabilidade completa', 'Escrituração, impostos e obrigações desde o primeiro mês como ME.'],
      ['Notas fiscais', 'Orientação sobre emissão e sobre as novas obrigações acessórias.'],
      ['Contratação de funcionários', 'Registro, folha e encargos para quem vai ampliar a equipe.'],
    ],
    beneficiosTitulo: 'Por que migrar com acompanhamento',
    beneficios: [
      ['Sem imposto retroativo por descuido', 'O prazo da comunicação é acompanhado pela equipe.'],
      ['Regime escolhido com números', 'Você vê a simulação antes de decidir, não depois da primeira guia.'],
      ['Empresa pronta para crescer', 'Com sócio, funcionários e notas em ordem desde o começo.'],
    ],
    passos: [
      ['Análise', 'Olhamos o faturamento do ano, a atividade e o motivo da mudança.'],
      ['Desenquadramento', 'Fazemos a comunicação no prazo, evitando cobranças retroativas.'],
      ['Novo enquadramento', 'Registramos a Microempresa no regime tributário mais econômico.'],
      ['Contabilidade mensal', 'Impostos, folha e obrigações passam a ser cuidados pela Contelb.'],
    ],
    documentosTitulo: 'O que separar para a migração',
    documentos: ['Certificado da Condição de Microempreendedor Individual (CCMEI)', 'RG e CPF do titular', 'Comprovante de endereço e IPTU ou código cartográfico do local', 'Relação do faturamento do ano', 'Notas fiscais emitidas no período'],
    faq: [
      ['Perco meu CNPJ ao sair do MEI?', 'Não. O CNPJ continua o mesmo. Mudam o enquadramento, a forma de calcular os impostos e as obrigações da empresa.'],
      ['Vou pagar mais imposto como Microempresa?', 'O imposto deixa de ser um valor fixo por mês e passa a ser calculado sobre o faturamento. Dependendo da atividade e do faturamento, a empresa pode ficar no Simples Nacional com alíquotas iniciais baixas. A Contelb simula os cenários antes da mudança.'],
      ['Quando devo comunicar o desenquadramento?', 'Assim que você souber que vai precisar sair do MEI. O prazo depende do motivo, e perder esse prazo pode gerar multa e impostos retroativos.'],
      ['Posso continuar emitindo notas durante a migração?', 'Sim, com orientação. A equipe indica como emitir as notas no período de transição para que tudo fique correto no novo enquadramento.'],
    ],
    relacionados: ['/servicos/contabilidade-completa/', '/planejamento-tributario/', '/servicos/obrigacoes-trabalhistas/'],
  },
  // ------------------------------------------------------------------
  {
    url: '/abrir-empresa-brasilia/',
    sobre: 'abertura de empresa em Brasília',
    nome: 'Abrir empresa em Brasília',
    titulo: 'Abrir Empresa em Brasília | Abertura de CNPJ com a Contelb',
    descricao: 'Abra sua empresa em Brasília com apoio contábil completo: CNAE, regime tributário, certificado digital, registro e acompanhamento até a liberação.',
    h1: 'Abrir empresa em Brasília com apoio do começo ao CNPJ liberado',
    kicker: 'Abertura de empresa',
    tipo: 'Abertura de empresa e registro de CNPJ',
    msg: 'Olá! Vim pelo site e quero abrir minha empresa.',
    intro: [
      'Abrir empresa no DF passa por consulta de viabilidade, Junta Comercial, Receita Federal, Secretaria de Economia do DF e, dependendo da atividade, licenças. Um passo errado atrasa tudo, e um regime tributário mal escolhido cobra a conta por anos.',
      'A Contelb conduz a abertura com você: define as atividades, o tipo de empresa e o regime mais econômico, cuida dos registros e acompanha cada protocolo até a empresa estar pronta para faturar.',
    ],
    ficha: [['Começa com', 'RG e IPTU ou código cartográfico'], ['Inclui', 'CNAE, regime, registro e certificado digital'], ['Termina com', 'Empresa pronta para faturar']],
    entregasTitulo: 'As cinco etapas da abertura com a Contelb',
    entregas: [
      ['Consulta de viabilidade', 'Análise junto aos órgãos do local de abertura, para saber se a atividade pode funcionar ali.'],
      ['Consultoria tributária', 'Escolha do regime de tributação mais econômico antes da fundação.'],
      ['Organização societária', 'Definição do tipo de empresa: Empresário Individual, Sociedade Limitada Unipessoal ou Sociedade Limitada.'],
      ['Registro empresarial', 'Registro, certificado digital e licenciamento, com acompanhamento de cada protocolo.'],
      ['Contabilidade mensal', 'Balanço de abertura, rotina fiscal, funcionários, tributos, certidões e apoio em licitações.'],
    ],
    beneficiosTitulo: 'O que você evita abrindo com a Contelb',
    beneficios: [
      ['Endereço recusado depois', 'A viabilidade é consultada antes de qualquer registro.'],
      ['CNAE errado', 'Atividade mal descrita trava nota fiscal e pode aumentar o imposto.'],
      ['Regime caro por um ano', 'A escolha do regime vale para o ano inteiro. Ela é feita com simulação.'],
      ['Protocolo parado', 'A equipe acompanha cada órgão e avisa você a cada avanço.'],
    ],
    passosTitulo: 'Como é abrir empresa com a Contelb',
    passos: [
      ['Iniciando o cadastro', 'Você envia o RG (foto ou digitalizado) e o código cartográfico ou o IPTU do endereço da empresa.'],
      ['Conte o que vai fazer', 'Identificamos os CNAEs, o tipo de empresa e o regime tributário mais econômico.'],
      ['Abertura digital', 'Orientamos o certificado digital e-CPF, fazemos o registro e damos suporte em cada etapa.'],
      ['Quase tudo pronto', 'Protocolamos nos órgãos responsáveis e acompanhamos até a conclusão.'],
    ],
    documentosTitulo: 'Documentos para abrir a empresa',
    documentos: ['RG e CPF de cada sócio', 'Comprovante de endereço de cada sócio', 'Código cartográfico ou IPTU do endereço da empresa', 'Descrição das atividades que a empresa vai exercer', 'Capital social e a participação de cada sócio'],
    faq: [
      ['Quanto tempo leva para abrir minha empresa em Brasília?', 'Depende da atividade, do tipo de empresa e dos órgãos envolvidos. Atividades de baixo risco costumam ser liberadas mais rápido, e as que pedem licenças específicas levam mais tempo. A Contelb informa o prazo estimado para o seu caso logo após a consulta de viabilidade.'],
      ['Posso abrir a empresa no meu endereço residencial?', 'Em muitos casos, sim, principalmente em atividades que não recebem clientes nem guardam estoque no local. A consulta de viabilidade confirma as regras do endereço antes do registro.'],
      ['Preciso de certificado digital?', 'Em geral, sim. Os atos de registro são assinados de forma digital, com certificado e-CPF ou com assinatura gov.br quando aceita. Se você ainda não tem, a equipe orienta a emissão.'],
      ['Qual o melhor tipo de empresa para mim?', 'Depende de ter ou não sócios, da atividade e de como você quer proteger o seu patrimônio pessoal. A Sociedade Limitada Unipessoal, por exemplo, permite abrir sozinho com separação entre os bens da empresa e os seus. A equipe explica as opções na consultoria inicial.'],
    ],
    relacionados: ['/servicos/contabilidade-completa/', '/planejamento-tributario/', '/servicos/migrar-mei-para-me/'],
  },
  // ------------------------------------------------------------------
  {
    url: '/trocar-de-contador/',
    sobre: 'troca de contador',
    nome: 'Trocar de contador',
    titulo: 'Trocar de Contador em Brasília | Migre para a Contelb',
    descricao: 'Troque de contador com apoio total da Contelb. Cuidamos da documentação, transição contábil e organização da sua empresa com segurança.',
    h1: 'Trocar de contador em Brasília sem parar a empresa',
    kicker: 'Troca de contador',
    tipo: 'Troca de contador e transição contábil',
    msg: 'Olá! Vim pelo site e quero trocar de contador.',
    intro: [
      'Resposta que demora, guia que chega no dia do vencimento, imposto que parece alto demais. Se isso é rotina, está na hora de trocar de contador. E a troca é mais simples do que parece.',
      'Você não precisa resolver tudo sozinho. A Contelb organiza a transição com o contador anterior, recebe a documentação e revisa o que foi feito, para a sua empresa seguir em dia desde o primeiro mês.',
    ],
    ficha: [['Quando', 'Em qualquer mês do ano'], ['Quem fala com o contador anterior', 'A Contelb'], ['Primeiro passo', 'Um diagnóstico da empresa']],
    extra: {
      titulo: 'O que a Contelb cuida na transição',
      itens: ['Pedido dos documentos e do termo de transferência ao contador anterior', 'Conferência de livros, balanços e declarações já entregues', 'Revisão de impostos pagos e de pendências abertas', 'Procurações eletrônicas e acessos aos órgãos públicos', 'Definição da data de corte entre um escritório e outro'],
    },
    entregasTitulo: 'Seis passos para trocar de contador',
    entregas: [
      ['Comece agora', 'Preencha o cadastro ou chame a equipe no WhatsApp.'],
      ['Apoio total', 'Uma equipe pronta para entender a sua empresa e ajudar em cada etapa.'],
      ['Parceria de sucesso', 'Contabilidade organizada para você focar no negócio.'],
      ['Cadastro e início', 'Você preenche o cadastro on-line e acerta o início do contrato.'],
      ['Documentação', 'Apoio com o e-CNPJ e contato direto com o contador anterior.'],
      ['Bem-vindo', 'Economia de tempo e de dinheiro, com um serviço que responde.'],
    ],
    beneficiosTitulo: 'Por que a troca é tranquila',
    beneficios: [
      ['Sem conversa difícil', 'Depois que você comunica a decisão, a Contelb assume o contato com o contador anterior.'],
      ['Sem mês descoberto', 'A data de corte é combinada para nenhum período ficar sem responsável.'],
      ['Pendências na mesa', 'O que estiver errado aparece no diagnóstico, com um plano para regularizar.'],
    ],
    passos: [
      ['Diagnóstico', 'Entendemos a empresa, o regime e o que foi feito até aqui.'],
      ['Cadastro', 'Você preenche o cadastro e combinamos a data de início.'],
      ['Transição', 'Recebemos a documentação do contador anterior e conferimos cada entrega.'],
      ['Rotina em dia', 'A partir do mês combinado, a contabilidade segue com a Contelb.'],
    ],
    faq: [
      ['Posso trocar de contador no meio do ano?', 'Sim. A troca pode acontecer em qualquer mês. O ideal é combinar uma data de corte, para o contador anterior fechar o período dele e a Contelb assumir a partir do mês seguinte.'],
      ['Preciso avisar o meu contador atual?', 'Sim. Você comunica a decisão respeitando o aviso previsto no seu contrato. A partir daí, a Contelb conversa direto com ele para receber os documentos.'],
      ['E se a contabilidade anterior estiver bagunçada?', 'A primeira etapa é justamente o diagnóstico. As pendências encontradas são apresentadas com um plano para regularizar, em ordem de prioridade.'],
      ['Vou ficar sem atendimento durante a troca?', 'Não. Até a data de corte o contador anterior responde pelo período dele, e a partir dela a Contelb assume. A equipe acompanha as duas pontas para nada ficar para trás.'],
    ],
    relacionados: ['/servicos/contabilidade-completa/', '/planejamento-tributario/', '/recuperacao-de-creditos-tributarios/'],
  },
  // ------------------------------------------------------------------
  {
    url: '/planejamento-tributario/',
    sobre: 'planejamento tributário',
    nome: 'Planejamento tributário',
    titulo: 'Planejamento Tributário em Brasília | Pague o Imposto Certo | Contelb',
    descricao: 'Planejamento tributário para empresas em Brasília e Águas Claras: análise de regime, simulação entre Simples, Presumido e Real e redução legal de impostos.',
    h1: 'Planejamento tributário em Brasília para pagar só o imposto que a lei exige',
    kicker: 'Serviço · Tributos',
    tipo: 'Planejamento tributário empresarial',
    msg: 'Olá! Vim pelo site e quero fazer um planejamento tributário.',
    intro: [
      'Duas empresas com o mesmo faturamento podem pagar impostos muito diferentes. A diferença costuma estar no regime tributário escolhido, no enquadramento das atividades e na forma como as operações são registradas.',
      'O planejamento tributário da Contelb analisa a sua empresa e simula os cenários possíveis dentro da lei, para você escolher o caminho mais econômico com segurança.',
    ],
    ficha: [['Compara', 'Simples Nacional, Lucro Presumido e Lucro Real'], ['Melhor momento', 'Antes da escolha do regime, no início do ano'], ['Base legal', 'Economia dentro da lei']],
    extra: {
      titulo: 'Reforma tributária: o planejamento também olha para frente',
      itens: ['A reforma tributária sobre o consumo começou a fase de transição em 2026, com a criação do IBS e da CBS.', 'Os tributos atuais serão substituídos aos poucos, ao longo dos próximos anos.', 'O planejamento da Contelb acompanha essas mudanças e mostra o impacto delas no seu preço, no seu caixa e na escolha do regime.'],
    },
    entregasTitulo: 'O que o planejamento tributário analisa',
    entregas: [
      ['Comparativo de regimes', 'Simulação lado a lado entre Simples Nacional, Lucro Presumido e Lucro Real.'],
      ['Enquadramento das atividades', 'Revisão dos CNAEs e dos anexos do Simples Nacional em que a empresa se encaixa.'],
      ['Fator R', 'Para prestadores de serviços, a relação entre folha e faturamento pode mudar a alíquota.'],
      ['Remuneração dos sócios', 'Equilíbrio entre pró-labore e distribuição de lucros.'],
      ['Reforma tributária', 'Impacto do IBS e da CBS na operação e nos preços da empresa.'],
      ['Revisão anual', 'Conferência do regime antes de cada novo ano, quando a escolha é feita.'],
    ],
    beneficiosTitulo: 'O que você ganha com o planejamento',
    beneficios: [
      ['Imposto menor, dentro da lei', 'Economia que vem de escolhas corretas, não de riscos.'],
      ['Decisão com números', 'Você vê os cenários com os dados da sua empresa antes de escolher.'],
      ['Previsibilidade', 'Imposto planejado entra no preço e no fluxo de caixa sem surpresa.'],
    ],
    passos: [
      ['Levantamento', 'Reunimos faturamento, folha, despesas e atividades dos últimos meses.'],
      ['Simulação', 'Calculamos o imposto em cada regime e em cada cenário possível.'],
      ['Recomendação', 'Apresentamos o caminho mais econômico, com os riscos explicados.'],
      ['Implantação', 'Fazemos as opções e os ajustes nos prazos certos.'],
    ],
    faq: [
      ['Planejamento tributário é legal?', 'Sim. Planejar é escolher, dentro da lei, a forma menos custosa de a empresa operar. É diferente de sonegar, que é deixar de pagar o que é devido. A Contelb trabalha só com caminhos previstos na legislação.'],
      ['Quando devo fazer o planejamento tributário?', 'A escolha do regime é feita, em regra, no início de cada ano e vale para o ano inteiro. Por isso o melhor momento para planejar é o último trimestre do ano anterior. Empresas novas planejam antes da abertura.'],
      ['Empresa pequena precisa de planejamento tributário?', 'Precisa. No Simples Nacional, detalhes como o anexo da atividade e o Fator R mudam bastante a alíquota. Em empresa pequena, cada ponto percentual faz diferença no caixa.'],
      ['A reforma tributária muda o meu planejamento?', 'Muda aos poucos. A transição começou em 2026 e segue pelos próximos anos. O planejamento passa a considerar o IBS e a CBS junto com os tributos atuais.'],
    ],
    relacionados: ['/recuperacao-de-creditos-tributarios/', '/servicos/contabilidade-completa/', '/servicos/assessoria-empresarial/'],
  },
  // ------------------------------------------------------------------
  {
    url: '/recuperacao-de-creditos-tributarios/',
    sobre: 'recuperação de créditos tributários',
    nome: 'Recuperação de créditos tributários',
    titulo: 'Recuperação de Créditos Tributários em Brasília | Contelb',
    descricao: 'Revisão de impostos pagos a mais nos últimos cinco anos e recuperação de créditos tributários com análise técnica e segurança para empresas do DF.',
    h1: 'Recuperação de créditos tributários: revise o que sua empresa pagou a mais',
    kicker: 'Serviço · Tributos',
    tipo: 'Recuperação de créditos tributários',
    msg: 'Olá! Vim pelo site e quero saber se minha empresa tem créditos tributários a recuperar.',
    intro: [
      'Erro de enquadramento, produto com tributação monofásica cobrado de novo, retenção que nunca foi compensada. Pode acontecer de uma empresa pagar imposto a mais por anos sem perceber.',
      'A Contelb revisa as apurações dos últimos cinco anos, identifica pagamentos indevidos e conduz o pedido de restituição ou compensação pelos caminhos previstos na lei.',
    ],
    ficha: [['Período', 'Até cinco anos para trás'], ['Formas', 'Compensação ou restituição'], ['Apoio', 'Especialistas em direito tributário']],
    entregasTitulo: 'Onde costumam estar os créditos',
    entregas: [
      ['Revisão fiscal de cinco anos', 'Conferência das apurações e dos pagamentos do período permitido pela lei.'],
      ['Produtos monofásicos', 'No Simples Nacional, itens com PIS e Cofins já recolhidos na indústria podem ter sido tributados de novo.'],
      ['Substituição tributária', 'Receitas com ICMS já retido antes que entraram na base de cálculo por engano.'],
      ['Retenções não compensadas', 'INSS, IR, PIS, Cofins e CSLL retidos por clientes e esquecidos pela empresa.'],
      ['Pedidos de compensação e restituição', 'Preparação e acompanhamento dos pedidos junto à Receita Federal.'],
      ['Teses tributárias', 'Quando o caso pede discussão judicial, atuação com especialistas em direito tributário.'],
    ],
    beneficiosTitulo: 'Por que revisar agora',
    beneficios: [
      ['O prazo corre', 'Cada mês que passa, um mês antigo sai do período que ainda pode ser recuperado.'],
      ['Dinheiro de volta ao caixa', 'Créditos compensados reduzem os impostos dos próximos meses.'],
      ['Erro corrigido daqui para frente', 'A revisão também ajusta a apuração, para o pagamento a mais parar.'],
    ],
    passos: [
      ['Autorização e coleta', 'Com a sua autorização, reunimos apurações, notas e guias do período.'],
      ['Análise técnica', 'Cruzamos operações, alíquotas e enquadramentos em busca de pagamentos indevidos.'],
      ['Relatório de oportunidades', 'Mostramos os valores estimados, a base legal e os riscos de cada crédito.'],
      ['Recuperação', 'Fazemos as retificações e os pedidos de compensação ou restituição.'],
    ],
    faq: [
      ['Quanto tempo para trás posso recuperar?', 'Em regra, até cinco anos contados do pagamento indevido. Por isso a revisão deve começar o quanto antes.'],
      ['Existe risco em pedir a recuperação?', 'A Contelb trabalha com créditos que têm base legal clara e documentação que comprove o pagamento a mais. Quando uma tese depende de decisão judicial, os riscos são explicados antes de qualquer decisão.'],
      ['Empresas do Simples Nacional podem recuperar créditos?', 'Sim. Um caso comum é a venda de produtos com tributação monofásica de PIS e Cofins, como alguns itens de autopeças, cosméticos e bebidas, que acabaram tributados de novo dentro do DAS.'],
      ['Como recebo o valor recuperado?', 'Na maior parte dos casos o crédito é usado para compensar impostos futuros. Em outros, é possível pedir a restituição em dinheiro. O caminho é definido no relatório de oportunidades.'],
    ],
    relacionados: ['/planejamento-tributario/', '/servicos/contabilidade-completa/', '/trocar-de-contador/'],
  },
];

// ---------- Montagem de uma página de serviço ----------
export function paginaServico(s) {
  const abs = SITE + s.url;
  const trilha = s.url.startsWith('/servicos/')
    ? [{ nome: 'Início', url: '/' }, { nome: 'Serviços', url: '/servicos/' }, { nome: s.nome, url: s.url }]
    : [{ nome: 'Início', url: '/' }, { nome: s.nome, url: s.url }];

  const entregas = `<section class="secao entregas" aria-labelledby="entregas-tit">
  <div class="wrap">
    <div class="cab-secao rv">
      <p class="kicker">Entregas</p>
      <h2 id="entregas-tit">${s.entregasTitulo}</h2>
    </div>
    <ul class="entregas-grade${s.entregas.length % 4 === 0 ? ' por-4' : ''}">
      ${s.entregas.map(([t, d], i) => `<li class="entrega rv" style="--i:${i % 4}"><span class="entrega-marca" aria-hidden="true">${icone('check')}</span><h3>${t}</h3><p>${d}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

  const extra = s.extra
    ? `<section class="secao destaque" aria-labelledby="extra-tit">
  <div class="wrap destaque-grade">
    <div class="rv">
      <h2 id="extra-tit">${s.extra.titulo}</h2>
      <ul class="lista-traco">${s.extra.itens.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
    ${s.extra.alerta ? `<aside class="alerta rv" aria-label="${s.extra.alerta[0]}"><p class="alerta-tit">${s.extra.alerta[0]}</p><p>${s.extra.alerta[1]}</p></aside>` : `<aside class="alerta alerta-cta rv" aria-label="Fale com a Contelb"><p class="alerta-tit">Quer ajuda com isso?</p><p>Um especialista da Contelb olha o seu caso e explica o próximo passo.</p>${btnWhats('Falar com especialista', s.msg, 'btn btn-primario')}</aside>`}
  </div>
</section>`
    : '';

  const beneficios = `<section class="secao beneficios escuro" aria-labelledby="benef-tit">
  ${linha('benef-linha rola')}
  <div class="wrap benef-grade">
    <div class="rv">
      <p class="kicker">Benefícios</p>
      <h2 id="benef-tit">${s.beneficiosTitulo}</h2>
    </div>
    <ol class="benef-lista">
      ${s.beneficios.map(([t, d], i) => `<li class="rv" style="--i:${i}"><span class="benef-num">${String(i + 1).padStart(2, '0')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('\n      ')}
    </ol>
  </div>
</section>`;

  const docsDif = `<section class="secao docs-dif" aria-label="Documentos e diferenciais">
  <div class="wrap docs-grade${s.documentos ? '' : ' so-dif'}">
    ${s.documentos ? `<div class="docs rv">
      <h2>${s.documentosTitulo}</h2>
      <ul class="lista-check">${s.documentos.map((d) => `<li>${icone('check')}<span>${d}</span></li>`).join('')}</ul>
      <p class="docs-nota">A equipe confirma a lista completa no primeiro contato, de acordo com o seu caso.</p>
    </div>` : ''}
    <div class="dif rv">
      <h2>Por que a Contelb</h2>
      <ul class="dif-lista">${DIFERENCIAIS_PADRAO.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
    </div>
  </div>
</section>`;

  const corpo = [
    topoPagina({
      trilha,
      kicker: s.kicker,
      h1: s.h1,
      intro: s.intro,
      ficha: s.ficha,
      ctas: btnWhats('Falar com especialista', s.msg) + btnLink('#como-funciona', 'Ver como funciona', 'btn btn-secundario'),
    }),
    entregas,
    extra,
    beneficios,
    passosLinha(s.passos, { titulo: s.passosTitulo || `Passo a passo: ${s.sobre} com a Contelb` }),
    docsDif,
    faqHtml(s.faq, { titulo: `Perguntas frequentes sobre ${s.sobre}` }),
    ctaFaixa({ msg: s.msg, titulo: 'Vamos conversar sobre a sua empresa?', link: ['/contato/', 'Outros contatos'] }),
    relacionados(s.relacionados),
  ].join('\n');

  return {
    url: s.url,
    titulo: s.titulo,
    descricao: s.descricao,
    corpo,
    classe: 'pg-servico',
    schema: [trilhaSchema(abs, trilha), servicoSchema(abs, s.nome, s.descricao, s.tipo), faqSchema(abs, s.faq)],
    prioridade: '0.9',
  };
}
