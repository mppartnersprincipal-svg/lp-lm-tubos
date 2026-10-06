// GET /api/google-ads?de=YYYY-MM-DD&ate=YYYY-MM-DD → relatório da conta da LM Tubos (somente leitura).
// Separado de /api/dashboard para o painel carregar as visitas sem esperar o Google Ads.
// Autenticação: Authorization: Bearer <token de /api/login>
import { verifyToken, bearer } from './_lib/auth.js';
import { googleAdsReport } from './_lib/google-ads.js';

const YMD = /^\d{4}-\d{2}-\d{2}$/;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!verifyToken(bearer(req))) return res.status(401).json({ error: 'Sessão expirada. Entre novamente.' });
  res.setHeader('Cache-Control', 'no-store');
  const q = req.query || {};
  if (!YMD.test(q.de || '') || !YMD.test(q.ate || '')) return res.status(400).json({ error: 'Período inválido.' });
  return res.status(200).json(await googleAdsReport(q.de, q.ate));
}
