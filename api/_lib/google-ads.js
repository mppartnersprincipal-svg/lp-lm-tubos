// Relatórios do Google Ads (somente leitura) via REST searchStream + GAQL, com fetch nativo.
// Porte de lib/google-ads-api.ts do site da Sólida, acrescido de série diária e termos de pesquisa.
// Credenciais: OAuth refresh token + developer token da MCC (envs GOOGLE_ADS_*). Só roda no servidor.

class AdsError extends Error {}

const METRICS = 'metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions';
const CACHE_MS = 5 * 60 * 1000; // evita gastar cota a cada troca de filtro (por instância da função)
const cache = new Map();

const num = (v) => {
  // O protobuf omite campos zerados no JSON.
  if (v === undefined || v === null) return 0;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new AdsError('O Google Ads retornou dados inválidos. Tente atualizar o painel.');
  return n;
};

function metrics(row) {
  const m = row?.metrics || {};
  const impressions = num(m.impressions);
  const clicks = num(m.clicks);
  const cost = num(m.costMicros) / 1e6;
  const conversions = num(m.conversions);
  return {
    impressions, clicks, cost: +cost.toFixed(2), conversions: +conversions.toFixed(2),
    ctr: impressions > 0 ? +((clicks / impressions) * 100).toFixed(2) : null,
    cpc: clicks > 0 ? +(cost / clicks).toFixed(2) : null,
    cpa: conversions > 0 ? +(cost / conversions).toFixed(2) : null,
  };
}

function config(env = process.env) {
  return {
    developerToken: env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim(),
    clientId: env.GOOGLE_ADS_CLIENT_ID?.trim(),
    clientSecret: env.GOOGLE_ADS_CLIENT_SECRET?.trim(),
    refreshToken: env.GOOGLE_ADS_REFRESH_TOKEN?.trim(),
    customerId: env.GOOGLE_ADS_CUSTOMER_ID?.replace(/[\s-]/g, ''),
    loginCustomerId: env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/[\s-]/g, ''),
    version: env.GOOGLE_ADS_API_VERSION?.trim() || 'v25',
  };
}

async function accessToken(c, signal) {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', client_id: c.clientId, client_secret: c.clientSecret, refresh_token: c.refreshToken }),
    signal,
  });
  if (!r.ok) {
    throw new AdsError(r.status >= 500 || r.status === 429
      ? 'O Google Ads está temporariamente indisponível. Tente atualizar o painel em alguns minutos.'
      : 'Não foi possível autorizar a conexão. Revise o acesso da conta ao Google Ads.');
  }
  const j = await r.json();
  if (!j.access_token) throw new AdsError('Não foi possível autorizar a conexão com o Google Ads.');
  return j.access_token;
}

function querier(c, token, signal) {
  return async function query(gaql) {
    const r = await fetch(`https://googleads.googleapis.com/${c.version}/customers/${c.customerId}/googleAds:searchStream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'developer-token': c.developerToken,
        ...(c.loginCustomerId ? { 'login-customer-id': c.loginCustomerId } : {}),
      },
      body: JSON.stringify({ query: gaql }),
      signal,
    });
    if (!r.ok) {
      // Não repassar o payload de erro do Google ao navegador: pode conter dados da conta.
      console.error('[google-ads] HTTP', r.status, (await r.text().catch(() => '')).slice(0, 300));
      if (r.status === 401 || r.status === 403) throw new AdsError('A conexão não tem acesso aos relatórios desta conta. Revise as permissões do Google Ads.');
      if (r.status === 429) throw new AdsError('O limite de consultas do Google Ads foi atingido. Tente novamente em alguns minutos.');
      throw new AdsError('Não foi possível consultar o Google Ads. Tente atualizar o painel; se persistir, revise a conexão.');
    }
    const chunks = await r.json();
    if (!Array.isArray(chunks) || chunks.some((ch) => !ch || typeof ch !== 'object' || ch.error)) {
      throw new AdsError('O Google Ads retornou uma resposta inesperada. Tente atualizar o painel.');
    }
    return chunks.flatMap((ch) => ch.results || []);
  };
}

const MATCH = new Set(['EXACT', 'PHRASE', 'BROAD', 'NEAR_EXACT', 'NEAR_PHRASE']);

function searchTerms(rows) {
  const map = {};
  rows.forEach((x) => {
    const term = x.searchTermView?.searchTerm || '';
    const t = (map[term] ||= { term, status: x.searchTermView?.status || 'NONE', keywords: [], ad_groups: [], impressions: 0, clicks: 0, cost: 0, conversions: 0 });
    const m = metrics(x);
    t.impressions += m.impressions; t.clicks += m.clicks; t.cost += m.cost; t.conversions += m.conversions;
    const kw = x.segments?.keyword?.info;
    if (kw?.text && !t.keywords.some((k) => k.text === kw.text && k.match_type === kw.matchType)) {
      t.keywords.push({ text: kw.text, match_type: MATCH.has(kw.matchType) ? kw.matchType : null });
    }
    const g = x.adGroup?.name;
    if (g && !t.ad_groups.includes(g)) t.ad_groups.push(g);
  });
  return Object.values(map).map((t) => ({
    ...t, cost: +t.cost.toFixed(2), conversions: +t.conversions.toFixed(2),
    ctr: t.impressions ? +((t.clicks / t.impressions) * 100).toFixed(1) : 0,
  })).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
}

/**
 * Relatório do período (datas YYYY-MM-DD inclusivas, fuso da conta).
 * Nunca lança: devolve { status: 'ready' | 'not_configured' | 'error', ... }.
 */
export async function googleAdsReport(de, ate, env = process.env) {
  const c = config(env);
  if (!c.developerToken || !c.clientId || !c.clientSecret || !c.refreshToken || !c.customerId) {
    return { status: 'not_configured', message: 'Conecte a conta do Google Ads (variáveis GOOGLE_ADS_* na Vercel) para ver investimento, cliques e conversões aqui.' };
  }
  if (!/^\d{10}$/.test(c.customerId) || (c.loginCustomerId && !/^\d{10}$/.test(c.loginCustomerId)) || !/^v\d+$/.test(c.version)) {
    return { status: 'error', message: 'A configuração da conexão com o Google Ads precisa ser revisada.' };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(de) || !/^\d{4}-\d{2}-\d{2}$/.test(ate) || de > ate) {
    return { status: 'error', message: 'Selecione um período válido para consultar o Google Ads.' };
  }

  const key = `${c.customerId}|${de}|${ate}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;

  try {
    const signal = AbortSignal.timeout(20_000);
    const query = querier(c, await accessToken(c, signal), signal);

    const meta = await query('SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone, customer.manager FROM customer LIMIT 1');
    const customer = meta[0]?.customer;
    if (customer?.manager) throw new AdsError('A conexão aponta para uma conta de administrador (MCC). Use em GOOGLE_ADS_CUSTOMER_ID o ID da conta da LM Tubos.');
    if (!customer?.id) throw new AdsError('Não foi possível identificar a conta do Google Ads. Revise a conexão.');

    const where = `WHERE segments.date BETWEEN '${de}' AND '${ate}'`;
    const [totals, campaigns, daily, terms] = await Promise.all([
      query(`SELECT ${METRICS} FROM customer ${where}`),
      query(`SELECT campaign.id, campaign.name, campaign.status, ${METRICS} FROM campaign ${where} ORDER BY metrics.cost_micros DESC`),
      query(`SELECT segments.date, ${METRICS} FROM customer ${where} ORDER BY segments.date`),
      query(`SELECT search_term_view.search_term, search_term_view.status, segments.keyword.info.text, segments.keyword.info.match_type,
        ad_group.name, ${METRICS} FROM search_term_view ${where} ORDER BY metrics.clicks DESC LIMIT 1000`),
    ]);

    const data = {
      status: 'ready',
      customer: { id: customer.id, name: customer.descriptiveName || 'Conta Google Ads', currency: customer.currencyCode || 'BRL', time_zone: customer.timeZone || '' },
      de, ate,
      totals: metrics(totals[0]),
      daily: daily.map((r) => ({ date: r.segments?.date, ...metrics(r) })),
      campaigns: campaigns
        .map((r) => ({ id: r.campaign?.id, name: r.campaign?.name || 'Campanha sem nome', status: r.campaign?.status || 'UNKNOWN', ...metrics(r) }))
        .filter((r) => r.id && (r.status === 'ENABLED' || r.impressions > 0)),
      search_terms: searchTerms(terms),
      fetched_at: new Date().toISOString(),
    };
    cache.set(key, { at: Date.now(), data });
    return data;
  } catch (err) {
    if (!(err instanceof AdsError)) console.error('[google-ads]', err?.message);
    return { status: 'error', message: err instanceof AdsError ? err.message : 'A consulta ao Google Ads não foi concluída. Tente atualizar o painel em alguns minutos.' };
  }
}
