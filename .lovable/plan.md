

## Plano: Clarear imagem + adicionar efeito de luz atrás

**Objetivo:** Aumentar a luminosidade da foto de perfil e criar um efeito de "glow" laranja atrás da figura para dar profundidade e destaque cinematográfico.

### 1. Clarear a imagem (`src/assets/profile-photo-new.png`)
Reeditar a imagem com `imagegen--edit_image`:
- Aumentar exposição geral (~+15%)
- Realçar mid-tones do rosto e roupa
- Manter o rim light laranja já aplicado
- Preservar fundo escuro para integração com o site

### 2. Adicionar efeito de luz atrás (`src/components/Hero.tsx`)
Inserir uma camada de "glow" radial entre o gradiente de fundo e a imagem:
- Glow laranja (`hsl(15 100% 50%)`) grande e difuso, posicionado atrás da silhueta (lado direito do hero, ~70% horizontal / 50% vertical)
- Tamanho: ~800px de diâmetro com blur intenso
- Opacidade: ~0.25-0.35 para não competir com o rosto
- Camada secundária menor mais quente/intensa logo atrás da cabeça para efeito de halo
- Z-index entre o background (z-0) e a imagem (z-1)

### Estrutura de camadas resultante:
```text
z-0  → Gradient background (radial topo)
z-[0.5] → NOVO: Glow laranja atrás da figura
z-1  → Imagem de perfil (clareada)
z-10 → Conteúdo (texto + botões)
```

### Arquivos alterados:
- `src/assets/profile-photo-new.png` — reedição (clarear)
- `src/components/Hero.tsx` — adicionar 1-2 divs com `bg-primary blur-3xl` posicionados absolutamente

