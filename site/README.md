# Landing page LM Tubos · Materiais Contra Incêndio

Site estático (HTML + CSS + JS puro, sem build) da M|P Assessoria para a LM Tubos. A especificação completa está em `../PRD_LP_LM_Tubos.md`.

## Estrutura

```
site/
├── index.html          página principal (seções 0–16 do PRD)
├── conexoes-ranhuradas.html · sprinklers.html · mangueiras-de-incendio.html
├── bombas-de-incendio.html · tubulacao-de-incendio.html · tubos-de-aco-carbono.html
│                       páginas de produto (uma por grupo de anúncio), servidas sem .html (cleanUrls)
├── obrigado.html       página de conversão opcional (noindex; o form NÃO redireciona para cá por padrão)
├── politica-de-privacidade.html  política LGPD (indexável; ligada no rodapé, no banner de cookies e no formulário)
├── css/styles.css      tokens (:root) + componentes + seções, mobile-first
├── js/main.js          WhatsApp, formulário, header/menu, animações, cookies e rastreamento
├── robots.txt · sitemap.xml
└── assets/
    ├── logo/           logo-lm-tubos.svg · logo-lm-tubos-negativo.svg · logo-lm-tubos.png
    ├── img/            fotos otimizadas (WebP + JPG) e og-image.jpg (1200×630)
    └── favicon/        favicon.svg · favicon-32.png · apple-touch-icon.png
```

### Fotos (originais em `../Fotos_e_Logo/`, intocados)

| Arquivo | Conteúdo | Onde é usado |
|---|---|---|
| `fachada-galpao-aberto-{800,1280}` | Fachada com o portão aberto, tubos e paletes à vista | Hero |
| `fachada-letreiro-vertical-{800,960}` | Fachada em retrato com o letreiro inteiro | Nossa história |
| `fachada-letreiro-frontal-{800,1280}` | Letreiro frontal (paisagem) | Base da `og-image.jpg` |
| `fachada-entrada-perspectiva-{800,960}` | Letreiro em perspectiva | Reserva |
| `placa-cnpj-endereco-{800,1200}` | Placa com CNPJ e endereço | Reserva (confirma o endereço) |

As fotos originais têm no máximo 1280 px de largura, então a versão "grande" usa a largura real, sem ampliação.

## Publicar

O conteúdo de `site/` vai para a raiz do domínio. Nenhum passo de build.

- **Hostinger:** gerenciador de arquivos → `public_html/` → envie o conteúdo de `site/`.
- **Netlify:** arraste a pasta `site/` em app.netlify.com/drop, ou conecte o repositório com *publish directory* = `site`.
- **Vercel:** `vercel deploy site --prod`, ou importe o repositório com *Root Directory* = `site` e *Framework* = Other.

Depois de publicar:
1. Domínio da LP: `www.lmtubos.com` (já em canonical, OG, JSON-LD, `robots.txt`, `sitemap.xml` e `llms.txt`). DNS na Hostinger: A `@` 216.198.79.1 e CNAME `www` para a Vercel. **Não usar `lmtubos.com.br`**: é o site WordPress do cliente (ligado à LP só via `sameAs` no JSON-LD) e tem o e-mail da Locaweb.
2. Confira se o servidor entrega os arquivos com gzip/brotli (Hostinger, Netlify e Vercel já fazem isso).

## Onde editar

> **Cache:** a Vercel guarda `css/` e `js/` por 24 h no navegador. Ao alterar `styles.css` ou `main.js`, troque o `?v=AAAAMMDD` nos `<link>`/`<script>` de **todas** as páginas (`index.html`, `obrigado.html`, `politica-de-privacidade.html` e as 6 páginas de produto); senão quem já visitou continua com a versão antiga.

Tudo fica no topo de `js/main.js`:

| O quê | Constante |
|---|---|
| Número do WhatsApp e mensagem padrão | `WA_NUMBER`, `WA_DEFAULT` |
| Faixa de promoção sazonal | `PROMO = { enabled: true, text: "…", href: "#orcamento" }` |
| Google Tag Manager | ID `GTM-KXWZWFS4` no `<head>` e no `<noscript>` de `index.html` e `obrigado.html` + `TRACKING.gtmId` em `main.js` (os três precisam ser iguais) |
| Meta Pixel, GA4 e Google Ads direto (opcional) | `TRACKING = { metaPixelId, ga4Id, adsId, adsLabel }`. Prefira configurar dentro do GTM e deixar vazio |

- **Mensagens de cada botão:** atributo `data-wa-msg` no HTML. O `data-wa-origin` identifica o botão nos eventos (`hero`, `destaque-conexoes`, `destaque-sprinklers`, `destaque-tubos`, `produtos-lista`, `orientacao`, `servicos`, `como-funciona`, `form`, `cta-final`, `flutuante`, `header` e `rodape`). O `href` já vem preenchido no HTML, então o link funciona mesmo sem JavaScript. Com JS, o `href` é refeito a partir do `data-wa-msg`, então ao mudar uma mensagem atualize os dois.
- **UTM:** se a URL tiver `utm_source` ou `utm_campaign`, o JS acrescenta `[origem: fonte / campanha]` ao fim de todas as mensagens.
- **GTM + Consent Mode v2 (LGPD):** o GTM carrega sempre, mas o `<head>` define `ad_storage`, `ad_user_data`, `ad_personalization` e `analytics_storage` como **denied** antes dele. O aviso de cookies aparece na primeira visita; "Aceitar" chama `gtag('consent','update', granted)` e "Recusar" mantém negado. A escolha fica em `localStorage` (`lm-consent`) e já vale no `<head>` da visita seguinte.
- **Eventos no dataLayer (para criar acionadores no GTM):**
  - `whatsapp_click` com `whatsapp_origem` (header, hero, destaque-conexoes, destaque-sprinklers, destaque-tubos, produtos-lista, orientacao, servicos, como-funciona, estoque, cta-final, rodape, flutuante, form). Use como conversão de clique no WhatsApp (GA4 e Google Ads) e `Contact` no Meta.
  - `generate_lead` com `lead_origem: formulario` no envio do formulário (também dispara `whatsapp_click` com origem `form`). Use como `Lead` no Meta.
  - `consentimento_aceito` / `consentimento_recusado`. No GTM, as tags do Google respeitam o Consent Mode sozinhas; nas tags do Meta, use o acionador `consentimento_aceito` ou exija `ad_storage` em "Configurações de consentimento".
  - Variáveis de página: `pagina` (`landing` ou `obrigado`) e `consentimento` (estado inicial).
- **Tags diretas (opcional):** com `metaPixelId`, `ga4Id` ou `adsId` preenchidos, os scripts do Meta e do Google carregam direto, só depois do aceite. Eventos: Meta `PageView`, `Contact` e `Lead`; GA4 `whatsapp_click` e `generate_lead`; Ads `conversion`. Não use junto com as mesmas tags no GTM.

## Decisões de implementação

- **Tokens:** os do PRD prevalecem sobre a pasta `Design system from logo/` (decisão do cliente).
- **Endereço:** usamos **Qd. 2, Lt. 17, Sala 2**, conforme a placa do CNPJ na fachada. O PRD trazia Lt. 16.
- **Nomes das marcas:** vão em `--text-muted` em vez de `--gray-500`, porque `--gray-500` sobre `--gray-100` não passa no contraste AA.
- **Fontes:** hospedadas no próprio site (`assets/fonts/`, subset latin, woff2). Archivo é variável (800 e 900 no mesmo arquivo) e é pré-carregada no `<head>` porque o título do hero é o elemento de LCP. Não voltar para o Google Fonts: a conexão com os servidores do Google atrasava o LCP em ~0,4 s no mobile.
- **Esteiras (`[data-marquee]`):** usadas na faixa de diferenciais e na seção Marcas. O JS monta o layout na hora (sem pulo de layout) e só mede, duplica e liga a animação depois do `load`, para não disputar o LCP. Velocidade por lista em `data-marquee-speed` (px/s).
- **Logos SVG:** otimizados com `svgo --multipass -p 2` (50 KB → 13 KB). Originais em `Fotos_e_Logo/`.
- **`content-visibility: auto`** nas seções abaixo da dobra reduz o custo de layout no celular. No primeiro clique em link interno, o JS desliga essa otimização para a rolagem parar no ponto certo.
- **Origem `rodape`:** o link de WhatsApp do rodapé usa essa origem, que não estava na lista do PRD, para distinguir esse clique no relatório.

## Verificação feita (30/09/2026)

- Sem rolagem horizontal em 360, 768, 1024 e 1440 px.
- Menu mobile navegável por teclado (foco preso no menu, Esc fecha e devolve o foco); FAQ com `<details>` nativo.
- Os 15 links de WhatsApp com a mensagem e a origem corretas, mais o sufixo de UTM. O formulário valida em PT e abre o WhatsApp com a mensagem montada.
- Consentimento: GTM carrega com tudo negado (Consent Mode v2); só libera cookies de anúncio e análise depois de "Aceitar".
- Lighthouse mobile, 4 execuções locais com gzip: Performance entre 91 e 99; Acessibilidade, Boas Práticas e SEO em 100.
- 01/10/2026, Lighthouse 12 sem gzip (servidor local simples), 3 execuções: mobile LCP 2,71 a 2,79 s (mediana 2,72 s), CLS 0; desktop LCP 0,62 s, nota 100. Meta do cliente: LCP até 3 s.
- 01/10/2026, depois da seção Estoque, 3 execuções mobile: sem gzip LCP 2,93 s; **com gzip (como numa hospedagem real) nota 99, LCP 2,11 s, CLS 0, TBT ~5 ms**. Na hospedagem, confirmar que gzip ou brotli está ligado para HTML, CSS, JS e SVG (sem isso o HTML de 76 KB pesa ~4x mais).
- **Seção Estoque (`#estoque`):** 7 fotos reais em `assets/img/estoque/` (480 e 899 px, WebP + JPG, `loading="lazy"`). Clicar amplia a foto num `<dialog>` (`initLightbox` em main.js); sem suporte, o link abre a foto. Originais em `Fotos_e_Logo/Fotos Estoque/`.

## Especificação dos tubos e política de privacidade (21/10/2026)

Mudanças feitas a partir dos termos de pesquisa do Google Ads (campanha "Tubos Aço Carbono": buscas por "sch 40", "din 2440", "2 polegadas", "com costura") e do avaliador de página de destino (faltava política de privacidade):

- **Card "Tubos de aço carbono pintados" (`#destaques`):** lista `<dl class="spec">` com Norma, Schedule, Bitola, Costura e Acabamento + frase "Não achou a bitola? Pergunte no WhatsApp". Até a LM confirmar o que tem em estoque, as linhas dizem ao comprador **o que informar** (ex.: "DIN 2440 ou NBR 5580"), sem afirmar estoque. Depois da confirmação, reescrever como afirmação (o comentário `[PENDENTE]` no HTML lista o que confirmar).
- **Card "Tubos e conexões" (`#produtos`), FAQ (`#duvidas` + JSON-LD FAQPage), meta description, og:description, JSON-LD Store (`description`, `knowsAbout`, OfferCatalog com item próprio para tubos) e `llms.txt`:** citam norma, schedule, bitola e costura com a mesma lógica. Nenhum deles afirma "DIN 2440 / sch 40" como estoque até a confirmação.
- **`politica-de-privacidade.html`:** mesmo design system (header com logo + "Voltar ao site", classes `.legal*` em `styles.css`), 12 seções (controlador, dados, finalidades, bases legais, compartilhamento, cookies, prazos, segurança, direitos, menores, alterações, contato), botão "Apagar minha escolha de cookies" (limpa `lm-consent`, `lm-v` e `lm-s` com script inline) e JSON-LD `WebPage`. Carrega o GTM (com Consent Mode) e o `tracker.js`, mas não o `main.js` (sem banner nessa página). Está no `sitemap.xml` e no `llms.txt`.
- **Links para a política:** rodapé (`.footer__bottom`), banner de cookies ("Saiba mais", `.cookie-bar__link`) e linha abaixo do botão do formulário (`.form__micro` + `.form__link`).
- **Formulário:** o campo Empresa já era opcional (sem `required`, label "(opcional)"); nada mudou nos `name`/`id` nem no envio.
- Cache: `styles.css?v=20261021` em `index.html` e na política. `obrigado.html` e `main.js` não foram tocados.
- Verificação: JSON-LD dos 3 blocos parseando, FAQ visível igual ao FAQPage (12 perguntas), meta description com 159 caracteres, sem travessão nos arquivos do site, sem rolagem horizontal a 390 px (`scrollWidth` 489 < `innerWidth` 504 no Chrome headless), capturas mobile/desktop dos cards, do formulário, do FAQ e da política conferidas.

## Páginas de produto (02/11/2026)

Objetivo: subir o Índice de Qualidade do Google Ads ("experiência na página de destino" abaixo da média em quase todas as keywords). Cada grupo de anúncio ganhou uma página focada na busca dele.

| Grupo do Ads | URL final | Foto do topo |
|---|---|---|
| Conexões ranhuradas | `/conexoes-ranhuradas` | estoque de conexões ranhuradas (real) |
| Sprinklers | `/sprinklers` | fachada do galpão (falta foto dos sprinklers) |
| Mangueiras | `/mangueiras-de-incendio` | esguichos e registros de hidrante (falta foto das mangueiras) |
| Bombas | `/bombas-de-incendio` | fachada do galpão (falta foto das bombas) |
| Tubos para incêndio | `/tubulacao-de-incendio` | curvas, tês e niples galvanizados (real) |
| Tubos de aço carbono (campanha própria) | `/tubos-de-aco-carbono` | conexões de aço carbono (falta foto das barras) |

- **Arquivos:** `site/<slug>.html`, servidos como `/<slug>` pelo `"cleanUrls": true` do `vercel.json` (o `.html` redireciona com 308). Por isso a política virou `/politica-de-privacidade` (canonical, sitemap, llms.txt e links atualizados). O `scripts/dev-server.mjs` já imita o cleanUrls.
- **Caminhos absolutos** (`/css/...`, `/assets/...`) nas páginas de produto. Fotos do topo em `assets/img/paginas/` (recorte 16:10 das fotos reais, 480 e 880 px, WebP + JPG), com `preload` + `fetchpriority="high"`.
- **Estrutura de cada página:** trilha (Início › produto), H1 com a keyword, linha de apoio, foto e botão de WhatsApp (no celular nessa ordem, acima da dobra), texto de abertura com a keyword, Tipos e modelos (`#tipos`), tabela "o que informar" (`#especificacao`), Para que serve (`#aplicacao`), chamada de serviço (mangueiras: `#teste-hidrostatico`; bombas: `#projeto`), Como fazer o pedido (`#como-pedir`), 2 avaliações reais + nota 5,0/81 (`#avaliacoes`), formulário (`#orcamento`, o mesmo da home), FAQ de 5 perguntas (`#duvidas`), links para as outras páginas (`#outros-produtos`), CTA final e rodapé com coluna "Produtos" (o rodapé da home também ganhou essa coluna).
- **JSON-LD:** um `@graph` com `WebPage` (about/publisher = `https://www.lmtubos.com/#empresa`, a Store da home), `BreadcrumbList` e `FAQPage`. Sem `Product` e sem preço. FAQ visível igual ao FAQPage (conferido por script).
- **Copy:** fatos só do PRD, da home e do pedido de 02/11. Onde a LM ainda não confirmou o que tem, a página **explica o produto e diz ao comprador o que informar** (mesma lógica do card de tubos de 21/10), sem afirmar estoque. Cada página tem um comentário `[PENDENTE: ...]` logo depois de `<main>` com o que confirmar.
- **Rastreamento:** todos os botões de WhatsApp têm `data-wa-origin="<slug>"` e `data-wa-button` (topbar, menu, header, topo, especificacao, teste-hidrostatico/projeto, como-pedir, cta-final, rodape, flutuante). O `main.js` manda `whatsapp_click {whatsapp_origem: <slug>, whatsapp_botao: <posição>}`. O formulário continua com `whatsapp_origem: form` + `generate_lead`, para a conversão de clique (que exclui `form`) não contar o formulário em dobro. `pagina` no dataLayer = slug.
- **GTM atrasado (só nas páginas de produto):** o snippet é o mesmo da home, mas o `gtm.js` só entra 3 s depois do `load` ou na primeira interação (`pointerdown`, `keydown`, `touchstart`, `scroll`), o que vier antes. Motivo: no PageSpeed mobile a foto do topo (LCP) era pintada depois das tags do Ads/GA4 (LCP simulado de 6 a 7 s). Um toque no WhatsApp carrega o GTM na hora (o `pointerdown` vem antes do `click`) e o `whatsapp_click` espera na fila do dataLayer (testado: o evento é processado). Efeito colateral aceito: visita que sai em menos de 3 s sem tocar na tela não registra page_view no GA4. O Consent Mode continua no topo do `<head>`.
- **UTM:** além da URL, o `main.js` guarda `utm_source`/`utm_campaign` em `sessionStorage` (`lm-utm`), então o `[origem: ...]` continua na mensagem quando o visitante vai de uma página para outra.
- **Home:** card "Alarme e detecção" sem "Centrais" (a LM não vende central, confirmado em 02/11); links "Ver [produto]" nos cards de `#destaques` e `#produtos`; coluna "Produtos" no rodapé; `url` das páginas no OfferCatalog.
- **Para editar a copy:** edite o HTML da página direto. Ao mudar uma pergunta do FAQ, mude também o `FAQPage` no `<head>`.
- **Cookie bar x rodapé (vale para todas as páginas):** com o aviso de cookies aberto, `.footer__bottom` ganha `padding-bottom` da altura do aviso, para o CNPJ e o link da política não ficarem escondidos atrás dele no fim da página. O Lighthouse continua apontando contraste nesse parágrafo (o axe rola o texto até a borda da tela, onde o aviso fixo fica por cima): é o motivo da Acessibilidade 97, igual na home.

**Verificação no ar (02/11/2026):**
- PageSpeed Insights mobile (Lighthouse 13.6, pagespeed.web.dev), Desempenho / Acessibilidade / Boas práticas / SEO: conexões 100/97/100/100 (LCP 1,8 s); sprinklers 100/97/100/100 (1,7 s); mangueiras 99/97/100/100 (1,8 s); bombas 100/97/100/100 (1,7 s); tubulação 100/97/100/100 (1,7 s); tubos de aço carbono 100/97/100/100 (1,7 s). CLS 0 e TBT 0 ms em todas. Antes do GTM atrasado e do preload da Carlito: desempenho 45 a 71, LCP 6 a 7 s.
- Medição com throttling real (4G lento + CPU 4×, Chrome local): LCP de 1,8 a 2,9 s; a home deu 2,9 s no mesmo teste.
- Teste de pesquisa aprimorada: Breadcrumb válido. O Google não lista mais FAQ nesse teste (resultado de FAQ restrito a sites de governo e saúde desde 2023). Schema Markup Validator: WebPage (com BreadcrumbList) e FAQPage com 0 erros e 0 avisos nas 6 páginas.
- Tag Assistant (GTM-KXWZWFS4, versão publicada): em /sprinklers e /mangueiras-de-incendio o `whatsapp_click` disparou "GA4 - Evento whatsapp_click" e "Google Ads - Conversão Clique WhatsApp"; o formulário disparou "GA4 - Evento generate_lead" e "Google Ads - Conversão Formulário de orçamento", e o `whatsapp_click` de origem `form` disparou só o GA4 (sem conversão de clique em dobro). Teste feito sem aceitar cookies; o formulário de teste usou o nome "Teste Claude (ignorar)".
- Search Console (propriedade de domínio lmtubos.com): indexação solicitada para as 6 URLs.

## Pendências com o cliente

Cada uma está marcada com `[PENDENTE]` em comentário no código.

12. **Especificação dos tubos de aço carbono** (card de `#destaques`, card de `#produtos`, FAQ, meta/OG, OfferCatalog, llms.txt): normas em estoque (DIN 2440 e/ou NBR 5580, classe), schedule (sch 40 e/ou sch 80), com e/ou sem costura, faixa de bitolas (de __" a __"), acabamento (pintado em qual cor, preto, galvanizado), barra de 6 m, pontas lisas e/ou ranhuradas (grooved).
14. **Conexões ranhuradas** (`/conexoes-ranhuradas`): acoplamento rígido e/ou flexível, adaptador de flange ranhurado, redução concêntrica, tê mecânico (aparece na foto), ângulos de curva, válvula gaveta ranhurada, faixa de bitolas, pressão de trabalho, marcas e certificação (UL/FM).
15. **Sprinklers** (`/sprinklers`): modelos em estoque (pendente, upright, lateral, embutido, oculto), temperaturas, fator K, resposta rápida/padrão, roscas, acabamentos, marcas, sprinkler para câmara fria e foto real dos bicos.
16. **Mangueiras** (`/mangueiras-de-incendio`): tipos (1 a 5), diâmetros, comprimentos, engate, marca/certificação, se vende semirrígida/mangotinho; teste hidrostático (prazo, se entrega laudo); foto real das mangueiras.
17. **Bombas** (`/bombas-de-incendio`): quais vende (elétrica, diesel, jockey), potências, marcas, painel de comando, conjunto montado, se instala casa de bombas, se tem a pronta entrega; foto real.
18. **Tubulação** (`/tubulacao-de-incendio`): tubo galvanizado (ex.: 2½"), cor da pintura, barra de 6 m, faixa de bitolas.
19. **Tubos de aço carbono** (`/tubos-de-aco-carbono`): os itens da pendência 12 + ASTM A53 e faixa de 1" a 16"; foto das barras de tubo.
20. **Alarme:** se vende acionador manual, detector e sirene (card da home; central não vende).

13. **Política de privacidade:** prazos de guarda das conversas e do cadastro (sugestão: 12 meses sem venda, 5 anos com venda); se a LM não for anunciar na Meta, remover as menções ao Pixel da Meta (seções 2, 5 e 6). Agência: definir rotina de limpeza das tabelas `lmtubos_*` no Supabase para cumprir os 13 meses declarados.

1. Confirmar a razão social exata (o briefing traz "MATERIAS").
2. Horário de sábado.
3. ~~Avaliações do Google~~ Resolvido em 30/09/2026: 3 avaliações reais + nota 5,0 (81 avaliações), copiadas do perfil. Para atualizar, trocar textos e o total na seção `#avaliacoes` do `index.html`.
4. Autorização para citar a **EBM** e, se possível, o logo dela.
5. Logo da Tupper (as outras 5 marcas já têm logo no site; Tupper foi retirada até o logo chegar).
6. Certificações específicas, se o cliente quiser nomeá-las (FAQ e JSON-LD).
7. Fotos de produtos e do estoque (hoje só há fotos da fachada e do galpão). Substituir os ícones dos cards de destaque.
8. Tags dentro do GTM `GTM-KXWZWFS4`: GA4, conversão do Google Ads (clique no WhatsApp) e Meta Pixel, usando os eventos do dataLayer acima.
9. (resolvido em 05/10: domínio da LP é `www.lmtubos.com`)
10. Promoções sazonais: a faixa `.promo-bar` está pronta, basta ligar `PROMO.enabled` em `js/main.js`.
11. Confirmar o lote e a sala do endereço (Lt. 17, Sala 2, conforme a placa, contra Lt. 16 no PRD).
