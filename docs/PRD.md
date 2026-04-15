# PRD — Sistema Financeiro Vivaci Estética Avançada

**Versão:** 1.0
**Data:** Abril de 2026
**Responsável:** Eduardo Mendes
**Status:** Em produção

---

## 1. Visão Geral

Sistema financeiro web desenvolvido exclusivamente para a clínica **Vivaci Estética Avançada**. O objetivo é centralizar o controle de vendas, comissões, despesas fixas e variáveis, receitas e geração de relatórios em uma única interface acessível pelo navegador, sem necessidade de servidor ou banco de dados externo.

**URL de Produção:** https://financeiro.vivaci.com.br
**Repositório:** https://github.com/edumendesgo-bot/clinica-financeiro
**Deploy:** Netlify (CI/CD automático via push na branch main)

---

## 2. Stack Técnica

| Camada | Tecnologia |
|--------|------------|
| Interface | HTML5 + Tailwind CSS + CSS customizado |
| Lógica | Vanilla JavaScript (ES6+) |
| Gráficos | Chart.js v4.4.0 |
| PDF | jsPDF 2.5.1 + jspdf-autotable 3.8.2 |
| Fonte | Inter (Google Fonts) |
| Persistência | localStorage (chave: `clinica_v1`) |
| Autenticação | Sessão em localStorage (TTL: 8h) |
| Hospedagem | Netlify (plano gratuito) |
| Domínio | HostGator |

**Sem backend.** Todo o dado é armazenado no navegador via localStorage. Limite aproximado de 5MB por domínio.

---

## 3. Arquitetura de Arquivos

```
clinica-financeiro/
├── index.html              # Shell da SPA, layout, login, CSS embutido
├── js/
│   ├── auth.js             # Autenticação e gestão de sessão
│   ├── app.js              # Lógica principal, renderização, cálculos
│   ├── notificacoes.js     # Sistema de alertas e integração WhatsApp
│   └── relatorios.js       # Geração de relatórios em PDF
└── docs/
    └── PRD.md              # Este documento
```

---

## 4. Estrutura de Dados (localStorage)

### 4.1 Estado Principal (`clinica_v1`)

```javascript
state = {
  profissionais: Profissional[],
  servicos:      Servico[],
  vendas:        Venda[],
  despesasFixas:     DespesaFixa[],
  despesasVariaveis: DespesaVariavel[],
  receitasExtras:    ReceitaExtra[],
  selectedMonth: number,  // 1–12
  selectedYear:  number
}
```

### 4.2 Modelos de Dados

**Profissional**
```javascript
{ id, nome, tipo, comissaoPct, ativo }
// tipo: 'SDR' | 'CLOSER' | 'ATENDENTE' | 'ADMIN'
```

**Serviço**
```javascript
{ id, nome, categoria, preco, duracao }
// categorias: Toxina Botulínica, Preenchimentos, Bioestimuladores,
//             Harmonização Facial, Skincare, Tratamentos Faciais/Pescoço/Corporais,
//             Consulta Personalizada
```

**Venda**
```javascript
{
  id, data, cliente, cpf, telefone,
  servicoId, profissionalId, atendenteId, closerId, sdrId,
  valor, formaPagamento, status, observacao
}
// status: 'CONCLUIDA' | 'PENDENTE' | 'CANCELADA'
```

**Despesa Fixa**
```javascript
{
  id, nome, categoria, valor, vencimento,
  status, parcelado, totalParcelas, parcelaAtual,
  observacao, dataInicio,
  pagamentos: { 'YYYY-MM': boolean }
}
// dataInicio: 'YYYY-MM' — mês em que a despesa foi criada
// pagamentos: controla se cada mês foi pago
```

**Despesa Variável**
```javascript
{ id, data, descricao, categoria, valor, formaPagamento, pago, observacao }
```

**Receita Extra**
```javascript
{ id, data, descricao, tipo, valor, formaPagamento }
```

### 4.3 Autenticação (`vivaci_session`, `vivaci_users`)

```javascript
Session = { userId, nome, login, role, expiry }
User    = { id, nome, login, senha, role }
```

**TTL da sessão:** 8 horas
**Roles:** `admin` (acesso total)

---

## 5. Módulos do Sistema

### 5.1 Dashboard
- 4 KPIs do mês selecionado: Receita Total, Despesas, Lucro Líquido, Margem %
- Gráfico de barras "Receitas vs Despesas" — últimos 6 meses (apenas a partir de jan/2026)
- Gráfico de pizza — breakdown de despesas por categoria
- Ranking de profissionais por volume de vendas
- Seletor de mês/ano

### 5.2 Controle de Vendas
- Tabela de vendas com colunas: Data, Cliente, Serviço, Profissional, Tipo, Valor, Pagamento, Status
- Filtros: mês/ano, status (Concluída/Pendente/Cancelada)
- Busca textual: nome do cliente, atendente, closer, SDR, observação (com normalização de acentos)
- Busca numérica: CPF e telefone
- Quando busca ativa: exibe resultados de todos os meses (sem filtro de período)
- CRUD completo via modal
- Comissão calculada automaticamente por profissional

### 5.3 Comissões
- Breakdown por profissional com percentual e valor
- Total de comissões do período
- Filtro por mês/ano

### 5.4 Receitas Extras
- Registro de receitas alternativas (produtos, parcerias, consultorias)
- Filtro por mês/ano com seletores de mês nomeado (ex: "Janeiro")
- CRUD via modal

### 5.5 Fluxo de Caixa
- Listagem cronológica de entradas e saídas
- Saldo acumulado em tempo real
- Gráfico de linha com evolução do caixa

### 5.6 Despesas Fixas
- Despesas recorrentes mensais (aluguel, pessoal, marketing, etc.)
- Controle de parcelamento (ex: parcela 8/12)
- Controle de pagamento por mês (`pagamentos: {'2026-01': true}`)
- `dataInicio`: despesas novas não aparecem em meses anteriores à sua criação
- Alertas de vencimento via sistema de notificações
- Busca por nome da despesa
- Filtro por mês/ano com seletores nomeados

### 5.7 Despesas Variáveis
- Despesas pontuais por data
- Dados exibidos a partir de janeiro/2026 apenas
- Busca por descrição e observação
- Filtro por mês/ano com seletores nomeados
- Status: Pago / Pendente
- Campo de observações

### 5.8 Cadastro de Profissionais
- Nome, tipo, percentual de comissão, status ativo/inativo
- CRUD completo

### 5.9 Cadastro de Serviços
- Nome, categoria, preço, duração
- Listagem e dropdowns em ordem alfabética
- CRUD completo

### 5.10 Relatórios PDF
Quatro relatórios exportáveis:

| Relatório | Conteúdo |
|-----------|----------|
| Vendas | Tabela de vendas, comissões por profissional, formas de pagamento |
| Despesas | Fixas e variáveis, projeção anual, breakdown por categoria |
| Fluxo de Caixa | Todas as transações ordenadas, saldo acumulado |
| Relatório Geral | Resumo financeiro completo do período |

Todos os relatórios possuem cabeçalho com identidade visual da clínica, rodapé com paginação e colunas com largura fixa para evitar quebra de números.

### 5.11 Notificações e Alertas
- Sino de notificações com badge colorido (vermelho/laranja/amarelo/azul)
- Tipos de alerta:
  - **Vencida** (vermelha): despesa em atraso
  - **Hoje** (laranja): vence hoje
  - **Próxima** (amarela): vence em até 5 dias
  - **Pendente** (azul): venda aguardando pagamento
- Modal de alerta automático ao fazer login se houver itens urgentes
- Painel lateral com resumo mensal (receitas, despesas, saldo)
- Envio de alertas via WhatsApp (número configurável)

---

## 6. Regras de Negócio

| Regra | Descrição |
|-------|-----------|
| Despesas fixas por período | `dataInicio` determina a partir de qual mês a despesa é exibida |
| Dados históricos | Despesas variáveis e pagamentos antes de jan/2026 são removidos automaticamente |
| Comissão | Calculada como `valor_venda × (comissaoPct / 100)` por profissional |
| Busca cross-mês | Quando campo de busca está preenchido, filtro de mês/ano é ignorado |
| Serviços | Exibidos em ordem alfabética em tabelas e dropdowns |
| Sessão | Expira após 8 horas — redireciona para login automaticamente |
| Gráfico histórico | Exibe apenas meses a partir de jan/2026 |

---

## 7. Categorias

### Serviços
- Toxina Botulínica
- Preenchimentos
- Bioestimuladores
- Harmonização Facial
- Skincare
- Tratamentos Faciais
- Tratamentos Pescoço
- Tratamentos Corporais
- Consulta Personalizada

### Despesas
- Aluguel
- Pessoal
- Marketing
- Equipamentos
- Materiais
- Contabilidade
- Impostos
- Tecnologia
- Outros

### Formas de Pagamento
- PIX
- Dinheiro
- Cartão Crédito
- Cartão Débito
- Boleto
- Cheque

---

## 8. Deploy e CI/CD

**Fluxo atual:**
1. Desenvolvimento local em `/Users/eduardomendes/clinica-financeiro`
2. Commit e push para `github.com/edumendesgo-bot/clinica-financeiro`
3. Netlify detecta o push e faz deploy automático
4. Disponível em `https://financeiro.vivaci.com.br`

**Configuração Netlify:**
- Build command: *(vazio — projeto estático)*
- Publish directory: `.` (raiz do repositório)
- HTTPS: automático via Let's Encrypt

**DNS:**
- Domínio registrado na HostGator
- CNAME `financeiro` apontando para o domínio Netlify

---

## 9. Limitações Conhecidas

| Limitação | Impacto | Solução futura |
|-----------|---------|----------------|
| localStorage (~5MB) | Limite de dados armazenados | Backend com banco de dados |
| Sem sync entre dispositivos | Cada navegador tem seus próprios dados | API + banco de dados |
| Sem backup automático | Risco de perda de dados ao limpar o browser | Exportação JSON periódica |
| Sem controle de acesso granular | Qualquer admin vê tudo | Perfis de usuário por seção |
| Sem modo offline | Precisa de internet para carregar CDNs | Bundling local das dependências |

---

## 10. Histórico de Versões

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0 | Mar/2026 | Versão inicial — todas as funcionalidades base |
| 1.1 | Abr/2026 | Busca expandida, ordenação alfabética, categoria Consulta Personalizada, PDF corrigido, seletores de mês nomeados, observações em despesas variáveis, busca por nome de despesa, filtro histórico jan/2026 |
