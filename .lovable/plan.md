# Evolução do Folioblox com referências Pilea, Midu e Aiko

## Diagnóstico do site atual

### O que já funciona bem
- A proposta principal é entendida rapidamente: design estratégico para posicionar marcas e gerar conversão.
- A identidade escura com laranja é reconhecível e deve ser preservada.
- O site já oferece projetos filtráveis, detalhes com galeria e lightbox, formulário de contato, WhatsApp configurável e painel de projetos.
- Os CTAs aparecem nos principais pontos da jornada e o carregamento das capas já possui otimização e estados de espera.

### Problemas prioritários encontrados
1. **Credibilidade:** logos e depoimentos exibidos na Home são fictícios; também há promessas numéricas não comprovadas.
2. **Dados conflitantes:** a Home mostra 5.000 projetos, 500 clientes e 13 anos, enquanto a página Sobre mostra 120 projetos, 50 clientes e 8 anos.
3. **Contato:** telefone e e-mail visíveis são placeholders; os ícones sociais do topo e os links de Privacidade/Termos não levam a destinos reais.
4. **Narrativa da Home:** depoimentos aparecem antes dos serviços e dos projetos, reduzindo a força do storytelling.
5. **Cases pouco estratégicos:** o detalhe do projeto privilegia imagens, mas não apresenta claramente problema, processo, solução e resultado. O título do projeto aparece incorretamente como cliente.
6. **Serviços sem redução de objeções:** faltam processo, prazos típicos, entregáveis resumidos, perguntas frequentes e uma ponte direta para cases relacionados.
7. **Formulário pouco qualificador:** ainda não coleta faixa de investimento e prazo; também precisa de proteção contra spam e erros mais acessíveis.
8. **Admin parcialmente desconectado:** editar “Sobre” no painel não atualiza o conteúdo público.
9. **Acessibilidade e acabamento:** faltam descrição nas imagens da galeria, estado acessível no menu mobile, link para pular ao conteúdo, suporte completo a movimento reduzido e foco correto no lightbox.
10. **Consistência técnica:** há avisos de `ref` no console, categorias divergentes entre Serviços e Projetos, metadados estáticos com marca diferente e elementos visuais usando valores fora do sistema de estilos.

## O que aproveitar de cada referência

### Pilea Agency
- Prova social e números reais próximos da primeira dobra.
- Processo apresentado como linha do tempo, reduzindo incerteza sobre contratação.
- FAQ comercial e repetição estratégica do CTA.
- Comunicação direta de escopo, compromisso e forma de trabalho.

**Não copiar:** estética de produto SaaS, player de vídeo ou paleta verde; esses elementos pertencem ao nicho da Pilea.

### Midu Design
- Cases padronizados em **Visão geral → Desafio → Solução → Resultado**.
- Tags de setor, serviço e ano para facilitar leitura e comparação.
- CTA principal único e consistente.
- Indicador de disponibilidade real, sem urgência artificial.

**Não copiar:** textos, cases, identidade ou falsa escassez de vagas.

### Aiko
- Fluxo comercial completo: serviços → processo → trabalhos → depoimentos → oferta → contato.
- Tipografia editorial de grande impacto, labels pequenos e microinterações discretas.
- Pacotes ou faixas de investimento para qualificar contatos.

**Não copiar:** tema claro genérico, escala tipográfica extrema ou conteúdo de template.

## Direção recomendada

Preservar o dark theme e o laranja do Folioblox, mas tornar o conjunto mais editorial, confiável e orientado a cases. A nova ordem da Home será:

```text
Hero com proposta e CTA
→ prova real curta
→ serviços
→ processo de trabalho
→ projetos selecionados
→ depoimentos reais
→ FAQ comercial
→ CTA final
```

Se ainda não houver clientes, depoimentos ou métricas comprováveis, esses blocos serão ocultados ou substituídos por mensagens neutras — nunca por dados fictícios.

## Plano de implementação

### Fase 1 — Confiança e correções essenciais
- Centralizar nome, e-mail, telefone, WhatsApp, links sociais e métricas reais nas Configurações do painel.
- Remover placeholders, links mortos e qualquer prova social não validada.
- Sincronizar a página Sobre com o conteúdo administrável.
- Corrigir cliente nos cases, categorias inconsistentes e marca/metadados globais.
- Criar páginas de Política de Privacidade e Termos adequadas à captação de leads.

### Fase 2 — Nova jornada da Home
- Reorganizar as seções conforme o funil recomendado.
- Refinar o Hero sem trocar a identidade atual: hierarquia mais limpa, CTA principal dominante e prova real compacta.
- Adicionar seção “Como trabalho” com 4 etapas: diagnóstico, direção, criação e entrega.
- Levar os projetos para antes dos depoimentos.
- Adicionar FAQ comercial próximo do CTA final.
- Aplicar microinterações editoriais inspiradas nas referências, respeitando movimento reduzido.

### Fase 3 — Cases e serviços que vendem
- Estruturar cada projeto com cliente, setor, desafio, solução, processo, entregáveis e resultados.
- Permitir gerenciar esses campos no painel sem alterar o visual principal do site.
- Exibir tags e métricas verificáveis nos cards e páginas de projeto.
- Ligar cada serviço aos cases relacionados.
- Adicionar prazos típicos e, opcionalmente, “projetos a partir de” ou faixas de investimento — sem inventar valores.

### Fase 4 — Conversão e qualidade
- Qualificar o formulário com prazo e faixa de investimento.
- Adicionar proteção contra spam e melhorar mensagens de erro e confirmação.
- Personalizar o texto do WhatsApp conforme a página ou projeto de origem.
- Corrigir navegação por teclado, textos alternativos, foco do lightbox e menu mobile.
- Corrigir avisos do console, reduzir animações pesadas e separar o código público do painel para acelerar a primeira visita.

### Fase 5 — Validação
- Testar toda a jornada em mobile, tablet e desktop.
- Validar filtros, cases, formulário, WhatsApp, links sociais, painel e publicação de projetos.
- Comparar carregamento antes/depois e revisar contraste, sobreposições, teclado e leitores de tela.

## Decisões necessárias durante a execução
- Fornecer métricas, clientes e depoimentos reais; sem isso, os blocos serão ocultados.
- Fornecer e-mail, telefone e links sociais definitivos.
- Decidir se os serviços mostrarão apenas “sob consulta”, preço inicial ou faixas de investimento.

## Fora do escopo
- Não criar blog nem chatbot.
- Não copiar layouts, textos, imagens ou identidade visual das referências.
- Não substituir a identidade Folioblox por um template genérico.
