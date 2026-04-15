

# Quick Wins + Foto Pessoal na Home

## Resumo
Implementar os quick wins da auditoria (sem blog e sem chatbot) e adicionar a foto do usuario na homepage.

## Alteracoes

### 1. Adicionar foto pessoal na Home
- Copiar a imagem enviada para `src/assets/profile-photo.png`
- Modificar `Hero.tsx`: substituir o Showreel card (placeholder vazio) pela foto profissional com tratamento visual (recorte, borda sutil, glow laranja)
- A foto fica no lado direito do hero (desktop) e aparece tambem no mobile

### 2. Remover grayscale dos projetos
- `ProjectCard.tsx`: remover `grayscale group-hover:grayscale-0`, manter apenas scale + shadow no hover

### 3. Corrigir "View Project" para "Ver Projeto"
- `ProjectCard.tsx` linha 47: trocar texto

### 4. Botao flutuante de WhatsApp
- Criar `src/components/WhatsAppButton.tsx` com botao fixo no canto inferior direito (icone verde #25D366)
- Adicionar no `Layout.tsx`
- Numero placeholder configuravel

### 5. Corrigir titulo do index.html
- Trocar "Studio" por "Lucas Evan — Designer de Marcas e Experiencias Digitais" (ou nome real)
- Atualizar OG tags

### 6. Reduzir banners de paginas internas
- `About.tsx`, `Projects.tsx`, `Services.tsx`, `Contact.tsx`: reduzir altura dos banners hero de ~600px para ~300px

### 7. Melhorar CTAs
- Trocar "Fale Conosco" por "Solicitar Orcamento" onde aplicavel
- Adicionar badge "Resposta em 24h" no formulario de contato

### 8. LogosSection — trocar texto
- Substituir "Parceiros" por "Empresas que confiam" ou remover nomes ficticios

## Arquivos editados
- `src/assets/profile-photo.png` (novo - copia da imagem)
- `src/components/Hero.tsx` — foto no lugar do showreel
- `src/components/ProjectCard.tsx` — remover grayscale, traduzir texto
- `src/components/WhatsAppButton.tsx` (novo)
- `src/components/Layout.tsx` — incluir WhatsApp button
- `index.html` — titulo e meta tags
- `src/pages/About.tsx`, `Projects.tsx`, `Services.tsx`, `Contact.tsx` — reduzir banners
- `src/components/LogosSection.tsx` — ajustar nomes

