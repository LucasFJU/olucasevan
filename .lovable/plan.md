

# Plano: Swipe no Lightbox, Correções Admin e Melhorias UI

## Bug Critico Encontrado

O formulario de publicacao de projetos esta falhando porque o campo `status` esta sendo enviado na mutation (`projectData.status`), mas a tabela `projects` no banco **nao tem coluna `status`**. Isso causa erro no INSERT/UPDATE. A solucao e remover `status` do `projectData` ou adicionar a coluna ao banco.

## Implementacao

### 1. Corrigir publicacao de projetos (AdminProjectForm.tsx)
- Remover o campo `status` do objeto `projectData` enviado ao banco (linhas 86-96), ja que a coluna nao existe
- OU adicionar coluna `status` ao banco via migracao (mais completo)
- **Recomendacao**: adicionar a coluna `status` (text, default 'Concluído') para manter a funcionalidade

### 2. Persistir rascunho do formulario (AdminProjectForm.tsx)
- Salvar o estado do formulario em `localStorage` a cada alteracao (debounced)
- Ao montar o componente (modo criacao), restaurar do `localStorage` se existir
- Limpar o `localStorage` apos salvar com sucesso
- Nao aplicar ao modo edicao (que carrega do banco)

### 3. Swipe/Touch no Lightbox (ProjectDetail.tsx)
- Adicionar `onTouchStart` / `onTouchEnd` handlers no container do lightbox
- Detectar direcao do swipe (deltaX > 50px = trocar imagem)
- Swipe left = proxima, swipe right = anterior

### 4. Ajustar espacamentos do Hero (Hero.tsx)
- Reduzir `pt-[100px]` para `pt-[80px]` no mobile
- Adicionar `pb-[60px] md:pb-0` para dar respiro na parte inferior
- Centralizar melhor o conteudo verticalmente no mobile

### 5. Remover rota `/processo` (App.tsx)
- A rota `/processo` na linha 32 ainda existe apontando para `Services`. Remover

### 6. Melhorar ServicesSection (ServicesSection.tsx)
- Adicionar link "Saiba mais" em cada card apontando para `/servicos`
- Melhorar os cards com background sutil (`bg-card`) e padding maior
- Adicionar numeracao nos titulos dos servicos grandes (01, 02, 03...)
- No mobile, reduzir o tamanho da tipografia dos servicos listados

### 7. Sugestoes extras de melhoria
- Adicionar `loading="lazy"` nas imagens da galeria do ProjectDetail (ja tem)
- Melhorar transicao entre imagens no lightbox com animacao de slide em vez de fade

## Detalhes Tecnicos

### Arquivos editados:
- `src/pages/AdminProjectForm.tsx` — fix status bug + localStorage draft
- `src/pages/ProjectDetail.tsx` — swipe touch handlers
- `src/components/Hero.tsx` — espacamentos mobile
- `src/components/ServicesSection.tsx` — melhorias visuais
- `src/App.tsx` — remover rota `/processo`

### Migracao SQL (se aprovado):
```sql
ALTER TABLE public.projects ADD COLUMN status text DEFAULT 'Concluído';
```

