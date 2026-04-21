export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) return res.status(400).json({ error: 'Missing url param' });

  try {
    const apiRes = await fetch(decodeURIComponent(target), {
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await apiRes.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.status(apiRes.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
