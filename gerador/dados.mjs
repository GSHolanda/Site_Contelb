// Dados fixos da Contelb. NAP (nome, endereço e telefone) vive só aqui,
// para ficar idêntico em todas as páginas, no rodapé e nos dados estruturados.

export const SITE = 'https://www.contelb.com.br';
export const HOJE = '2026-09-29';

export const EMPRESA = {
  nome: 'Contelb Contabilidade',
  curto: 'Contelb',
  fundacao: '1976',
  telefone: '(61) 3022-9700',
  telefoneLink: 'tel:+556130229700',
  telefoneSchema: '+55-61-3022-9700',
  whatsNumero: '556130229700',
  email: 'contelb@contelb.com.br',
  portal: 'https://contelbcontabilidade.app.questorpublico.com.br/Authorize/LogOn',
  responsavel: 'Udenildo Donney Amaral',
  horario: 'Segunda a sexta, em horário comercial',
  // Dados legais: preencha com os dados oficiais da Contelb. Enquanto estiverem vazios, não aparecem no site.
  razaoSocial: '',   // ex.: 'Contelb Contabilidade Ltda.'
  cnpj: '',          // ex.: '00.000.000/0001-00'
  crc: '',           // registro da organização contábil no CRC-DF, ex.: 'CRC-DF 0000/O'
  crcResponsavel: '', // registro do responsável técnico, ex.: 'CRC-DF 000000/O'
};

export const REDES = [
  { nome: 'Instagram', url: 'https://www.instagram.com/contelb/', rotulo: '@contelb' },
  { nome: 'Facebook', url: 'https://www.facebook.com/Contelbcontabilidade/', rotulo: 'Contelbcontabilidade' },
  { nome: 'LinkedIn', url: 'https://www.linkedin.com/in/udenildo-donney-amaral-340525158/', rotulo: 'Udenildo Donney Amaral' },
  { nome: 'YouTube', url: 'https://www.youtube.com/channel/UCrUfNcfAsmdOG-13yW-S56w/featured', rotulo: 'Canal da Contelb' },
];

export const UNIDADES = [
  {
    id: 'matriz',
    nome: 'Matriz',
    titulo: 'Edifício Contelb, na ADE',
    linhas: ['ADE Área de Desenvolvimento Econômico', 'Conjunto 23, Lote 16, Edifício Contelb', 'Águas Claras, Brasília/DF', 'CEP 71.990-180'],
    rua: 'ADE Área de Desenvolvimento Econômico, Conjunto 23, Lote 16, Edifício Contelb',
    bairro: 'Águas Claras',
    cep: '71990-180',
    mapa: 'https://maps.app.goo.gl/Tbq9r2HQhCwqeXwcA',
    embed: 'https://www.google.com/maps?q=Edif%C3%ADcio%20Contelb%2C%20ADE%20Conjunto%2023%20Lote%2016%2C%20%C3%81guas%20Claras%2C%20Bras%C3%ADlia%20DF%2071990-180&output=embed',
  },
  {
    id: 'filial',
    nome: 'Filial',
    titulo: 'DF Plaza Shopping, Torre B',
    linhas: ['Rua Copaíba, Lote 1, Sala 2412, Torre B', 'DF Plaza Shopping', 'Águas Claras, Brasília/DF', 'CEP 71.919-540'],
    rua: 'Rua Copaíba, Lote 1, Sala 2412, Torre B, DF Plaza Shopping',
    bairro: 'Águas Claras',
    cep: '71919-540',
    mapa: 'https://maps.app.goo.gl/cHa6VTZWggjLaxiw6',
    embed: 'https://www.google.com/maps?q=DF%20Plaza%20Shopping%2C%20Rua%20Copa%C3%ADba%20Lote%201%2C%20%C3%81guas%20Claras%2C%20Bras%C3%ADlia%20DF%2071919-540&output=embed',
  },
];

// Mensagem padrão do WhatsApp, a mesma do site anterior.
export const whats = (texto = 'Estou entrando em contato pelo site!') =>
  `https://wa.me/${EMPRESA.whatsNumero}?text=${encodeURIComponent(texto)}`;

export const SERVICOS = [
  { url: '/servicos/contabilidade-completa/', nome: 'Contabilidade completa', resumo: 'Balanço, DRE, impostos, folha e fluxo de caixa em dia, com relatórios que você entende.', icone: 'livro' },
  { url: '/servicos/obrigacoes-trabalhistas/', nome: 'Obrigações trabalhistas', resumo: 'Registro, folha, férias, 13º, rescisões, FGTS e INSS calculados e entregues no prazo.', icone: 'pessoas' },
  { url: '/servicos/assessoria-empresarial/', nome: 'Assessoria empresarial', resumo: 'Planejamento, gestão financeira e apoio fiscal para decidir com números na mão.', icone: 'bussola' },
  { url: '/servicos/migrar-mei-para-me/', nome: 'Migrar de MEI para ME', resumo: 'Seu negócio cresceu. A gente faz a mudança para Microempresa no prazo certo e com o imposto planejado.', icone: 'degrau' },
  { url: '/planejamento-tributario/', nome: 'Planejamento tributário', resumo: 'Simulação entre Simples, Presumido e Real para pagar só o imposto que a lei exige.', icone: 'balanca' },
  { url: '/recuperacao-de-creditos-tributarios/', nome: 'Recuperação de créditos', resumo: 'Revisão dos últimos cinco anos para recuperar impostos pagos a mais.', icone: 'retorno' },
];

export const NAV = [
  { url: '/servicos/', nome: 'Serviços', sub: SERVICOS },
  { url: '/abrir-empresa-brasilia/', nome: 'Abrir empresa' },
  { url: '/trocar-de-contador/', nome: 'Trocar de contador' },
  { url: '/sobre/', nome: 'Sobre' },
  { url: '/blog/', nome: 'Blog' },
  { url: '/contato/', nome: 'Contato' },
];
