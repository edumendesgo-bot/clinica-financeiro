'use strict';

// ============================================================
// CONFIGURAÇÃO
// ============================================================
const TIPOS_PROFISSIONAL = ['SDR', 'CLOSER', 'ATENDENTE', 'ADMIN'];
const FORMAS_PAGAMENTO = ['PIX', 'Dinheiro', 'Cartão Crédito', 'Cartão Débito', 'Boleto', 'Cheque'];
const CATEGORIAS_SERVICO = ['Toxina Botulínica', 'Preenchimentos', 'Bioestimuladores', 'Harmonização', 'Skincare', 'Tratamento de Pele', 'Tratamento Face', 'Tratamento Pescoço', 'Corporal', 'Consulta Personalizada'];
const CATEGORIAS_DESPESA = ['Aluguel', 'Operacional Clínica', 'Pessoal', 'Marketing', 'Materiais', 'Impostos', 'Software', 'Locação de Aparelhos', 'Outros'];
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

const NAV_MAIN = [
  { id:'dashboard',   label:'Dashboard',           icon:'dashboard' },
  { id:'vendas',      label:'Vendas',               icon:'vendas' },
  { id:'comissoes',   label:'Comissões',             icon:'comissoes' },
  { id:'receitas',    label:'Receitas',              icon:'receitas' },
  { id:'fluxo',       label:'Fluxo de Caixa',        icon:'fluxo' },
  { id:'despesasFixas',    label:'Despesas Fixas',   icon:'despfix' },
  { id:'despesasVariaveis',label:'Despesas Variáveis',icon:'despvar' },
  { id:'relatorios',  label:'Relatórios PDF',        icon:'relatorios' },
];
const NAV_CAD = [
  { id:'profissionais', label:'Profissionais', icon:'profissionais' },
  { id:'servicos',      label:'Serviços',       icon:'servicos' },
];

// ============================================================
// DADOS MOCK
// ============================================================
const MOCK_PROFISSIONAIS = [
  { id:'p1', nome:'Ana Lima',       tipo:'SDR',      comissaoPct:8,  ativo:true },
  { id:'p2', nome:'Carlos Silva',   tipo:'CLOSER',   comissaoPct:12, ativo:true },
  { id:'p3', nome:'Fernanda Costa', tipo:'ATENDENTE',comissaoPct:25, ativo:true },
  { id:'p4', nome:'Juliana Reis',   tipo:'ATENDENTE',comissaoPct:25, ativo:true },
  { id:'p5', nome:'Beatriz Santos', tipo:'ATENDENTE',comissaoPct:22, ativo:true },
];

const MOCK_SERVICOS = [
  { id:'s1',  nome:'Botox Glabela/Frontal',      categoria:'Toxina Botulínica', preco:850,  duracao:40  },
  { id:'s2',  nome:'Botox Full Face',             categoria:'Toxina Botulínica', preco:1500, duracao:60  },
  { id:'s3',  nome:'Preenchimento Labial',        categoria:'Preenchimentos',    preco:1200, duracao:50  },
  { id:'s4',  nome:'Preenchimento Malar',         categoria:'Preenchimentos',    preco:1400, duracao:60  },
  { id:'s5',  nome:'Preenchimento Olheiras',      categoria:'Preenchimentos',    preco:1600, duracao:60  },
  { id:'s6',  nome:'Bioestimulador Sculptra',     categoria:'Bioestimuladores',  preco:2200, duracao:60  },
  { id:'s7',  nome:'Bioestimulador Radiesse',     categoria:'Bioestimuladores',  preco:1800, duracao:60  },
  { id:'s8',  nome:'Harmonização Facial Completa',categoria:'Harmonização',      preco:3500, duracao:120 },
  { id:'s9',  nome:'Limpeza de Pele Profunda',    categoria:'Skincare',          preco:280,  duracao:60  },
  { id:'s10', nome:'Microagulhamento',            categoria:'Skincare',          preco:450,  duracao:60  },
  { id:'s11', nome:'Peeling Químico',             categoria:'Skincare',          preco:350,  duracao:45  },
  { id:'s12', nome:'Hidratação Profunda',         categoria:'Skincare',          preco:220,  duracao:45  },
  { id:'s13', nome:'Drenagem Linfática',          categoria:'Corporal',          preco:180,  duracao:60  },
  { id:'s14', nome:'Massagem Modeladora',         categoria:'Corporal',          preco:200,  duracao:60  },
];

const MOCK_VENDAS = [
  // Janeiro 2026
  {id:'v1', data:'2026-01-03',cliente:'Maria Silva',         servicoId:'s1', profissionalId:'p3',valor:850, formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v2', data:'2026-01-05',cliente:'Ana Paula Costa',     servicoId:'s3', profissionalId:'p4',valor:1200,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v3', data:'2026-01-06',cliente:'Roberta Alves',       servicoId:'s8', profissionalId:'p3',valor:3500,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:'Combo harmonização'},
  {id:'v4', data:'2026-01-08',cliente:'Camila Ferreira',     servicoId:'s2', profissionalId:'p5',valor:1500,formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v5', data:'2026-01-09',cliente:'Luciana Barros',      servicoId:'s6', profissionalId:'p4',valor:2200,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v6', data:'2026-01-12',cliente:'Patricia Souza',      servicoId:'s4', profissionalId:'p3',valor:1400,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v7', data:'2026-01-13',cliente:'Fernanda Lima',       servicoId:'s10',profissionalId:'p5',valor:450, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v8', data:'2026-01-14',cliente:'Tatiana Gomes',       servicoId:'s3', profissionalId:'p4',valor:1200,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v9', data:'2026-01-15',cliente:'Renata Oliveira',     servicoId:'s5', profissionalId:'p3',valor:1600,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v10',data:'2026-01-16',cliente:'Mariana Santos',      servicoId:'s7', profissionalId:'p4',valor:1800,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v11',data:'2026-01-19',cliente:'Juliana Moreira',     servicoId:'s1', profissionalId:'p5',valor:850, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v12',data:'2026-01-20',cliente:'Carla Andrade',       servicoId:'s11',profissionalId:'p3',valor:350, formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v13',data:'2026-01-21',cliente:'Bianca Rodrigues',    servicoId:'s8', profissionalId:'p4',valor:3200,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:'Desconto fidelidade'},
  {id:'v14',data:'2026-01-22',cliente:'Helena Martins',      servicoId:'s6', profissionalId:'p5',valor:2200,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v15',data:'2026-01-23',cliente:'Isabela Castro',      servicoId:'s2', profissionalId:'p3',valor:1500,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v16',data:'2026-01-26',cliente:'Vanessa Pereira',     servicoId:'s4', profissionalId:'p4',valor:1400,formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v17',data:'2026-01-27',cliente:'Daniela Araujo',      servicoId:'s9', profissionalId:'p5',valor:280, formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v18',data:'2026-01-28',cliente:'Adriana Freitas',     servicoId:'s3', profissionalId:'p3',valor:1200,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v19',data:'2026-01-29',cliente:'Silvia Nunes',        servicoId:'s7', profissionalId:'p4',valor:1800,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v20',data:'2026-01-30',cliente:'Larissa Mendonça',    servicoId:'s12',profissionalId:'p5',valor:220, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  // Fevereiro 2026
  {id:'v21',data:'2026-02-02',cliente:'Amanda Vieira',       servicoId:'s8', profissionalId:'p3',valor:3500,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v22',data:'2026-02-03',cliente:'Paula Carvalho',      servicoId:'s1', profissionalId:'p4',valor:850, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v23',data:'2026-02-04',cliente:'Stephanie Costa',     servicoId:'s5', profissionalId:'p5',valor:1600,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v24',data:'2026-02-05',cliente:'Cristiane Melo',      servicoId:'s6', profissionalId:'p3',valor:2200,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v25',data:'2026-02-06',cliente:'Rafaela Teixeira',    servicoId:'s3', profissionalId:'p4',valor:1200,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v26',data:'2026-02-09',cliente:'Viviane Monteiro',    servicoId:'s2', profissionalId:'p5',valor:1500,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v27',data:'2026-02-10',cliente:'Sandra Pinto',        servicoId:'s4', profissionalId:'p3',valor:1400,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v28',data:'2026-02-11',cliente:'Gabriela Ramos',      servicoId:'s7', profissionalId:'p4',valor:1800,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v29',data:'2026-02-12',cliente:'Natasha Lima',        servicoId:'s10',profissionalId:'p5',valor:450, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v30',data:'2026-02-13',cliente:'Cintia Barbosa',      servicoId:'s8', profissionalId:'p3',valor:3200,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:'Desconto'},
  {id:'v31',data:'2026-02-16',cliente:'Leticia Nascimento',  servicoId:'s1', profissionalId:'p4',valor:850, formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v32',data:'2026-02-17',cliente:'Priscila Duarte',     servicoId:'s9', profissionalId:'p5',valor:280, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v33',data:'2026-02-18',cliente:'Aline Campos',        servicoId:'s6', profissionalId:'p3',valor:2200,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v34',data:'2026-02-19',cliente:'Bruna Correia',       servicoId:'s3', profissionalId:'p4',valor:1200,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v35',data:'2026-02-20',cliente:'Mirela Azevedo',      servicoId:'s11',profissionalId:'p5',valor:350, formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v36',data:'2026-02-23',cliente:'Thalita Rocha',       servicoId:'s5', profissionalId:'p3',valor:1600,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v37',data:'2026-02-24',cliente:'Camyla Almeida',      servicoId:'s2', profissionalId:'p4',valor:1500,formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v38',data:'2026-02-25',cliente:'Denise Fonseca',      servicoId:'s7', profissionalId:'p5',valor:1800,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v39',data:'2026-02-26',cliente:'Karina Brito',        servicoId:'s13',profissionalId:'p3',valor:180, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v40',data:'2026-02-27',cliente:'Simone Vasconcelos',  servicoId:'s4', profissionalId:'p4',valor:1400,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  // Março 2026
  {id:'v41',data:'2026-03-02',cliente:'Elaine Cordeiro',     servicoId:'s8', profissionalId:'p3',valor:3500,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v42',data:'2026-03-03',cliente:'Fatima Lopes',        servicoId:'s1', profissionalId:'p4',valor:850, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v43',data:'2026-03-04',cliente:'Giovana Cruz',        servicoId:'s6', profissionalId:'p5',valor:2200,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v44',data:'2026-03-05',cliente:'Hilary Souza',        servicoId:'s3', profissionalId:'p3',valor:1200,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v45',data:'2026-03-06',cliente:'Ivana Paiva',         servicoId:'s2', profissionalId:'p4',valor:1500,formaPagamento:'PIX',            status:'CONCLUIDO',observacao:''},
  {id:'v46',data:'2026-03-07',cliente:'Joyce Belém',         servicoId:'s10',profissionalId:'p5',valor:450, formaPagamento:'Dinheiro',        status:'CONCLUIDO',observacao:''},
  {id:'v47',data:'2026-03-09',cliente:'Karen Salgado',       servicoId:'s4', profissionalId:'p3',valor:1400,formaPagamento:'Cartão Crédito',  status:'CONCLUIDO',observacao:''},
  {id:'v48',data:'2026-03-09',cliente:'Lígia Cerqueira',     servicoId:'s7', profissionalId:'p4',valor:1800,formaPagamento:'PIX',            status:'PENDENTE',  observacao:'Aguardando confirmação'},
];

const MOCK_DESPESAS_FIXAS = [
  {id:'df1',nome:'Aluguel',                  categoria:'Aluguel',   valor:8000, vencimento:5,  status:'ATIVA', parcelado:false, totalParcelas:null, parcelaAtual:null, observacao:'',                           pagamentos:{'2026-01':true,'2026-02':true}},
  {id:'df2',nome:'Energia Elétrica',          categoria:'Operacional Clínica', valor:600,  vencimento:10, status:'ATIVA', parcelado:false, totalParcelas:null, parcelaAtual:null, observacao:'',                           pagamentos:{'2026-01':true,'2026-02':true}},
  {id:'df3',nome:'Água e Gás',                categoria:'Operacional Clínica', valor:200,  vencimento:10, status:'ATIVA', parcelado:false, totalParcelas:null, parcelaAtual:null, observacao:'',                           pagamentos:{'2026-01':true,'2026-02':true}},
  {id:'df4',nome:'Internet e Telefone',       categoria:'Operacional Clínica', valor:350,  vencimento:15, status:'ATIVA', parcelado:false, totalParcelas:null, parcelaAtual:null, observacao:'',                           pagamentos:{'2026-01':true,'2026-02':false}},
  {id:'df5',nome:'Software de Gestão',        categoria:'Software',  valor:200,  vencimento:1,  status:'ATIVA', parcelado:true,  totalParcelas:12,   parcelaAtual:8,    observacao:'Renovação anual do sistema', pagamentos:{'2026-01':true,'2026-02':true,'2026-03':true}},
  {id:'df6',nome:'Contador',                  categoria:'Pessoal',   valor:800,  vencimento:5,  status:'ATIVA', parcelado:false, totalParcelas:null, parcelaAtual:null, observacao:'',                           pagamentos:{'2026-01':true,'2026-02':true}},
  {id:'df7',nome:'Seguro do Estabelecimento', categoria:'Outros',    valor:450,  vencimento:1,  status:'ATIVA', parcelado:true,  totalParcelas:10,   parcelaAtual:10,   observacao:'Apólice vence em Março/2026',pagamentos:{'2026-01':true,'2026-02':true,'2026-03':true}},
  {id:'df8',nome:'Serviço de Limpeza',        categoria:'Pessoal',   valor:500,  vencimento:5,  status:'ATIVA', parcelado:false, totalParcelas:null, parcelaAtual:null, observacao:'',                           pagamentos:{'2026-01':true,'2026-02':true}},
];

const MOCK_DESPESAS_VARIAVEIS = [
  {id:'dv1', data:'2026-01-04', descricao:'Materiais Botox – Allergan',      categoria:'Materiais', valor:2800,formaPagamento:'PIX',           pago:true},
  {id:'dv2', data:'2026-01-08', descricao:'Ácido Hialurônico Juvederm',      categoria:'Materiais', valor:3200,formaPagamento:'PIX',           pago:true},
  {id:'dv3', data:'2026-01-10', descricao:'Marketing Instagram Ads',          categoria:'Marketing', valor:1500,formaPagamento:'Cartão Crédito',pago:true},
  {id:'dv4', data:'2026-01-15', descricao:'Luvas e materiais descartáveis',   categoria:'Materiais', valor:480, formaPagamento:'Dinheiro',       pago:true},
  {id:'dv5', data:'2026-01-22', descricao:'Conserto equipamento ultrassom',   categoria:'Outros',    valor:650, formaPagamento:'PIX',           pago:true},
  {id:'dv6', data:'2026-01-28', descricao:'Curso atualização profissional',   categoria:'Pessoal',   valor:1200,formaPagamento:'Cartão Crédito',pago:true},
  {id:'dv7', data:'2026-02-03', descricao:'Sculptra – Galderma',             categoria:'Materiais', valor:3600,formaPagamento:'PIX',           pago:true},
  {id:'dv8', data:'2026-02-07', descricao:'Google Ads – Fevereiro',           categoria:'Marketing', valor:1200,formaPagamento:'Cartão Crédito',pago:true},
  {id:'dv9', data:'2026-02-12', descricao:'Uniformes equipe',                 categoria:'Pessoal',   valor:780, formaPagamento:'PIX',           pago:true},
  {id:'dv10',data:'2026-02-18', descricao:'Manutenção preventiva laser',      categoria:'Outros',    valor:900, formaPagamento:'PIX',           pago:false},
  {id:'dv11',data:'2026-02-24', descricao:'Toalhas e capas descartáveis',     categoria:'Materiais', valor:320, formaPagamento:'Dinheiro',       pago:true},
  {id:'dv12',data:'2026-03-03', descricao:'Radiesse – Merz',                  categoria:'Materiais', valor:2900,formaPagamento:'PIX',           pago:true},
  {id:'dv13',data:'2026-03-06', descricao:'Instagram Ads – Março',            categoria:'Marketing', valor:1500,formaPagamento:'Cartão Crédito',pago:false},
  {id:'dv14',data:'2026-03-08', descricao:'Material limpeza profissional',    categoria:'Materiais', valor:280, formaPagamento:'Dinheiro',       pago:false},
];

const MOCK_RECEITAS_EXTRAS = [
  {id:'re1',data:'2026-01-15',descricao:'Venda de cosméticos',       tipo:'Produto',       valor:850, formaPagamento:'PIX'},
  {id:'re2',data:'2026-01-28',descricao:'Parceria evento beleza',    tipo:'Parceria',      valor:1500,formaPagamento:'PIX'},
  {id:'re3',data:'2026-02-14',descricao:'Venda de cosméticos – Valentim',tipo:'Produto',  valor:1200,formaPagamento:'Dinheiro'},
  {id:'re4',data:'2026-02-20',descricao:'Consultoria estética',       tipo:'Consultoria',   valor:600, formaPagamento:'PIX'},
  {id:'re5',data:'2026-03-05',descricao:'Venda de cosméticos',       tipo:'Produto',       valor:920, formaPagamento:'PIX'},
];

// ============================================================
// ESTADO GLOBAL
// ============================================================
let state = {
  profissionais: [],
  servicos: [],
  vendas: [],
  despesasFixas: [],
  despesasVariaveis: [],
  receitasExtras: [],
  currentPage: 'dashboard',
  selectedMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
};

// ============================================================
// PERSISTÊNCIA
// ============================================================
function saveState() {
  try {
    localStorage.setItem('clinica_v1', JSON.stringify({
      profissionais: state.profissionais,
      servicos: state.servicos,
      vendas: state.vendas,
      despesasFixas: state.despesasFixas,
      despesasVariaveis: state.despesasVariaveis,
      receitasExtras: state.receitasExtras,
    }));
  } catch(e) { console.warn('Erro ao salvar:', e); }
}

function loadState() {
  try {
    const saved = localStorage.getItem('clinica_v1');
    if (saved) {
      const data = JSON.parse(saved);
      state.profissionais = data.profissionais || MOCK_PROFISSIONAIS;
      state.servicos = data.servicos || MOCK_SERVICOS;
      state.vendas = data.vendas || MOCK_VENDAS;
      state.despesasFixas = (data.despesasFixas || MOCK_DESPESAS_FIXAS).map(d => {
        if (!d.pagamentos) return d;
        const pgtos = {};
        Object.entries(d.pagamentos).forEach(([k, v]) => { if (k >= '2026-01') pgtos[k] = v; });
        return { ...d, pagamentos: pgtos };
      });
      state.despesasVariaveis = (data.despesasVariaveis || MOCK_DESPESAS_VARIAVEIS)
        .filter(d => { const ano = parseInt((d.data||'').split('-')[0]); return ano >= 2026; });
      state.receitasExtras = data.receitasExtras || MOCK_RECEITAS_EXTRAS;
      saveState();
    } else {
      state.profissionais = MOCK_PROFISSIONAIS;
      state.servicos = MOCK_SERVICOS;
      state.vendas = MOCK_VENDAS;
      state.despesasFixas = MOCK_DESPESAS_FIXAS;
      state.despesasVariaveis = MOCK_DESPESAS_VARIAVEIS;
      state.receitasExtras = MOCK_RECEITAS_EXTRAS;
      saveState();
    }
  } catch(e) {
    state.profissionais = MOCK_PROFISSIONAIS;
    state.servicos = MOCK_SERVICOS;
    state.vendas = MOCK_VENDAS;
    state.despesasFixas = MOCK_DESPESAS_FIXAS;
    state.despesasVariaveis = MOCK_DESPESAS_VARIAVEIS;
    state.receitasExtras = MOCK_RECEITAS_EXTRAS;
  }
}

// ============================================================
// UTILITÁRIOS
// ============================================================
function R$(v) {
  return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0);
}
function fmtDate(s) {
  if (!s) return '';
  const [y,m,d] = s.split('-');
  return `${d}/${m}/${y}`;
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
function getProfissional(id) {
  return state.profissionais.find(p=>p.id===id) || {nome:'—',tipo:'—'};
}
function getServico(id) {
  return state.servicos.find(s=>s.id===id) || {nome:'—',preco:0};
}
function isMesAno(dataStr, mes, ano) {
  if (!dataStr) return false;
  const [y,m] = dataStr.split('-').map(Number);
  return y===ano && m===mes;
}
function somaArray(arr, fn) {
  return arr.reduce((acc,x) => acc + (fn(x)||0), 0);
}
function lastNMonths(n) {
  const result = [];
  const now = new Date();
  for (let i = n-1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({ mes: d.getMonth()+1, ano: d.getFullYear() });
  }
  return result;
}
function badgeStatus(status) {
  const map = {CONCLUIDO:'badge-green',PENDENTE:'badge-yellow',CANCELADO:'badge-red'};
  const label = {CONCLUIDO:'Concluído',PENDENTE:'Pendente',CANCELADO:'Cancelado'};
  return `<span class="badge ${map[status]||'badge-gray'}">${label[status]||status}</span>`;
}
function badgeTipo(tipo) {
  const map = {SDR:'badge-blue',CLOSER:'badge-purple',ATENDENTE:'badge-pink',ADMIN:'badge-gray'};
  return `<span class="badge ${map[tipo]||'badge-gray'}">${tipo}</span>`;
}

// ============================================================
// CÁLCULOS FINANCEIROS
// ============================================================
function getVendasMes(mes, ano) {
  return state.vendas.filter(v => isMesAno(v.data, mes, ano) && v.status !== 'CANCELADO');
}
function getReceitasMes(mes, ano) {
  const vendas = somaArray(getVendasMes(mes,ano), v=>v.valor);
  const extras = somaArray(state.receitasExtras.filter(r=>isMesAno(r.data,mes,ano)), r=>r.valor);
  return vendas + extras;
}
function getDespesasFixasMes(mes, ano) {
  const m = mes ?? state.selectedMonth;
  const a = ano ?? state.selectedYear;
  return somaArray(state.despesasFixas.filter(d=>_despesaAtivaNoMes(d,m,a)), d=>d.valor);
}
function getDespesasVariaveisMes(mes, ano) {
  return somaArray(state.despesasVariaveis.filter(d=>isMesAno(d.data,mes,ano)), d=>d.valor);
}
function getDespesasTotalMes(mes, ano) {
  return getDespesasFixasMes(mes, ano) + getDespesasVariaveisMes(mes, ano);
}
function getLucroMes(mes, ano) {
  return getReceitasMes(mes,ano) - getDespesasTotalMes(mes,ano);
}
function getComissoesPorProfissional(mes, ano) {
  const vendasMes = getVendasMes(mes, ano);
  return state.profissionais.map(prof => {
    const vendasProf = vendasMes.filter(v =>
      (v.atendenteId || v.profissionalId) === prof.id ||
      v.closerId === prof.id ||
      v.sdrId    === prof.id
    );
    const totalVendas = somaArray(vendasProf, v=>v.valor);
    const comissao = totalVendas * (prof.comissaoPct/100);
    return { ...prof, totalVendas, comissao, qtd: vendasProf.length };
  }).filter(p=>p.qtd>0);
}

// ============================================================
// CHARTS
// ============================================================
const CHART_INSTANCES = {};
function mkChart(id, config) {
  if (CHART_INSTANCES[id]) { CHART_INSTANCES[id].destroy(); }
  const el = document.getElementById(id);
  // @ts-ignore — Chart.js carregado via CDN
  if (el) { CHART_INSTANCES[id] = new window.Chart(el, config); }
}
const COLORS = ['#ec4899','#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444','#6366f1','#14b8a6'];
const chartDefaults = {
  plugins: { legend: { labels: { font:{family:'Inter',size:12}, padding:16 } } },
  layout: { padding: 4 }
};

// ============================================================
// SIDEBAR / NAVEGAÇÃO
// ============================================================
const ICONS = {
  dashboard: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  relatorios: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  vendas: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  comissoes: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="9" cy="9" r="2"/><circle cx="15" cy="15" r="2"/><line x1="5" y1="19" x2="19" y2="5"/></svg>`,
  receitas: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  fluxo: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  despfix: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  despvar: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  profissionais: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  servicos: `<svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
};
const PAGE_META = {
  dashboard:         { title:'Dashboard',             subtitle:'Visão geral financeira' },
  vendas:            { title:'Controle de Vendas',    subtitle:'Gerenciamento de atendimentos e vendas' },
  comissoes:         { title:'Comissões',             subtitle:'Comissões por profissional' },
  receitas:          { title:'Receitas',              subtitle:'Todas as entradas financeiras' },
  fluxo:             { title:'Fluxo de Caixa',        subtitle:'Movimentação financeira mensal' },
  despesasFixas:     { title:'Despesas Fixas',         subtitle:'Custos fixos mensais' },
  despesasVariaveis: { title:'Despesas Variáveis',    subtitle:'Custos variáveis por período' },
  profissionais:     { title:'Profissionais',          subtitle:'Equipe Vivaci' },
  servicos:          { title:'Serviços',               subtitle:'Catálogo de procedimentos' },
  relatorios:        { title:'Relatórios PDF',          subtitle:'Exportar relatórios financeiros' },
};

function buildSidebar() {
  const m1 = document.getElementById('nav-menu');
  const m2 = document.getElementById('nav-menu-2');
  m1.innerHTML = NAV_MAIN.map(n => `
    <li><div class="sidebar-link${state.currentPage===n.id?' active':''}" onclick="navigate('${n.id}')">
      ${ICONS[n.icon]||''}<span>${n.label}</span>
    </div></li>`).join('');
  m2.innerHTML = NAV_CAD.map(n => `
    <li><div class="sidebar-link${state.currentPage===n.id?' active':''}" onclick="navigate('${n.id}')">
      ${ICONS[n.icon]||''}<span>${n.label}</span>
    </div></li>`).join('');
}

function navigate(page) {
  state.currentPage = page;
  buildSidebar();
  const meta = PAGE_META[page] || { title: page, subtitle: '' };
  document.getElementById('page-title-bar').textContent = meta.title;
  document.getElementById('page-subtitle-bar').textContent = meta.subtitle;
  const c = document.getElementById('page-content');
  c.innerHTML = '';
  const fns = {
    dashboard: renderDashboard,
    vendas: renderVendas,
    comissoes: renderComissoes,
    receitas: renderReceitas,
    fluxo: renderFluxo,
    despesasFixas: renderDespesasFixas,
    despesasVariaveis: renderDespesasVariaveis,
    profissionais: renderProfissionais,
    servicos: renderServicos,
    relatorios: renderRelatorios,
  };
  if (fns[page]) fns[page]();
}

// ============================================================
// RELATÓRIOS PDF
// ============================================================
function renderRelatorios() {
  const mes = state.selectedMonth, ano = state.selectedYear;
  const periodo = MESES[mes - 1] + ' ' + ano;
  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div><h2 class="page-title">Relatórios PDF</h2><p class="page-subtitle">Exporte os relatórios financeiros da clínica</p></div>
    <div class="flex items-center gap-3">
      <select id="rel-mes" class="filter-input font-medium" onchange="relChangePeriod()">
        ${MESES.map((m,i)=>`<option value="${i+1}"${i+1===mes?' selected':''}>${m}</option>`).join('')}
      </select>
      <select id="rel-ano" class="filter-input font-medium" onchange="relChangePeriod()">
        ${[2024,2025,2026].map(y=>`<option value="${y}"${y===ano?' selected':''}>${y}</option>`).join('')}
      </select>
    </div>
  </div>
  <p class="text-sm text-gray-500 mb-6">Período selecionado: <strong class="text-gray-700">${periodo}</strong></p>
  <div class="grid gap-4" style="grid-template-columns:repeat(auto-fill,minmax(340px,1fr))">

    <!-- Vendas -->
    <div class="chart-card flex flex-col gap-4">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:#ede9fe">
          <svg class="w-6 h-6" style="color:#7c3aed" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        </div>
        <div>
          <p class="font-bold text-gray-800">Relatório de Vendas</p>
          <p class="text-sm text-gray-500 mt-0.5">Vendas, comissões por profissional e formas de pagamento do período.</p>
        </div>
      </div>
      <button class="btn-primary w-full justify-center" onclick="exportVendasPDF()">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Gerar PDF de Vendas
      </button>
    </div>

    <!-- Despesas -->
    <div class="chart-card flex flex-col gap-4">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:#fee2e2">
          <svg class="w-6 h-6" style="color:#dc2626" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div>
          <p class="font-bold text-gray-800">Relatório de Despesas</p>
          <p class="text-sm text-gray-500 mt-0.5">Despesas fixas (com parcelas) e variáveis, resumo por categoria.</p>
        </div>
      </div>
      <button class="btn-primary w-full justify-center" style="background:linear-gradient(135deg,#dc2626,#b91c1c)" onclick="exportDespesasPDF()">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Gerar PDF de Despesas
      </button>
    </div>

    <!-- Fluxo de Caixa -->
    <div class="chart-card flex flex-col gap-4">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:#dbeafe">
          <svg class="w-6 h-6" style="color:#2563eb" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        </div>
        <div>
          <p class="font-bold text-gray-800">Fluxo de Caixa</p>
          <p class="text-sm text-gray-500 mt-0.5">Entradas, saídas e saldo acumulado cronológico do período.</p>
        </div>
      </div>
      <button class="btn-primary w-full justify-center" style="background:linear-gradient(135deg,#2563eb,#1d4ed8)" onclick="exportFluxoPDF()">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Gerar PDF do Fluxo
      </button>
    </div>

    <!-- Relatório Completo -->
    <div class="chart-card flex flex-col gap-4" style="background:linear-gradient(135deg,rgba(30,27,75,0.03),rgba(139,92,246,0.05));border-color:rgba(139,92,246,0.2)">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:linear-gradient(135deg,#ec4899,#8b5cf6)">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
        </div>
        <div>
          <p class="font-bold text-gray-800">Relatório Financeiro Completo</p>
          <p class="text-sm text-gray-500 mt-0.5">Vendas + Receitas + Despesas + Fluxo + DRE resumido em um único PDF.</p>
        </div>
      </div>
      <button class="btn-primary w-full justify-center" onclick="exportRelatorioGeralPDF()">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Gerar Relatório Completo
      </button>
    </div>

  </div>`;
}

function relChangePeriod() {
  state.selectedMonth = parseInt(document.getElementById('rel-mes').value);
  state.selectedYear = parseInt(document.getElementById('rel-ano').value);
  renderRelatorios();
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  const mes = state.selectedMonth;
  const ano = state.selectedYear;
  const receita = getReceitasMes(mes, ano);
  const despesas = getDespesasTotalMes(mes, ano);
  const lucro = receita - despesas;
  const vendas = getVendasMes(mes, ano);
  const nVendas = vendas.length;
  const ticketMedio = nVendas > 0 ? somaArray(vendas, v=>v.valor)/nVendas : 0;

  const meses6 = lastNMonths(6).filter(x => x.ano >= 2026);
  const comissoes = getComissoesPorProfissional(mes, ano);
  const totalComissoes = somaArray(comissoes, c=>c.comissao);

  const c = document.getElementById('page-content');
  c.innerHTML = `
  <!-- Period Selector -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <button class="btn-primary" onclick="showRelatoriosModal()" style="padding:9px 18px">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Relatórios PDF
      </button>
      <select id="dash-mes" class="filter-input font-medium" onchange="dashChangePeriod()">
        ${MESES.map((m,i)=>`<option value="${i+1}"${i+1===mes?' selected':''}>${m}</option>`).join('')}
      </select>
      <select id="dash-ano" class="filter-input font-medium" onchange="dashChangePeriod()">
        ${[2024,2025,2026].map(y=>`<option value="${y}"${y===ano?' selected':''}>${y}</option>`).join('')}
      </select>
    </div>
    <span class="text-sm text-gray-500 font-medium">${MESES[mes-1]} ${ano}</span>
  </div>

  <!-- KPI Cards -->
  <div class="grid grid-cols-2 gap-4 mb-6" style="grid-template-columns: repeat(4,1fr)">
    <div class="kpi-card">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Receita Total</p>
          <p class="text-2xl font-bold text-gray-900">${R$(receita)}</p>
          <p class="text-xs text-emerald-600 font-semibold mt-1">${nVendas} atendimentos</p>
        </div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:#d1fae5">
          <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        </div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Despesas</p>
          <p class="text-2xl font-bold text-gray-900">${R$(despesas)}</p>
          <p class="text-xs text-red-500 font-semibold mt-1">Fixas + Variáveis</p>
        </div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:#fee2e2">
          <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
        </div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Lucro Líquido</p>
          <p class="text-2xl font-bold ${lucro>=0?'text-gray-900':'text-red-600'}">${R$(lucro)}</p>
          <p class="text-xs font-semibold mt-1 ${lucro>=0?'text-blue-500':'text-red-500'}">${receita>0?Math.round((lucro/receita)*100):0}% margem</p>
        </div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:#dbeafe">
          <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        </div>
      </div>
    </div>
    <div class="kpi-card">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Ticket Médio</p>
          <p class="text-2xl font-bold text-gray-900">${R$(ticketMedio)}</p>
          <p class="text-xs text-purple-600 font-semibold mt-1">Comissões: ${R$(totalComissoes)}</p>
        </div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:#ede9fe">
          <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="9" cy="9" r="2"/><circle cx="15" cy="15" r="2"/><line x1="5" y1="19" x2="19" y2="5"/></svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Charts Row 1 -->
  <div class="grid gap-6 mb-6" style="grid-template-columns: 2fr 1fr">
    <div class="chart-card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-gray-800">Receitas vs Despesas</h3>
        <span class="text-xs text-gray-400">Últimos 6 meses</span>
      </div>
      <canvas id="chartRecDep" height="200"></canvas>
    </div>
    <div class="chart-card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-gray-800">Vendas por Profissional</h3>
        <span class="text-xs text-gray-400">${MESES[mes-1]}</span>
      </div>
      <canvas id="chartProf" height="200"></canvas>
    </div>
  </div>

  <!-- Charts Row 2 -->
  <div class="grid gap-6 mb-6" style="grid-template-columns: 1fr 1fr">
    <div class="chart-card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-gray-800">Serviços Mais Vendidos</h3>
        <span class="text-xs text-gray-400">${MESES[mes-1]}</span>
      </div>
      <canvas id="chartServicos" height="220"></canvas>
    </div>
    <div class="chart-card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-gray-800">Comissões do Mês</h3>
        <span class="text-xs text-gray-400">${MESES[mes-1]} ${ano}</span>
      </div>
      ${comissoes.length === 0
        ? `<div class="empty-state"><div class="icon">📊</div><p>Nenhuma venda no período</p></div>`
        : `<table class="data-table">
          <thead><tr><th>Profissional</th><th>Tipo</th><th>Vendas</th><th>Comissão</th></tr></thead>
          <tbody>${comissoes.map(c=>`
            <tr>
              <td class="font-medium">${c.nome}</td>
              <td>${badgeTipo(c.tipo)}</td>
              <td>${R$(c.totalVendas)}</td>
              <td class="font-bold text-purple-600">${R$(c.comissao)}</td>
            </tr>`).join('')}
          </tbody>
        </table>`}
      <div class="mt-4 pt-4" style="border-top:1px solid #f3f4f6">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 font-medium">Total de Comissões</span>
          <span class="font-bold text-purple-700">${R$(totalComissoes)}</span>
        </div>
      </div>
    </div>
  </div>`;

  setTimeout(() => {
    // Chart 1: Receitas vs Despesas
    const labels6 = meses6.map(x => MESES[x.mes-1].slice(0,3));
    const rec6 = meses6.map(x => getReceitasMes(x.mes, x.ano));
    const dep6 = meses6.map(x => getDespesasTotalMes(x.mes, x.ano));
    mkChart('chartRecDep', {
      type: 'bar',
      data: {
        labels: labels6,
        datasets: [
          { label:'Receitas', data: rec6, backgroundColor:'rgba(16,185,129,0.8)', borderRadius:6, borderSkipped:false },
          { label:'Despesas', data: dep6, backgroundColor:'rgba(239,68,68,0.8)',   borderRadius:6, borderSkipped:false },
        ]
      },
      options: { ...chartDefaults, responsive:true, plugins:{...chartDefaults.plugins, tooltip:{callbacks:{label:c=>R$(c.raw)}}}, scales:{y:{ticks:{callback:v=>R$(v)},grid:{color:'#f1f5f9'}}} }
    });

    // Chart 2: Vendas por Profissional (Doughnut)
    const vProf = state.profissionais.map(p => ({
      nome: p.nome.split(' ')[0],
      total: somaArray(getVendasMes(mes,ano).filter(v=>v.profissionalId===p.id), v=>v.valor)
    })).filter(x=>x.total>0);
    mkChart('chartProf', {
      type: 'doughnut',
      data: {
        labels: vProf.map(x=>x.nome),
        datasets:[{ data: vProf.map(x=>x.total), backgroundColor: COLORS, borderWidth:2, borderColor:'white' }]
      },
      options: { ...chartDefaults, cutout:'65%', responsive:true, plugins:{...chartDefaults.plugins, tooltip:{callbacks:{label:c=>R$(c.raw)}}} }
    });

    // Chart 3: Serviços mais vendidos
    const svMap = {};
    getVendasMes(mes,ano).forEach(v => {
      const s = getServico(v.servicoId);
      svMap[s.nome] = (svMap[s.nome]||0) + v.valor;
    });
    const topSv = Object.entries(svMap).sort((a,b)=>b[1]-a[1]).slice(0,6);
    mkChart('chartServicos', {
      type: 'bar',
      data: {
        labels: topSv.map(x=>x[0]),
        datasets:[{ label:'Receita', data: topSv.map(x=>x[1]), backgroundColor: COLORS.map(c=>c+'CC'), borderRadius:6 }]
      },
      options: { ...chartDefaults, indexAxis:'y', responsive:true, plugins:{...chartDefaults.plugins,legend:{display:false},tooltip:{callbacks:{label:c=>R$(c.raw)}}}, scales:{x:{ticks:{callback:v=>R$(v)},grid:{color:'#f1f5f9'}},y:{grid:{display:false}}} }
    });
  }, 50);
}

function dashChangePeriod() {
  state.selectedMonth = parseInt(document.getElementById('dash-mes').value);
  state.selectedYear = parseInt(document.getElementById('dash-ano').value);
  renderDashboard();
}

// ============================================================
// VENDAS
// ============================================================
function renderVendas() {
  const mes = state.selectedMonth;
  const ano = state.selectedYear;

  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div>
      <h2 class="page-title">Controle de Vendas</h2>
      <p class="page-subtitle">Registre e gerencie todos os atendimentos</p>
    </div>
    <button class="btn-primary" onclick="showVendaModal(null)">+ Nova Venda</button>
  </div>

  <!-- Filtros -->
  <div class="filter-bar">
    <select id="fv-mes" class="filter-input font-medium" onchange="filterVendas()">
      ${MESES.map((m,i)=>`<option value="${i+1}"${i+1===mes?' selected':''}>${m}</option>`).join('')}
    </select>
    <select id="fv-ano" class="filter-input font-medium" onchange="filterVendas()">
      ${[2024,2025,2026,2027].map(y=>`<option value="${y}"${y===ano?' selected':''}>${y}</option>`).join('')}
    </select>
    <select id="fv-prof" class="filter-input" onchange="filterVendas()">
      <option value="">Todos os Profissionais</option>
      ${state.profissionais.map(p=>`<option value="${p.id}">${p.nome}</option>`).join('')}
    </select>
    <select id="fv-status" class="filter-input" onchange="filterVendas()">
      <option value="">Todos os Status</option>
      <option value="CONCLUIDO">Concluído</option>
      <option value="PENDENTE">Pendente</option>
      <option value="CANCELADO">Cancelado</option>
    </select>
    <input type="text" id="fv-busca" class="filter-input" placeholder="Buscar cliente, profissional, CPF ou telefone..."
      oninput="filterVendas()"
      onkeydown="if(event.key==='Enter')filterVendas()"
      style="flex:1; min-width:150px">
    <button onclick="filterVendas()" class="btn-edit" style="white-space:nowrap">🔍 Buscar</button>
    <button onclick="limparBuscaVendas()" class="btn-secondary" style="white-space:nowrap;padding:8px 12px;font-size:13px">✕ Limpar</button>
  </div>

  <div id="vendas-summary" class="summary-bar"></div>

  <div class="chart-card overflow-hidden p-0">
    <div class="overflow-x-auto">
      <table class="data-table" id="vendas-table">
        <thead><tr>
          <th>Data</th><th>Cliente</th><th>Serviço</th><th>Profissional</th>
          <th>Valor</th><th>Pagamento</th><th>Status</th><th>Ações</th>
        </tr></thead>
        <tbody id="vendas-tbody"></tbody>
      </table>
    </div>
  </div>`;

  filterVendas();
}

function limparBuscaVendas() {
  const el = document.getElementById('fv-busca');
  if (el) el.value = '';
  filterVendas();
}

function _renderVendaRow(v) {
  const atendente = getProfissional(v.atendenteId || v.profissionalId);
  const closer    = v.closerId ? getProfissional(v.closerId) : null;
  const sdr       = v.sdrId   ? getProfissional(v.sdrId)    : null;
  const serv      = getServico(v.servicoId);
  const nomeServico = v.itens && v.itens.length > 0
    ? getServico(v.itens[0].servicoId).nome + (v.itens.length > 1 ? ` +${v.itens.length - 1}` : '')
    : serv.nome;
  const equipe = `
    <div class="flex flex-col gap-0.5">
      <div class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#8b5cf6"></span><span class="text-xs text-gray-700 font-medium">${(atendente.nome||'').split(' ')[0]}</span><span class="text-xs text-gray-400">Atend.</span></div>
      ${closer ? `<div class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#ec4899"></span><span class="text-xs text-gray-700 font-medium">${(closer.nome||'').split(' ')[0]}</span><span class="text-xs text-gray-400">Closer</span></div>` : ''}
      ${sdr    ? `<div class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#3b82f6"></span><span class="text-xs text-gray-700 font-medium">${(sdr.nome||'').split(' ')[0]}</span><span class="text-xs text-gray-400">SDR</span></div>` : ''}
    </div>`;
  return `<tr class="cursor-pointer hover:bg-indigo-50 transition-colors" onclick="showEspelhoVenda('${v.id}')">
    <td class="whitespace-nowrap">${fmtDate(v.data)}</td>
    <td>
      <div class="font-medium text-gray-800">${v.cliente||''}</div>
      ${v.cpf ? `<div class="text-xs text-gray-400 mt-0.5">CPF: ${v.cpf}</div>` : ''}
      ${v.telefone ? `<div class="text-xs text-gray-400">📱 ${v.telefone}</div>` : ''}
    </td>
    <td><div class="font-medium text-gray-800 text-sm">${nomeServico}</div></td>
    <td>${equipe}</td>
    <td class="font-bold text-gray-800">${R$(v.valor)}</td>
    <td><span class="badge badge-blue">${v.formaPagamento||''}</span></td>
    <td>${badgeStatus(v.status)}</td>
    <td class="whitespace-nowrap" onclick="event.stopPropagation()">
      <button class="btn-edit" onclick="showVendaModal('${v.id}')">Editar</button>
      <button class="btn-danger ml-1" onclick="deleteVenda('${v.id}')">Excluir</button>
    </td>
  </tr>`;
}

function filterVendas() {
  try {
    const mes    = parseInt(document.getElementById('fv-mes')?.value || state.selectedMonth);
    const ano    = parseInt(document.getElementById('fv-ano')?.value || state.selectedYear);
    const profId = document.getElementById('fv-prof')?.value || '';
    const status = document.getElementById('fv-status')?.value || '';
    const busca  = (document.getElementById('fv-busca')?.value || '').toLowerCase().trim();

    let vendas = (state.vendas || []).filter(v => v && v.data).slice().sort((a,b) => b.data > a.data ? 1 : -1);

    if (!busca) {
      vendas = vendas.filter(v => isMesAno(v.data, mes, ano));
    }
    if (profId) {
      vendas = vendas.filter(v =>
        (v.atendenteId || v.profissionalId) === profId ||
        v.closerId === profId ||
        v.sdrId    === profId
      );
    }
    if (status) {
      vendas = vendas.filter(v => v.status === status);
    }
    if (busca) {
      const norm = s => (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      const buscaNorm = norm(busca);
      const term = busca.replace(/\D/g, '');
      vendas = vendas.filter(v => {
        const nome      = norm(v.cliente);
        const cpf       = (v.cpf || '').replace(/\D/g, '');
        const tel       = (v.telefone || '').replace(/\D/g, '');
        const atendente = norm(getProfissional(v.atendenteId || v.profissionalId).nome);
        const closer    = v.closerId ? norm(getProfissional(v.closerId).nome) : '';
        const sdr       = v.sdrId    ? norm(getProfissional(v.sdrId).nome)    : '';
        const obs       = norm(v.observacao);
        return nome.includes(buscaNorm) ||
               atendente.includes(buscaNorm) ||
               closer.includes(buscaNorm) ||
               sdr.includes(buscaNorm) ||
               obs.includes(buscaNorm) ||
               (term && (cpf.includes(term) || tel.includes(term)));
      });
    }

    const total = somaArray(vendas.filter(v => v.status !== 'CANCELADO'), v => v.valor);
    const concl = vendas.filter(v => v.status === 'CONCLUIDO').length;
    const pend  = vendas.filter(v => v.status === 'PENDENTE').length;

    const sum = document.getElementById('vendas-summary');
    if (sum) sum.innerHTML = `
      <div class="item"><div class="label">Total Vendas</div><div class="value">${vendas.length}</div></div>
      <div class="item"><div class="label">Concluídas</div><div class="value">${concl}</div></div>
      <div class="item"><div class="label">Pendentes</div><div class="value">${pend}</div></div>
      <div class="item"><div class="label">Faturamento</div><div class="value">${R$(total)}</div></div>
    `;

    const tb = document.getElementById('vendas-tbody');
    if (!tb) return;
    if (vendas.length === 0) {
      tb.innerHTML = `<tr><td colspan="8" class="text-center py-12 text-gray-400">Nenhuma venda encontrada${busca ? ' para "' + busca + '"' : ''}</td></tr>`;
      return;
    }
    const rows = vendas.map(v => { try { return _renderVendaRow(v); } catch(e) { console.error('Erro linha venda', v.id, e); return ''; } });
    tb.innerHTML = rows.join('');
  } catch(e) {
    console.error('Erro filterVendas:', e);
    const tb = document.getElementById('vendas-tbody');
    if (tb) tb.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-red-500">Erro ao filtrar: ${e.message}</td></tr>`;
  }
}

function showVendaModal(id) {
  const v = id ? state.vendas.find(x=>x.id===id) : null;
  const title = v ? 'Editar Venda' : 'Nova Venda';
  showModal(`
    <div class="modal-header">
      <div class="modal-title">${title}</div>
      <div class="modal-subtitle">Preencha os dados do atendimento</div>
    </div>
    <div class="modal-body">
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label">Data *</label>
          <input type="date" id="mv-data" class="form-control" value="${v?.data||new Date().toISOString().slice(0,10)}">
        </div>
        <div class="form-group">
          <label class="form-label">Forma de Pagamento *</label>
          <select id="mv-pgto" class="form-control">
            ${FORMAS_PAGAMENTO.map(f=>`<option value="${f}"${v?.formaPagamento===f?' selected':''}>${f}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Nome do Cliente *</label>
        <input type="text" id="mv-cliente" class="form-control" placeholder="Nome completo do cliente" value="${v?.cliente||''}">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label">CPF</label>
          <input type="text" id="mv-cpf" class="form-control" placeholder="000.000.000-00" maxlength="14" oninput="mascaraCPF(this)" value="${v?.cpf||''}">
        </div>
        <div class="form-group">
          <label class="form-label">Telefone / WhatsApp</label>
          <input type="text" id="mv-telefone" class="form-control" placeholder="(00) 00000-0000" maxlength="15" oninput="mascaraTelefone(this)" value="${v?.telefone||''}">
        </div>
      </div>
      <div class="form-group">
        <div class="flex items-center justify-between mb-2">
          <label class="form-label mb-0">Serviços *</label>
          <button type="button" onclick="addServicoItem()" class="btn-edit" style="padding:4px 10px;font-size:12px">+ Adicionar serviço</button>
        </div>
        <div id="mv-itens-container" class="space-y-2"></div>
        <div class="mt-3 pt-3 border-t border-gray-100 space-y-2">
          <div class="flex items-center justify-between px-1">
            <span class="text-sm text-gray-400">Subtotal</span>
            <span id="mv-subtotal-display" class="text-sm text-gray-500">R$ 0,00</span>
          </div>
          <div class="flex items-center gap-3 px-1">
            <span class="text-sm text-gray-500 whitespace-nowrap">Desconto</span>
            <div class="flex gap-1 flex-1 justify-end">
              <select id="mv-desconto-tipo" class="form-control" style="width:70px;padding:4px 6px;font-size:13px" onchange="atualizarTotalVenda()">
                <option value="R$" ${v?.desconto?.tipo==='%'?'':'selected'}>R$</option>
                <option value="%" ${v?.desconto?.tipo==='%'?'selected':''}>%</option>
              </select>
              <input type="number" id="mv-desconto-valor" class="form-control" min="0" step="0.01" placeholder="0" value="${v?.desconto?.valor||''}"
                oninput="atualizarTotalVenda()" style="width:90px;padding:4px 8px;font-size:13px">
            </div>
          </div>
          <div class="flex items-center gap-3 px-1">
            <span class="text-sm text-gray-500 whitespace-nowrap">Tarifa de cartão</span>
            <div class="flex gap-1 flex-1 justify-end">
              <select id="mv-tarifa-tipo" class="form-control" style="width:70px;padding:4px 6px;font-size:13px" onchange="atualizarTotalVenda()">
                <option value="R$" ${v?.tarifaCartao?.tipo==='%'?'':'selected'}>R$</option>
                <option value="%" ${v?.tarifaCartao?.tipo==='%'?'selected':''}>%</option>
              </select>
              <input type="number" id="mv-tarifa-valor" class="form-control" min="0" step="0.01" placeholder="0" value="${v?.tarifaCartao?.valor||''}"
                oninput="atualizarTotalVenda()" style="width:90px;padding:4px 8px;font-size:13px">
            </div>
          </div>
          <div class="flex items-center justify-between px-1 pt-1 border-t border-gray-100">
            <span class="text-sm font-bold text-gray-700">Total a cobrar</span>
            <span id="mv-total-display" class="text-lg font-bold text-gray-800">R$ 0,00</span>
          </div>
        </div>
      </div>
      <div class="p-3 rounded-xl mb-2" style="background:#f8fafc;border:1px solid #e5e7eb">
        <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Equipe — Comissões</p>
        <div class="grid grid-cols-1 gap-3">
          <div class="form-group mb-0">
            <label class="form-label flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full inline-block" style="background:#8b5cf6"></span>
              Atendente * <span class="text-xs text-gray-400 font-normal">(realizou o procedimento)</span>
            </label>
            <select id="mv-atendente" class="form-control">
              <option value="">Selecione o atendente</option>
              ${state.profissionais.filter(p=>p.ativo&&p.tipo==='ATENDENTE').map(p=>`<option value="${p.id}"${(v?.atendenteId||v?.profissionalId)===p.id?' selected':''}>${p.nome} — ${p.comissaoPct}% comissão</option>`).join('')}
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full inline-block" style="background:#ec4899"></span>
              Closer <span class="text-xs text-gray-400 font-normal">(fechou a venda — opcional)</span>
            </label>
            <select id="mv-closer" class="form-control">
              <option value="">Nenhum</option>
              ${state.profissionais.filter(p=>p.ativo&&p.tipo==='CLOSER').map(p=>`<option value="${p.id}"${v?.closerId===p.id?' selected':''}>${p.nome} — ${p.comissaoPct}% comissão</option>`).join('')}
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full inline-block" style="background:#3b82f6"></span>
              SDR <span class="text-xs text-gray-400 font-normal">(agendou/prospectou — opcional)</span>
            </label>
            <select id="mv-srr" class="form-control">
              <option value="">Nenhum</option>
              ${state.profissionais.filter(p=>p.ativo&&p.tipo==='SDR').map(p=>`<option value="${p.id}"${v?.sdrId===p.id?' selected':''}>${p.nome} — ${p.comissaoPct}% comissão</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select id="mv-status" class="form-control">
          ${['CONCLUIDO','PENDENTE','CANCELADO'].map(s=>`<option value="${s}"${v?.status===s?' selected':''}>${s==='CONCLUIDO'?'Concluído':s==='PENDENTE'?'Pendente':'Cancelado'}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Observação</label>
        <input type="text" id="mv-obs" class="form-control" placeholder="Observações sobre o atendimento" value="${v?.observacao||''}">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveVenda('${id||''}')">Salvar Venda</button>
    </div>
  `);
  _initItensModal(v);
}

function _servicoOptsHTML(selectedId) {
  return `<option value="">Selecione...</option>` +
    [...state.servicos].sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'))
      .map(s=>`<option value="${s.id}" data-preco="${s.preco}"${s.id===selectedId?' selected':''}>${s.nome} – ${R$(s.preco)}</option>`).join('');
}

function addServicoItem(servicoId='', valor='', qtd=1) {
  const container = document.getElementById('mv-itens-container');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'flex gap-2 items-center mv-item-row';
  div.innerHTML = `
    <select class="form-control mv-servico-sel flex-1" onchange="itemServicoChanged(this)" style="min-width:0">
      ${_servicoOptsHTML(servicoId)}
    </select>
    <input type="number" class="form-control mv-qtd-item" min="1" step="1" placeholder="Qtd"
      value="${qtd||1}" oninput="itemQtdChanged(this)" style="width:60px;flex-shrink:0;text-align:center">
    <input type="number" class="form-control mv-preco-unit" step="0.01" min="0" placeholder="Unitário"
      value="${valor}" oninput="_recalcItemRow(this.closest('.mv-item-row'));atualizarTotalVenda()" style="width:100px;flex-shrink:0">
    <input type="number" class="form-control mv-valor-item" step="0.01" min="0" placeholder="Total"
      value="${(parseFloat(valor)||0)*(qtd||1)||''}" readonly
      style="width:100px;flex-shrink:0;background:#f1f5f9;color:#374151;cursor:default">
    <button type="button" onclick="removeServicoItem(this)" style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca;padding:6px 10px;border-radius:8px;cursor:pointer;font-size:15px;flex-shrink:0;line-height:1">✕</button>`;
  container.appendChild(div);
  atualizarTotalVenda();
}

function itemServicoChanged(sel) {
  const opt = sel.options[sel.selectedIndex];
  const preco = opt?.dataset?.preco;
  const row = sel.closest('.mv-item-row');
  if (preco && row) {
    row.querySelector('.mv-preco-unit').value = preco;
    _recalcItemRow(row);
  }
  atualizarTotalVenda();
}

function itemQtdChanged(input) {
  _recalcItemRow(input.closest('.mv-item-row'));
  atualizarTotalVenda();
}

function _recalcItemRow(row) {
  if (!row) return;
  const preco = parseFloat(row.querySelector('.mv-preco-unit').value) || 0;
  const qtd   = parseInt(row.querySelector('.mv-qtd-item').value) || 1;
  row.querySelector('.mv-valor-item').value = (preco * qtd).toFixed(2);
}

function removeServicoItem(btn) {
  const container = document.getElementById('mv-itens-container');
  if (container.children.length <= 1) { showToast('A venda precisa ter ao menos 1 serviço','error'); return; }
  btn.closest('.mv-item-row').remove();
  atualizarTotalVenda();
}

function atualizarTotalVenda() {
  const inputs = document.querySelectorAll('.mv-valor-item');
  const subtotal = Array.from(inputs).reduce((s,i)=>s+(parseFloat(i.value)||0),0);

  const descontoTipo = document.getElementById('mv-desconto-tipo')?.value || 'R$';
  const descontoVal  = parseFloat(document.getElementById('mv-desconto-valor')?.value) || 0;
  const descontoAbs  = descontoTipo === '%' ? subtotal * descontoVal / 100 : descontoVal;

  const tarifaTipo = document.getElementById('mv-tarifa-tipo')?.value || 'R$';
  const tarifaVal  = parseFloat(document.getElementById('mv-tarifa-valor')?.value) || 0;
  const tarifaAbs  = tarifaTipo === '%' ? subtotal * tarifaVal / 100 : tarifaVal;

  const total = Math.max(0, subtotal - descontoAbs - tarifaAbs);
  const fmt = v => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
  const elSub = document.getElementById('mv-subtotal-display');
  if (elSub) elSub.textContent = fmt(subtotal);
  const el = document.getElementById('mv-total-display');
  if (el) el.textContent = fmt(total);
}

// Inicializa os itens ao abrir o modal
function _initItensModal(v) {
  const itens = v?.itens?.length ? v.itens
    : v?.servicoId ? [{ servicoId: v.servicoId, valor: v.valor, qtd: 1 }]
    : [];
  if (itens.length === 0) { addServicoItem(); return; }
  itens.forEach(it => {
    const qtd       = it.qtd || 1;
    const precoUnit = it.precoUnit || (qtd > 0 ? it.valor / qtd : it.valor);
    addServicoItem(it.servicoId, precoUnit.toFixed(2), qtd);
  });
}

function mascaraCPF(el) {
  let v = el.value.replace(/\D/g,'').slice(0,11);
  v = v.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  el.value = v;
}
function mascaraTelefone(el) {
  let v = el.value.replace(/\D/g,'').slice(0,11);
  v = v.length > 10
    ? v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3')
    : v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'');
  el.value = v;
}

function saveVenda(id) {
  const data         = document.getElementById('mv-data').value;
  const cliente      = document.getElementById('mv-cliente').value.trim();
  const cpf          = document.getElementById('mv-cpf').value.trim();
  const telefone     = document.getElementById('mv-telefone').value.trim();
  const atendenteId  = document.getElementById('mv-atendente').value;
  const closerId     = document.getElementById('mv-closer').value || null;
  const sdrId        = document.getElementById('mv-srr').value || null;
  const formaPagamento = document.getElementById('mv-pgto').value;
  const status       = document.getElementById('mv-status').value;
  const observacao   = document.getElementById('mv-obs').value.trim();

  // Lê todos os itens de serviço
  const rows = document.querySelectorAll('.mv-item-row');
  const itens = [];
  rows.forEach(row => {
    const sid       = row.querySelector('.mv-servico-sel').value;
    const qtd       = parseInt(row.querySelector('.mv-qtd-item').value) || 1;
    const precoUnit = parseFloat(row.querySelector('.mv-preco-unit').value) || 0;
    const val       = parseFloat(row.querySelector('.mv-valor-item').value) || (precoUnit * qtd);
    if (sid) itens.push({ servicoId: sid, qtd, precoUnit, valor: val });
  });
  const subtotal = itens.reduce((s,i)=>s+i.valor, 0);

  // Desconto
  const descontoTipo  = document.getElementById('mv-desconto-tipo')?.value || 'R$';
  const descontoInput = parseFloat(document.getElementById('mv-desconto-valor')?.value) || 0;
  const descontoAbs   = descontoTipo === '%' ? subtotal * descontoInput / 100 : descontoInput;
  const desconto      = descontoInput > 0 ? { tipo: descontoTipo, valor: descontoInput, absoluto: descontoAbs } : null;

  // Tarifa de cartão
  const tarifaTipo  = document.getElementById('mv-tarifa-tipo')?.value || 'R$';
  const tarifaInput = parseFloat(document.getElementById('mv-tarifa-valor')?.value) || 0;
  const tarifaAbs   = tarifaTipo === '%' ? subtotal * tarifaInput / 100 : tarifaInput;
  const tarifaCartao = tarifaInput > 0 ? { tipo: tarifaTipo, valor: tarifaInput, absoluto: tarifaAbs } : null;

  const valor = Math.max(0, subtotal - descontoAbs - tarifaAbs);

  if (!data || !cliente || itens.length === 0 || !atendenteId || !subtotal) {
    showToast('Preencha todos os campos obrigatórios e ao menos 1 serviço', 'error'); return;
  }
  // servicoId e profissionalId mantidos para compatibilidade com registros antigos
  const obj = { id: id||uid(), data, cliente, cpf, telefone, itens, servicoId: itens[0].servicoId, profissionalId: atendenteId, atendenteId, closerId, sdrId, subtotal, desconto, tarifaCartao, valor, formaPagamento, status, observacao };
  if (id) {
    const idx = state.vendas.findIndex(v=>v.id===id);
    if (idx >= 0) state.vendas[idx] = obj;
  } else {
    state.vendas.push(obj);
  }
  saveState(); closeModal(); filterVendas();
  showToast(id ? 'Venda atualizada!' : 'Venda registrada!', 'success');
}

function showEspelhoVenda(id) {
  const v = state.vendas.find(x=>x.id===id);
  if (!v) return;
  const atendente = getProfissional(v.atendenteId || v.profissionalId);
  const closer    = v.closerId ? getProfissional(v.closerId) : null;
  const sdr       = v.sdrId   ? getProfissional(v.sdrId)    : null;

  const itens = v.itens?.length ? v.itens : [{ servicoId: v.servicoId, valor: v.valor, qtd: 1 }];
  const itensHTML = itens.map((it,i) => {
    const s = getServico(it.servicoId);
    const qtd = it.qtd || 1;
    const qtdLabel = qtd > 1 ? `<span class="text-xs text-gray-400 ml-1">× ${qtd}</span>` : '';
    return `<div class="flex items-center justify-between py-2 ${i<itens.length-1?'border-b border-gray-100':''}">
      <span class="text-sm text-gray-700">${s.nome}${qtdLabel}</span>
      <div class="text-right">
        ${qtd > 1 ? `<span class="text-xs text-gray-400 block">${R$(it.precoUnit||it.valor/qtd)} × ${qtd}</span>` : ''}
        <span class="text-sm font-bold text-gray-800">${R$(it.valor)}</span>
      </div>
    </div>`;
  }).join('');

  const comissaoRow = (prof, role, color) => {
    if (!prof || prof.nome === '—') return '';
    const com = v.valor * (prof.comissaoPct / 100);
    return `<div class="flex items-center justify-between py-1.5">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:${color}"></span>
        <span class="text-sm text-gray-700">${prof.nome}</span>
        <span class="text-xs text-gray-400">${role} · ${prof.comissaoPct}%</span>
      </div>
      <span class="text-sm font-bold" style="color:${color}">${R$(com)}</span>
    </div>`;
  };

  const totalComissoes = [atendente, closer, sdr].reduce((sum, prof) => {
    if (!prof || prof.nome === '—') return sum;
    return sum + v.valor * (prof.comissaoPct / 100);
  }, 0);

  const statusColors = { CONCLUIDO:'#15803d', PENDENTE:'#d97706', CANCELADO:'#dc2626' };
  const statusLabels = { CONCLUIDO:'Concluído', PENDENTE:'Pendente', CANCELADO:'Cancelado' };

  showModal(`
    <div style="background:linear-gradient(135deg,#1e1b4b,#4c1d95);padding:20px 24px 16px">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest mb-1" style="color:rgba(255,255,255,0.5)">Espelho da Venda</p>
          <p class="font-bold text-white text-lg">${v.cliente}</p>
          ${v.cpf ? `<p class="text-xs mt-0.5" style="color:rgba(255,255,255,0.5)">CPF: ${v.cpf}</p>` : ''}
          ${v.telefone ? `<p class="text-xs" style="color:rgba(255,255,255,0.5)">📱 ${v.telefone}</p>` : ''}
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-white">${R$(v.valor)}</p>
          <p class="text-xs mt-1" style="color:rgba(255,255,255,0.5)">${fmtDate(v.data)}</p>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style="background:${statusColors[v.status]}22;color:${statusColors[v.status]};border:1px solid ${statusColors[v.status]}44">${statusLabels[v.status]}</span>
        </div>
      </div>
    </div>
    <div class="p-6 space-y-5">

      <!-- Serviços -->
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Serviços realizados</p>
        <div class="p-3 rounded-xl" style="background:#f8fafc;border:1px solid #e5e7eb">
          ${itensHTML}
          ${(itens.length > 1 || v.desconto || v.tarifaCartao) ? `<div class="flex items-center justify-between pt-2 mt-1 border-t border-gray-200">
            <span class="text-sm font-bold text-gray-600">Subtotal</span>
            <span class="text-sm font-bold text-gray-800">${R$(v.subtotal || v.valor)}</span>
          </div>` : ''}
          ${v.desconto ? `<div class="flex items-center justify-between">
            <span class="text-sm text-red-500">Desconto (${v.desconto.tipo === '%' ? v.desconto.valor + '%' : R$(v.desconto.valor)})</span>
            <span class="text-sm font-bold text-red-500">- ${R$(v.desconto.absoluto)}</span>
          </div>` : ''}
          ${v.tarifaCartao ? `<div class="flex items-center justify-between">
            <span class="text-sm text-orange-500">Tarifa de cartão (${v.tarifaCartao.tipo === '%' ? v.tarifaCartao.valor + '%' : R$(v.tarifaCartao.valor)})</span>
            <span class="text-sm font-bold text-orange-500">- ${R$(v.tarifaCartao.absoluto)}</span>
          </div>` : ''}
          ${(v.desconto || v.tarifaCartao) ? `<div class="flex items-center justify-between pt-1 border-t border-gray-200">
            <span class="text-sm font-bold text-gray-700">Total a cobrar</span>
            <span class="text-sm font-bold text-emerald-700">${R$(v.valor)}</span>
          </div>` : ''}
        </div>
      </div>

      <!-- Pagamento -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Forma de pagamento</p>
          <span class="badge badge-blue">${v.formaPagamento}</span>
        </div>
        ${v.observacao ? `<div class="text-right max-w-xs">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Observação</p>
          <p class="text-sm text-gray-600 italic">${v.observacao}</p>
        </div>` : ''}
      </div>

      <!-- Equipe e Comissões -->
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Equipe & Comissões</p>
        <div class="p-3 rounded-xl" style="background:#f8fafc;border:1px solid #e5e7eb">
          ${comissaoRow(atendente, 'Atendente', '#8b5cf6')}
          ${comissaoRow(closer, 'Closer', '#ec4899')}
          ${comissaoRow(sdr, 'SDR', '#3b82f6')}
          <div class="flex items-center justify-between pt-2 mt-1 border-t border-gray-200">
            <span class="text-sm font-bold text-gray-600">Total comissões</span>
            <span class="text-sm font-bold text-red-500">${R$(totalComissoes)}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-gray-600">Líquido (após comissões)</span>
            <span class="text-sm font-bold text-emerald-600">${R$(v.valor - totalComissoes)}</span>
          </div>
        </div>
      </div>

    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Fechar</button>
      <button class="btn-primary" onclick="closeModal();showVendaModal('${id}')">Editar Venda</button>
    </div>
  `);
}

function deleteVenda(id) {
  if (!confirm('Excluir esta venda?')) return;
  state.vendas = state.vendas.filter(v=>v.id!==id);
  saveState(); filterVendas();
  showToast('Venda excluída', 'success');
}

// ============================================================
// COMISSÕES
// ============================================================
function renderComissoes() {
  const mes = state.selectedMonth;
  const ano = state.selectedYear;

  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div>
      <h2 class="page-title">Comissões</h2>
      <p class="page-subtitle">Controle de comissões por profissional</p>
    </div>
    <div class="flex items-center gap-2">
      <select id="com-mes" class="filter-input" onchange="renderComissoes()">
        ${MESES.map((m,i)=>`<option value="${i+1}"${i+1===mes?' selected':''}>${m}</option>`).join('')}
      </select>
      <select id="com-ano" class="filter-input" onchange="renderComissoes()">
        ${[2024,2025,2026].map(y=>`<option value="${y}"${y===ano?' selected':''}>${y}</option>`).join('')}
      </select>
    </div>
  </div>`;

  // Re-read period after rendering selects
  setTimeout(()=>{
    const m2 = parseInt(document.getElementById('com-mes')?.value||mes);
    const a2 = parseInt(document.getElementById('com-ano')?.value||ano);
    state.selectedMonth = m2; state.selectedYear = a2;
    const comissoes = getComissoesPorProfissional(m2, a2);
    const total = somaArray(comissoes, c=>c.comissao);

    const cont = document.getElementById('page-content');
    const existing = cont.innerHTML;

    const tableHTML = comissoes.length === 0
      ? `<div class="chart-card"><div class="empty-state"><div class="icon">💰</div><p>Nenhuma venda no período selecionado</p></div></div>`
      : `
      <div class="summary-bar mb-6">
        <div class="item"><div class="label">Profissionais Ativos</div><div class="value">${comissoes.length}</div></div>
        <div class="item"><div class="label">Total Vendas</div><div class="value">${R$(somaArray(comissoes,c=>c.totalVendas))}</div></div>
        <div class="item"><div class="label">Total Comissões</div><div class="value">${R$(total)}</div></div>
      </div>
      <div class="chart-card overflow-hidden p-0">
        <div class="overflow-x-auto">
          <table class="data-table">
            <thead><tr>
              <th>Profissional</th><th>Tipo</th><th>Atendimentos</th>
              <th>Total Vendas</th><th>% Comissão</th><th>Valor Comissão</th>
              <th>Participação</th>
            </tr></thead>
            <tbody>
              ${comissoes.map(p=>{
                const pct = total>0?Math.round((p.comissao/total)*100):0;
                return `<tr>
                  <td class="font-semibold text-gray-800">${p.nome}</td>
                  <td>${badgeTipo(p.tipo)}</td>
                  <td class="text-center font-bold text-blue-600">${p.qtd}</td>
                  <td class="font-medium">${R$(p.totalVendas)}</td>
                  <td><span class="badge badge-purple">${p.comissaoPct}%</span></td>
                  <td class="font-bold text-purple-700 text-lg">${R$(p.comissao)}</td>
                  <td style="min-width:120px">
                    <div class="flex items-center gap-2">
                      <div class="progress-bar-bg" style="flex:1"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
                      <span class="text-xs text-gray-500 w-8">${pct}%</span>
                    </div>
                  </td>
                </tr>`;}).join('')}
            </tbody>
            <tfoot>
              <tr style="background:#f8fafc">
                <td colspan="3" class="font-bold text-gray-700 px-4 py-3">TOTAL</td>
                <td class="font-bold px-4 py-3">${R$(somaArray(comissoes,c=>c.totalVendas))}</td>
                <td></td>
                <td class="font-bold text-purple-700 text-lg px-4 py-3">${R$(total)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>`;

    cont.innerHTML = existing + tableHTML;
  },10);
}

// ============================================================
// RECEITAS
// ============================================================
function renderReceitas() {
  const mes = state.selectedMonth;
  const ano = state.selectedYear;

  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div>
      <h2 class="page-title">Receitas</h2>
      <p class="page-subtitle">Todas as entradas financeiras</p>
    </div>
    <button class="btn-primary" onclick="showReceitaModal(null)">+ Nova Receita Extra</button>
  </div>
  <div class="filter-bar">
    <select id="fr-mes" class="filter-input font-medium" onchange="filterReceitas()">
      ${MESES.map((m,i)=>`<option value="${i+1}"${i+1===mes?' selected':''}>${m}</option>`).join('')}
    </select>
    <select id="fr-ano" class="filter-input font-medium" onchange="filterReceitas()">
      ${[2024,2025,2026,2027].map(y=>`<option value="${y}"${y===ano?' selected':''}>${y}</option>`).join('')}
    </select>
    <select id="fr-tipo" class="filter-input" onchange="filterReceitas()">
      <option value="">Todos os Tipos</option>
      <option value="Venda">Atendimento</option>
      <option value="Produto">Produto</option>
      <option value="Parceria">Parceria</option>
      <option value="Consultoria">Consultoria</option>
    </select>
  </div>
  <div id="rec-summary" class="summary-bar"></div>
  <div class="chart-card overflow-hidden p-0">
    <div class="overflow-x-auto">
      <table class="data-table">
        <thead><tr><th>Data</th><th>Descrição</th><th>Tipo</th><th>Valor</th><th>Pagamento</th><th>Ações</th></tr></thead>
        <tbody id="rec-tbody"></tbody>
      </table>
    </div>
  </div>`;
  filterReceitas();
}

function filterReceitas() {
  const mes = parseInt(document.getElementById('fr-mes')?.value || state.selectedMonth);
  const ano = parseInt(document.getElementById('fr-ano')?.value || state.selectedYear);
  const tipo = document.getElementById('fr-tipo')?.value;

  // Build combined list: vendas + extras
  const vendasRec = state.vendas
    .filter(v => isMesAno(v.data,mes,ano) && v.status!=='CANCELADO')
    .map(v => ({ id:v.id, data:v.data, descricao:`Atend.: ${v.cliente} – ${getServico(v.servicoId).nome}`, tipo:'Venda', valor:v.valor, formaPagamento:v.formaPagamento, isVenda:true }));
  const extras = state.receitasExtras
    .filter(r => isMesAno(r.data,mes,ano))
    .map(r => ({ ...r, tipo: r.tipo||'Extra', isVenda:false }));

  let all = [...vendasRec, ...extras].sort((a,b)=>b.data.localeCompare(a.data));
  if (tipo) all = all.filter(x => tipo==='Venda' ? x.isVenda : x.tipo===tipo);

  const total = somaArray(all, x=>x.valor);
  const sum = document.getElementById('rec-summary');
  if (sum) sum.innerHTML = `
    <div class="item"><div class="label">Registros</div><div class="value">${all.length}</div></div>
    <div class="item"><div class="label">Atendimentos</div><div class="value">${all.filter(x=>x.isVenda).length}</div></div>
    <div class="item"><div class="label">Extras</div><div class="value">${all.filter(x=>!x.isVenda).length}</div></div>
    <div class="item"><div class="label">Total</div><div class="value">${R$(total)}</div></div>
  `;

  const tb = document.getElementById('rec-tbody');
  if (!tb) return;
  if (all.length === 0) { tb.innerHTML = `<tr><td colspan="6" class="text-center py-12 text-gray-400">Nenhuma receita no período</td></tr>`; return; }
  tb.innerHTML = all.map(r => `<tr>
    <td>${fmtDate(r.data)}</td>
    <td class="${r.isVenda?'':'font-medium'}">${r.descricao}</td>
    <td><span class="badge ${r.isVenda?'badge-green':'badge-blue'}">${r.isVenda?'Atendimento':r.tipo}</span></td>
    <td class="font-bold text-emerald-700">${R$(r.valor)}</td>
    <td><span class="badge badge-gray">${r.formaPagamento}</span></td>
    <td>${r.isVenda
      ? `<button class="btn-edit" onclick="showVendaModal('${r.id}')">Ver Venda</button>`
      : `<button class="btn-edit" onclick="showReceitaModal('${r.id}')">Editar</button>
         <button class="btn-danger ml-1" onclick="deleteReceita('${r.id}')">Excluir</button>`
    }</td>
  </tr>`).join('');
}

function showReceitaModal(id) {
  const r = id ? state.receitasExtras.find(x=>x.id===id) : null;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">${r?'Editar Receita':'Nova Receita Extra'}</div>
      <div class="modal-subtitle">Receita não proveniente de atendimento</div>
    </div>
    <div class="modal-body">
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group"><label class="form-label">Data *</label>
          <input type="date" id="mr-data" class="form-control" value="${r?.data||new Date().toISOString().slice(0,10)}">
        </div>
        <div class="form-group"><label class="form-label">Tipo</label>
          <select id="mr-tipo" class="form-control">
            ${['Produto','Parceria','Consultoria','Outros'].map(t=>`<option value="${t}"${r?.tipo===t?' selected':''}>${t}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Descrição *</label>
        <input type="text" id="mr-desc" class="form-control" placeholder="Descrição da receita" value="${r?.descricao||''}">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group"><label class="form-label">Valor (R$) *</label>
          <input type="number" id="mr-valor" class="form-control" step="0.01" min="0" value="${r?.valor||''}">
        </div>
        <div class="form-group"><label class="form-label">Forma de Pagamento</label>
          <select id="mr-pgto" class="form-control">
            ${FORMAS_PAGAMENTO.map(f=>`<option value="${f}"${r?.formaPagamento===f?' selected':''}>${f}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveReceita('${id||''}')">Salvar</button>
    </div>`);
}

function saveReceita(id) {
  const data = document.getElementById('mr-data').value;
  const tipo = document.getElementById('mr-tipo').value;
  const descricao = document.getElementById('mr-desc').value.trim();
  const valor = parseFloat(document.getElementById('mr-valor').value);
  const formaPagamento = document.getElementById('mr-pgto').value;
  if (!data || !descricao || !valor) { showToast('Preencha todos os campos', 'error'); return; }
  if (id) {
    const idx = state.receitasExtras.findIndex(r=>r.id===id);
    if (idx>=0) state.receitasExtras[idx] = {id,data,tipo,descricao,valor,formaPagamento};
  } else {
    state.receitasExtras.push({id:uid(),data,tipo,descricao,valor,formaPagamento});
  }
  saveState(); closeModal(); filterReceitas();
  showToast('Receita salva!','success');
}

function deleteReceita(id) {
  if (!confirm('Excluir esta receita?')) return;
  state.receitasExtras = state.receitasExtras.filter(r=>r.id!==id);
  saveState(); filterReceitas(); showToast('Receita excluída','success');
}

// ============================================================
// FLUXO DE CAIXA
// ============================================================
function renderFluxo() {
  const mes = state.selectedMonth;
  const ano = state.selectedYear;

  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div><h2 class="page-title">Fluxo de Caixa</h2><p class="page-subtitle">Movimentação financeira do período</p></div>
    <div class="flex items-center gap-2">
      <select id="fl-mes" class="filter-input" onchange="fluxoChangePeriod()">
        ${MESES.map((m,i)=>`<option value="${i+1}"${i+1===mes?' selected':''}>${m}</option>`).join('')}
      </select>
      <select id="fl-ano" class="filter-input" onchange="fluxoChangePeriod()">
        ${[2024,2025,2026].map(y=>`<option value="${y}"${y===ano?' selected':''}>${y}</option>`).join('')}
      </select>
    </div>
  </div>
  ${buildFluxoContent(mes,ano)}`;

  setTimeout(()=>initFluxoChart(mes,ano),50);
}

function fluxoChangePeriod() {
  const mes = parseInt(document.getElementById('fl-mes').value);
  const ano = parseInt(document.getElementById('fl-ano').value);
  state.selectedMonth = mes; state.selectedYear = ano;
  const area = document.getElementById('fluxo-area');
  if (area) { area.outerHTML = buildFluxoContent(mes,ano); setTimeout(()=>initFluxoChart(mes,ano),50); }
}

function buildFluxoContent(mes,ano) {
  const entradas = [
    ...state.vendas.filter(v=>isMesAno(v.data,mes,ano)&&v.status!=='CANCELADO').map(v=>({data:v.data,desc:`Atend. ${v.cliente}`,tipo:'entrada',valor:v.valor})),
    ...state.receitasExtras.filter(r=>isMesAno(r.data,mes,ano)).map(r=>({data:r.data,desc:r.descricao,tipo:'entrada',valor:r.valor})),
  ];
  const saidas = [
    ...state.despesasVariaveis.filter(d=>isMesAno(d.data,mes,ano)).map(d=>({data:d.data,desc:d.descricao,tipo:'saida',valor:d.valor})),
  ];
  // Fixed expenses projected
  const fixas = state.despesasFixas.filter(d=>_despesaAtivaNoMes(d,mes,ano));
  fixas.forEach(f=>{
    const day = String(f.vencimento).padStart(2,'0');
    const m = String(mes).padStart(2,'0');
    saidas.push({data:`${ano}-${m}-${day}`,desc:`${f.nome} (fixa)`,tipo:'saida',valor:f.valor});
  });

  const all = [...entradas,...saidas].sort((a,b)=>a.data.localeCompare(b.data));
  const totalEnt = somaArray(entradas,x=>x.valor);
  const totalSai = somaArray(saidas,x=>x.valor);
  const saldo = totalEnt - totalSai;

  let saldoAcc = 0;
  const rows = all.map(item=>{
    if(item.tipo==='entrada') saldoAcc+=item.valor; else saldoAcc-=item.valor;
    return {
      ...item,
      saldoAcc,
      entrada: item.tipo==='entrada'?item.valor:0,
      saida: item.tipo==='saida'?item.valor:0
    };
  });

  return `<div id="fluxo-area">
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="kpi-card text-center">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Entradas</p>
        <p class="text-2xl font-bold text-emerald-600">${R$(totalEnt)}</p>
      </div>
      <div class="kpi-card text-center">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Saídas</p>
        <p class="text-2xl font-bold text-red-500">${R$(totalSai)}</p>
      </div>
      <div class="kpi-card text-center">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Saldo Líquido</p>
        <p class="text-2xl font-bold ${saldo>=0?'text-blue-600':'text-red-600'}">${R$(saldo)}</p>
      </div>
    </div>
    <div class="chart-card mb-6">
      <h3 class="font-bold text-gray-800 mb-4">Saldo Acumulado no Mês</h3>
      <canvas id="chartFluxo" height="160"></canvas>
    </div>
    <div class="chart-card overflow-hidden p-0">
      <div class="overflow-x-auto">
        <table class="data-table">
          <thead><tr><th>Data</th><th>Descrição</th><th>Tipo</th><th>Entrada</th><th>Saída</th><th>Saldo Acum.</th></tr></thead>
          <tbody>
            ${rows.length===0?`<tr><td colspan="6" class="text-center py-12 text-gray-400">Nenhuma movimentação no período</td></tr>`
              :rows.map(r=>`<tr>
                <td>${fmtDate(r.data)}</td>
                <td>${r.desc}</td>
                <td><span class="badge ${r.tipo==='entrada'?'badge-green':'badge-red'}">${r.tipo==='entrada'?'Entrada':'Saída'}</span></td>
                <td class="text-emerald-600 font-semibold">${r.entrada?R$(r.entrada):'—'}</td>
                <td class="text-red-500 font-semibold">${r.saida?R$(r.saida):'—'}</td>
                <td class="font-bold ${r.saldoAcc>=0?'text-blue-700':'text-red-700'}">${R$(r.saldoAcc)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function initFluxoChart(mes,ano) {
  const entradas = [
    ...state.vendas.filter(v=>isMesAno(v.data,mes,ano)&&v.status!=='CANCELADO').map(v=>({data:v.data,valor:v.valor,tipo:'e'})),
    ...state.receitasExtras.filter(r=>isMesAno(r.data,mes,ano)).map(r=>({data:r.data,valor:r.valor,tipo:'e'})),
  ];
  const saidas = [
    ...state.despesasVariaveis.filter(d=>isMesAno(d.data,mes,ano)).map(d=>({data:d.data,valor:d.valor,tipo:'s'})),
    ...state.despesasFixas.filter(d=>_despesaAtivaNoMes(d,mes,ano)).map(f=>{
      const day=String(f.vencimento).padStart(2,'0');
      return {data:`${ano}-${String(mes).padStart(2,'0')}-${day}`,valor:f.valor,tipo:'s'};
    }),
  ];
  const all = [...entradas,...saidas].sort((a,b)=>a.data.localeCompare(b.data));
  let acc=0;
  const labels=[], data=[];
  all.forEach(x=>{ acc+=(x.tipo==='e'?x.valor:-x.valor); labels.push(fmtDate(x.data)); data.push(acc); });
  mkChart('chartFluxo',{type:'line',data:{labels,datasets:[{label:'Saldo Acumulado',data,borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,0.08)',fill:true,tension:0.4,pointRadius:4,pointBackgroundColor:'#3b82f6'}]},options:{...chartDefaults,responsive:true,plugins:{...chartDefaults.plugins,tooltip:{callbacks:{label:c=>R$(c.raw)}}},scales:{y:{ticks:{callback:v=>R$(v)},grid:{color:'#f1f5f9'}},x:{grid:{display:false}}}}});
}

// ============================================================
// DESPESAS FIXAS
// ============================================================
function renderParcelasBadge(d) {
  if (!d.parcelado) return '<span class="text-gray-400 text-sm">—</span>';
  const cur = d.parcelaAtual || 0;
  const tot = d.totalParcelas || 0;
  const pct = tot > 0 ? Math.round((cur / tot) * 100) : 0;
  const isUltima = cur >= tot && tot > 0;
  const barColor = isUltima ? '#22c55e' : pct >= 75 ? '#f59e0b' : '#6366f1';
  const badge = isUltima
    ? `<span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:700">Última!</span>`
    : `<span style="background:#ede9fe;color:#5b21b6;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:700">${cur}/${tot}</span>`;
  return `<div class="flex flex-col items-start gap-1">
    ${badge}
    <div style="width:64px;height:5px;background:#e5e7eb;border-radius:9999px;overflow:hidden">
      <div style="width:${pct}%;height:100%;background:${barColor};border-radius:9999px;transition:width .3s"></div>
    </div>
  </div>`;
}

function _pgtoFixaKey(mes, ano) {
  return `${ano}-${String(mes).padStart(2,'0')}`;
}
function _isFixaPaga(d, mes, ano) {
  return !!(d.pagamentos && d.pagamentos[_pgtoFixaKey(mes, ano)]);
}
function _despesaAtivaNoMes(d, mes, ano) {
  if (d.status !== 'ATIVA') return false;
  if (_pgtoFixaKey(mes, ano) < '2026-01') return false; // nunca mostrar antes de jan/2026
  if (!d.dataInicio) return true; // registros antigos sem dataInicio: sempre visíveis
  return d.dataInicio <= _pgtoFixaKey(mes, ano);
}

function renderDespesasFixas() {
  const mes = state.selectedMonth, ano = state.selectedYear;
  const ativas = state.despesasFixas.filter(d=>_despesaAtivaNoMes(d,mes,ano));
  const total = somaArray(ativas, d=>d.valor);
  const pagas = ativas.filter(d=>_isFixaPaga(d,mes,ano));
  const totalPago = somaArray(pagas, d=>d.valor);
  const totalPendente = total - totalPago;
  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div><h2 class="page-title">Despesas Fixas</h2><p class="page-subtitle">Custos fixos — ${MESES[mes-1]} ${ano}</p></div>
    <button class="btn-primary" onclick="showDespesaFixaModal(null)">+ Nova Despesa Fixa</button>
  </div>
  <div class="summary-bar mb-6">
    <div class="item"><div class="label">Despesas Ativas</div><div class="value">${ativas.length}</div></div>
    <div class="item"><div class="label">Custo Fixo Mensal</div><div class="value">${R$(total)}</div></div>
    <div class="item"><div class="label" style="color:#15803d">✓ Pagas no Mês</div><div class="value" style="color:#15803d">${R$(totalPago)}</div></div>
    <div class="item"><div class="label" style="color:#dc2626">○ Pendentes</div><div class="value" style="color:#dc2626">${R$(totalPendente)}</div></div>
  </div>
  <div class="filter-bar">
    <select id="fdf-mes" class="filter-input font-medium" onchange="filterDespFixas()">
      ${MESES.map((m,i)=>`<option value="${i+1}"${i+1===mes?' selected':''}>${m}</option>`).join('')}
    </select>
    <select id="fdf-ano" class="filter-input font-medium" onchange="filterDespFixas()">
      ${[2024,2025,2026,2027].map(y=>`<option value="${y}"${y===ano?' selected':''}>${y}</option>`).join('')}
    </select>
    <select id="fdf-cat" class="filter-input" onchange="filterDespFixas()">
      <option value="">Todas as Categorias</option>
      ${CATEGORIAS_DESPESA.map(c=>`<option value="${c}">${c}</option>`).join('')}
    </select>
    <select id="fdf-pgto" class="filter-input" onchange="filterDespFixas()">
      <option value="">Todos os Status</option>
      <option value="pendente">○ Pendente</option>
      <option value="pago">✓ Pago</option>
    </select>
    <select id="fdf-status" class="filter-input" onchange="filterDespFixas()">
      <option value="">Ativas e Inativas</option>
      <option value="ATIVA">Somente Ativas</option>
      <option value="INATIVA">Somente Inativas</option>
    </select>
    <input type="text" id="fdf-busca" class="filter-input" placeholder="Buscar por nome..." style="flex:1;min-width:150px"
      oninput="filterDespFixas()" onkeydown="if(event.key==='Enter')filterDespFixas()">
  </div>
  <div class="chart-card overflow-hidden p-0">
    <div class="overflow-x-auto">
      <table class="data-table">
        <thead><tr><th>Nome</th><th>Categoria</th><th>Valor</th><th>Vencimento</th><th>Parcelas</th><th>Status Pgto</th><th>Ações</th></tr></thead>
        <tbody id="df-tbody"></tbody>
      </table>
    </div>
  </div>`;
  filterDespFixas();
}

function filterDespFixas() {
  const mes    = parseInt(document.getElementById('fdf-mes')?.value || state.selectedMonth);
  const ano    = parseInt(document.getElementById('fdf-ano')?.value || state.selectedYear);
  const cat    = document.getElementById('fdf-cat')?.value;
  const pgto   = document.getElementById('fdf-pgto')?.value;
  const status = document.getElementById('fdf-status')?.value;

  state.selectedMonth = mes; state.selectedYear = ano;

  const busca = (document.getElementById('fdf-busca')?.value || '').toLowerCase().trim();
  let desp = [...state.despesasFixas]
    .filter(d => !d.dataInicio || d.dataInicio <= _pgtoFixaKey(mes, ano))
    .sort((a,b)=>a.vencimento-b.vencimento);
  if (cat)    desp = desp.filter(d=>d.categoria===cat);
  if (status) desp = desp.filter(d=>d.status===status);
  if (pgto === 'pago')     desp = desp.filter(d=> _isFixaPaga(d,mes,ano));
  if (pgto === 'pendente') desp = desp.filter(d=>!_isFixaPaga(d,mes,ano));
  if (busca)  desp = desp.filter(d=>(d.nome||'').toLowerCase().includes(busca) || (d.observacao||'').toLowerCase().includes(busca));

  const ativas = state.despesasFixas.filter(d=>_despesaAtivaNoMes(d,mes,ano));
  const total = somaArray(ativas, d=>d.valor);
  const pagas = ativas.filter(d=>_isFixaPaga(d,mes,ano));
  const totalPago = somaArray(pagas, d=>d.valor);
  const totalPendente = total - totalPago;

  const tb = document.getElementById('df-tbody');
  if (!tb) return;
  if (!desp.length) {
    tb.innerHTML = `<tr><td colspan="7" class="text-center py-12 text-gray-400">Nenhuma despesa encontrada</td></tr>
      <tr style="background:#f8fafc"><td colspan="2" class="font-bold px-4 py-3 text-gray-700">TOTAL MENSAL</td>
      <td class="font-bold text-red-600 px-4 py-3">${R$(total)}</td><td colspan="2"></td>
      <td class="px-4 py-3 text-xs font-semibold" style="color:#15803d">Pago: ${R$(totalPago)}<br><span style="color:#dc2626">Pendente: ${R$(totalPendente)}</span></td><td></td></tr>`;
    return;
  }
  tb.innerHTML = desp.map(d=>{
    const pago   = _isFixaPaga(d,mes,ano);
    const inativa = d.status !== 'ATIVA';
    return `<tr style="${inativa?'opacity:0.5':''}">
      <td>
        <div class="font-semibold">${d.nome}</div>
        ${d.observacao ? `<div class="text-xs text-gray-400 mt-0.5 italic">${d.observacao}</div>` : ''}
      </td>
      <td><span class="badge badge-gray">${d.categoria}</span></td>
      <td class="font-bold ${pago?'text-gray-400 line-through':'text-red-600'}">${R$(d.valor)}</td>
      <td>Dia ${d.vencimento}</td>
      <td>${renderParcelasBadge(d)}</td>
      <td>
        <button onclick="togglePagamentoFixa('${d.id}')"
          style="background:${pago?'#dcfce7':'#fef2f2'};color:${pago?'#15803d':'#dc2626'};border:1px solid ${pago?'#bbf7d0':'#fecaca'};padding:5px 12px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .15s">
          ${pago ? '✓ Pago' : '○ Pendente'}
        </button>
      </td>
      <td class="whitespace-nowrap">
        <button class="btn-edit" onclick="showDespesaFixaModal('${d.id}')">Editar</button>
        <button class="btn-danger ml-1" onclick="deleteDespesaFixa('${d.id}')">Excluir</button>
      </td>
    </tr>`;
  }).join('') + `<tr style="background:#f8fafc">
    <td colspan="2" class="font-bold px-4 py-3 text-gray-700">TOTAL MENSAL</td>
    <td class="font-bold text-red-600 px-4 py-3">${R$(total)}</td>
    <td colspan="2"></td>
    <td class="px-4 py-3 text-xs font-semibold" style="color:#15803d">Pago: ${R$(totalPago)}<br><span style="color:#dc2626">Pendente: ${R$(totalPendente)}</span></td>
    <td></td>
  </tr>`;
}

function togglePagamentoFixa(id) {
  const mes = state.selectedMonth, ano = state.selectedYear;
  const key = _pgtoFixaKey(mes, ano);
  const d = state.despesasFixas.find(x=>x.id===id);
  if (!d) return;
  if (!d.pagamentos) d.pagamentos = {};
  d.pagamentos[key] = !d.pagamentos[key];
  saveState();
  renderDespesasFixas();
  showToast(d.pagamentos[key] ? `✓ ${d.nome} marcado como pago` : `${d.nome} marcado como pendente`, d.pagamentos[key]?'success':'error');
}

function showDespesaFixaModal(id) {
  const d = id ? state.despesasFixas.find(x=>x.id===id) : null;
  const isParc = d?.parcelado || false;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">${d?'Editar':'Nova'} Despesa Fixa</div>
    </div>
    <div class="modal-body">
      <div class="form-group"><label class="form-label">Nome *</label>
        <input type="text" id="mdf-nome" class="form-control" placeholder="Ex: Aluguel" value="${d?.nome||''}">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group"><label class="form-label">Categoria</label>
          <select id="mdf-cat" class="form-control">
            ${CATEGORIAS_DESPESA.map(c=>`<option value="${c}"${d?.categoria===c?' selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Status</label>
          <select id="mdf-status" class="form-control">
            <option value="ATIVA"${d?.status==='ATIVA'?' selected':''}>Ativa</option>
            <option value="INATIVA"${d?.status==='INATIVA'?' selected':''}>Inativa</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group"><label class="form-label">Valor Mensal (R$) *</label>
          <input type="number" id="mdf-valor" class="form-control" step="0.01" min="0" value="${d?.valor||''}">
        </div>
        <div class="form-group"><label class="form-label">Dia de Vencimento</label>
          <input type="number" id="mdf-venc" class="form-control" min="1" max="31" value="${d?.vencimento||1}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label flex items-center gap-2 cursor-pointer select-none" style="width:fit-content">
          <input type="checkbox" id="mdf-parcelado" ${isParc?'checked':''} onchange="toggleParcelasFields()"
            style="width:18px;height:18px;accent-color:#6366f1;cursor:pointer">
          <span>Despesa parcelada?</span>
        </label>
      </div>
      <div id="mdf-parcelas-section" class="${isParc?'':'hidden'}">
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group"><label class="form-label">Parcela Atual</label>
            <input type="number" id="mdf-parcela-atual" class="form-control" min="1" placeholder="Ex: 3" value="${d?.parcelaAtual||''}">
          </div>
          <div class="form-group"><label class="form-label">Total de Parcelas</label>
            <input type="number" id="mdf-total-parcelas" class="form-control" min="1" placeholder="Ex: 12" value="${d?.totalParcelas||''}">
          </div>
        </div>
        <div id="mdf-parcelas-preview" class="text-sm text-indigo-700 font-medium p-2 rounded-lg mb-2" style="background:#ede9fe;display:${isParc?'block':'none'}">
          ${isParc && d?.parcelaAtual && d?.totalParcelas ? _parcelasPreviewText(d.parcelaAtual, d.totalParcelas) : ''}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Observação</label>
        <textarea id="mdf-obs" class="form-control" rows="2" placeholder="Comentários adicionais sobre esta despesa...">${d?.observacao||''}</textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveDespesaFixa('${id||''}')">Salvar</button>
    </div>`);
  if (isParc) {
    document.getElementById('mdf-parcela-atual')?.addEventListener('input', _atualizarPreviewParcelas);
    document.getElementById('mdf-total-parcelas')?.addEventListener('input', _atualizarPreviewParcelas);
  }
}

function _parcelasPreviewText(cur, tot) {
  const restam = tot - cur;
  if (cur >= tot) return '✅ Última parcela — quitação neste mês!';
  return `📋 Parcela ${cur} de ${tot} — restam ${restam} parcela${restam>1?'s':''}`;
}

function _atualizarPreviewParcelas() {
  const cur = parseInt(document.getElementById('mdf-parcela-atual')?.value||'0');
  const tot = parseInt(document.getElementById('mdf-total-parcelas')?.value||'0');
  const prev = document.getElementById('mdf-parcelas-preview');
  if (!prev) return;
  if (cur > 0 && tot > 0) {
    prev.textContent = _parcelasPreviewText(cur, tot);
    prev.style.display = 'block';
  } else {
    prev.style.display = 'none';
  }
}

function toggleParcelasFields() {
  const checked = document.getElementById('mdf-parcelado')?.checked;
  const section = document.getElementById('mdf-parcelas-section');
  const preview = document.getElementById('mdf-parcelas-preview');
  if (section) section.classList.toggle('hidden', !checked);
  if (preview) preview.style.display = checked ? 'block' : 'none';
  if (checked) {
    document.getElementById('mdf-parcela-atual')?.addEventListener('input', _atualizarPreviewParcelas);
    document.getElementById('mdf-total-parcelas')?.addEventListener('input', _atualizarPreviewParcelas);
  }
}

function saveDespesaFixa(id) {
  const nome = document.getElementById('mdf-nome').value.trim();
  const categoria = document.getElementById('mdf-cat').value;
  const status = document.getElementById('mdf-status').value;
  const valor = parseFloat(document.getElementById('mdf-valor').value);
  const vencimento = parseInt(document.getElementById('mdf-venc').value);
  const parcelado = document.getElementById('mdf-parcelado')?.checked || false;
  const totalParcelas = parcelado ? (parseInt(document.getElementById('mdf-total-parcelas')?.value)||null) : null;
  const parcelaAtual = parcelado ? (parseInt(document.getElementById('mdf-parcela-atual')?.value)||null) : null;
  const observacao = (document.getElementById('mdf-obs')?.value||'').trim();
  if (!nome||!valor) { showToast('Preencha os campos obrigatórios','error'); return; }
  if (parcelado && (!totalParcelas || !parcelaAtual)) { showToast('Informe a parcela atual e o total de parcelas','error'); return; }
  const existing = id ? state.despesasFixas.find(d=>d.id===id) : null;
  const pagamentos = existing?.pagamentos || {};
  const dataInicio = existing?.dataInicio || _pgtoFixaKey(state.selectedMonth, state.selectedYear);
  const obj = {id:id||uid(),nome,categoria,valor,vencimento,status,parcelado,totalParcelas,parcelaAtual,observacao,pagamentos,dataInicio};
  if(id){const idx=state.despesasFixas.findIndex(d=>d.id===id);if(idx>=0)state.despesasFixas[idx]=obj;}
  else state.despesasFixas.push(obj);
  saveState(); closeModal(); renderDespesasFixas(); showToast('Despesa salva!','success');
}

function deleteDespesaFixa(id) {
  if (!confirm('Excluir esta despesa fixa?')) return;
  state.despesasFixas = state.despesasFixas.filter(d=>d.id!==id);
  saveState(); renderDespesasFixas(); showToast('Excluída','success');
}

// ============================================================
// DESPESAS VARIÁVEIS
// ============================================================
function renderDespesasVariaveis() {
  const mes = state.selectedMonth;
  const ano = state.selectedYear;
  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div><h2 class="page-title">Despesas Variáveis</h2><p class="page-subtitle">Gastos variáveis por período</p></div>
    <button class="btn-primary" onclick="showDespesaVarModal(null)">+ Nova Despesa</button>
  </div>
  <div class="filter-bar">
    <select id="fdv-mes" class="filter-input font-medium" onchange="filterDespVar()">
      ${MESES.map((m,i)=>`<option value="${i+1}"${i+1===mes?' selected':''}>${m}</option>`).join('')}
    </select>
    <select id="fdv-ano" class="filter-input font-medium" onchange="filterDespVar()">
      ${[2024,2025,2026,2027].map(y=>`<option value="${y}"${y===ano?' selected':''}>${y}</option>`).join('')}
    </select>
    <select id="fdv-cat" class="filter-input" onchange="filterDespVar()">
      <option value="">Todas as Categorias</option>
      ${CATEGORIAS_DESPESA.map(c=>`<option value="${c}">${c}</option>`).join('')}
    </select>
    <select id="fdv-pgto" class="filter-input" onchange="filterDespVar()">
      <option value="">Todas as Formas</option>
      ${FORMAS_PAGAMENTO.map(f=>`<option value="${f}">${f}</option>`).join('')}
    </select>
    <select id="fdv-comp" class="filter-input" onchange="filterDespVar()">
      <option value="">Compensação: Todas</option>
      <option value="pendente">○ Pendentes</option>
      <option value="pago">✓ Pagas</option>
    </select>
    <input type="text" id="fdv-busca" class="filter-input" placeholder="Buscar por descrição..." style="flex:1;min-width:150px"
      oninput="filterDespVar()" onkeydown="if(event.key==='Enter')filterDespVar()">
  </div>
  <div id="dv-summary" class="summary-bar"></div>
  <div class="chart-card overflow-hidden p-0">
    <div class="overflow-x-auto">
      <table class="data-table">
        <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th><th>Forma Pgto</th><th>Compensação</th><th>Ações</th></tr></thead>
        <tbody id="dv-tbody"></tbody>
      </table>
    </div>
  </div>`;
  filterDespVar();
}

function filterDespVar() {
  const mes  = parseInt(document.getElementById('fdv-mes')?.value || state.selectedMonth);
  const ano  = parseInt(document.getElementById('fdv-ano')?.value || state.selectedYear);
  const cat  = document.getElementById('fdv-cat')?.value;
  const pgto = document.getElementById('fdv-pgto')?.value;
  const comp = document.getElementById('fdv-comp')?.value;
  const busca = (document.getElementById('fdv-busca')?.value || '').toLowerCase().trim();
  let desp = [...state.despesasVariaveis].filter(d=>isMesAno(d.data,mes,ano)).sort((a,b)=>b.data.localeCompare(a.data));
  if (cat)  desp = desp.filter(d=>d.categoria===cat);
  if (pgto) desp = desp.filter(d=>d.formaPagamento===pgto);
  if (comp === 'pago')     desp = desp.filter(d=> d.pago);
  if (comp === 'pendente') desp = desp.filter(d=>!d.pago);
  if (busca) desp = desp.filter(d=>(d.descricao||'').toLowerCase().includes(busca) || (d.observacao||'').toLowerCase().includes(busca));
  const total = somaArray(desp,d=>d.valor);
  const totalPago = somaArray(desp.filter(d=>d.pago), d=>d.valor);
  const totalPendente = total - totalPago;
  const sum = document.getElementById('dv-summary');
  if(sum) sum.innerHTML=`
    <div class="item"><div class="label">Lançamentos</div><div class="value">${desp.length}</div></div>
    <div class="item"><div class="label">Total do Período</div><div class="value">${R$(total)}</div></div>
    <div class="item"><div class="label" style="color:#15803d">✓ Pago</div><div class="value" style="color:#15803d">${R$(totalPago)}</div></div>
    <div class="item"><div class="label" style="color:#dc2626">○ Pendente</div><div class="value" style="color:#dc2626">${R$(totalPendente)}</div></div>
  `;
  const tb = document.getElementById('dv-tbody');
  if(!tb)return;
  if(!desp.length){tb.innerHTML=`<tr><td colspan="7" class="text-center py-12 text-gray-400">Nenhuma despesa no período</td></tr>`;return;}
  tb.innerHTML = desp.map(d=>`<tr>
    <td>${fmtDate(d.data)}</td>
    <td class="font-medium ${d.pago?'text-gray-400':''}">
      <div>${d.descricao}</div>
      ${d.observacao ? `<div class="text-xs text-gray-400 mt-0.5 italic">${d.observacao}</div>` : ''}
    </td>
    <td><span class="badge badge-gray">${d.categoria}</span></td>
    <td class="font-bold ${d.pago?'text-gray-400 line-through':'text-red-600'}">${R$(d.valor)}</td>
    <td><span class="badge badge-blue">${d.formaPagamento}</span></td>
    <td>
      <button onclick="togglePagamentoDespVar('${d.id}')"
        style="background:${d.pago?'#dcfce7':'#fef2f2'};color:${d.pago?'#15803d':'#dc2626'};border:1px solid ${d.pago?'#bbf7d0':'#fecaca'};padding:5px 12px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .15s">
        ${d.pago ? '✓ Pago' : '○ Pendente'}
      </button>
    </td>
    <td class="whitespace-nowrap">
      <button class="btn-edit" onclick="showDespesaVarModal('${d.id}')">Editar</button>
      <button class="btn-danger ml-1" onclick="deleteDespVar('${d.id}')">Excluir</button>
    </td>
  </tr>`).join('');
}

function showDespesaVarModal(id) {
  const d = id ? state.despesasVariaveis.find(x=>x.id===id) : null;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">${d?'Editar':'Nova'} Despesa Variável</div>
    </div>
    <div class="modal-body">
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group"><label class="form-label">Data *</label>
          <input type="date" id="mdv-data" class="form-control" value="${d?.data||new Date().toISOString().slice(0,10)}">
        </div>
        <div class="form-group"><label class="form-label">Categoria</label>
          <select id="mdv-cat" class="form-control">
            ${CATEGORIAS_DESPESA.map(c=>`<option value="${c}"${d?.categoria===c?' selected':''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Descrição *</label>
        <input type="text" id="mdv-desc" class="form-control" placeholder="Descrição da despesa" value="${d?.descricao||''}">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group"><label class="form-label">Valor (R$) *</label>
          <input type="number" id="mdv-valor" class="form-control" step="0.01" min="0" value="${d?.valor||''}">
        </div>
        <div class="form-group"><label class="form-label">Forma de Pagamento</label>
          <select id="mdv-pgto" class="form-control">
            ${FORMAS_PAGAMENTO.map(f=>`<option value="${f}"${d?.formaPagamento===f?' selected':''}>${f}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Observações</label>
        <input type="text" id="mdv-obs" class="form-control" placeholder="Observações adicionais (opcional)" value="${d?.observacao||''}">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveDespVar('${id||''}')">Salvar</button>
    </div>`);
}

function saveDespVar(id) {
  const data=document.getElementById('mdv-data').value;
  const categoria=document.getElementById('mdv-cat').value;
  const descricao=document.getElementById('mdv-desc').value.trim();
  const valor=parseFloat(document.getElementById('mdv-valor').value);
  const formaPagamento=document.getElementById('mdv-pgto').value;
  const observacao=(document.getElementById('mdv-obs')?.value||'').trim();
  if(!data||!descricao||!valor){showToast('Preencha os campos obrigatórios','error');return;}
  const pago = (id && state.despesasVariaveis.find(d=>d.id===id)?.pago) || false;
  if(id){const idx=state.despesasVariaveis.findIndex(d=>d.id===id);if(idx>=0)state.despesasVariaveis[idx]={id,data,categoria,descricao,valor,formaPagamento,pago,observacao};}
  else state.despesasVariaveis.push({id:uid(),data,categoria,descricao,valor,formaPagamento,pago:false,observacao});
  saveState();closeModal();filterDespVar();showToast('Despesa salva!','success');
}

function togglePagamentoDespVar(id) {
  const d = state.despesasVariaveis.find(x=>x.id===id);
  if (!d) return;
  d.pago = !d.pago;
  saveState();
  filterDespVar();
  showToast(d.pago ? `✓ ${d.descricao} marcado como pago` : `${d.descricao} marcado como pendente`, d.pago?'success':'error');
}

function deleteDespVar(id) {
  if(!confirm('Excluir esta despesa?'))return;
  state.despesasVariaveis=state.despesasVariaveis.filter(d=>d.id!==id);
  saveState();filterDespVar();showToast('Excluída','success');
}

// ============================================================
// PROFISSIONAIS
// ============================================================
function renderProfissionais() {
  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div><h2 class="page-title">Profissionais</h2><p class="page-subtitle">Equipe Vivaci</p></div>
    <button class="btn-primary" onclick="showProfModal(null)">+ Novo Profissional</button>
  </div>
  <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(300px,1fr))">
    ${state.profissionais.map(p=>{
      const mes=state.selectedMonth, ano=state.selectedYear;
      const vend=getVendasMes(mes,ano).filter(v=>v.profissionalId===p.id);
      const total=somaArray(vend,v=>v.valor);
      const com=total*(p.comissaoPct/100);
      return `<div class="kpi-card">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style="background:linear-gradient(135deg,#ec4899,#8b5cf6)">${p.nome.charAt(0)}</div>
            <div>
              <p class="font-bold text-gray-800">${p.nome}</p>
              <div class="flex items-center gap-2 mt-1">${badgeTipo(p.tipo)}<span class="badge ${p.ativo?'badge-green':'badge-gray'}">${p.ativo?'Ativo':'Inativo'}</span></div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3 mb-4">
          <div class="text-center p-2 rounded-lg" style="background:#f8fafc">
            <p class="text-xs text-gray-500">Comissão</p>
            <p class="font-bold text-purple-600">${p.comissaoPct}%</p>
          </div>
          <div class="text-center p-2 rounded-lg" style="background:#f8fafc">
            <p class="text-xs text-gray-500">Atendimentos</p>
            <p class="font-bold text-blue-600">${vend.length}</p>
          </div>
          <div class="text-center p-2 rounded-lg" style="background:#f8fafc">
            <p class="text-xs text-gray-500">Comissão</p>
            <p class="font-bold text-emerald-600" style="font-size:11px">${R$(com)}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="btn-edit" style="flex:1;justify-content:center" onclick="showProfModal('${p.id}')">Editar</button>
          <button class="btn-danger" onclick="deleteProf('${p.id}')">Excluir</button>
        </div>
      </div>`;}).join('')}
  </div>`;
}

function showProfModal(id) {
  const p = id ? state.profissionais.find(x=>x.id===id) : null;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">${p?'Editar':'Novo'} Profissional</div>
    </div>
    <div class="modal-body">
      <div class="form-group"><label class="form-label">Nome Completo *</label>
        <input type="text" id="mp-nome" class="form-control" placeholder="Nome do profissional" value="${p?.nome||''}">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group"><label class="form-label">Tipo / Função *</label>
          <select id="mp-tipo" class="form-control">
            ${TIPOS_PROFISSIONAL.map(t=>`<option value="${t}"${p?.tipo===t?' selected':''}>${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">% Comissão</label>
          <input type="number" id="mp-com" class="form-control" min="0" max="100" step="0.5" value="${p?.comissaoPct||0}">
        </div>
      </div>
      <div class="form-group"><label class="form-label">Status</label>
        <select id="mp-ativo" class="form-control">
          <option value="true"${p?.ativo!==false?' selected':''}>Ativo</option>
          <option value="false"${p?.ativo===false?' selected':''}>Inativo</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveProf('${id||''}')">Salvar</button>
    </div>`);
}

function saveProf(id) {
  const nome=document.getElementById('mp-nome').value.trim();
  const tipo=document.getElementById('mp-tipo').value;
  const comissaoPct=parseFloat(document.getElementById('mp-com').value)||0;
  const ativo=document.getElementById('mp-ativo').value==='true';
  if(!nome){showToast('Informe o nome','error');return;}
  if(id){const idx=state.profissionais.findIndex(p=>p.id===id);if(idx>=0)state.profissionais[idx]={id,nome,tipo,comissaoPct,ativo};}
  else state.profissionais.push({id:uid(),nome,tipo,comissaoPct,ativo});
  saveState();closeModal();renderProfissionais();showToast('Profissional salvo!','success');
}

function deleteProf(id) {
  if(state.vendas.some(v=>v.profissionalId===id)){showToast('Profissional possui vendas vinculadas','error');return;}
  if(!confirm('Excluir este profissional?'))return;
  state.profissionais=state.profissionais.filter(p=>p.id!==id);
  saveState();renderProfissionais();showToast('Excluído','success');
}

// ============================================================
// SERVIÇOS
// ============================================================
function renderServicos() {
  const c = document.getElementById('page-content');
  c.innerHTML = `
  <div class="page-header">
    <div><h2 class="page-title">Serviços</h2><p class="page-subtitle">Catálogo de procedimentos e preços</p></div>
    <button class="btn-primary" onclick="showServModal(null)">+ Novo Serviço</button>
  </div>
  <div class="filter-bar">
    <select id="fs-cat" class="filter-input" onchange="filterServicos()">
      <option value="">Todas Categorias</option>
      ${CATEGORIAS_SERVICO.map(c=>`<option value="${c}">${c}</option>`).join('')}
    </select>
  </div>
  <div id="serv-grid" class="chart-card overflow-hidden p-0">
    <div class="overflow-x-auto">
      <table class="data-table" id="serv-table">
        <thead><tr><th>Serviço</th><th>Categoria</th><th>Preço</th><th>Duração</th><th>Vendas (mês)</th><th>Ações</th></tr></thead>
        <tbody id="serv-tbody"></tbody>
      </table>
    </div>
  </div>`;
  filterServicos();
}

function filterServicos() {
  const cat = document.getElementById('fs-cat')?.value;
  let servs = [...state.servicos].sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
  if(cat) servs=servs.filter(s=>s.categoria===cat);
  const mes=state.selectedMonth,ano=state.selectedYear;
  const tb=document.getElementById('serv-tbody');
  if(!tb)return;
  if(!servs.length){tb.innerHTML=`<tr><td colspan="6" class="text-center py-12 text-gray-400">Nenhum serviço</td></tr>`;return;}
  tb.innerHTML=servs.map(s=>{
    const qtd=state.vendas.filter(v=>v.servicoId===s.id&&isMesAno(v.data,mes,ano)&&v.status!=='CANCELADO').length;
    return `<tr>
      <td class="font-semibold text-gray-800">${s.nome}</td>
      <td><span class="badge badge-purple">${s.categoria}</span></td>
      <td class="font-bold text-emerald-700">${R$(s.preco)}</td>
      <td>${s.duracao} min</td>
      <td><span class="badge badge-blue">${qtd}x</span></td>
      <td class="whitespace-nowrap">
        <button class="btn-edit" onclick="showServModal('${s.id}')">Editar</button>
        <button class="btn-danger ml-1" onclick="deleteServ('${s.id}')">Excluir</button>
      </td>
    </tr>`;}).join('');
}

function showServModal(id) {
  const s = id ? state.servicos.find(x=>x.id===id) : null;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">${s?'Editar':'Novo'} Serviço</div>
    </div>
    <div class="modal-body">
      <div class="form-group"><label class="form-label">Nome do Serviço *</label>
        <input type="text" id="ms-nome" class="form-control" placeholder="Ex: Botox Frontal" value="${s?.nome||''}">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group"><label class="form-label">Categoria</label>
          <select id="ms-cat" class="form-control">
            ${CATEGORIAS_SERVICO.map(c=>`<option value="${c}"${s?.categoria===c?' selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Duração (min)</label>
          <input type="number" id="ms-dur" class="form-control" min="5" step="5" value="${s?.duracao||60}">
        </div>
      </div>
      <div class="form-group"><label class="form-label">Preço Padrão (R$) *</label>
        <input type="number" id="ms-preco" class="form-control" step="0.01" min="0" value="${s?.preco||''}">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveServ('${id||''}')">Salvar</button>
    </div>`);
}

function saveServ(id) {
  const nome=document.getElementById('ms-nome').value.trim();
  const categoria=document.getElementById('ms-cat').value;
  const duracao=parseInt(document.getElementById('ms-dur').value)||60;
  const preco=parseFloat(document.getElementById('ms-preco').value);
  if(!nome||!preco){showToast('Preencha nome e preço','error');return;}
  if(id){const idx=state.servicos.findIndex(s=>s.id===id);if(idx>=0)state.servicos[idx]={id,nome,categoria,duracao,preco};}
  else state.servicos.push({id:uid(),nome,categoria,duracao,preco});
  saveState();closeModal();filterServicos();showToast('Serviço salvo!','success');
}

function deleteServ(id) {
  if(state.vendas.some(v=>v.servicoId===id)){showToast('Serviço possui vendas vinculadas','error');return;}
  if(!confirm('Excluir este serviço?'))return;
  state.servicos=state.servicos.filter(s=>s.id!==id);
  saveState();renderServicos();showToast('Excluído','success');
}

// ============================================================
// MODAL
// ============================================================
function showModal(html) {
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-box').innerHTML = '';
}
document.getElementById('modal-overlay').addEventListener('click', function(e){
  if(e.target===this) closeModal();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

// ============================================================
// TOAST
// ============================================================
let toastTimer;
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-semibold shadow-xl animate-slide-in ${type==='success'?'toast-success':'toast-error'}`;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.add('hidden'), 3000);
}

// ============================================================
// INICIALIZAÇÃO (chamada pelo auth.js após login bem-sucedido)
// ============================================================
function initApp() {
  loadState();

  // @ts-ignore — getSession e updateHeaderUser definidos em auth.js
  const session = getSession();
  // @ts-ignore
  if (session) updateHeaderUser(session);

  // Sincroniza nome no menu dropdown também
  const menuName = document.getElementById('user-menu-name');
  if (menuName && session) menuName.textContent = session.nome;

  // Data atual no header
  const now = new Date();
  document.getElementById('current-date-display').textContent =
    now.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

  // Período padrão: mês atual
  state.selectedMonth = now.getMonth()+1;
  state.selectedYear = now.getFullYear();

  buildSidebar();
  navigate('dashboard');

  // Inicia sistema de notificações
  if (typeof updateNotifBadge === 'function') updateNotifBadge();
  if (typeof checkStartupAlerts === 'function') checkStartupAlerts();
}

// Ponto de entrada — auth decide se mostra login ou chama initApp()
if (typeof authBootstrap === 'function') {
  const autenticado = authBootstrap();
  if (autenticado) initApp();
} else {
  initApp();
}
