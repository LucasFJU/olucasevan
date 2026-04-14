

# Projetos Fictícios com Capas e Galerias

## Situação Atual
Os 4 projetos (Café Origina, FitPulse, NexTech, Atelier Noir) já existem no banco com capas, mas a galeria está vazia (`[]`). Precisamos gerar 10 imagens de galeria para cada projeto + atualizar as descrições e tags.

## Plano

### 1. Gerar 44 imagens via IA (4 capas novas + 40 de galeria)
Usar o AI Gateway (`google/gemini-3-pro-image-preview`) para gerar imagens profissionais de alta qualidade:

**Café Origina** (Brand Identity):
- Capa: Mockup de logo em xícara de café
- Galeria: Logo variations, packaging, cardápio, sacola, cartão de visita, sinalização, website mockup, social media posts, pattern, merchandise

**FitPulse** (Social Media):
- Capa: Grid de Instagram com posts fitness
- Galeria: Stories, carrossel, reels cover, post motivacional, infográfico, highlight covers, banner, anúncio, feed layout, brand guidelines

**NexTech** (Web Design):
- Capa: Mockup de laptop com dashboard
- Galeria: Homepage, about page, pricing, mobile responsive, components, icons, typography, color system, wireframes, final desktop

**Atelier Noir** (Brand Design):
- Capa: Logo dourado em fundo preto
- Galeria: Cartão de visita, tag de roupa, sacola, lookbook, embalagem, convite, padrão, website, social media, editorial

### 2. Upload para Supabase Storage
Fazer upload de todas as imagens para o bucket `projects` (já existe e é público).

### 3. Atualizar banco de dados
Usar INSERT/UPDATE para preencher o campo `galeria` com os URLs das 10 imagens de cada projeto e atualizar descrições e tags mais completas.

### 4. Melhorar layout da galeria no ProjectDetail
Ajustar o grid de galeria para exibir as 10 imagens com layout mais dinâmico (alternando entre imagens full-width e grid 2 colunas).

## Detalhes Técnicos
- Script Python usando `/tmp/lovable_ai.py` para gerar imagens em batch
- Upload via `curl` para Supabase Storage REST API
- UPDATE SQL via insert tool para atualizar galerias
- Edição de `src/pages/ProjectDetail.tsx` para melhorar o layout da galeria

