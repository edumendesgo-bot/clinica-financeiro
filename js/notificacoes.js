'use strict';

// ============================================================
// SISTEMA DE NOTIFICAÇÕES + WHATSAPP
// ============================================================

const DIAS_AVISO = 5; // avisar X dias antes do vencimento

// ------------------------------------------------------------
// Calcula todas as notificações ativas
// ------------------------------------------------------------
function getNotifications() {
  const hoje = new Date();
  const diaHoje = hoje.getDate();
  const mesHoje = hoje.getMonth() + 1;
  const anoHoje = hoje.getFullYear();
  const notifs = [];

  state.despesasFixas.filter(d => d.status === 'ATIVA').forEach(d => {
    // Ignora despesas já pagas no mês atual
    if (_isFixaPaga(d, mesHoje, anoHoje)) return;

    const diff = d.vencimento - diaHoje;

    if (diff < 0) {
      notifs.push({
        id: 'df_' + d.id,
        tipo: 'vencida',
        prioridade: 1,
        titulo: 'Despesa vencida!',
        msg: `${d.nome} — venceu dia ${d.vencimento} (${R$(d.valor)})`,
        detalhe: `Categoria: ${d.categoria}`,
        valor: d.valor,
        despesaId: d.id,
      });
    } else if (diff === 0) {
      notifs.push({
        id: 'df_' + d.id,
        tipo: 'hoje',
        prioridade: 2,
        titulo: 'Vence HOJE!',
        msg: `${d.nome} — ${R$(d.valor)}`,
        detalhe: `Categoria: ${d.categoria}`,
        valor: d.valor,
        despesaId: d.id,
      });
    } else if (diff <= DIAS_AVISO) {
      notifs.push({
        id: 'df_' + d.id,
        tipo: 'proximo',
        prioridade: 3,
        titulo: `Vence em ${diff} dia${diff > 1 ? 's' : ''}`,
        msg: `${d.nome} — dia ${d.vencimento} (${R$(d.valor)})`,
        detalhe: `Categoria: ${d.categoria}`,
        valor: d.valor,
        despesaId: d.id,
      });
    }
  });

  // Vendas pendentes
  const pendentes = state.vendas.filter(v => v.status === 'PENDENTE');
  if (pendentes.length > 0) {
    notifs.push({
      id: 'vendas_pendentes',
      tipo: 'info',
      prioridade: 4,
      titulo: `${pendentes.length} atendimento${pendentes.length > 1 ? 's' : ''} pendente${pendentes.length > 1 ? 's' : ''}`,
      msg: pendentes.map(v => v.cliente).slice(0, 3).join(', ') + (pendentes.length > 3 ? ` e mais ${pendentes.length - 3}...` : ''),
      detalhe: `Total: ${R$(somaArray(pendentes, v => v.valor))}`,
    });
  }

  return notifs.sort((a, b) => a.prioridade - b.prioridade);
}

// ------------------------------------------------------------
// Atualiza badge do sino
// ------------------------------------------------------------
function updateNotifBadge() {
  const notifs = getNotifications();
  const badge = document.getElementById('notif-badge');
  if (!badge) return;
  const urgentes = notifs.filter(n => n.tipo === 'vencida' || n.tipo === 'hoje').length;
  if (urgentes > 0) {
    badge.textContent = urgentes;
    badge.classList.remove('hidden');
    badge.style.background = '#ef4444';
    document.getElementById('notif-bell').style.background = '#fef2f2';
    document.getElementById('notif-bell').style.borderColor = '#fecaca';
  } else if (notifs.length > 0) {
    badge.textContent = notifs.length;
    badge.classList.remove('hidden');
    badge.style.background = '#f59e0b';
    document.getElementById('notif-bell').style.background = '#fffbeb';
    document.getElementById('notif-bell').style.borderColor = '#fde68a';
  } else {
    badge.classList.add('hidden');
    document.getElementById('notif-bell').style.background = '#f8fafc';
    document.getElementById('notif-bell').style.borderColor = '#e5e7eb';
  }
}

// ------------------------------------------------------------
// Abre / fecha painel
// ------------------------------------------------------------
function toggleNotifPanel() {
  const panel = document.getElementById('notif-panel');
  if (panel.classList.contains('hidden')) {
    renderNotifPanel();
    panel.classList.remove('hidden');
    // fecha ao clicar fora
    setTimeout(() => {
      document.addEventListener('click', fecharNotifFora, { once: true });
    }, 50);
  } else {
    panel.classList.add('hidden');
  }
}

function fecharNotifFora(e) {
  const panel = document.getElementById('notif-panel');
  const bell = document.getElementById('notif-bell');
  if (panel && !panel.contains(e.target) && !bell.contains(e.target)) {
    panel.classList.add('hidden');
  }
}

// ------------------------------------------------------------
// Renderiza o painel de notificações
// ------------------------------------------------------------
function renderNotifPanel() {
  const panel = document.getElementById('notif-panel');
  if (!panel) return;
  const notifs = getNotifications();

  const iconMap = {
    vencida: { icon: '🔴', bg: '#fef2f2', border: '#fecaca', text: '#dc2626', label: 'VENCIDA' },
    hoje:    { icon: '🟠', bg: '#fff7ed', border: '#fed7aa', text: '#c2410c', label: 'HOJE' },
    proximo: { icon: '🟡', bg: '#fefce8', border: '#fde68a', text: '#d97706', label: 'PRÓXIMO' },
    info:    { icon: '🔵', bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8', label: 'INFO' },
  };

  const emptyHTML = `
    <div class="p-8 text-center">
      <div style="font-size:40px;margin-bottom:8px">✅</div>
      <p class="font-semibold text-gray-700">Tudo em dia!</p>
      <p class="text-xs text-gray-400 mt-1">Nenhuma notificação no momento</p>
    </div>`;

  const notifHTML = notifs.map(n => {
    const s = iconMap[n.tipo] || iconMap.info;
    return `
    <div class="p-4 border-b border-gray-50" style="background:${s.bg}">
      <div class="flex items-start gap-3">
        <span style="font-size:18px;margin-top:2px">${s.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:${s.border};color:${s.text}">${s.label}</span>
          </div>
          <p class="font-semibold text-gray-800 text-sm">${n.titulo}</p>
          <p class="text-xs text-gray-600 mt-0.5">${n.msg}</p>
          <p class="text-xs text-gray-400 mt-0.5">${n.detalhe}</p>
        </div>
        ${n.despesaId ? `<button onclick="navigate('despesasFixas');toggleNotifPanel()" class="text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0" style="background:white;border:1px solid ${s.border};color:${s.text}">Ver</button>` : ''}
      </div>
    </div>`;
  }).join('');

  const today = new Date();
  const mes = today.getMonth() + 1, ano = today.getFullYear();
  const receita = getReceitasMes(mes, ano);
  const despesa = getDespesasTotalMes(mes, ano);
  const saldo = receita - despesa;

  panel.innerHTML = `
    <!-- Header -->
    <div class="flex items-center justify-between p-4" style="background:linear-gradient(135deg,#1e1b4b,#312e81)">
      <div>
        <p class="font-bold text-white text-sm">Notificações</p>
        <p class="text-xs" style="color:rgba(255,255,255,0.5)">${notifs.length} alerta${notifs.length !== 1 ? 's' : ''} ativo${notifs.length !== 1 ? 's' : ''}</p>
      </div>
      <button onclick="toggleNotifPanel()" class="text-white opacity-50 hover:opacity-100 transition-opacity text-xl leading-none">&times;</button>
    </div>

    <!-- Resumo rápido do mês -->
    <div class="p-3 grid grid-cols-3 gap-2" style="background:#f8fafc;border-bottom:1px solid #e5e7eb">
      <div class="text-center p-2 rounded-lg bg-white">
        <p class="text-xs text-gray-400">Receitas</p>
        <p class="text-sm font-bold text-emerald-600">${R$(receita)}</p>
      </div>
      <div class="text-center p-2 rounded-lg bg-white">
        <p class="text-xs text-gray-400">Despesas</p>
        <p class="text-sm font-bold text-red-500">${R$(despesa)}</p>
      </div>
      <div class="text-center p-2 rounded-lg bg-white">
        <p class="text-xs text-gray-400">Saldo</p>
        <p class="text-sm font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-red-600'}">${R$(saldo)}</p>
      </div>
    </div>

    <!-- Lista de notificações -->
    <div>
      ${notifs.length === 0 ? emptyHTML : notifHTML}
    </div>

    <!-- Rodapé — WhatsApp -->
    <div class="p-3" style="border-top:1px solid #e5e7eb;background:#f8fafc">
      <button onclick="toggleNotifPanel();enviarNotificacoesWhatsApp()"
        class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all"
        style="background:#25d366;color:white">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.118 1.535 5.846L0 24l6.335-1.509A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.031-1.388l-.361-.214-3.741.981.999-3.648-.235-.374A9.77 9.77 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
        Enviar alerta via WhatsApp
      </button>
    </div>
  `;
}

// ------------------------------------------------------------
// Pop-up de alerta ao inicializar (se houver urgências)
// ------------------------------------------------------------
function checkStartupAlerts() {
  const notifs = getNotifications();
  const urgentes = notifs.filter(n => n.tipo === 'vencida' || n.tipo === 'hoje');
  if (urgentes.length === 0) return;

  const hoje = new Date().toLocaleDateString('pt-BR');
  const totalUrgente = somaArray(
    urgentes.filter(n => n.valor),
    n => n.valor
  );

  setTimeout(() => {
    showModal(`
      <div style="background:linear-gradient(135deg,#7f1d1d,#991b1b);padding:24px 24px 16px">
        <div class="flex items-center gap-3 mb-2">
          <span style="font-size:28px">🚨</span>
          <div>
            <p class="font-bold text-white text-lg">Atenção! Vencimentos Urgentes</p>
            <p style="color:rgba(255,255,255,0.6);font-size:13px">${hoje}</p>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-3 mb-6">
          ${urgentes.map(n => `
            <div class="flex items-start gap-3 p-3 rounded-xl" style="background:#fef2f2;border:1px solid #fecaca">
              <span style="font-size:20px;margin-top:2px">${n.tipo === 'vencida' ? '🔴' : '🟠'}</span>
              <div>
                <p class="font-bold text-red-700 text-sm">${n.titulo}</p>
                <p class="text-red-600 text-sm">${n.msg}</p>
              </div>
            </div>`).join('')}
        </div>
        ${totalUrgente > 0 ? `
          <div class="flex items-center justify-between p-3 rounded-xl mb-4" style="background:#f8fafc;border:1px solid #e5e7eb">
            <span class="text-sm font-semibold text-gray-600">Total a pagar (urgente)</span>
            <span class="text-lg font-bold text-red-600">${R$(totalUrgente)}</span>
          </div>` : ''}
        <div class="flex gap-3">
          <button onclick="closeModal();navigate('despesasFixas')"
            class="flex-1 py-2.5 rounded-xl font-semibold text-sm"
            style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca">
            Ver Despesas
          </button>
          <button onclick="closeModal();enviarNotificacoesWhatsApp()"
            class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white"
            style="background:#25d366">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.118 1.535 5.846L0 24l6.335-1.509A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.031-1.388l-.361-.214-3.741.981.999-3.648-.235-.374A9.77 9.77 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
            Enviar WhatsApp
          </button>
          <button onclick="closeModal()" class="py-2.5 px-4 rounded-xl font-semibold text-sm text-gray-500" style="background:#f3f4f6">
            Fechar
          </button>
        </div>
      </div>
    `);
  }, 1200);
}

// ------------------------------------------------------------
// Gera mensagem e abre WhatsApp
// ------------------------------------------------------------
function enviarNotificacoesWhatsApp() {
  const notifs = getNotifications();
  const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const mes = new Date().getMonth() + 1, ano = new Date().getFullYear();
  const receita = getReceitasMes(mes, ano);
  const despesa = getDespesasTotalMes(mes, ano);
  const saldo = receita - despesa;

  let msg = '';
  msg += `🏥 *Vivaci Estética Avançada*\n`;
  msg += `📅 *Alertas Financeiros*\n`;
  msg += `${hoje}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  const vencidas = notifs.filter(n => n.tipo === 'vencida');
  const hoje_ = notifs.filter(n => n.tipo === 'hoje');
  const proximas = notifs.filter(n => n.tipo === 'proximo');
  const infos = notifs.filter(n => n.tipo === 'info');

  if (vencidas.length > 0) {
    msg += `🔴 *DESPESAS VENCIDAS:*\n`;
    vencidas.forEach(n => { msg += `• ${n.msg}\n`; });
    msg += `\n`;
  }
  if (hoje_.length > 0) {
    msg += `🟠 *VENCE HOJE:*\n`;
    hoje_.forEach(n => { msg += `• ${n.msg}\n`; });
    msg += `\n`;
  }
  if (proximas.length > 0) {
    msg += `⚠️ *VENCIMENTOS PRÓXIMOS (${DIAS_AVISO} dias):*\n`;
    proximas.forEach(n => { msg += `• ${n.msg}\n`; });
    msg += `\n`;
  }
  if (infos.length > 0) {
    msg += `ℹ️ *INFORMAÇÕES:*\n`;
    infos.forEach(n => { msg += `• ${n.titulo}: ${n.msg}\n`; });
    msg += `\n`;
  }
  if (notifs.length === 0) {
    msg += `✅ *Tudo em dia! Nenhuma pendência no momento.*\n\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📊 *RESUMO DO MÊS (${MESES[mes - 1]} ${ano}):*\n`;
  msg += `💚 Receitas: *${R$(receita)}*\n`;
  msg += `🔴 Despesas: *${R$(despesa)}*\n`;
  msg += `${saldo >= 0 ? '💙' : '🔴'} Saldo: *${R$(saldo)}*\n\n`;
  msg += `_Sistema Financeiro — Vivaci Estética Avançada_`;

  const numero = localStorage.getItem('clinica_whatsapp') || '';
  const url = numero
    ? `https://wa.me/55${numero.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
    : `https://wa.me?text=${encodeURIComponent(msg)}`;

  window.open(url, '_blank');
}

// ------------------------------------------------------------
// Configurar número WhatsApp
// ------------------------------------------------------------
function abrirConfigWhatsApp() {
  const numero = localStorage.getItem('clinica_whatsapp') || '';
  showModal(`
    <div class="modal-header">
      <div class="modal-title" style="display:flex;align-items:center;gap:10px">
        <span style="font-size:24px">📱</span> Configurar WhatsApp
      </div>
      <div class="modal-subtitle">Configure o número para receber alertas e envie o resumo financeiro</div>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Número do WhatsApp (com DDD)</label>
        <input type="tel" id="wpp-numero" class="form-control" placeholder="Ex: 11999887766"
          value="${numero}" maxlength="15">
        <p class="text-xs text-gray-400 mt-1">Somente números — o código +55 é adicionado automaticamente</p>
      </div>

      <!-- Preview da mensagem -->
      <div class="p-4 rounded-xl mb-2" style="background:#dcfce7;border:1px solid #bbf7d0">
        <p class="text-sm font-semibold text-green-800 mb-2">📤 O que será enviado:</p>
        <div class="text-xs text-green-700 space-y-1">
          <p>• Alertas de vencimentos (vencidas, hoje, próximas)</p>
          <p>• Resumo financeiro do mês (receitas, despesas, saldo)</p>
          <p>• Atendimentos pendentes de confirmação</p>
        </div>
      </div>

      <div class="p-3 rounded-xl" style="background:#fffbeb;border:1px solid #fde68a">
        <p class="text-xs text-amber-700">
          <strong>Nota:</strong> Ao clicar em "Enviar", o WhatsApp abrirá com a mensagem pronta.
          Você escolhe para qual contato enviar (ideal: seu próprio número ou grupo da clínica).
        </p>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Fechar</button>
      <button class="btn-secondary" onclick="salvarNumeroWpp()" style="background:#eff6ff;color:#2563eb;border-color:#bfdbfe">
        💾 Salvar Número
      </button>
      <button onclick="salvarNumeroWpp();closeModal();enviarNotificacoesWhatsApp()"
        class="btn-primary flex items-center gap-2" style="background:#25d366">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.118 1.535 5.846L0 24l6.335-1.509A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.031-1.388l-.361-.214-3.741.981.999-3.648-.235-.374A9.77 9.77 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
        Enviar Agora
      </button>
    </div>
  `);
}

function salvarNumeroWpp() {
  const num = document.getElementById('wpp-numero')?.value.replace(/\D/g, '');
  if (num) {
    localStorage.setItem('clinica_whatsapp', num);
    showToast('Número salvo!', 'success');
  }
}
