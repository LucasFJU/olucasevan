
O usuário quer um sistema de **Propostas Comerciais** dentro do admin. Funcionalidade:

- Criar uma proposta selecionando projetos do portfólio
- Adicionar processo de trabalho (etapas)
- Definir formas de pagamento e valor
- Gerar link público compartilhável para enviar ao cliente
- Cliente abre o link e vê uma página bonita com tudo

## Análise rápida

**O que já temos:**
- Tabela `projects` com portfólio
- Admin autenticado com RLS via `has_role`
- Storage bucket `projects` para imagens
- Padrão visual Folioblox (dark, ember, Bricolage)

**O que falta criar:**
- Tabelas no banco para propostas
- Telas no admin (lista + formulário)
- Página pública da proposta (`/proposta/:slug`)

## Plano de implementação

### 1. Banco de dados (migration)

**Tabela `proposals`:**
- `id` uuid PK
- `slug` text unique (link público, ex: `abc123-empresa-x`)
- `cliente_nome` text
- `cliente_empresa` text (opcional)
- `cliente_email` text (opcional)
- `titulo` text (ex: "Proposta de Identidade Visual")
- `introducao` text (texto livre/markdown)
- `valor_total` numeric
- `prazo_entrega` text (ex: "30 dias")
- `validade_dias` int (default 15)
- `status` text ('Rascunho' | 'Enviada' | 'Aceita' | 'Recusada' | 'Expirada')
- `projeto_ids` uuid[] (referências aos projetos do portfólio para mostrar como referências)
- `processo` jsonb (array de etapas: `[{titulo, descricao, prazo}]`)
- `formas_pagamento` jsonb (array: `[{titulo, descricao, valor}]` ex: "50% início + 50% entrega")
- `observacoes` text
- `created_at`, `updated_at` timestamps

**RLS:**
- Admins podem CRUD tudo (`has_role(auth.uid(), 'admin')`)
- Público pode SELECT apenas se acessar via `slug` (policy permissiva no SELECT pra qualquer um — a obscuridade do slug protege)

**Tabela `proposal_views` (opcional, mas útil):**
- Registra quando cliente abre o link (timestamp + user-agent)
- Admin vê "Visualizada em X"

### 2. Admin — novas telas

**`/admin/propostas`** — Lista de propostas
- Tabela: cliente, título, valor, status (badge), data, ações
- Filtros: status (Rascunho/Enviada/Aceita/Recusada)
- Botão "Nova Proposta"
- Adicionar link no `AdminDashboard` navbar (ícone documento)

**`/admin/propostas/nova`** e **`/admin/propostas/editar/:id`** — Formulário
- **Seção 1 — Cliente**: nome, empresa, email
- **Seção 2 — Conteúdo**: título, introdução (textarea), prazo, validade
- **Seção 3 — Projetos de referência**: grid com todos os projetos do portfólio, checkbox para selecionar quais aparecem na proposta
- **Seção 4 — Processo**: lista editável de etapas (adicionar/remover/reordenar) com título + descrição + prazo
- **Seção 5 — Formas de pagamento**: lista editável (ex: "Entrada 50% — R$ 2.500", "Entrega 50% — R$ 2.500")
- **Seção 6 — Valor total + observações**
- **Botões**: Salvar como Rascunho · Salvar e Copiar Link

Ao salvar, gera `slug` automaticamente (`nanoid` curto + slug do nome do cliente).

### 3. Página pública — `/proposta/:slug`

Página standalone (sem navbar do site, layout próprio):
- Header com logo Folioblox + nome do cliente
- Título grande + introdução
- Seção "Projetos de referência" — grid com os projetos selecionados (capa, título, categoria, link pra `/projetos/:id`)
- Seção "Processo" — timeline vertical com as etapas
- Seção "Formas de pagamento" — cards limpos
- Seção "Valor + prazo" — destaque
- Validade ("Esta proposta é válida até DD/MM/YYYY")
- Botões: "Aceitar proposta" (atualiza status, abre WhatsApp) · "Tirar dúvidas" (WhatsApp)
- Registra view em `proposal_views` ao abrir

Estilo: mesma identidade do site (dark, ember, Bricolage), mas focado/limpo, ótimo em desktop e mobile, imprimível (CSS print).

### 4. Arquivos afetados

**Novos:**
- `src/pages/AdminProposals.tsx` (lista)
- `src/pages/AdminProposalForm.tsx` (criar/editar)
- `src/pages/PublicProposal.tsx` (página pública)
- Migration: criar tabelas `proposals` + `proposal_views` com RLS

**Editados:**
- `src/App.tsx` — adicionar 3 rotas novas
- `src/pages/AdminDashboard.tsx` — botão "Propostas" na navbar admin

### 5. Fora do escopo (pra fases futuras)

- Geração de PDF da proposta (pode adicionar depois com `react-pdf` ou print-to-PDF)
- Assinatura digital
- Envio automático por email (precisa Lovable Emails)
- Templates reutilizáveis de proposta

---

**Resumo das entregas desta fase:**
1. Migration com 2 tabelas + RLS
2. Lista de propostas no admin
3. Formulário completo (cliente + projetos + processo + pagamento)
4. Página pública compartilhável via link único
5. Tracking básico de visualização

Quer que eu implemente assim, ou prefere ajustar algo (ex: tirar tracking de views, adicionar campo X, simplificar formas de pagamento)?
