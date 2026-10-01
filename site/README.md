# Landing page LM Tubos · Materiais Contra Incêndio

Site estático (HTML + CSS + JS puro, sem build) da M|P Assessoria para a LM Tubos. A especificação completa está em `../PRD_LP_LM_Tubos.md`.

## Estrutura

```
site/
├── index.html          página única (seções 0–16 do PRD)
├── obrigado.html       página de conversão opcional (noindex; o form NÃO redireciona para cá por padrão)
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
1. Troque `https://www.lmtubos.com.br/` pelo domínio definitivo em `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD), `robots.txt` e `sitemap.xml`.
2. Confira se o servidor entrega os arquivos com gzip/brotli (Hostinger, Netlify e Vercel já fazem isso).

## Onde editar

Tudo fica no topo de `js/main.js`:

| O quê | Constante |
|---|---|
| Número do WhatsApp e mensagem padrão | `WA_NUMBER`, `WA_DEFAULT` |
| Faixa de promoção sazonal | `PROMO = { enabled: true, text: "…", href: "#orcamento" }` |
| Meta Pixel, GA4 e Google Ads | `TRACKING = { metaPixelId, ga4Id, adsId, adsLabel }` |

- **Mensagens de cada botão:** atributo `data-wa-msg` no HTML. O `data-wa-origin` identifica o botão nos eventos (`hero`, `destaque-conexoes`, `destaque-sprinklers`, `destaque-tubos`, `produtos-lista`, `orientacao`, `servicos`, `como-funciona`, `form`, `cta-final`, `flutuante`, `header` e `rodape`). O `href` já vem preenchido no HTML, então o link funciona mesmo sem JavaScript. Com JS, o `href` é refeito a partir do `data-wa-msg`, então ao mudar uma mensagem atualize os dois.
- **UTM:** se a URL tiver `utm_source` ou `utm_campaign`, o JS acrescenta `[origem: fonte / campanha]` ao fim de todas as mensagens.
- **Banner de cookies (LGPD):** só aparece quando algum ID de rastreamento está preenchido. Os scripts do Meta e do Google só carregam depois de "Aceitar", e a escolha fica salva em `localStorage` (`lm-consent`).
- **Eventos:** Meta `PageView`, `Contact {content_name: origem}` em todo clique de WhatsApp e `Lead` no formulário. GA4 `whatsapp_click {origem}` e `generate_lead`. Google Ads `conversion` (`send_to: adsId/adsLabel`) no clique de WhatsApp.

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
- Consentimento: nada carrega sem aceite; com "Recusar", nenhum script externo.
- Lighthouse mobile, 4 execuções locais com gzip: Performance entre 91 e 99; Acessibilidade, Boas Práticas e SEO em 100.
- 01/10/2026, Lighthouse 12 sem gzip (servidor local simples), 3 execuções: mobile LCP 2,71 a 2,79 s (mediana 2,72 s), CLS 0; desktop LCP 0,62 s, nota 100. Meta do cliente: LCP até 3 s.
- 01/10/2026, depois da seção Estoque, 3 execuções mobile: sem gzip LCP 2,93 s; **com gzip (como numa hospedagem real) nota 99, LCP 2,11 s, CLS 0, TBT ~5 ms**. Na hospedagem, confirmar que gzip ou brotli está ligado para HTML, CSS, JS e SVG (sem isso o HTML de 76 KB pesa ~4x mais).
- **Seção Estoque (`#estoque`):** 7 fotos reais em `assets/img/estoque/` (480 e 899 px, WebP + JPG, `loading="lazy"`). Clicar amplia a foto num `<dialog>` (`initLightbox` em main.js); sem suporte, o link abre a foto. Originais em `Fotos_e_Logo/Fotos Estoque/`.

## Pendências com o cliente

Cada uma está marcada com `[PENDENTE]` em comentário no código.

1. Confirmar a razão social exata (o briefing traz "MATERIAS").
2. Horário de sábado.
3. ~~Avaliações do Google~~ Resolvido em 30/09/2026: 3 avaliações reais + nota 5,0 (81 avaliações), copiadas do perfil. Para atualizar, trocar textos e o total na seção `#avaliacoes` do `index.html`.
4. Autorização para citar a **EBM** e, se possível, o logo dela.
5. Logo da Tupper (as outras 5 marcas já têm logo no site; Tupper foi retirada até o logo chegar).
6. Certificações específicas, se o cliente quiser nomeá-las (FAQ e JSON-LD).
7. Fotos de produtos e do estoque (hoje só há fotos da fachada e do galpão). Substituir os ícones dos cards de destaque.
8. IDs do Meta Pixel, GA4 e Google Ads (`TRACKING` em `js/main.js`).
9. Domínio definitivo (canonical, OG, JSON-LD e sitemap).
10. Promoções sazonais: a faixa `.promo-bar` está pronta, basta ligar `PROMO.enabled` em `js/main.js`.
11. Confirmar o lote e a sala do endereço (Lt. 17, Sala 2, conforme a placa, contra Lt. 16 no PRD).
