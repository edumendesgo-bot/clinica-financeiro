'use strict';

// ============================================================
// SUPABASE — Vivaci Estética | Sistema Financeiro
// ============================================================
const SUPABASE_URL  = 'https://ozqzsoncfyiwxbedxcrl.supabase.co';
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96cXpzb25jZnlpd3hiZWR4Y3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjE1MDcsImV4cCI6MjA5MTgzNzUwN30.keHkmHhXnQRuc6NzadZRpu6ItlS80Tu962CR3sag5u8';

const _db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Carrega todos os dados do Supabase.
// Retorna null se banco vazio ou erro.
async function dbLoad() {
  try {
    const [r1, r2, r3, r4, r5, r6] = await Promise.all([
      _db.from('profissionais').select('*'),
      _db.from('servicos').select('*'),
      _db.from('vendas').select('*'),
      _db.from('despesas_fixas').select('*'),
      _db.from('despesas_variaveis').select('*'),
      _db.from('receitas_extras').select('*'),
    ]);
    if (r1.error) { console.warn('Supabase error:', r1.error); return null; }
    const profissionais   = r1.data || [];
    const servicos        = r2.data || [];
    const vendas          = r3.data || [];
    const despesasFixas   = r4.data || [];
    const despesasVariaveis = r5.data || [];
    const receitasExtras  = r6.data || [];
    // Se banco completamente vazio, retorna null para usar localStorage
    if (!profissionais.length && !vendas.length && !despesasFixas.length) return null;
    return { profissionais, servicos, vendas, despesasFixas, despesasVariaveis, receitasExtras };
  } catch(e) {
    console.warn('Supabase load error:', e);
    return null;
  }
}

// Sincroniza o estado atual com o Supabase.
// Faz upsert de todos os registros e remove os que não existem mais.
async function dbSync(st) {
  try {
    await Promise.all([
      _syncTable('profissionais',    st.profissionais),
      _syncTable('servicos',         st.servicos),
      _syncTable('vendas',           st.vendas),
      _syncTable('despesas_fixas',   st.despesasFixas),
      _syncTable('despesas_variaveis', st.despesasVariaveis),
      _syncTable('receitas_extras',  st.receitasExtras),
    ]);
  } catch(e) {
    console.warn('Supabase sync error:', e);
  }
}

async function _syncTable(table, rows) {
  if (rows.length) {
    const { error } = await _db.from(table).upsert(rows, { onConflict: 'id' });
    if (error) { console.warn(`Upsert ${table}:`, error); return; }
  }
  // Remove registros deletados localmente
  const ids = rows.map(r => r.id);
  if (ids.length) {
    await _db.from(table).delete().not('id', 'in', `(${ids.map(i => `"${i}"`).join(',')})`);
  } else {
    await _db.from(table).delete().not('id', 'is', null);
  }
}
