-- ============================================================
-- SCHEMA — Vivaci Estética | Sistema Financeiro
-- Execute no Supabase → SQL Editor
-- ============================================================

create table if not exists profissionais (
  id text primary key,
  nome text not null,
  tipo text,
  "comissaoPct" numeric,
  ativo boolean default true
);

create table if not exists servicos (
  id text primary key,
  nome text not null,
  categoria text,
  preco numeric,
  duracao integer
);

create table if not exists vendas (
  id text primary key,
  data text,
  cliente text,
  cpf text,
  telefone text,
  "servicoId" text,
  "profissionalId" text,
  "atendenteId" text,
  "closerId" text,
  "sdrId" text,
  valor numeric,
  "formaPagamento" text,
  status text,
  observacao text
);

create table if not exists despesas_fixas (
  id text primary key,
  nome text,
  categoria text,
  valor numeric,
  vencimento integer,
  status text,
  parcelado boolean,
  "totalParcelas" integer,
  "parcelaAtual" integer,
  observacao text,
  pagamentos jsonb,
  "dataInicio" text
);

create table if not exists despesas_variaveis (
  id text primary key,
  data text,
  descricao text,
  categoria text,
  valor numeric,
  "formaPagamento" text,
  pago boolean,
  observacao text
);

create table if not exists receitas_extras (
  id text primary key,
  data text,
  descricao text,
  tipo text,
  valor numeric,
  "formaPagamento" text
);

-- RLS: habilitar e permitir acesso via anon key
alter table profissionais enable row level security;
alter table servicos enable row level security;
alter table vendas enable row level security;
alter table despesas_fixas enable row level security;
alter table despesas_variaveis enable row level security;
alter table receitas_extras enable row level security;

create policy "allow all" on profissionais for all using (true) with check (true);
create policy "allow all" on servicos for all using (true) with check (true);
create policy "allow all" on vendas for all using (true) with check (true);
create policy "allow all" on despesas_fixas for all using (true) with check (true);
create policy "allow all" on despesas_variaveis for all using (true) with check (true);
create policy "allow all" on receitas_extras for all using (true) with check (true);
