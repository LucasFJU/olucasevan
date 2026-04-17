
O usuário quer melhorar a gestão de projetos no admin. Vou propor um pacote de melhorias baseado no que já existe (`AdminDashboard.tsx` + `AdminProjectForm.tsx`).

## O que pode melhorar (diagnóstico rápido)

**Hoje:**
- Lista com busca por texto e ações editar/excluir
- Stats fixos no topo
- Toggle de destaque só dentro do formulário
- Status só editável dentro do formulário
- `confirm()` nativo feio na exclusão
- Sem ordenação manual, sem filtros, sem duplicação, sem rascunho

## Pacote de melhorias proposto

### 1. Ações rápidas inline na tabela
- **Estrela clicável** para alternar destaque sem abrir o formulário
- **Dropdown de status** na coluna (Concluído / Em andamento / Rascunho) — atualiza com 1 clique
- **Botão de preview** (ícone olho) que abre `/projetos/:id` em nova aba
- **Botão duplicar** — clona o projeto (útil para projetos parecidos)

### 2. Filtros inteligentes
- Chips no topo da lista: **Todos · Destaques · Rascunhos · Por categoria**
- Busca atual continua, mas combinada com os filtros

### 3. Status "Rascunho"
- Novo valor de status para projetos não publicados
- Projetos em Rascunho **não aparecem** no site público (`Index.tsx`, `Projects.tsx`, `ProjectDetail.tsx`)
- Aparecem destacados na admin com badge cinza

### 4. Exclusão elegante
- Substituir `confirm()` por `AlertDialog` do shadcn (componente já instalado)
- Mostra nome do projeto, avisa que é irreversível

### 5. Reordenação manual (drag-and-drop)
- Adicionar coluna `ordem` na tabela `projects`
- Arrastar linhas para reordenar — afeta a ordem de exibição em `/projetos` e `Projetos em destaque` na home
- Usar `@dnd-kit/core` (leve, acessível)

## Mudanças técnicas

**Banco (migration):**
- `ALTER TABLE projects ADD COLUMN ordem integer DEFAULT 0`
- Sem mudança em status (já é `text` livre, aceita "Rascunho")

**Arquivos afetados:**
- `src/pages/AdminDashboard.tsx` — filtros, ações inline, drag-and-drop, AlertDialog
- `src/pages/AdminProjectForm.tsx` — adicionar opção "Rascunho" no select de status, mutação de duplicar
- `src/components/FeaturedProjects.tsx` — filtrar `status != 'Rascunho'`, ordenar por `ordem`
- `src/pages/Projects.tsx` — filtrar `status != 'Rascunho'`, ordenar por `ordem`
- `src/pages/ProjectDetail.tsx` — retornar 404 se status = 'Rascunho'
- Adicionar dependência: `@dnd-kit/core` + `@dnd-kit/sortable`

## Sugiro dividir em duas fases

**Fase 1 (rápido, alto impacto):** ações inline (estrela, status, preview, duplicar) + AlertDialog + filtros + status Rascunho

**Fase 2:** drag-and-drop de reordenação (precisa migration + nova lib)

Posso implementar **a Fase 1 inteira de uma vez**, ou só partes específicas. Me diga qual preferir:

- **A)** Fase 1 completa (ações inline + filtros + Rascunho + AlertDialog)
- **B)** Fase 1 + Fase 2 (tudo, incluindo drag-and-drop)
- **C)** Só ações inline (estrela, status, preview, duplicar) — o mais rápido
- **D)** Outro recorte — me diga qual
