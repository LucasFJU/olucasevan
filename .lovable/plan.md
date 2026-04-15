

# Refinamento Mobile - Correções de Layout e Espaçamento

## Problemas Identificados

1. **Navbar mobile**: O botao "Solicitar Orcamento" aparece no mobile sobrepondo o logo. A classe `btn-primary` (que aplica `inline-flex` via `@layer utilities`) sobrescreve o `hidden` do Tailwind.
2. **Hero mobile**: Foto com shape laranja ficam desproporcionais, muito espaco vazio antes da foto, shape mal posicionado.
3. **Espacamentos gerais**: padding excessivo em mobile em varias secoes.

## Alteracoes

### 1. Navbar — Esconder CTA no mobile corretamente
- **Arquivo**: `src/components/Navbar.tsx`
- Envolver o Link "Solicitar Orcamento" em uma `div` com `hidden md:block`, ou remover `btn-primary` da classe no mobile e usar classes manuais. Solucao mais limpa: adicionar `!hidden md:!inline-flex` ou separar o estilo.
- Alternativa mais robusta: usar `className="hidden md:inline-flex"` diretamente no wrapper, e mover `btn-primary` para dentro.

### 2. Hero — Ajustar foto e layout mobile
- **Arquivo**: `src/components/Hero.tsx`
- Reduzir tamanho da foto no mobile de `w-[300px]` para `w-[220px]`
- Reduzir shape laranja mobile de `w-[200px] h-[240px]` para `w-[160px] h-[200px]`
- Reduzir `pt-[120px]` para `pt-[100px]` no mobile
- Reduzir gap entre texto e foto

### 3. AboutSection — Ajustar espacamento mobile
- **Arquivo**: `src/components/AboutSection.tsx`
- Reduzir padding vertical mobile de `py-[80px]` para `py-[60px]`

### 4. CTASection — Ajustar padding mobile
- **Arquivo**: `src/components/CTASection.tsx`
- Reduzir padding mobile

### 5. Footer — Ajustar espacamento mobile
- **Arquivo**: `src/components/Footer.tsx`
- Reduzir padding vertical mobile

### 6. WhatsAppButton — Nao sobrepor conteudo no mobile
- **Arquivo**: `src/components/WhatsAppButton.tsx`
- Reduzir tamanho do botao no mobile (`w-12 h-12` em vez de `w-14 h-14`)
- Posicionar `bottom-4 right-4` no mobile

### 7. CSS — Corrigir conflito btn-primary/hidden
- **Arquivo**: `src/index.css`
- Garantir que `btn-primary` nao force `inline-flex` quando `hidden` esta presente. Solucao: remover `inline-flex` do `btn-pill` e aplicar separadamente.

## Arquivos editados
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx`
- `src/components/AboutSection.tsx`
- `src/components/CTASection.tsx`
- `src/components/Footer.tsx`
- `src/components/WhatsAppButton.tsx`
- `src/index.css`

