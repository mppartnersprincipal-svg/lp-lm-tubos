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
**Domínio da LP: `www.lmtubos.com`** (apex `lmtubos.com` redireciona). DNS na Hostinger (ns atlas/hyperion.dns-parking.com): A `@` 216.198.79.1, CNAME `www` d7da5e5515572bbb.vercel-dns-017.com. ⚠️ `lmtubos.com.br` é o site WordPress do cliente (+ e-mail Locaweb): não mexer, só aparece no `sameAs` do JSON-LD.
Repositório: https://github.com/mppartnersprincipal-svg/lp-lm-tubos (branch `main`, **público**). `.claude/settings.local.json` fica fora do git.
Deploy: Vercel, ligado ao GitHub. **O projeto do domínio é `lp-lm-tubos-yfx2`** (envs do painel ficam nele); há um 2º projeto `lp-lm-tubos` (`lp-lm-tubos.vercel.app`) no mesmo repo, sem domínio. A pasta local está linkada (`.vercel/`) ao `-yfx2`. `vercel.json` na raiz publica só a pasta `site/` (sem build).

## Regras que valem para tudo

- `PRD_LP_LM_Tubos.md` é a fonte de verdade dos fatos; não inventar números, certificações, depoimentos ou clientes. A copy foi reescrita para SEO/GEO + humanizer (30/09) e **não usa travessão (— ou –)** em nenhum arquivo do site
- FAQ visível (`#duvidas`) e JSON-LD `FAQPage` no `<head>` devem ter as mesmas perguntas/respostas
- Tokens do PRD prevalecem sobre `Design system from logo/` (Archivo + Carlito, navy `#2C2A7C`, vermelho `#E53013`, raio 8px). Cores só via tokens em `:root`
- Sem framework/Tailwind/React. Componentes de terceiros (ex.: 21st.dev/shadcn) são **recriados** em HTML/CSS com os tokens da marca, sem instalar nada
- `Fotos_e_Logo/` = originais, não editar. Fotos otimizadas vão em `site/assets/img/` (WebP + JPG)
- Pendências do cliente ficam como comentário `[PENDENTE: …]` no código
- **Segredos** (Google Ads, Supabase, senha do painel) só em `.env.local` (ignorado) e na Vercel. Repo é público: nunca commitar valores. Conta Ads da LM = `3285786686` (a `7929387435` é da M|P)
- Dashboard da agência = **modelo Sólida/Gaspar** (painel próprio + API do Google Ads), não Looker Studio
- Endereço usado: Qd. 2, **Lt. 17, Sala 2** (placa do CNPJ), não Lt. 16 do PRD
- **DNS / e-mail:** o e-mail do cliente (vendas01@) roda na **Locaweb** (MX `mx.core.locaweb.com.br` etc. + SPF). Nunca trocar nameservers para a Vercel nem "Redefinir registros DNS" na Hostinger: só editar A `@`, AAAA `@` e CNAME `www`

## Mapa das pastas

| Pasta/arquivo | O que é | Doc detalhado |
|---|---|---|
| `site/` | A landing (index.html, obrigado.html, css/styles.css, js/main.js, assets, robots, sitemap, llms.txt) | `site/README.md` (estrutura, onde editar, decisões, verificação, pendências) |
| `PRD_LP_LM_Tubos.md` | Especificação completa: seções, design system, copy, integrações, SEO | — |
| `Briefing_LP_LM_Tubos*.pdf` | Briefing original do cliente | — |
| `Design system from logo/` | Design system gerado do logo (só consulta; PRD prevalece) | `readme.md` lá dentro |
| `Fotos_e_Logo/` | Fotos (fachada/galpão) e logos originais | — |
| `gtm/` | Arquivo de importação do contêiner GTM-KXWZWFS4 (gerado pelo Claude) | — |
| `docs/` | Docs operacionais | `docs/painel.md` (painel /dashboard) |
| `api/` + `supabase/` + `site/dashboard/` + `site/js/tracker.js` | Painel first-party em `/dashboard` (modelo Sólida/Gaspar): coleta própria no Supabase (tabelas `lmtubos_`) + Google Ads ao vivo pela API | `docs/painel.md` |

## Seção de avaliações (`#avaliacoes`)

- Dados reais do perfil Google (place_id `ChIJ670cpOKNXpMR_Y_hf_1zLzk`, link `https://share.google/hPa1TN4n9YhpyhZI6`): nota 5,0, 81 avaliações (há 1 de 1★)
- **Estáticas**, copiadas em 30/09/2026 via Apify `compass/crawler-google-places`. Para atualizar: rodar de novo e trocar textos/total no HTML
- Topo do card usa **iniciais do cliente** (não foto de produto nem rosto de banco de imagens). Fotos de produto ficam só nos cards de `#destaques`
- Opção futura: integração ao vivo pela Places API (precisa de chave com cobrança)

## Pendências abertas

- Lista completa (11 itens) em `site/README.md` → "Pendências com o cliente". Principais: no GTM trocar o acionador "CE - whatsapp_click (sem formulário)" para "não é igual a form" e publicar, no GA4 criar eventos principais (whatsapp_click, generate_lead) e dimensões (whatsapp_origem, lead_origem), Pixel do Meta (não enviado), logo da Tupper (as outras 5 marcas já têm), trocar as fotos de banco de imagens dos cards de `#destaques` por fotos do cliente, horário de sábado, razão social, autorização EBM

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
- 05/10: domínio `www.lmtubos.com.br` confirmado; removidos os `[PENDENTE: domínio]` do código. Falta ligar o domínio na Vercel
- 05/10: DNS na Hostinger (ns dns-parking.com). Registros pedidos pela Vercel: A @ 216.198.79.1 e CNAME www d7da5e5515572bbb.vercel-dns-017.com. Na checagem ainda respondia o antigo (A 147.93.38.85 + AAAA IPv6 da Hostinger): falta salvar/propagar e apagar o AAAA
- 05/10: a zona editada pelo usuário não era a do lmtubos.com.br (só 2 registros; a real tem MX Locaweb, SPF, autodiscover, mail e serial 2026100101 sem mudança). Domínio parece ligado a um site da hospedagem Hostinger (IP 147.93.38.85, LiteSpeed). Orientado a achar a zona certa e trocar só A/AAAA/CNAME
- 05/10: CORREÇÃO: lmtubos.com.br é o site WordPress do cliente, não a LP. A confirmação de domínio do mesmo dia estava errada. Pedido ao usuário o domínio real da LP e a remoção de lmtubos.com.br/www da Vercel
- 05/10: domínio da LP = `www.lmtubos.com` (DNS já apontando para a Vercel). Trocado em canonical, OG, JSON-LD, sitemap, robots e llms.txt; `lmtubos.com.br` adicionado ao `sameAs`
- 05/10: GTM `GTM-KXWZWFS4` instalado (head + noscript, index e obrigado) com Consent Mode v2 ligado ao aviso de cookies; eventos no dataLayer: `whatsapp_click {whatsapp_origem}`, `generate_lead`, `consentimento_aceito/recusado`. Detalhes no site/README.md
- 05/10: `www.lmtubos.com` ligado na Vercel (usuário confirmou que deu certo)
- 05/10: `gtm/GTM-KXWZWFS4_lm-tubos_importar.json` (importar com Substituir; contêiner vazio): Google Tag GA4 `G-WBE4K48M82`, eventos GA4 whatsapp_click/generate_lead, vinculador e conversão Ads `AW-18483352869` / `FYWOCM-lupIdEKWqxu1E` no whatsapp_click (exceto origem form). Formulário vai ter conversão própria (categoria "Enviar formulário de lead")
- 05/10: conversão Ads do formulário (`E4A_CNm7u5IdEKWqxu1E`, evento generate_lead) adicionada ao mesmo arquivo do GTM (agora 6 tags; importar com Substituir)
- 05/10: commit `ccec985` (domínio lmtubos.com, GTM, pasta gtm/) enviado ao GitHub; Vercel publicou e o GTM já está no ar em www.lmtubos.com. Falta importar/publicar o contêiner no GTM e configurar eventos principais + dimensões no GA4
- 05/10: GTM v2 publicado e testado no site no ar: consentimento G100→G111 ao aceitar, whatsapp_click no GA4 e as 2 conversões Ads disparando. Alerta "taxa de consentimento 0%" no GTM = pouco tráfego ainda (default negado por LGPD). O teste gerou 1 conversão falsa de cada no Ads (lead "Teste Claude")
- 05/10: corrigido gatilho da conversão Ads "Clique WhatsApp" no JSON do GTM (o "não é igual a form" tinha virado "igual a form": só disparava no formulário) e criado cache-busting `?v=` em css/js (a Vercel guarda 24 h e o debug pegava o main.js antigo)
- 05/10: roteiro do dashboard Looker Studio (GA4) em `docs/dashboard-looker-studio.md`; falta o Pedro montar após 24–48 h de dados
- 06/10: Looker Studio descartado (roteiro apagado). Painel `/dashboard` no modelo Sólida/Gaspar: coleta própria (Supabase `lmtubos_*`, migration aplicada), login por senha, Google Ads ao vivo (API, conta 3285786686 via MCC) com campanhas e termos de pesquisa. 10 envs na Vercel (Sensitive). Testado ponta a ponta local; 4 sessões de teste `qa-seed` ficaram no banco. Detalhes em `docs/painel.md`
- 06/10: painel no ar em www.lmtubos.com/dashboard (login, visitas e Google Ads testados em produção). Envs estavam no projeto Vercel errado; cadastradas no `lp-lm-tubos-yfx2` (dono do domínio)
