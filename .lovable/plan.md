

## Análise: por que o hero não está igual à referência

Comparei a imagem de referência (`04-2.png`) com o estado atual do `Hero.tsx` e identifiquei as divergências principais:

### Diferenças encontradas

| Elemento | Referência | Atual | Problema |
|---|---|---|---|
| **Listras de luz laterais** | Listras verticais largas, suaves, em laranja quente cobrindo TODO o fundo (esquerda + direita), como cortinas de luz | 2 camadas de `repeating-linear-gradient` finas e fracas, com máscaras que limitam muito a área | Listras quase invisíveis e pequenas demais |
| **Glow atrás da figura** | Halo laranja MUITO intenso e amplo ao redor de toda a silhueta (parece um "sol" atrás dele) | 2 círculos `bg-primary/30` e `/40` com `blur-3xl` — opacidade baixa e pequenos | Glow fraco, não envolve a figura |
| **Cards glassmorphism** | 2 cards grandes, claramente visíveis, com bordas brilhantes brancas e bem posicionados sobre o ombro/torso | Cards com `bg-white/[0.03]` e `border-white/15` — quase invisíveis | Opacidade baixíssima — não aparecem |
| **Posição da figura** | Figura centralizada-direita, ocupando ~50% da largura | `object-right` faz a figura colar na borda direita | Cortando parte da figura |
| **Fundo** | Preto puro com gradiente vertical de listras coloridas (laranja → âmbar) ocupando toda a tela | Background quase liso com leve glow no topo | Sem o "wall of light" colorido de fundo |

### Causa raiz

As camadas existem no código, mas com **opacidades e tamanhos muito tímidos** — o efeito visual final é sutil demais. A referência tem efeitos **cinematográficos e dramáticos**, com cores saturadas e elementos bem visíveis.

---

## Plano de correção

### 1. Substituir o sistema de listras de luz (`Hero.tsx`)
Trocar os `repeating-linear-gradient` por **uma única camada full-width** com listras verticais largas e saturadas:
- Cobertura: `inset-0` (tela inteira, não apenas 35%/55%)
- Listras de 80-120px de largura, espaçadas, em laranja quente (`hsl(15 100% 50%)` e `hsl(25 100% 55%)`)
- Opacidade alta (0.25-0.4) com `blur-2xl` para suavizar
- Máscara radial centrada na figura para concentrar o brilho ao redor dela

### 2. Intensificar o glow atrás da figura
- Aumentar opacidade: `bg-primary/30` → `bg-primary/60`
- Aumentar tamanho: `w-[800px]` → `w-[1100px]`
- Adicionar uma 3ª camada amarelo-âmbar (`hsl(35 100% 60% / 0.5)`) para o efeito de "sol"

### 3. Tornar os cards glassmorphism visíveis
- Borda: `border-white/15` → `border-white/30`
- Fundo: `bg-white/[0.03]` → `bg-white/[0.08]`
- Adicionar leve `inset` highlight com `shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]`
- Aumentar tamanho dos cards (~250x180px e ~280x200px)

### 4. Reposicionar a figura
- Trocar `object-right` por `object-[70%_center]` para deixar a figura mais centralizada-direita (não colada na borda)

### Arquivo alterado
- `src/components/Hero.tsx` — reescrever camadas de fundo, glow e cards

