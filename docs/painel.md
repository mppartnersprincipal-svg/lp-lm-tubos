# Painel da LP LM Tubos (`/dashboard`)

Painel privado em **https://www.lmtubos.com/dashboard**, no modelo do site da Sólida, adaptado para LP estática como o da LP do Gaspar Lopes. Ele junta duas fontes:

1. **Visitas da LP (coleta própria):** anônima e sempre ativa (não depende do aceite de cookies), gravada no Supabase. Não toca no GTM, no GA4 nem nas tags do Ads.
2. **Google Ads ao vivo:** investimento, impressões, cliques, CTR, CPC, conversões, custo por conversão, campanhas e termos de pesquisa, lidos direto da API do Google Ads (somente leitura) pela MCC da agência.

## Peças

| Peça | Arquivo | O quê |
|---|---|---|
| Coletor | `site/js/tracker.js` | Sessão anônima em `sessionStorage` (renova após 30 min parado). Id de visitante em `localStorage` por 13 meses, **apagado** para quem recusa os cookies. Envia em lote (10 eventos / 5 s / aba oculta, via `sendBeacon`). Sem IP e sem cookies. Não roda para bots nem no `/dashboard`. |
| Eventos | `tracker.js` + `site/js/main.js` | O tracker gera `page_view`, `page_leave` (tempo visível e rolagem), `click`, `section_view` (funil) e `faq_open`. O `main.js` envia `whatsapp_click {source, label}`, `lead` (formulário) e `cookie_consent` por `window.lmCollect`. |
| Ingestão | `api/collect.js` | Vercel Function. Valida, filtra bot, deriva dispositivo/navegador/SO e cidade/UF (cabeçalhos da Vercel) e grava com a service role. |
| Banco | `supabase/migrations/0001_lmtubos_analytics.sql` | Tabelas `lmtubos_sessions` e `lmtubos_events` e a RPC `lmtubos_upsert_session`. RLS ligado sem policies: só a service role acessa. Já aplicada em 06/10/2026. |
| Atribuição | `api/_lib/classify.js` | `gclid` → Google Ads; UTM/referrer → orgânico, Meta, Instagram, direto, indicação. |
| Login | `api/login.js` + `api/_lib/auth.js` | Senha única (`DASHBOARD_PASSWORD`) → token HMAC de 30 dias (`DASHBOARD_SECRET`). |
| Visitas | `api/dashboard.js` | KPIs com comparação de período, série diária, origens, dispositivos, WhatsApp por botão, funil de leitura, FAQ, UTMs, jornadas, heatmap, geografia, cliques e feed ao vivo. |
| Google Ads | `api/google-ads.js` + `api/_lib/google-ads.js` | Porte de `lib/google-ads-api.ts` da Sólida (REST `searchStream` + GAQL), acrescido da série diária e dos termos de pesquisa. Cache de 5 min por instância. |
| Tela | `site/dashboard/index.html` | Página única com Chart.js (cdnjs), filtros na URL e a identidade visual da LP. `noindex` no HTML, no `robots.txt` e no cabeçalho (`vercel.json`). |

## Variáveis de ambiente

Cadastradas na Vercel (Production, como **Sensitive**) em 06/10/2026 no projeto **`lp-lm-tubos-yfx2`**, que é o dono do domínio `www.lmtubos.com`. Atenção: existe um segundo projeto, `lp-lm-tubos` (só `lp-lm-tubos.vercel.app`), ligado ao mesmo repositório; ele também recebeu as variáveis, mas não atende o domínio. A cópia local fica em `.env.local`, que é ignorado pelo git (o repositório é público). Os nomes estão em `.env.example`.

| Variável | Observação |
|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Projeto `khipnjfbxjgvmjvyxero` (compartilhado). Sem elas, a coleta descarta em silêncio. |
| `DASHBOARD_PASSWORD`, `DASHBOARD_SECRET` | Senha do painel e segredo do token. Sem elas, o login responde 503. |
| `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN` | Credenciais da MCC da agência (as mesmas da Sólida). |
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | MCC `6039892603`. |
| `GOOGLE_ADS_CUSTOMER_ID` | **`3285786686` (LM Tubos).** Cuidado: `7929387435` é a conta da própria M\|P. |

Para trocar a senha: Vercel → Settings → Environment Variables → `DASHBOARD_PASSWORD` → editar → **Redeploy**.

## Desenvolvimento local

```
node scripts/dev-server.mjs   # http://localhost:4173 (site + /api + /dashboard), lê o .env.local
```

O servidor local grava no mesmo Supabase de produção. Marque as visitas de teste com `?utm_content=qa-seed` e apague depois:

```sql
delete from public.lmtubos_sessions where utm_content = 'qa-seed';
```

(Há 5 sessões de teste de 06/10/2026, campanhas `qa-teste`, `qa-teste2` e `qa-producao`, ainda não apagadas.)

## Cuidados

- **Cache:** ao alterar `tracker.js`, `main.js` ou `styles.css`, troque o `?v=AAAAMMDD` no HTML (a Vercel guarda `css/` e `js/` por 24 h).
- **Projeto Supabase compartilhado:** nunca rode `drop`/`delete` sem o prefixo `lmtubos_`. As tabelas `analytics_*`, `posts` e `categories` são da Sólida; as `gaspar_*` são do Gaspar.
- **Números do Ads × visitas:** o Ads conta a conversão pela data do clique no anúncio. A coleta própria conta a visita no dia em que ela aconteceu. Os dois não precisam bater.
- **LGPD:** a coleta é anônima e agregada (sem IP, sem cookies, sem dado pessoal). Quem recusa os cookies fica sem o id de visitante persistente.
