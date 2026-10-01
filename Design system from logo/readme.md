# LM Tubos — Design System

**LM Tubos Materiais** (Goiânia – GO, Jardim Imperial) é uma distribuidora de materiais para sistemas de combate a incêndio: tubos (pintados, a pronta entrega) e conexões — com destaque para o material ranhurado —, válvulas (inclusive importadas), registros, bombas, sprinklers, hidrantes e acessórios. 6 anos de mercado, atendimento em todo o Brasil, principalmente Norte e Nordeste. Modelo comercial: orçamento por lista de materiais, canal principal WhatsApp.

Slogan: **“Material completo contra incêndio, a pronta entrega para todo o Brasil.”**
Contato: WhatsApp (62) 98558-7373 · vendas01@lmtubos.com.br · www.lmtubos.com.br · Rua Pedro Galvão, Qd. 2 Lt. 17, Jardim Imperial, Goiânia – GO, CEP 74.492-215 · CNPJ 39.770.705/0001-23 · @lmtubos

## Fontes usadas
- `assets/logo.pdf` — vetor original do wordmark (CorelDRAW 2020, “LOGOLMTUBOS.cdr”). Contém apenas o wordmark **LM TUBOS** + régua + tagline “MATERIAIS CONTRA INCÊNDIO” (Calibri Bold). **Não contém o símbolo chama+gota** que aparece na fachada.
- 5 fotos da fachada e placas (WhatsApp, 29/09/2026) — `assets/fachada-loja.jpg`, `assets/placa-endereco.jpg`.
- Briefing do cliente (respostas do formulário): superfície prioritária = site institucional; tom direto e comercial; modernizar sutilmente; sugerir fonte moderna.

Superfície coberta: **site institucional** (UI kit). Não há sistema legado nem codebase.

## CONTENT FUNDAMENTALS
- **Tom:** direto e comercial. Fala de preço, prazo, estoque e entrega. Sem adjetivos vazios; números e fatos (“pronta entrega”, “1h útil”, “DN 1″ a 8″”).
- **Pessoa:** a empresa fala em “nós” implícito (“Retornamos com preço e prazo”); trata o cliente por “você” sem formalidade excessiva. Público: instaladores, engenheiros, compradores de construtoras.
- **Caixa:** títulos em sentence case (“Envie sua lista de materiais”). Caixa alta só em eyebrows/selos curtos (PRONTA ENTREGA, IMPORTADO) — herança das placas da fachada.
- **CTA:** verbo + objeto: “Pedir orçamento”, “Enviar lista”, “Falar com vendas”, “Ver produtos”. Nunca “Saiba mais” sozinho.
- **Preço:** nunca aparece no site — cada projeto é orçado. Diga isso abertamente (“Sem preço no site: cada projeto tem quantidade, prazo e frete diferentes”).
- **Termos técnicos** em PT-BR de mercado: ranhurado, DN, sprinkler pendente/upright, VGA (válvula de governo e alarme), registro de recalque, abrigo de hidrante.
- **Emoji:** nunca. Ícones: Lucide (outline), com moderação.

## VISUAL FOUNDATIONS
- **Cores.** Vermelho LM `#E53013` (primária — CTA, destaques, eyebrows) e azul-marinho `#2B2A6F` (secundária — títulos, fundos escuros, links), ambos extraídos do vetor. Neutros cinza-frios; os cinzas K20/K40/K50 da logo viram régua e bordas. Verde WhatsApp `#25D366` é o único “de fora”, restrito ao canal de contato. Proporção: páginas majoritariamente brancas/cinza-claro, blocos azul-marinho para seções de conversão, vermelho em pequenas doses.
- **Tipografia.** Display **Sora** (700/800, tracking -0.02em) — geométrica e firme, ecoa o wordmark italic sem imitá-lo. Corpo **Figtree** (400–700). **Carlito** (métrica de Calibri) apenas para a tagline da logo. Escala 12→64px, line-height 1.1 em títulos, 1.5 no corpo.
- **Espaço.** Base 4px; container 1200px; gutter 24px; seções 80px.
- **Cantos.** CTAs e badges em **pílula** (`--radius-button`); inputs 8px; cards 12px; modais 20px; foto-destaque 20px.
- **Bordas e sombras.** Cards padrão são “tint” (cinza 50, sem borda, sem sombra). Sombras azuladas discretas (`--shadow-sm/md`) só em hover/elevação e modais. Foco: anel azul-marinho 3px.
- **Motivos.** (1) **Régua** cinza de 3px sob o wordmark → divisores e sublinhado de abas (versão vermelha). (2) **Faixa** vermelho/azul da fachada (`--brand-stripe`) → filete de 4px no rodapé do header e topo de modais. (3) Placas-pílula azuis da fachada → Tags.
- **Imagens.** Fotografia real do estoque/fachada, cores naturais, com overlay azul-marinho (`--overlay-photo`) quando há texto branco por cima. Sem ilustração, sem 3D, sem stock genérico.
- **Movimento.** Transições 120–200ms, easing `cubic-bezier(.2,0,0,1)`. Hover: cor de fundo mais escura (botões), elevação +2px (cards interativos). Press: translateY(1px). Nada de bounce.
- **Layout.** Header sticky com barra superior de contato. Grid de 3 colunas para produtos, 2 colunas texto+foto para destaques. Rodapé azul-marinho profundo em 4 colunas.
- **Transparência/blur** apenas na faixa de números sobre o hero (rgba branco 8% + blur 6px).

## UX — TÉCNICAS APLICADAS
1. **Hierarquia de ação:** um único botão primary (vermelho) por bloco visível; secundários em outline/inverse; seta → só em CTAs que mudam de tela.
2. **Redução de atrito:** WhatsApp a um clique em header, sticky CTA e rodapé; formulário curto; "sem cadastro · resposta em 1h útil" ao lado do CTA (micro-copy de segurança).
3. **Feedback imediato:** hover eleva (-2px + sombra colorida), press encolhe 2%, estado loading no botão, toast de confirmação, contador de linhas na lista de materiais.
4. **Prova social e confiança:** contadores animados (anos, estados, itens), fotografia real, CNPJ/endereço no rodapé.
5. **Escaneabilidade:** padrão eyebrow → título → lead em toda seção; selos de disponibilidade; catálogo com abas + filtro + estado vazio útil + "limpar filtros"; FAQ em acordeão.
6. **Movimento com propósito:** Reveal ao rolar (≤700ms, escalonado 80–120ms), parallax leve no hero, header que encolhe, marquee pausável, barra de progresso. Tudo respeita `prefers-reduced-motion`.
7. **Acessibilidade:** contraste AA, anel de foco, labels reais, aria-expanded/aria-live/aria-busy, alvos ≥ 44px.
8. **Continuidade:** página atual persistida; scroll suave ao navegar; voltar ao topo.

## MOTION
Tokens em `tokens/effects.css` (durações, easings, `--lift`, sombras coloridas) e `tokens/motion.css` (keyframes `lm-fade-up`, `lm-fade-in`, `lm-scale-in`, `lm-pulse-ring`, `lm-marquee`, `lm-shimmer`, `lm-stripe-slide`, classe `.lm-reveal`). Componentes: `components/motion/` — Reveal, Counter, Marquee, StickyCTA, ScrollProgress; `components/navigation/Accordion`.
Regras: hover = cor + lift; entrada = fade-up 24px; modais = scale-in com spring; nunca bounce em texto; uma animação contínua por viewport no máximo (marquee OU listras do CTA).

## ICONOGRAFIA
Nenhum ícone próprio foi fornecido. Sistema recomendado: **Lucide** (outline, 2px) via CDN `https://unpkg.com/lucide@latest`, 20px em botões, 24px em listas, cor herdada. Sem ícones preenchidos, sem emoji, sem caracteres unicode como ícone (exceto “×” de fechar).
**Logo:** `assets/lm-tubos-logo-horizontal.svg` (padrão), `-inverse.svg` (fundo escuro), `lm-tubos-logo.svg` (quadrada, área original do PDF). O símbolo **chama + gota** visto na fachada NÃO foi vetorizado — pedir o arquivo ao cliente antes de usá-lo.

## Substituições de fonte
Calibri Bold (tagline) → **Carlito** (web, métrica idêntica). Sora e Figtree são escolhas novas do sistema (cliente pediu sugestão moderna); ambas via Google Fonts.

## Índice
- `styles.css` → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`
- `guidelines/` — cards de fundação: Brand (logo, inversa, área de proteção, régua/faixa, fotografia), Colors (marca, vermelho, marinho, neutros, semânticas, texto/superfícies), Type (display, corpo, escala, tagline), Spacing (escala, raios/sombras, layout, motion), UX (princípios).
- `components/core/` — Button, IconButton, Badge, Tag, Card, Logo
- `components/forms/` — Input, Select, Checkbox, Radio, Switch
- `components/navigation/` — Tabs, Accordion
- `components/motion/` — Reveal, Counter, Marquee, StickyCTA, ScrollProgress
- `components/feedback/` — Dialog, Toast, Tooltip
- `components/commerce/` — ProductCard *(adição intencional: o card de catálogo com selo de disponibilidade + CTA de orçamento é o bloco central do site)*
- `ui_kits/site/` — site institucional: Home, Produtos, Contato (`index.html` click-through)
- `assets/` — logos SVG, PDF original, fotos da fachada
- `SKILL.md` — skill para uso em Claude Code
