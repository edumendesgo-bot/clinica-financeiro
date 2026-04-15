'use strict';

// ============================================================
// UTILITÁRIO: CABEÇALHO PADRÃO DOS PDFs
// ============================================================
function pdfHeader(doc, titulo, periodo) {
  const W = doc.internal.pageSize.width;

  // Fundo escuro
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, W, 44, 'F');

  // Linha rosa
  doc.setFillColor(236, 72, 153);
  doc.rect(0, 44, W, 2.5, 'F');

  // Nome da clínica
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Vivaci Estetica Avancada', 14, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 165, 220);
  doc.text('Vivaci Estetica Avancada', 14, 26);

  // Título do relatório
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(titulo, 14, 37);

  // Período e data de geração (lado direito)
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 185, 235);
  if (periodo) doc.text('Periodo: ' + periodo, W - 14, 30, { align: 'right' });
  const agora = new Date().toLocaleDateString('pt-BR') + ' ' +
    new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  doc.text('Gerado: ' + agora, W - 14, 38, { align: 'right' });

  doc.setTextColor(0, 0, 0);
  return 54;
}

// ============================================================
// UTILITÁRIO: RODAPÉ COM NÚMERO DE PÁGINAS
// ============================================================
function pdfFooter(doc) {
  const total = doc.internal.getNumberOfPages();
  const W = doc.internal.pageSize.width;
  const H = doc.internal.pageSize.height;
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFillColor(248, 250, 252);
    doc.rect(0, H - 12, W, 12, 'F');
    doc.setDrawColor(220, 220, 230);
    doc.line(0, H - 12, W, H - 12);
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 165);
    doc.setFont('helvetica', 'normal');
    doc.text('Vivaci Estetica Avancada  |  Vivaci Estetica Avancada  |  Sistema Financeiro', 14, H - 4);
    doc.text('Pagina ' + i + ' de ' + total, W - 14, H - 4, { align: 'right' });
  }
}

// ============================================================
// UTILITÁRIO: CARDS DE RESUMO
// ============================================================
function pdfSummaryCards(doc, y, cards) {
  const W = doc.internal.pageSize.width;
  const margin = 14;
  const gap = 5;
  const cardW = (W - margin * 2 - gap * (cards.length - 1)) / cards.length;

  cards.forEach((card, i) => {
    const x = margin + i * (cardW + gap);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, y, cardW, 24, 3, 3, 'F');
    doc.setDrawColor(220, 225, 235);
    doc.roundedRect(x, y, cardW, 24, 3, 3, 'S');

    // Barra colorida no topo do card
    const [r, g, b] = card.color || [30, 27, 75];
    doc.setFillColor(r, g, b);
    doc.roundedRect(x, y, cardW, 3, 1.5, 1.5, 'F');

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 140);
    doc.text(card.label.toUpperCase(), x + cardW / 2, y + 10, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r, g, b);
    doc.text(card.value, x + cardW / 2, y + 20, { align: 'center' });
  });

  doc.setTextColor(0, 0, 0);
  return y + 32;
}

// ============================================================
// UTILITÁRIO: TÍTULO DE SEÇÃO
// ============================================================
function pdfSectionTitle(doc, y, texto, cor) {
  const W = doc.internal.pageSize.width;
  const [r, g, b] = cor || [30, 27, 75];
  doc.setFillColor(r, g, b);
  doc.rect(14, y, W - 28, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(texto, 18, y + 5.5);
  doc.setTextColor(0, 0, 0);
  return y + 12;
}

// ============================================================
// PDF 1: RELATÓRIO DE VENDAS
// ============================================================
function exportVendasPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const mes = state.selectedMonth, ano = state.selectedYear;
  // @ts-ignore — MESES definido globalmente em app.js
  const periodo = MESES[mes - 1] + ' ' + ano;
  let y = pdfHeader(doc, 'RELATORIO DE VENDAS', periodo);

  const vendas = getVendasMes(mes, ano).sort((a, b) => a.data.localeCompare(b.data));
  const concluidas = vendas.filter(v => v.status === 'CONCLUIDO');
  const totalFaturado = somaArray(concluidas, v => v.valor);
  const ticketMedio = concluidas.length ? totalFaturado / concluidas.length : 0;
  const totalComissoes = somaArray(getComissoesPorProfissional(mes, ano), c => c.comissao);

  y = pdfSummaryCards(doc, y, [
    { label: 'Total de Vendas', value: String(vendas.length),       color: [30, 27, 75] },
    { label: 'Concluidas',      value: String(concluidas.length),    color: [4, 120, 87] },
    { label: 'Faturamento',     value: R$(totalFaturado),            color: [4, 120, 87] },
    { label: 'Ticket Medio',    value: R$(ticketMedio),              color: [124, 58, 237] },
    { label: 'Comissoes',       value: R$(totalComissoes),           color: [236, 72, 153] },
  ]);

  y = pdfSectionTitle(doc, y, '1. DETALHAMENTO DE VENDAS', [139, 92, 246]);

  doc.autoTable({
    startY: y,
    head: [['Data', 'Cliente', 'Servico', 'Profissional', 'Tipo', 'Valor', 'Pagamento', 'Status']],
    body: vendas.map(v => {
      const prof = getProfissional(v.profissionalId);
      const serv = getServico(v.servicoId);
      const stLabel = v.status === 'CONCLUIDO' ? 'Concluido' : v.status === 'PENDENTE' ? 'Pendente' : 'Cancelado';
      return [fmtDate(v.data), v.cliente, serv.nome, prof.nome, prof.tipo, R$(v.valor), v.formaPagamento, stLabel];
    }),
    styles: { fontSize: 8, cellPadding: 2.8, font: 'helvetica', overflow: 'linebreak' },
    headStyles: { fillColor: [139, 92, 246], textColor: 255, fontStyle: 'bold', fontSize: 8 },
    alternateRowStyles: { fillColor: [249, 246, 255] },
    columnStyles: {
      0: { cellWidth: 22 },
      4: { cellWidth: 22 },
      5: { cellWidth: 34, halign: 'right', fontStyle: 'bold' },
      6: { cellWidth: 32 },
      7: { cellWidth: 24, halign: 'center' },
    },
    foot: [['', '', '', '', 'TOTAL', R$(somaArray(vendas, v => v.valor)), '', '']],
    footStyles: { fillColor: [139, 92, 246], textColor: 255, fontStyle: 'bold' },
    margin: { left: 14, right: 14 },
    didParseCell: function (data) {
      if (data.section === 'body' && data.column.index === 7) {
        const row = vendas[data.row.index];
        if (row?.status === 'CONCLUIDO') data.cell.styles.textColor = [4, 120, 87];
        else if (row?.status === 'PENDENTE') data.cell.styles.textColor = [180, 83, 9];
        else data.cell.styles.textColor = [185, 28, 28];
      }
    },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Vendas por profissional
  const comissoes = getComissoesPorProfissional(mes, ano);
  if (comissoes.length > 0) {
    if (y > 145) { doc.addPage(); y = 20; }
    y = pdfSectionTitle(doc, y, '2. VENDAS POR PROFISSIONAL', [236, 72, 153]);
    doc.autoTable({
      startY: y,
      head: [['Profissional', 'Tipo', 'Atendimentos', 'Total Vendas', '% Comissao', 'Valor Comissao']],
      body: comissoes.map(p => [p.nome, p.tipo, String(p.qtd), R$(p.totalVendas), p.comissaoPct + '%', R$(p.comissao)]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [236, 72, 153], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 242, 249] },
      columnStyles: { 3: { halign: 'right', cellWidth: 34 }, 4: { halign: 'center', cellWidth: 22 }, 5: { halign: 'right', fontStyle: 'bold', cellWidth: 34 } },
      foot: [['TOTAL', '', String(somaArray(comissoes, c => c.qtd)), R$(somaArray(comissoes, c => c.totalVendas)), '', R$(totalComissoes)]],
      footStyles: { fillColor: [236, 72, 153], textColor: 255, fontStyle: 'bold' },
      margin: { left: 14, right: 14 },
      tableWidth: 185,
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Formas de pagamento
  const pgtoMap = {};
  vendas.forEach(v => { pgtoMap[v.formaPagamento] = (pgtoMap[v.formaPagamento] || 0) + v.valor; });
  const pgtoRows = Object.entries(pgtoMap).sort((a, b) => b[1] - a[1]);
  if (pgtoRows.length > 0) {
    if (y > 145) { doc.addPage(); y = 20; }
    y = pdfSectionTitle(doc, y, '3. FORMA DE PAGAMENTO', [16, 185, 129]);
    doc.autoTable({
      startY: y,
      head: [['Forma de Pagamento', 'Qtd.', 'Total', '%']],
      body: pgtoRows.map(([fp, val]) => {
        const qtd = vendas.filter(v => v.formaPagamento === fp).length;
        const pct = totalFaturado > 0 ? Math.round((val / totalFaturado) * 100) : 0;
        return [fp, String(qtd), R$(val), pct + '%'];
      }),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [236, 253, 245] },
      columnStyles: { 2: { halign: 'right', fontStyle: 'bold' }, 3: { halign: 'center' } },
      margin: { left: 14, right: 14 },
      tableWidth: 120,
    });
  }

  pdfFooter(doc);
  doc.save('relatorio-vendas-' + MESES[mes - 1].toLowerCase() + '-' + ano + '.pdf');
  showToast('PDF de Vendas gerado!', 'success');
}

// ============================================================
// PDF 2: RELATÓRIO DE DESPESAS
// ============================================================
function exportDespesasPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const mes = state.selectedMonth, ano = state.selectedYear;
  const periodo = MESES[mes - 1] + ' ' + ano;
  let y = pdfHeader(doc, 'RELATORIO DE DESPESAS', periodo);

  const totalFixas = getDespesasFixasMes();
  const totalVar = getDespesasVariaveisMes(mes, ano);
  const totalGeral = totalFixas + totalVar;

  y = pdfSummaryCards(doc, y, [
    { label: 'Despesas Fixas',     value: R$(totalFixas),  color: [185, 28, 28] },
    { label: 'Despesas Variaveis', value: R$(totalVar),    color: [180, 83, 9] },
    { label: 'Total do Periodo',   value: R$(totalGeral),  color: [185, 28, 28] },
  ]);

  // Despesas Fixas
  y = pdfSectionTitle(doc, y, '1. DESPESAS FIXAS (MENSAIS)', [185, 28, 28]);
  const ativas = state.despesasFixas.filter(d => d.status === 'ATIVA');
  doc.autoTable({
    startY: y,
    head: [['Nome', 'Categoria', 'Vencimento', 'Parcelas', 'Status', 'Valor Mensal', 'Valor Anual']],
    body: state.despesasFixas.map(d => {
      let parcStr = '—';
      if (d.parcelado && d.totalParcelas) {
        const cur = d.parcelaAtual || 0;
        parcStr = cur >= d.totalParcelas ? `${cur}/${d.totalParcelas} (Ultima!)` : `${cur}/${d.totalParcelas}`;
      }
      return [
        d.observacao ? d.nome + '\n' + d.observacao : d.nome,
        d.categoria, 'Dia ' + d.vencimento, parcStr,
        d.status === 'ATIVA' ? 'Ativa' : 'Inativa',
        R$(d.valor), R$(d.valor * 12)
      ];
    }),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [185, 28, 28], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 249, 249] },
    columnStyles: {
      2: { cellWidth: 22 },
      3: { cellWidth: 22 },
      5: { halign: 'right', fontStyle: 'bold', cellWidth: 34 },
      6: { halign: 'right', cellWidth: 34 },
    },
    foot: [['TOTAL FIXAS (ATIVAS)', '', '', '', '', R$(totalFixas), R$(totalFixas * 12)]],
    footStyles: { fillColor: [185, 28, 28], textColor: 255, fontStyle: 'bold' },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Despesas Variáveis
  const despVar = state.despesasVariaveis
    .filter(d => isMesAno(d.data, mes, ano))
    .sort((a, b) => a.data.localeCompare(b.data));

  if (y > 220) { doc.addPage(); y = 20; }
  y = pdfSectionTitle(doc, y, '2. DESPESAS VARIAVEIS — ' + MESES[mes - 1].toUpperCase() + ' ' + ano, [180, 83, 9]);

  if (despVar.length === 0) {
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text('Nenhuma despesa variavel registrada no periodo.', 18, y);
    doc.setTextColor(0, 0, 0);
    y += 12;
  } else {
    doc.autoTable({
      startY: y,
      head: [['Data', 'Descricao', 'Categoria', 'Pagamento', 'Valor']],
      body: despVar.map(d => [fmtDate(d.data), d.descricao, d.categoria, d.formaPagamento, R$(d.valor)]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [180, 83, 9], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      columnStyles: {
        0: { cellWidth: 22 },
        3: { cellWidth: 28 },
        4: { halign: 'right', fontStyle: 'bold', cellWidth: 34 },
      },
      foot: [['TOTAL VARIAVEIS', '', '', '', R$(totalVar)]],
      footStyles: { fillColor: [180, 83, 9], textColor: 255, fontStyle: 'bold' },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Por categoria
  if (y > 220) { doc.addPage(); y = 20; }
  y = pdfSectionTitle(doc, y, '3. RESUMO POR CATEGORIA', [30, 27, 75]);
  const catMap = {};
  [...ativas, ...despVar].forEach(d => { catMap[d.categoria] = (catMap[d.categoria] || 0) + d.valor; });
  const catRows = Object.entries(catMap).sort((a, b) => b[1] - a[1]);

  doc.autoTable({
    startY: y,
    head: [['Categoria', 'Valor', '%']],
    body: catRows.map(([cat, val]) => [cat, R$(val), (totalGeral > 0 ? Math.round((val / totalGeral) * 100) : 0) + '%']),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [30, 27, 75], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: { 1: { halign: 'right', fontStyle: 'bold' }, 2: { halign: 'center' } },
    foot: [['TOTAL GERAL', R$(totalGeral), '100%']],
    footStyles: { fillColor: [30, 27, 75], textColor: 255, fontStyle: 'bold' },
    margin: { left: 14, right: 14 },
    tableWidth: 110,
  });

  pdfFooter(doc);
  doc.save('relatorio-despesas-' + MESES[mes - 1].toLowerCase() + '-' + ano + '.pdf');
  showToast('PDF de Despesas gerado!', 'success');
}

// ============================================================
// PDF 3: RELATÓRIO DE FLUXO DE CAIXA
// ============================================================
function exportFluxoPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const mes = state.selectedMonth, ano = state.selectedYear;
  const periodo = MESES[mes - 1] + ' ' + ano;
  let y = pdfHeader(doc, 'RELATORIO — FLUXO DE CAIXA', periodo);

  const totalEnt = getReceitasMes(mes, ano);
  const totalSai = getDespesasTotalMes(mes, ano);
  const saldo = totalEnt - totalSai;
  const margem = totalEnt > 0 ? Math.round((saldo / totalEnt) * 100) : 0;

  y = pdfSummaryCards(doc, y, [
    { label: 'Total Entradas',  value: R$(totalEnt),             color: [4, 120, 87] },
    { label: 'Total Saidas',    value: R$(totalSai),             color: [185, 28, 28] },
    { label: 'Saldo Liquido',   value: R$(saldo),                color: saldo >= 0 ? [4, 120, 87] : [185, 28, 28] },
    { label: 'Margem Liquida',  value: margem + '%',             color: [30, 27, 75] },
  ]);

  // Construir lista de transações
  const entradas = [
    ...state.vendas
      .filter(v => isMesAno(v.data, mes, ano) && v.status !== 'CANCELADO')
      .map(v => ({ data: v.data, desc: 'Atend.: ' + v.cliente + ' — ' + getServico(v.servicoId).nome, tipo: 'Entrada', entrada: v.valor, saida: 0 })),
    ...state.receitasExtras
      .filter(r => isMesAno(r.data, mes, ano))
      .map(r => ({ data: r.data, desc: r.descricao, tipo: 'Entrada', entrada: r.valor, saida: 0 })),
  ];
  const saidas = [
    ...state.despesasVariaveis
      .filter(d => isMesAno(d.data, mes, ano))
      .map(d => ({ data: d.data, desc: d.descricao, tipo: 'Saida', entrada: 0, saida: d.valor })),
    ...state.despesasFixas
      .filter(d => d.status === 'ATIVA')
      .map(f => ({
        data: ano + '-' + String(mes).padStart(2, '0') + '-' + String(f.vencimento).padStart(2, '0'),
        desc: f.nome + ' (fixa)', tipo: 'Saida', entrada: 0, saida: f.valor
      })),
  ];

  let acc = 0;
  const all = [...entradas, ...saidas]
    .sort((a, b) => a.data.localeCompare(b.data))
    .map(x => { acc += x.entrada - x.saida; return { ...x, saldo: acc }; });

  y = pdfSectionTitle(doc, y, 'MOVIMENTACAO FINANCEIRA — ' + MESES[mes - 1].toUpperCase() + ' ' + ano, [30, 27, 75]);

  doc.autoTable({
    startY: y,
    head: [['Data', 'Descricao', 'Tipo', 'Entrada', 'Saida', 'Saldo Acum.']],
    body: all.map(r => [
      fmtDate(r.data),
      r.desc,
      r.tipo,
      r.entrada ? R$(r.entrada) : '—',
      r.saida ? R$(r.saida) : '—',
      R$(r.saldo),
    ]),
    styles: { fontSize: 8, cellPadding: 2.8, font: 'helvetica' },
    headStyles: { fillColor: [30, 27, 75], textColor: 255, fontStyle: 'bold', fontSize: 8 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 22 },
      2: { cellWidth: 18, halign: 'center' },
      3: { halign: 'right', cellWidth: 34 },
      4: { halign: 'right', cellWidth: 34 },
      5: { halign: 'right', fontStyle: 'bold', cellWidth: 34 },
    },
    foot: [['TOTAIS', '', '', R$(totalEnt), R$(totalSai), R$(saldo)]],
    footStyles: {
      fillColor: saldo >= 0 ? [4, 120, 87] : [185, 28, 28],
      textColor: 255, fontStyle: 'bold'
    },
    margin: { left: 14, right: 14 },
    didParseCell: function (data) {
      if (data.section === 'body') {
        if (data.column.index === 3 && data.cell.raw !== '—')
          data.cell.styles.textColor = [4, 120, 87];
        if (data.column.index === 4 && data.cell.raw !== '—')
          data.cell.styles.textColor = [185, 28, 28];
        if (data.column.index === 5) {
          const val = all[data.row.index]?.saldo;
          data.cell.styles.textColor = val >= 0 ? [4, 120, 87] : [185, 28, 28];
        }
      }
    },
  });

  pdfFooter(doc);
  doc.save('fluxo-caixa-' + MESES[mes - 1].toLowerCase() + '-' + ano + '.pdf');
  showToast('PDF Fluxo de Caixa gerado!', 'success');
}

// ============================================================
// PDF 4: RELATÓRIO FINANCEIRO COMPLETO
// ============================================================
function exportRelatorioGeralPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const mes = state.selectedMonth, ano = state.selectedYear;
  const periodo = MESES[mes - 1] + ' ' + ano;
  let y = pdfHeader(doc, 'RELATORIO FINANCEIRO COMPLETO', periodo);

  const receita = getReceitasMes(mes, ano);
  const despesas = getDespesasTotalMes(mes, ano);
  const lucro = receita - despesas;
  const vendas = getVendasMes(mes, ano);
  const comissoes = getComissoesPorProfissional(mes, ano);
  const totalComissoes = somaArray(comissoes, c => c.comissao);
  const despVar = state.despesasVariaveis.filter(d => isMesAno(d.data, mes, ano));

  y = pdfSummaryCards(doc, y, [
    { label: 'Receita Total',  value: R$(receita),         color: [4, 120, 87] },
    { label: 'Despesas',       value: R$(despesas),        color: [185, 28, 28] },
    { label: 'Lucro Liquido',  value: R$(lucro),           color: lucro >= 0 ? [30, 27, 75] : [185, 28, 28] },
    { label: 'Vendas',         value: String(vendas.length), color: [124, 58, 237] },
  ]);

  // 1. Vendas
  y = pdfSectionTitle(doc, y, '1. VENDAS DO PERIODO', [139, 92, 246]);
  if (vendas.length === 0) {
    doc.setFontSize(9); doc.setTextColor(130, 130, 130);
    doc.text('Nenhuma venda no periodo.', 18, y); doc.setTextColor(0, 0, 0); y += 12;
  } else {
    doc.autoTable({
      startY: y,
      head: [['Data', 'Cliente', 'Servico', 'Profissional', 'Valor', 'Pagamento']],
      body: vendas.sort((a, b) => a.data.localeCompare(b.data)).map(v => [
        fmtDate(v.data), v.cliente, getServico(v.servicoId).nome, getProfissional(v.profissionalId).nome, R$(v.valor), v.formaPagamento
      ]),
      styles: { fontSize: 8, cellPadding: 2.8 },
      headStyles: { fillColor: [139, 92, 246], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [249, 246, 255] },
      columnStyles: {
        0: { cellWidth: 22 },
        4: { halign: 'right', fontStyle: 'bold', cellWidth: 34 },
        5: { cellWidth: 30 },
      },
      foot: [['', '', '', 'TOTAL', R$(somaArray(vendas, v => v.valor)), '']],
      footStyles: { fillColor: [139, 92, 246], textColor: 255, fontStyle: 'bold' },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // 2. Comissões
  if (y > 220) { doc.addPage(); y = 20; }
  y = pdfSectionTitle(doc, y, '2. COMISSOES POR PROFISSIONAL', [236, 72, 153]);
  if (comissoes.length === 0) {
    doc.setFontSize(9); doc.setTextColor(130, 130, 130);
    doc.text('Nenhuma comissao no periodo.', 18, y); doc.setTextColor(0, 0, 0); y += 12;
  } else {
    doc.autoTable({
      startY: y,
      head: [['Profissional', 'Tipo', 'Atendimentos', 'Total Vendas', '% Com.', 'Comissao']],
      body: comissoes.map(p => [p.nome, p.tipo, String(p.qtd), R$(p.totalVendas), p.comissaoPct + '%', R$(p.comissao)]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [236, 72, 153], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 242, 249] },
      columnStyles: { 3: { halign: 'right', cellWidth: 34 }, 4: { halign: 'center', cellWidth: 20 }, 5: { halign: 'right', fontStyle: 'bold', cellWidth: 34 } },
      foot: [['TOTAL', '', String(somaArray(comissoes, c => c.qtd)), R$(somaArray(comissoes, c => c.totalVendas)), '', R$(totalComissoes)]],
      footStyles: { fillColor: [236, 72, 153], textColor: 255, fontStyle: 'bold' },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // 3. Despesas Fixas
  if (y > 220) { doc.addPage(); y = 20; }
  y = pdfSectionTitle(doc, y, '3. DESPESAS FIXAS', [185, 28, 28]);
  doc.autoTable({
    startY: y,
    head: [['Nome', 'Categoria', 'Vencimento', 'Parcelas', 'Valor']],
    body: state.despesasFixas.filter(d => d.status === 'ATIVA').map(d => {
      let parcStr = '—';
      if (d.parcelado && d.totalParcelas) {
        const cur = d.parcelaAtual || 0;
        parcStr = cur >= d.totalParcelas ? `${cur}/${d.totalParcelas} (Ultima!)` : `${cur}/${d.totalParcelas}`;
      }
      return [d.nome, d.categoria, 'Dia ' + d.vencimento, parcStr, R$(d.valor)];
    }),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [185, 28, 28], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 249, 249] },
    columnStyles: {
      2: { cellWidth: 22 },
      3: { cellWidth: 22 },
      4: { halign: 'right', fontStyle: 'bold', cellWidth: 34 },
    },
    foot: [['TOTAL FIXAS', '', '', '', R$(getDespesasFixasMes())]],
    footStyles: { fillColor: [185, 28, 28], textColor: 255, fontStyle: 'bold' },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // 4. Despesas Variáveis
  if (despVar.length > 0) {
    if (y > 220) { doc.addPage(); y = 20; }
    y = pdfSectionTitle(doc, y, '4. DESPESAS VARIAVEIS', [180, 83, 9]);
    doc.autoTable({
      startY: y,
      head: [['Data', 'Descricao', 'Categoria', 'Pagamento', 'Valor']],
      body: despVar.map(d => [fmtDate(d.data), d.descricao, d.categoria, d.formaPagamento, R$(d.valor)]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [180, 83, 9], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      columnStyles: {
        0: { cellWidth: 22 },
        3: { cellWidth: 28 },
        4: { halign: 'right', fontStyle: 'bold', cellWidth: 34 },
      },
      foot: [['TOTAL VARIAVEIS', '', '', '', R$(getDespesasVariaveisMes(mes, ano))]],
      footStyles: { fillColor: [180, 83, 9], textColor: 255, fontStyle: 'bold' },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // 5. Resumo Financeiro Final
  if (y > 210) { doc.addPage(); y = 20; }
  y = pdfSectionTitle(doc, y, '5. RESUMO FINANCEIRO FINAL', [30, 27, 75]);
  const recVendas = somaArray(getVendasMes(mes, ano), v => v.valor);
  const recExtras = somaArray(state.receitasExtras.filter(r => isMesAno(r.data, mes, ano)), r => r.valor);

  doc.autoTable({
    startY: y,
    head: [['Descricao', 'Valor']],
    body: [
      ['(+) Receitas de Atendimentos', R$(recVendas)],
      ['(+) Receitas Extras (produtos, parcerias...)', R$(recExtras)],
      ['= RECEITA BRUTA TOTAL', R$(receita)],
      ['(-) Despesas Fixas', '(' + R$(getDespesasFixasMes()) + ')'],
      ['(-) Despesas Variaveis', '(' + R$(getDespesasVariaveisMes(mes, ano)) + ')'],
      ['(-) Total de Comissoes', '(' + R$(totalComissoes) + ')'],
    ],
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [30, 27, 75], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: { 1: { halign: 'right', fontStyle: 'bold', cellWidth: 40 } },
    foot: [['= LUCRO LIQUIDO (apos comissoes)', R$(lucro - totalComissoes)]],
    footStyles: {
      fillColor: (lucro - totalComissoes) >= 0 ? [4, 120, 87] : [185, 28, 28],
      textColor: 255, fontStyle: 'bold', fontSize: 11
    },
    margin: { left: 14, right: 14 },
    tableWidth: 130,
    didParseCell: function (data) {
      if (data.section === 'body' && data.row.index === 2) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fillColor = [238, 242, 255];
      }
    },
  });

  pdfFooter(doc);
  doc.save('relatorio-financeiro-completo-' + MESES[mes - 1].toLowerCase() + '-' + ano + '.pdf');
  showToast('Relatorio Geral gerado!', 'success');
}

// ============================================================
// MODAL DE SELEÇÃO DE RELATÓRIO (acesso pelo dashboard)
// ============================================================
function showRelatoriosModal() {
  const mes = state.selectedMonth, ano = state.selectedYear;
  const periodo = MESES[mes - 1] + ' ' + ano;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">Gerar Relatórios PDF</div>
      <div class="modal-subtitle">Período selecionado: <strong>${periodo}</strong></div>
    </div>
    <div class="modal-body">
      <p class="text-sm text-gray-500 mb-4">Selecione o relatório que deseja exportar:</p>
      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100" style="background:#f8fafc">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:#ede9fe">
              <svg class="w-5 h-5" style="color:#7c3aed" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">Relatório de Vendas</p>
              <p class="text-xs text-gray-500">Vendas, comissões e formas de pagamento</p>
            </div>
          </div>
          <button class="btn-primary" style="padding:8px 16px;font-size:13px" onclick="closeModal();exportVendasPDF()">Gerar PDF</button>
        </div>
        <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100" style="background:#f8fafc">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:#fee2e2">
              <svg class="w-5 h-5" style="color:#dc2626" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">Relatório de Despesas</p>
              <p class="text-xs text-gray-500">Fixas, variáveis e resumo por categoria</p>
            </div>
          </div>
          <button class="btn-primary" style="padding:8px 16px;font-size:13px;background:linear-gradient(135deg,#dc2626,#b91c1c)" onclick="closeModal();exportDespesasPDF()">Gerar PDF</button>
        </div>
        <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100" style="background:#f8fafc">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:#dbeafe">
              <svg class="w-5 h-5" style="color:#2563eb" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">Fluxo de Caixa</p>
              <p class="text-xs text-gray-500">Entradas, saídas e saldo acumulado</p>
            </div>
          </div>
          <button class="btn-primary" style="padding:8px 16px;font-size:13px;background:linear-gradient(135deg,#2563eb,#1d4ed8)" onclick="closeModal();exportFluxoPDF()">Gerar PDF</button>
        </div>
        <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100" style="background:linear-gradient(135deg,rgba(30,27,75,0.04),rgba(139,92,246,0.04))">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#ec4899,#8b5cf6)">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm">Relatório Completo</p>
              <p class="text-xs text-gray-500">Vendas + Despesas + Fluxo + Resumo Financeiro</p>
            </div>
          </div>
          <button class="btn-primary" style="padding:8px 16px;font-size:13px" onclick="closeModal();exportRelatorioGeralPDF()">Gerar PDF</button>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Fechar</button>
    </div>
  `);
}
