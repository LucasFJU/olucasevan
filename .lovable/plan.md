
O usuário relata lentidão no carregamento da home e da página de projetos. Investigando:

**Causas prováveis (baseado no código já visto):**

1. **Imagens enormes não otimizadas** — `lucas-hero.png` (PNG, provavelmente vários MB), `hero-bg.png`, e as imagens de capa dos projetos vindas do Supabase Storage são servidas em tamanho original sem compressão/redimensionamento. Cada projeto tem galeria de 10 imagens carregadas sem necessidade na listagem.

2. **`FeaturedProjects` e `Projects` fazem `select("*")`** — trazem o array `galeria` inteiro (10 URLs por projeto) mesmo precisando só da `imagem_capa` na listagem. Payload inflado.

3. **Hero image sem `loading` adequado e sem versões responsivas** — PNG carregado em altura `85vh` mesmo em mobile (apesar de `hidden md:flex`, ainda é baixado pelo browser em alguns casos).

4. **Sem cache no React Query** — staleTime padrão é 0, refaz fetch toda navegação.

## Plano

**1. `src/components/FeaturedProjects.tsx` e `src/pages/Projects.tsx`**
- Trocar `select("*")` por `select("id, titulo, descricao, categoria, imagem_capa, tags, data_publicacao")` — remove o array `galeria` pesado da listagem.
- Adicionar `staleTime: 5 * 60 * 1000` (5 min) no `useQuery` para evitar refetch ao navegar entre páginas.

**2. `src/components/Hero.tsx`**
- Adicionar `fetchpriority="high"` na `lucasHero` (LCP) e `loading="eager"`.
- Adicionar `loading="lazy"` no `heroBg` se for decorativo (ou manter eager se for crítico).
- Converter as imagens para formato otimizado: instruir conversão de `lucas-hero.png` e `hero-bg.png` para `.webp` (redução de 60-80% no tamanho). Vou usar `code--exec` no modo default para converter via `cwebp`/imagemagick e atualizar os imports.

**3. Imagens de capa dos projetos (Supabase Storage)**
- Usar transformação de imagem do Supabase Storage adicionando `?width=800&quality=75` nas URLs renderizadas em `ProjectCard` e `FeaturedProjects` — serve versão redimensionada/comprimida sem mexer nos arquivos originais.
- Garantir `loading="lazy"` em todas as imagens de capa fora do viewport inicial.

**4. Bonus — Code splitting**
- Verificar se `framer-motion` está sendo importado em todo lugar. Não é crítico agora, mas pode ser otimizado depois.

**Resultado esperado:** redução significativa do payload (de ~10-20MB para ~1-2MB no first load) e tempo de carregamento muito menor, especialmente na home e em /projetos.

Vou implementar os passos 1, 2 e 3. O passo 4 fica como sugestão futura.
