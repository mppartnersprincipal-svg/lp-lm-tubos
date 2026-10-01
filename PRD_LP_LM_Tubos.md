# PRD — Landing Page LM Tubos · Materiais Contra Incêndio

> **Para o Claude Code:** este documento é a fonte única de verdade para construir a landing page. Leia inteiro antes de escrever código. Siga o design system (seção 5) e use a copy da seção 7 **literalmente**. Não invente números, certificações, depoimentos ou clientes. Onde houver `[PENDENTE]`, deixe um placeholder visível e comentado no código.

**Cliente:** LM Tubos Materiais Contra Incêndio LTDA
**Agência:** M|P Assessoria
**Versão:** 1.0 · 30/09/2026

> **Decisões registradas na implementação (30/09/2026):**
> - Conflito com `Design system from logo/`: **os tokens deste PRD prevalecem** (Archivo + Carlito, navy `#2C2A7C`, botões com raio de 8px).
> - Endereço: usar **Qd. 2, Lt. 17, Sala 2** (conforme a placa do CNPJ na fachada) em vez de Lt. 16, com `[PENDENTE: confirmar]`.

---

## 1. Contexto e objetivo

A LM Tubos é uma distribuidora de materiais para sistemas de combate a incêndio sediada em Goiânia (GO). Tem 6 anos de mercado e atende o Brasil inteiro, com foco em Norte e Nordeste. Começou na garagem da casa da mãe de um dos sócios, passou para um galpão alugado na Perimetral e há cerca de um ano opera em **galpão próprio**.

**Objetivo da página:** gerar conversas qualificadas no WhatsApp comercial (pedidos de orçamento e dúvidas técnicas), principalmente de **construtoras**.

**Conversão principal:** clique em qualquer botão de WhatsApp → abre conversa com o comercial (Roberto Silva) com mensagem pré-preenchida.
**Conversão secundária:** envio do mini-formulário de orçamento, que monta a mensagem e abre o WhatsApp.

**Tráfego esperado:** Meta Ads e Google Ads (pesquisa). A página tem de carregar rápido no 4G e funcionar perfeitamente no celular.

---

## 2. Público e mensagem

| Item | Definição |
|---|---|
| Cliente ideal | Construtoras |
| Também atende | Condomínios e síndicos, indústrias e galpões, comércios, engenheiros e projetistas, instaladores e revendas, pessoa física |
| Quem decide | Dono da empresa ou comprador |
| Dor principal | Conseguir **todo o material** para instalar o sistema de incêndio, num fornecedor só |
| Dúvida mais comum | "Qual material é o melhor para usar?" |
| Objeção principal | Preço e negociação |
| Concorrentes | Valk Tubos, Zeus do Brasil |

**Ideia central da página:** *tudo o que a sua obra precisa para o sistema de incêndio, a pronta entrega, com uma equipe técnica que orienta o que comprar.*

**Pilares da mensagem (nessa ordem de peso):**
1. **Material completo e a pronta entrega:** tubos pintados, conexões e válvulas ranhuradas, sprinklers.
2. **Equipe que entende:** orienta qual material usar, reduz erro de compra.
3. **Entrega em todo o Brasil**, com força em Norte e Nordeste.
4. **Negociação direta:** Pix, cartão e boleto (após análise cadastral), condições conversadas caso a caso.

**Tom de voz:** direto, técnico sem jargão desnecessário, confiante e prático. Frases curtas. Falar com quem está tocando obra e precisa resolver. Tratar o leitor por "você". Nada de superlativos vazios ("o melhor do Brasil", "líder de mercado").

---

## 3. Stack e requisitos técnicos

- **HTML + CSS + JavaScript puro**, sem framework e sem etapa de build. Um `index.html`, um `css/styles.css` e um `js/main.js`. A hospedagem pode ser qualquer servidor estático (Hostinger, Vercel, Netlify).
- CSS com **custom properties** (tokens da seção 5). Mobile-first. Sem Tailwind, sem Bootstrap.
- Ícones: **Lucide** em SVG inline (copiar só os SVGs usados, não carregar a biblioteca inteira). Ícone do WhatsApp em SVG inline.
- Fontes via Google Fonts com `preconnect` e `display=swap` (ver 5.2).
- Imagens em **WebP** com fallback JPG, `width`/`height` definidos, `loading="lazy"` em tudo abaixo da dobra. A imagem do hero **não** leva lazy e leva `fetchpriority="high"`.
- Metas de performance: LCP < 2,5 s em 4G, CLS < 0,1, Lighthouse ≥ 90 em Performance, Acessibilidade, Boas Práticas e SEO no mobile.
- Acessibilidade: WCAG AA; foco visível; `alt` descritivo; navegação por teclado no menu mobile e no FAQ; `prefers-reduced-motion` desliga animações.
- Idioma `lang="pt-BR"`.

### 3.1 Estrutura de pastas final

```
LP - LM Tubos/
├── Briefing_LP_LM_Tubos (1) (2).docx.pdf
├── Design system from logo/        ← já existe, consultar (ver 5.0)
├── Fotos_e_Logo/                   ← originais, NÃO editar
├── PRD_LP_LM_Tubos.md              ← este arquivo
└── site/
    ├── index.html
    ├── obrigado.html               ← opcional (ver 8.3)
    ├── css/styles.css
    ├── js/main.js
    └── assets/
        ├── logo/  logo-lm-tubos.svg · logo-lm-tubos-negativo.svg · logo-lm-tubos.png
        ├── img/   (fotos otimizadas, renomeadas)
        └── favicon/
```

### 3.2 Preparação dos arquivos (primeira tarefa)

1. Os arquivos de logo prontos (`logo-lm-tubos.svg`, `logo-lm-tubos-negativo.svg`, `logo-lm-tubos.png`) acompanham este PRD. Copie-os para `site/assets/logo/`. A versão **negativo** (LM e tagline em branco, TUBOS em vermelho) é para fundos azul-marinho escuros (footer, CTA final).
2. Abra e **olhe** cada foto em `Fotos_e_Logo/` (5 arquivos "WhatsApp Image 2026-09-29…"). Descreva o conteúdo de cada uma, renomeie a cópia com nome descritivo (ex.: `fachada-galpao.webp`, `estoque-tubos.webp`) e gere versões WebP em 1600px e 800px de largura.
3. A foto da **fachada do galpão** (letreiro LM Tubos) é a candidata para o hero ou para a seção "Nossa história". Se alguma foto mostrar estoque ou produtos, priorize-a no hero, porque vende "pronta entrega" melhor que a fachada.
4. Gere o favicon a partir do logo: um quadrado azul-marinho `#2C2A7C` com "LM" em branco, itálico, peso 900.

---

## 4. Estrutura da página (ordem das seções)

| # | Seção | id | Objetivo |
|---|---|---|---|
| 0 | Barra superior + Header fixo | `topo` | Marca, navegação, CTA sempre visível |
| 1 | Hero | `inicio` | Promessa + CTA principal |
| 2 | Faixa de diferenciais | — | 4 provas rápidas |
| 3 | Produtos em destaque | `destaques` | Os três produtos que o cliente quer vender mais |
| 4 | Linhas de produtos | `produtos` | Mostrar que é fornecedor completo |
| 5 | Dúvida técnica | `orientacao` | Responder à dúvida nº 1 e virar conversa |
| 6 | Serviços | `servicos` | Projeto, instalação, manutenção, teste hidrostático |
| 7 | Para quem atendemos | `clientes` | Construtoras em destaque + demais públicos |
| 8 | Como funciona o pedido | `como-funciona` | Reduzir atrito e objeção de preço |
| 9 | Marcas | `marcas` | Autoridade por associação |
| 10 | Nossa história | `sobre` | Confiança e empresa real |
| 11 | Avaliações | `avaliacoes` | Prova social do Google |
| 12 | Entrega e pagamento | `entrega` | Brasil todo + formas de pagamento |
| 13 | Orçamento rápido (form) | `orcamento` | Conversão secundária |
| 14 | FAQ | `duvidas` | Quebra de objeções |
| 15 | CTA final | — | Última chamada |
| 16 | Rodapé | `contato` | Dados legais, endereço, mapa |
| — | Botão flutuante WhatsApp | — | Sempre visível |

---

## 5. Design system

### 5.0 Fonte da verdade

Existe a pasta `Design system from logo/` no projeto. **Antes de começar, liste e leia o conteúdo dela.** Se ela trouxer tokens ou arquivos de estilo, compare com esta seção. Se houver conflito de valores, **pare e pergunte ao usuário** qual prevalece. Se a pasta estiver vazia ou só tiver referências visuais, use esta seção.

### 5.1 Cores

Extraídas do logo original (valores medidos no PDF vetorial).

```css
:root {
  /* Marca */
  --navy-900: #1B1A52;  /* fundos escuros: footer, CTA final, seção técnica */
  --navy-700: #2C2A7C;  /* COR PRIMÁRIA DA MARCA — títulos, header, ícones */
  --navy-500: #4A48A0;  /* hover de links navy */
  --navy-50:  #EEEEF6;  /* fundo de seção alternado, chips */

  --red-500:  #E53013;  /* VERMELHO DA MARCA — destaques, ícones, detalhes gráficos, texto grande */
  --red-600:  #C8290F;  /* botões com texto (contraste AA com branco) */
  --red-700:  #A8220C;  /* hover/active dos botões */
  --red-50:   #FDECE8;  /* fundo de badges vermelhos */

  /* Cinzas do logo (sombra do letreiro) */
  --gray-500: #939598;  /* linhas, divisores, sombra gráfica — NÃO usar para texto */
  --gray-400: #A7A9AC;
  --gray-300: #D1D3D4;  /* bordas */
  --gray-200: #E6E7E8;  /* bordas suaves, fundos de card */
  --gray-100: #F4F4F5;  /* fundo de seção alternado */
  --white:    #FFFFFF;

  /* Texto */
  --text-strong: #1E1F2B;  /* títulos quando não forem navy */
  --text:        #3A3C44;  /* corpo */
  --text-muted:  #5E6068;  /* legendas, apoio (contraste AA sobre branco) */
  --text-on-dark:#FFFFFF;
  --text-on-dark-muted: #C9C9E0;

  /* Funcional */
  --whatsapp: #25D366;     /* SÓ no botão flutuante */
  --focus: #E53013;
}
```

**Regras de uso:**
- **Proporção aproximada:** 60% branco/cinzas claros · 25% navy · 10% vermelho · 5% cinza médio.
- **Navy** = estrutura e confiança (títulos, header, seções escuras). **Vermelho** = ação e urgência (CTAs, destaques, números, ícones de destaque). Não usar vermelho em blocos grandes de fundo, exceto numa faixa fina.
- Todos os **botões de CTA** usam `--red-600` com texto branco. `--red-500` puro com texto branco pequeno não passa AA (4,4:1), então fica para elementos gráficos, ícones e texto ≥ 24px.
- `--gray-500` nunca como cor de texto sobre branco (contraste 3:1).
- O verde do WhatsApp aparece **apenas** no botão flutuante. Os demais CTAs de WhatsApp seguem a marca (vermelho, com ícone do WhatsApp).

### 5.2 Tipografia

O logo usa duas famílias. "LMTUBOS" é uma grotesca pesada itálica (estilo Helvetica Black Oblique), e "MATERIAIS CONTRA INCÊNDIO" é **Calibri Bold**. Calibri não tem licença para web, então usamos equivalentes do Google Fonts:

| Papel | Fonte | Pesos | Uso |
|---|---|---|---|
| Display | **Archivo** | 800 e 900, *italic* | H1, H2, números grandes. Ecoa o "LMTUBOS" do logo |
| Texto e UI | **Carlito** | 400, 700 (+ italic 400) | Corpo, botões, labels, H3. Carlito é métrica-compatível com Calibri, o que mantém a identidade da tagline |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@1,800;1,900&family=Carlito:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: "Archivo", "Arial Black", sans-serif;
  --font-body: "Carlito", Calibri, "Segoe UI", Arial, sans-serif;

  /* Escala fluida (mobile → desktop) */
  --fs-h1:   clamp(2.25rem, 1.6rem + 3.2vw, 4rem);     /* 36 → 64px */
  --fs-h2:   clamp(1.75rem, 1.35rem + 2vw, 2.75rem);   /* 28 → 44px */
  --fs-h3:   clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);   /* 20 → 24px */
  --fs-lead: clamp(1.125rem, 1.05rem + 0.4vw, 1.3rem); /* 18 → 21px */
  --fs-body: 1.0625rem;  /* 17px, porque Carlito é compacta */
  --fs-small: 0.9375rem; /* 15px */
  --fs-eyebrow: 0.875rem;/* 14px */
}
```

**Regras:**
- **H1 e H2:** Archivo 900 italic, `letter-spacing: -0.01em`, `line-height: 1.05`, cor `--navy-700`. Podem destacar **uma palavra-chave** em `--red-500` (como o "TUBOS" do logo). Uma por título, no máximo.
- **Eyebrow** (sobretítulo): Carlito 700, caixa-alta, `letter-spacing: 0.12em`, `--red-600`, com um traço vermelho de 24px à esquerda.
- **H3:** Carlito 700, `--text-strong`.
- **Corpo:** Carlito 400, `line-height: 1.6`, `--text`. Largura máxima do texto: 65ch.
- **Botões:** Carlito 700, caixa-alta, `letter-spacing: 0.04em`.
- Nunca usar Archivo em parágrafos ou em textos longos.

### 5.3 Elemento gráfico da marca: "sombra deslocada"

O letreiro do logo tem uma **sombra cinza deslocada** para trás das letras itálicas. Esse é o traço visual da página. Use com moderação:

```css
.brand-shadow {            /* só em H1 e em números grandes */
  text-shadow: 3px 3px 0 var(--gray-300), 6px 6px 0 var(--gray-200);
}
.brand-shadow--dark {      /* sobre fundo navy */
  text-shadow: 3px 3px 0 rgba(255,255,255,.12), 6px 6px 0 rgba(255,255,255,.06);
}
```

Outros recursos permitidos:
- **Faixa cinza horizontal** (como a linha sob "LMTUBOS" no logo): barra de 4px `--gray-500` usada como divisor sob títulos de seção ou entre header e hero.
- **Corte diagonal** nas seções escuras, com inclinação de ~8° que acompanha o itálico do logo (`clip-path: polygon(...)`). Máximo de duas seções com corte na página.
- **Linhas de tubulação:** um padrão SVG sutil de linhas retas com curvas de 90° (como tubulação vista de cima), em `--navy-50` sobre branco ou `rgba(255,255,255,.05)` sobre navy, apenas como textura de fundo do hero e do CTA final.

**Proibido:** gradientes coloridos, glassmorphism, sombras difusas exageradas, ícones de chama cartunescos, emojis, fotos de banco genéricas de "bombeiro apagando fogo".

### 5.4 Espaçamento, grid e raios

```css
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
  --space-9: 96px; --space-10: 128px;

  --section-y: clamp(64px, 8vw, 112px);
  --container: 1200px;
  --gutter: 20px;              /* mobile */
  --radius-sm: 4px;
  --radius-md: 8px;            /* cards, inputs, botões */
  --radius-lg: 12px;
  --shadow-card: 0 1px 2px rgba(27,26,82,.06), 0 4px 16px rgba(27,26,82,.06);
  --shadow-card-hover: 0 2px 4px rgba(27,26,82,.08), 0 12px 32px rgba(27,26,82,.12);
}
```

- Container: `max-width: var(--container)`, padding lateral de 20px no mobile e 32px a partir de 768px.
- Breakpoints: `480px`, `768px`, `1024px`, `1280px` (mobile-first, sempre `min-width`).
- Raios pequenos: a marca é industrial, sem cantos muito arredondados. Nada acima de 12px, exceto o botão flutuante (circular).

### 5.5 Componentes

**Botão primário (`.btn--primary`)**
- Fundo `--red-600`, texto branco, altura mínima de 52px (56px no hero), padding horizontal de 28px, `--radius-md`.
- Ícone do WhatsApp de 20px à esquerda do texto.
- Hover: `--red-700` + `translateY(-1px)`. Active: `translateY(0)`. Focus: outline de 3px `--focus` com offset de 3px.
- No mobile, os CTAs principais ocupam 100% da largura.

**Botão secundário (`.btn--secondary`):** fundo transparente, borda de 2px `--navy-700`, texto `--navy-700`. Hover: fundo `--navy-700`, texto branco. Sobre fundo escuro: borda e texto brancos.

**Link de texto:** `--navy-700`, sublinhado de 2px `--red-500` com offset de 4px.

**Card de produto (`.card`):** fundo branco, borda de 1px `--gray-200`, `--radius-md`, `--shadow-card`, padding de 24px. Ícone de 40px num quadrado de 56px com fundo `--navy-50` e ícone `--navy-700`. No hover: `--shadow-card-hover`, a borda superior vira uma linha de 3px `--red-500` e o ícone fica vermelho.

**Card de destaque (seção 3):** maior, com uma faixa superior navy onde fica o nome do produto em Archivo italic branco, corpo branco com bullets e botão "Cotar no WhatsApp".

**Chip / badge:** Carlito 700 de 14px, padding 6px 12px, `--radius-sm`. Variante navy (`--navy-50` / `--navy-700`) e variante vermelha (`--red-50` / `--red-600`).

**Ícone de lista (check):** quadrado de 20px `--red-500` com check branco, ou um check Lucide em `--red-500`.

**Input (form):** altura de 52px, borda de 1px `--gray-300`, `--radius-md`, label Carlito 700 de 15px acima do campo. Foco: borda `--navy-700` + ring de 3px `rgba(44,42,124,.2)`. Erro: borda `--red-600` + mensagem de 14px abaixo.

**Acordeão (FAQ):** usar `<details>/<summary>` nativo estilizado. Pergunta em Carlito 700 de 18px `--navy-700`, ícone "+" que gira para "×". Divisores de 1px `--gray-200`.

**Botão flutuante do WhatsApp:** círculo de 60px, `--whatsapp`, fixo no canto inferior direito (20px de margem), sombra de card forte. Aparece depois de 400px de rolagem. Tooltip "Fale com a gente" no desktop. `aria-label="Falar com a LM Tubos no WhatsApp"`.

### 5.6 Ícones sugeridos (Lucide)

`package-check` (pronta entrega) · `truck` (entrega Brasil) · `hard-hat` (equipe técnica) · `handshake` (negociação) · `pipette` ou `cylinder` (tubos) · `git-merge` (conexões) · `droplets` (sprinklers) · `bell-ring` (alarme) · `fire-extinguisher` (extintores) · `lightbulb` / `sign` (sinalização e iluminação) · `gauge` (válvulas e bombas) · `ruler` (projeto) · `wrench` (instalação e manutenção) · `test-tube` (teste hidrostático) · `building-2` (construtoras) · `factory` (indústrias) · `store` (comércio) · `home` (condomínios) · `clipboard-list` (lista de materiais) · `map-pin` · `clock` · `mail` · `phone` · `instagram`.

### 5.7 Motion

- Entrada das seções: fade + translateY de 16px, 400ms, `ease-out`, via IntersectionObserver, uma única vez.
- Nada de parallax, carrosséis automáticos ou contadores animados.
- Tudo desligado com `@media (prefers-reduced-motion: reduce)`.

---

## 6. Dados da empresa (usar exatamente assim)

| Campo | Valor |
|---|---|
| Nome na página | LM Tubos · Materiais Contra Incêndio |
| Razão social | LM Tubos Materiais Contra Incêndio LTDA `[PENDENTE: confirmar grafia exata no cartão CNPJ]` |
| CNPJ | 39.770.705/0001-23 |
| Endereço | R. Pedro Galvão, Qd. 2, Lt. 16 – Jardim Imperial, Goiânia – GO, 74492-215 *(decisão: usar Lt. 17, Sala 2 — ver topo)* |
| WhatsApp | (62) 98558-7373 → `https://wa.me/5562985587373` |
| Atendimento | Roberto Silva (comercial) |
| E-mail | vendas01@lmtubos.com.br |
| Horário | Segunda a sexta, das 8h às 18h `[PENDENTE: confirmar dias e se abre aos sábados]` |
| Instagram | @lmtubos → https://www.instagram.com/lmtubos/ |
| Google (avaliações) | Perfil de empresa "LM Tubos" no Google Maps `[PENDENTE: link curto do perfil, do tipo g.page ou maps.app.goo.gl]` |

---

## 7. Copy completa por seção

> Use o texto como está. Palavras entre `{{ }}` indicam o trecho que deve aparecer em **vermelho** (`--red-500`) no título.

### 0. Barra superior (só no desktop, faixa fina navy-900, ícones Lucide `map-pin`, `clock`, `phone`)
- Goiânia – GO · Entregamos em todo o Brasil
- Seg. a sex., 8h às 18h
- (62) 98558-7373

### 0. Header
- Logo (link para `#inicio`)
- Menu: **Produtos** · **Serviços** · **Como funciona** · **Sobre** · **Dúvidas** · **Contato**
- Botão: **Pedir orçamento** (WhatsApp, mensagem padrão)
- Mobile: logo + ícone de WhatsApp + hambúrguer que abre um menu em tela cheia.

### 1. Hero
**Eyebrow:** DISTRIBUIDORA DE MATERIAIS CONTRA INCÊNDIO

**H1:** Todo o material do seu sistema de incêndio, {{a pronta entrega}}.

**Subtítulo:** Tubos pintados, conexões e válvulas ranhuradas, sprinklers, hidrantes e muito mais. Uma equipe técnica ajuda você a comprar certo, e a entrega chega em qualquer lugar do Brasil.

**CTA primário:** Pedir orçamento no WhatsApp
**CTA secundário:** Ver produtos → `#produtos`

**Linha de confiança (abaixo dos botões, 3 itens com ícone):**
- Material a pronta entrega
- Entrega para todo o Brasil
- 6 anos no mercado

**Visual:** foto real da empresa (estoque ou fachada) à direita no desktop, com moldura retangular e o elemento "sombra deslocada" (retângulos `--gray-300` e `--gray-200` deslocados 12px e 24px atrás da foto). No mobile, a foto fica abaixo do texto. Fundo branco com a textura de tubulação sutil.

### 2. Faixa de diferenciais
Fundo `--navy-700`, texto branco, 4 colunas no desktop e 2×2 no mobile.

| Ícone | Título | Texto |
|---|---|---|
| package-check | Pronta entrega | Estoque próprio de tubos, conexões, válvulas e sprinklers. |
| hard-hat | Equipe especializada | Orientamos qual material usar em cada parte da instalação. |
| truck | Brasil inteiro | Enviamos para todas as regiões, com força no Norte e no Nordeste. |
| handshake | Negociação direta | Pix, cartão e boleto após análise cadastral. |

### 3. Produtos em destaque
**Eyebrow:** MAIS PROCURADOS
**H2:** O que não pode faltar na {{sua obra}}
**Texto:** Os itens que mais saem para construtoras e instaladores, com estoque para atender já.

**Card 1: Conexões e válvulas ranhuradas**
- Sistema ranhurado para montagem mais rápida
- Válvulas importadas
- Acoplamentos, curvas, tês e reduções
- Botão: **Cotar conexões** → WhatsApp com a mensagem *"Olá! Vim pelo site e quero cotar conexões e válvulas ranhuradas."*

**Card 2: Sprinklers**
- Bicos de sprinkler a pronta entrega
- Modelos para diferentes tipos de ocupação
- Orientação técnica na escolha do modelo
- Botão: **Cotar sprinklers** → *"Olá! Vim pelo site e quero cotar sprinklers."*

**Card 3: Tubos pintados**
- Tubos já pintados, prontos para instalar
- Estoque para pedidos de obra
- Envio para todo o Brasil
- Botão: **Cotar tubos** → *"Olá! Vim pelo site e quero cotar tubos para sistema de incêndio."*

> Nota para o dev: não citar diâmetros, normas ou especificações técnicas que não estejam aqui. Se houver fotos de produto, use-as no topo de cada card. Se não houver, use ícone grande sobre `--navy-50`.

### 4. Linhas de produtos
**Eyebrow:** LINHA COMPLETA
**H2:** Um fornecedor para o {{sistema inteiro}}
**Texto:** Do tubo ao extintor, você fecha a lista de material da instalação num lugar só.

Grid de 7 cards (3 colunas no desktop, 2 no tablet, 1 no mobile; o último pode ocupar a largura total ou virar um card de CTA):

1. **Tubos e conexões:** tubos pintados e conexões ranhuradas para a rede de incêndio.
2. **Válvulas, registros e bombas:** válvulas importadas, registros e bombas para o sistema.
3. **Sprinklers:** bicos de sprinkler e acessórios para a rede de chuveiros automáticos.
4. **Hidrantes e acessórios:** mangueiras, esguichos, abrigos e demais itens do hidrante.
5. **Alarme e detecção:** centrais, acionadores e detectores para alarme de incêndio.
6. **Extintores:** extintores para cada classe de incêndio e tipo de ambiente.
7. **Sinalização e iluminação de emergência:** placas fotoluminescentes e luminárias de emergência.

**Card extra (CTA):** "Não achou o item? Mande sua lista que a gente confere." + botão **Enviar minha lista** → *"Olá! Vim pelo site e quero enviar minha lista de materiais para orçamento."*

### 5. Dúvida técnica
Fundo `--navy-900` com corte diagonal no topo. Texto branco. Layout em 2 colunas: texto à esquerda, card branco à direita.

**Eyebrow:** ORIENTAÇÃO TÉCNICA
**H2:** Na dúvida sobre qual material usar? {{Pergunte antes de comprar.}}
**Texto:** Esta é a pergunta que mais recebemos, e faz sentido: material errado vira retrabalho, atraso na obra e dor de cabeça na vistoria. Nossa equipe conhece o sistema de ponta a ponta e ajuda você a escolher o item certo para cada ponto da instalação.

**Card à direita, "Fale com quem entende":**
- Mande o projeto ou a lista de materiais
- Tire dúvidas sobre modelo, bitola e compatibilidade
- Receba a indicação e o orçamento no mesmo atendimento
- Botão: **Tirar minha dúvida** → *"Olá! Vim pelo site e tenho uma dúvida técnica sobre material."*
- Linha abaixo: "Atendimento com Roberto Silva, comercial da LM Tubos."

### 6. Serviços
**Eyebrow:** ALÉM DO MATERIAL
**H2:** Também cuidamos do {{projeto à manutenção}}
**Texto:** Precisa de mais do que o material? A LM Tubos também atende com serviços.

4 cards horizontais:
1. **Projeto de prevenção contra incêndio:** o sistema dimensionado para a sua edificação.
2. **Instalação:** montagem da rede de incêndio com quem conhece o material.
3. **Manutenção:** revisão e reparo para manter o sistema funcionando.
4. **Teste hidrostático de mangueiras:** teste das mangueiras de hidrante para garantir que estão aptas ao uso.

CTA: **Solicitar serviço** → *"Olá! Vim pelo site e quero informações sobre serviços (projeto, instalação ou manutenção)."*

### 7. Para quem atendemos
**Eyebrow:** QUEM COMPRA COM A GENTE
**H2:** Feito para quem está {{tocando obra}}

**Bloco em destaque (card largo, borda esquerda de 4px vermelha):**
**Construtoras.** Material completo para a obra, a pronta entrega, com negociação direta e entrega onde a obra estiver.

**Demais públicos (chips com ícone):**
Instaladores e revendas · Engenheiros e projetistas · Indústrias e galpões · Condomínios e síndicos · Comércios e lojas · Pessoa física

### 8. Como funciona o pedido
**Eyebrow:** SIMPLES ASSIM
**H2:** Do orçamento à entrega em {{4 passos}}

Linha do tempo horizontal no desktop e vertical no mobile, com números grandes em Archivo italic vermelho e `.brand-shadow`:

1. **Envie sua lista:** mande o projeto, a lista de materiais ou só diga o que precisa, pelo WhatsApp.
2. **A gente confere:** nossa equipe revisa os itens e orienta se algo estiver faltando ou incompatível.
3. **Receba o orçamento:** com as condições de pagamento e de entrega combinadas com você.
4. **Material na obra:** separamos do estoque e enviamos para qualquer lugar do Brasil.

CTA: **Começar meu orçamento**

### 9. Marcas
**Eyebrow:** MARCAS QUE TRABALHAMOS
**H2:** Fabricantes que você {{já conhece}}

Faixa com os nomes: **Remadi · Segurimax · Metalcasty · Tupper · Intelbras · Ilumac**

> Nota para o dev: se não houver arquivos oficiais dos logos, exiba os nomes em Carlito 700 de 22px, cor `--gray-500`, dentro de cards `--gray-100`. Deixe `[PENDENTE: logos oficiais das marcas]` comentado no HTML. Não baixe logos da internet.

### 10. Nossa história
Layout em 2 colunas: a foto da fachada do galpão próprio à esquerda, com `.brand-shadow` na moldura, e o texto à direita.

**Eyebrow:** NOSSA HISTÓRIA
**H2:** Da garagem ao {{galpão próprio}}
**Texto:**
A LM Tubos começou pequena, na garagem de casa, com a proposta de atender bem quem precisa de material contra incêndio. O trabalho cresceu, veio o primeiro galpão alugado na Perimetral e, há cerca de um ano, a mudança para o nosso próprio galpão, no Jardim Imperial, em Goiânia.

São 6 anos atendendo construtoras, instaladores e empresas em todo o Brasil, com uma equipe especializada e estoque para entregar rápido.

**Números em destaque (3 colunas, Archivo italic):**
- **6 anos** de mercado
- **Galpão próprio** em Goiânia
- **Brasil inteiro** atendido

**Linha de cliente:** "Entre os clientes atendidos: **EBM**." `[PENDENTE: confirmar autorização de uso do nome e, se possível, enviar o logo]`

### 11. Avaliações
**Eyebrow:** O QUE DIZEM NO GOOGLE
**H2:** Quem compra, {{recomenda}}

3 cards de depoimento: nome, texto e estrelas.
`[PENDENTE: copiar 3 avaliações reais do perfil do Google da LM Tubos, com nome como aparece no Google e a nota]`

> Nota para o dev: **NÃO invente depoimentos nem nota média.** Até receber os textos reais, renderize os cards com o placeholder "Depoimento em breve" e comentário no HTML. Sob os cards, coloque um botão secundário **Ver avaliações no Google** → link do perfil (pendente).

### 12. Entrega e pagamento
Fundo `--gray-100`. Duas colunas.

**Coluna 1: Entrega**
**H3:** Entregamos em todo o Brasil
Atendemos obras em todas as regiões, com atuação forte no **Norte e Nordeste**. Prazo e frete são combinados no orçamento, conforme o volume e o destino.
*Visual:* mapa do Brasil em SVG simples, `--navy-50`, com Norte e Nordeste em `--navy-700` e um pin vermelho em Goiânia.

**Coluna 2: Pagamento**
**H3:** Formas de pagamento
- Pix
- Cartão
- Boleto bancário (após análise cadastral)

Linha abaixo: "Condições negociadas direto com o comercial."

### 13. Orçamento rápido (formulário → WhatsApp)
**Eyebrow:** ORÇAMENTO RÁPIDO
**H2:** Conte o que você precisa e {{fale direto com o comercial}}
**Texto:** Preencha em 30 segundos. Ao enviar, abrimos o WhatsApp com a sua mensagem pronta.

**Campos:**
1. Nome *(obrigatório)*
2. Empresa *(opcional)*
3. Você é: *(select)* Construtora · Instalador / revenda · Engenheiro / projetista · Indústria · Condomínio · Comércio · Pessoa física · Outro
4. Cidade / UF da obra *(obrigatório)*
5. O que você precisa? *(textarea, obrigatório, placeholder: "Ex.: 200 m de tubo pintado 2½\", 40 sprinklers, conexões ranhuradas…")*

**Botão:** Enviar pelo WhatsApp
**Microcopy abaixo:** Seus dados vão só para o nosso atendimento comercial.

**Mensagem gerada:**
```
Olá! Vim pelo site da LM Tubos e quero um orçamento.
Nome: {nome}
Empresa: {empresa}
Perfil: {perfil}
Cidade/UF: {cidade}
Preciso de: {mensagem}
```

### 14. FAQ
**Eyebrow:** DÚVIDAS FREQUENTES
**H2:** Perguntas que {{sempre chegam}}

1. **Vocês entregam fora de Goiás?**
   Sim. Entregamos em todo o Brasil, com atendimento forte no Norte e Nordeste. Prazo e frete são combinados no orçamento.

2. **O material está a pronta entrega?**
   Sim. Trabalhamos com estoque de tubos pintados, conexões e válvulas ranhuradas, sprinklers e demais itens do sistema.

3. **Não sei exatamente qual material usar. Vocês ajudam?**
   Ajudamos. Mande o projeto ou a lista pelo WhatsApp e nossa equipe orienta o que usar em cada ponto da instalação.

4. **Quais as formas de pagamento?**
   Pix, cartão e boleto bancário. O boleto é liberado após análise cadastral.

5. **Dá para negociar o preço em compras maiores?**
   Sim. As condições são combinadas direto com o comercial, conforme o volume e o tipo de pedido.

6. **Vocês fazem instalação e manutenção?**
   Sim. Além do material, atendemos com projeto, instalação, manutenção e teste hidrostático de mangueiras.

7. **O material tem certificação?**
   Trabalhamos com material certificado e com fabricantes reconhecidos no mercado, como Remadi, Segurimax, Metalcasty, Tupper, Intelbras e Ilumac. `[PENDENTE: se o cliente listar certificações específicas, substituir por elas]`

8. **Qual o horário de atendimento?**
   De segunda a sexta, das 8h às 18h. `[PENDENTE: sábado]`

Gerar JSON-LD `FAQPage` com essas perguntas.

### 15. CTA final
Fundo `--navy-900` com textura de tubulação e corte diagonal. Texto centralizado.

**H2 (branco, com `.brand-shadow--dark`):** Sua obra não pode esperar o material. {{Fale com a LM Tubos.}}
**Texto:** Mande sua lista agora e receba o orçamento com quem entende do sistema.
**Botão:** Pedir orçamento no WhatsApp
**Linha abaixo:** (62) 98558-7373 · vendas01@lmtubos.com.br

### 16. Rodapé
Fundo `--navy-900`, logo negativo.

- **Coluna 1:** logo + "Distribuidora de materiais para sistemas de combate a incêndio. Goiânia – GO, entregando em todo o Brasil."
- **Coluna 2, Contato:** WhatsApp · e-mail · horário
- **Coluna 3, Endereço:** endereço completo + link "Como chegar" (Google Maps) + iframe do mapa com `loading="lazy"`
- **Coluna 4, Redes:** Instagram @lmtubos
- **Linha inferior:** © 2026 LM Tubos Materiais Contra Incêndio LTDA · CNPJ 39.770.705/0001-23 · Desenvolvido por M|P Assessoria

---

## 8. Comportamento e integrações

### 8.1 WhatsApp

Centralize tudo numa função em `main.js`:

```js
const WA_NUMBER = "5562985587373";
const WA_DEFAULT = "Olá! Vim pelo site da LM Tubos e gostaria de um orçamento.";
function waLink(msg = WA_DEFAULT) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
```

- Cada botão tem `data-wa-msg` com a mensagem da seção e `data-wa-origin` com a origem (`hero`, `destaque-conexoes`, `destaque-sprinklers`, `destaque-tubos`, `produtos-lista`, `orientacao`, `servicos`, `como-funciona`, `form`, `cta-final`, `flutuante`, `header`).
- Os links abrem em nova aba (`target="_blank" rel="noopener"`).
- Preserve os parâmetros UTM da URL: se existirem `utm_source` ou `utm_campaign`, acrescente ao fim da mensagem `\n\n[origem: {utm_source} / {utm_campaign}]`. Isso deixa o comercial saber de qual campanha veio o lead.

### 8.2 Rastreamento (deixar pronto, IDs pendentes)

- **Meta Pixel** `[PENDENTE: ID do Pixel]`: `PageView` no load; `Contact` em todo clique de WhatsApp, com `content_name = data-wa-origin`; `Lead` no envio do formulário.
- **Google Tag (GA4 + Google Ads)** `[PENDENTE: G-XXXX e AW-XXXX/label]`: evento `whatsapp_click` com parâmetro `origem`; evento `generate_lead` no formulário; conversão do Google Ads no clique de WhatsApp.
- Carregar os scripts só se o ID estiver preenchido (sem erro no console quando vazio).
- Banner de cookies simples (LGPD), com "Aceitar" e "Recusar". Os pixels só disparam após o aceite.

### 8.3 Formulário
- Validação nativa HTML5 + mensagens em português.
- No submit: dispara os eventos → abre `waLink(mensagem)` → mostra a mensagem de confirmação inline: "Pronto! Continue a conversa no WhatsApp que acabou de abrir."
- Opcional: `obrigado.html` para quem quiser usar como URL de conversão. Por padrão, não redirecione.

### 8.4 Header
- Fixo, fundo branco, sombra aparece após 10px de rolagem.
- Altura de 72px no desktop e 64px no mobile. O logo tem 40–44px de altura.
- Link ativo destacado conforme a seção visível (IntersectionObserver).
- Rolagem suave com `scroll-margin-top` igual à altura do header.

---

## 9. SEO

- `<title>`: **LM Tubos | Materiais Contra Incêndio em Goiânia – Entrega em Todo o Brasil**
- `<meta name="description">`: **Tubos pintados, conexões e válvulas ranhuradas, sprinklers, hidrantes e extintores a pronta entrega. Equipe técnica e entrega para todo o Brasil. Peça seu orçamento.**
- Open Graph e Twitter card com imagem de 1200×630 (logo sobre navy + foto da fachada; gerar com HTML/canvas ou deixar `[PENDENTE]`).
- Um único H1. Hierarquia H2/H3 correta.
- JSON-LD `LocalBusiness` (tipo `Store`) com nome, endereço, telefone, e-mail, horário, `areaServed: "BR"`, `sameAs` com o Instagram, mais o `FAQPage`.
- `robots.txt` e `sitemap.xml` simples.
- Palavras-chave para cobrir naturalmente nos textos: *materiais contra incêndio Goiânia, tubos para incêndio, conexões ranhuradas, válvulas ranhuradas, sprinklers, hidrantes, distribuidora de material contra incêndio*.

---

## 10. Pendências com o cliente

Listar isto no fim do README do projeto também.

1. Confirmar a razão social exata (o briefing traz "MATERIAS").
2. Horário de sábado.
3. Link curto do perfil do Google e 3 avaliações reais para a seção 11.
4. Autorização para citar a **EBM** e, se possível, o logo dela.
5. Logos oficiais das marcas (Remadi, Segurimax, Metalcasty, Tupper, Intelbras, Ilumac).
6. Certificações específicas, se o cliente quiser nomeá-las.
7. Fotos de produtos e do estoque (hoje só há fotos da fachada/galpão).
8. IDs do Meta Pixel, GA4 e Google Ads.
9. Domínio definitivo (para canonical, OG e sitemap).
10. Promoções sazonais: o cliente disse que "tem épocas que soltamos promoções". Prever uma **faixa de aviso opcional** no topo (`.promo-bar`, oculta por padrão), ativada por uma variável em `main.js`.

---

## 11. Critérios de aceite

- [ ] Todas as seções da tabela 4 implementadas na ordem, com a copy da seção 7.
- [ ] Nenhum número, depoimento, certificação ou cliente inventado. Os placeholders `[PENDENTE]` estão visíveis e comentados.
- [ ] Tokens da seção 5 declarados em `:root` e usados em todo o CSS (nenhuma cor hexadecimal solta fora do `:root`).
- [ ] Archivo italic só em H1, H2 e números; Carlito em todo o resto.
- [ ] Todos os CTAs abrem o WhatsApp com a mensagem correta e o `data-wa-origin` certo.
- [ ] O formulário valida e abre o WhatsApp com a mensagem montada.
- [ ] Botão flutuante aparece após rolar e não cobre conteúdo no mobile.
- [ ] Layout testado em 360px, 768px, 1024px e 1440px, sem rolagem horizontal.
- [ ] Lighthouse mobile ≥ 90 nas quatro categorias.
- [ ] Contraste AA em todos os textos. Navegação por teclado funcional.
- [ ] Os originais em `Fotos_e_Logo/` continuam intocados.

---

## 12. Ordem de execução sugerida para o Claude Code

1. Ler este PRD e a pasta `Design system from logo/`; resolver conflitos com o usuário.
2. Preparar os assets (logo, fotos otimizadas, favicon), conforme 3.2.
3. Criar `styles.css` com os tokens, o reset, a tipografia e os componentes base (botões, cards, chips, inputs).
4. Montar o `index.html` seção por seção, na ordem da tabela 4.
5. Implementar o `main.js`: WhatsApp, form, header, menu mobile, animações, rastreamento e cookies.
6. SEO e JSON-LD.
7. Revisão responsiva, acessibilidade e Lighthouse; corrigir o que ficar abaixo das metas.
8. Gerar um `README.md` com as instruções de publicação e a lista de pendências da seção 10.
