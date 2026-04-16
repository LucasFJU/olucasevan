

## Análise da Home (Desktop)

Comparando o seu Hero atual com a referência (Folioblox):

**Na referência:**
- A foto ocupa **~50% da largura** da tela e quase toda a altura do hero (do topo ao fundo)
- A foto é **muito grande** — domina o lado direito
- O shape laranja aparece atrás da foto, alinhado à direita, como uma "moldura"
- O texto fica à esquerda com bastante respiro

**No seu site atual:**
- A foto está com `md:w-[400px]` — pequena demais comparada ao hero
- O container é `max-w-[1200px]` mas a foto não preenche o espaço
- O shape laranja está pequeno (`260x320px`) e mal posicionado

## Plano de Ajustes

### 1. `Hero.tsx` — Aumentar foto desktop
- Foto: `md:w-[400px]` → `md:w-[560px] lg:w-[620px]`
- Shape laranja: `md:w-[260px] md:h-[320px]` → `md:w-[420px] md:h-[520px]`
- Reposicionar shape: `top-[10%] right-0`
- Container do lado direito: `md:w-[42%]` → `md:w-[48%]`
- Ajustar `align-items` para `items-end` para a foto "encostar" no chão do hero
- Remover `pb-[80px]` no desktop para a foto ir até a base

### 2. Texto lado esquerdo
- Reduzir `md:w-[55%]` → `md:w-[50%]` para dar mais espaço à foto

---

## Medida da Home Mobile (para você criar a imagem de referência)

**Viewport mobile padrão** que recomendo usar como base:

| Dispositivo | Largura | Altura |
|---|---|---|
| **iPhone 14/15 Pro** (recomendado) | **390px** | **844px** |
| iPhone SE (mínimo) | 375px | 667px |
| Android padrão | 360px | 800px |

**Crie sua imagem de referência em: `390 x 844px`** (proporção 9:19.5)

Para o **hero mobile** especificamente, considere a área visível inicial:
- **Largura: 390px**
- **Altura: ~700px** (descontando barra de status/navegador do celular)

Assim consigo replicar fielmente o que você desenhar.

