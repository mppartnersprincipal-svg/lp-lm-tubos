# LM Tubos — Índice do projeto

> **Regra de manutenção (pedido do usuário, 30/09/2026):** ao terminar QUALQUER
> tarefa neste projeto, atualizar este arquivo antes de encerrar: 1 linha no
> "Histórico" + ajustar a seção da frente mexida. Detalhe técnico longo vai no
> doc da própria frente (ex.: `site/README.md`), nunca aqui. Manter este
> arquivo curto (meta: < 150 linhas) — é carregado em todo chat.
> Um hook `Stop` (`.claude/settings.local.json` → skill global `memoria-projeto`)
> lembra disso quando há arquivo editado depois da última edição deste índice.

Landing page da **LM Tubos · Materiais Contra Incêndio** (distribuidora em Goiânia-GO,
envio para todo o Brasil). Agência: M|P Assessoria. Objetivo: conversas no WhatsApp
comercial (Roberto Silva, (62) 98558-7373). Stack: **HTML + CSS + JS puro, sem build**.
Domínio previsto: `www.lmtubos.com.br` (ainda não publicado).
Repositório: https://github.com/mppartnersprincipal-svg/lp-lm-tubos (branch `main`, **público**). `.claude/settings.local.json` fica fora do git.
Deploy: Vercel (`lp-lm-tubos.vercel.app`), ligado ao GitHub. `vercel.json` na raiz publica só a pasta `site/` (sem build).

## Regras que valem para tudo

- `PRD_LP_LM_Tubos.md` é a fonte de verdade dos fatos; não inventar números, certificações, depoimentos ou clientes. A copy foi reescrita para SEO/GEO + humanizer (30/09) e **não usa travessão (— ou –)** em nenhum arquivo do site
- FAQ visível (`#duvidas`) e JSON-LD `FAQPage` no `<head>` devem ter as mesmas perguntas/respostas
- Tokens do PRD prevalecem sobre `Design system from logo/` (Archivo + Carlito, navy `#2C2A7C`, vermelho `#E53013`, raio 8px). Cores só via tokens em `:root`
- Sem framework/Tailwind/React. Componentes de terceiros (ex.: 21st.dev/shadcn) são **recriados** em HTML/CSS com os tokens da marca, sem instalar nada
- `Fotos_e_Logo/` = originais, não editar. Fotos otimizadas vão em `site/assets/img/` (WebP + JPG)
- Pendências do cliente ficam como comentário `[PENDENTE: …]` no código
- Endereço usado: Qd. 2, **Lt. 17, Sala 2** (placa do CNPJ), não Lt. 16 do PRD

## Mapa das pastas

| Pasta/arquivo | O que é | Doc detalhado |
|---|---|---|
| `site/` | A landing (index.html, obrigado.html, css/styles.css, js/main.js, assets, robots, sitemap, llms.txt) | `site/README.md` (estrutura, onde editar, decisões, verificação, pendências) |
| `PRD_LP_LM_Tubos.md` | Especificação completa: seções, design system, copy, integrações, SEO | — |
| `Briefing_LP_LM_Tubos*.pdf` | Briefing original do cliente | — |
| `Design system from logo/` | Design system gerado do logo (só consulta; PRD prevalece) | `readme.md` lá dentro |
| `Fotos_e_Logo/` | Fotos (fachada/galpão) e logos originais | — |

## Seção de avaliações (`#avaliacoes`)

- Dados reais do perfil Google (place_id `ChIJ670cpOKNXpMR_Y_hf_1zLzk`, link `https://share.google/hPa1TN4n9YhpyhZI6`): nota 5,0, 81 avaliações (há 1 de 1★)
- **Estáticas**, copiadas em 30/09/2026 via Apify `compass/crawler-google-places`. Para atualizar: rodar de novo e trocar textos/total no HTML
- Topo do card usa **iniciais do cliente** (não foto de produto nem rosto de banco de imagens). Fotos de produto ficam só nos cards de `#destaques`
- Opção futura: integração ao vivo pela Places API (precisa de chave com cobrança)

## Pendências abertas

- Lista completa (11 itens) em `site/README.md` → "Pendências com o cliente". Principais: IDs Meta/GA4/Ads, domínio definitivo, logo da Tupper (as outras 5 marcas já têm), trocar as fotos de banco de imagens dos cards de `#destaques` por fotos do cliente, horário de sábado, razão social, autorização EBM

## Histórico (1 linha por entrega, mais recente no fim)

- 30/09 — PRD + otimização das fotos + landing completa (HTML/CSS/JS, WhatsApp com origem/UTM, LGPD, Lighthouse mobile 91–99) + README
- 30/09 — Avaliações reais do Google na seção de depoimentos (cards no estilo do componente 21st.dev, recriado em CSS); selo 5,0 / 81 avaliações
- 30/09 — Criados este `CLAUDE.md`, a memória do projeto e o hook `Stop` de lembrete
- 30/09: copy otimizada para SEO/GEO e humanizada, travessões removidos, JSON-LD ampliado (Store + WebPage + FAQ com 11 perguntas), `site/llms.txt` criado. Pendente confirmar "2025" da mudança para o galpão próprio
- 30/09: fotos de produto nos cards de `#destaques` (no lugar dos ícones); cards de avaliação com iniciais + selo Google
- 01/10: faixa de diferenciais (`.proofs`) virou esteira infinita com ícones animados (hoje via `initMarquees` em main.js; sem JS ou com movimento reduzido fica a grade estática). Fotos reais do estoque chegaram em `Fotos_e_Logo/Fotos Estoque/` (7 verticais), ainda não aplicadas
- 01/10: cards de `#produtos` entram um a um no scroll, em cascata por linha (atributo `data-reveal-cards` + `initRevealCards` em main.js; reutilizável em outras listas)
- 01/10: seção Marcas com os 5 logos do cliente em esteira (Tupper removida em todo o site até chegar o logo). Esteira virou genérica (`[data-marquee]`). Performance: fontes hospedadas no site + preload da Archivo, logos SVG otimizados, esteira iniciada após o load. LCP mobile 3,25 s → 2,72 s (meta ≤ 3 s); desktop 0,62 s
- 01/10: projeto inteiro versionado no GitHub (commit inicial `2874a69`)
- 01/10: seção `#estoque` com as 7 fotos reais do galpão (mosaico + foto ampliada ao clicar) e link "Estoque" no menu; menu ajustado para caber em 1024 px. LCP mobile com gzip 2,11 s (nota 99); sem gzip 2,93 s
- 01/10: primeiro deploy na Vercel deu 404 (publicou a raiz do repo); criado `vercel.json` com `outputDirectory: site` + cache de assets
- 01/10: deploy corrigido e no ar em https://lp-lm-tubos.vercel.app (commits `e187242`, `df2f5fa`); Vercel serve com brotli e cache de assets
- 01/10: botões em formato pílula (token `--radius-pill`), com padding lateral menor no celular
- 01/10: Lighthouse mobile no site no ar: Performance 98, LCP 2,13 s, CLS 0, Acessibilidade/Boas práticas/SEO 100
