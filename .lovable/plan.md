

# Plano de Ajustes: Layout, UI/UX, Imagens e Remoção do Processo

## Resumo
Corrigir responsividade mobile, remover a aba/seção Processo, gerar imagens de capa para projetos demo via IA, inserir projetos no banco, e aplicar melhorias gerais de UI/UX.

---

## Problemas Identificados

### Mobile (360px)
- **Hero**: O `items-end` faz o conteúdo ficar no fundo da tela, desperdiçando espaço. Social icons ocupam espaço lateral desnecessário
- **Services**: O layout 30%/70% com `border-l` não funciona no mobile — a coluna de imagem é hidden mas o border permanece
- **About Stats**: Cards com padding `p-20` no desktop são excessivos; no mobile `p-8` é ok mas os borders ficam inconsistentes
- **LogosSection**: "Trusted By" em inglês, marquee pode cortar em telas pequenas
- **Footer**: Grid de 3 colunas empilha bem, mas SOCIAL fica sozinha
- **Banners de página** (About, Work, Services): Títulos ainda em inglês ("About", "Work", "Services")

### Desktop
- **Services**: Imagem placeholder à esquerda é um retângulo vazio com gradiente — parece inacabado
- **FeaturedProjects**: Seção vazia, sem projetos no banco
- **Showreel card**: Apenas um placeholder com botão play sem funcionalidade

### Idioma
- LogosSection: "Trusted By" → "Parceiros"
- Banners: "About" → "Sobre", "Work" → "Projetos", "Services" → "Serviços"
- Search placeholder: "Search..." → "Buscar..."

---

## Plano de Implementação

### 1. Remover aba Processo
- Remover rota `/processo` do `App.tsx`
- Remover link "Processo" do `Navbar.tsx`
- Remover link "Processo" do `Footer.tsx`
- Remover `ProcessSection` do `Index.tsx`
- Manter o arquivo `ProcessSection.tsx` (sem uso, mas não prejudica)

### 2. Gerar 4 imagens de capa via IA
Usar o script de AI Gateway para gerar imagens profissionais para os projetos demo:
- **Café Origina** — Brand Identity (café premium, tons terrosos)
- **FitPulse** — Social Media Design (app fitness, vibrante)
- **NexTech** — Web Design (tech startup, dark/futurista)
- **Atelier Noir** — Brand Design (moda luxo, minimalista)

Upload para Supabase Storage e inserir projetos no banco com `destaque = true`.

### 3. Corrigir responsividade mobile

**Hero**:
- Mudar de `items-end` para `items-center` no mobile
- Esconder social icons no mobile (já esconde showreel, consistente)
- Reduzir padding top no mobile

**Services**:
- Remover a coluna de imagem placeholder completamente (substitui por nada — a seção fica full-width)
- Remover `border-l` no mobile
- Reduzir font-size dos serviços listados no mobile

**About Stats**:
- Reduzir padding no mobile de `p-8` para `p-6`

**Footer**:
- Ajustar grid SOCIAL para inline no mobile

### 4. Padronizar idioma para PT-BR
- LogosSection: "Trusted By" → "Parceiros"
- About.tsx banner: "About" → "Sobre"
- Projects.tsx banner: "Work" → "Projetos"  
- Services.tsx banner: "Services" → "Serviços"
- About.tsx labels: "[ 01 ] About", "[ 02 ] Tools" → "[ 01 ] Sobre", "[ 02 ] Ferramentas"
- Projects.tsx search: "Search..." → "Buscar..."

### 5. Melhorias UI/UX
- **Remover imagem placeholder** da ServicesSection (coluna esquerda vazia)
- **Simplificar ServicesSection**: Tornar full-width sem split 30/70
- **Melhorar hover states**: Adicionar `scale` sutil nos cards de serviço
- **CTA Section**: Adicionar ícone ou elemento visual decorativo
- **Navbar**: Garantir que o link ativo tenha destaque visual claro

---

## Detalhes Técnicos

### Arquivos editados:
- `src/App.tsx` — remover rota `/processo`
- `src/components/Navbar.tsx` — remover link Processo
- `src/components/Footer.tsx` — remover link Processo
- `src/pages/Index.tsx` — remover ProcessSection
- `src/components/Hero.tsx` — ajustar layout mobile
- `src/components/ServicesSection.tsx` — layout full-width, remover placeholder
- `src/components/LogosSection.tsx` — traduzir
- `src/pages/About.tsx`, `Projects.tsx`, `Services.tsx` — traduzir banners

### Banco de dados:
- INSERT de 4 projetos com imagens geradas por IA
- Upload de imagens para Supabase Storage bucket "projects"

