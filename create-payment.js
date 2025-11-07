export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).send({ message: 'Method not allowed' });

  const { name, amount } = req.body;

  const MERCHANT_ID = process.env.MERCHANT_ID;
  const PROJECT_CODE = process.env.PROJECT_CODE;
  const API_SECRET = process.env.API_SECRET;

  const payload = {
    merchant_id: MERCHANT_ID,
    project_code: PROJECT_CODE,
    name,
    amount
  };

  // TODO: Add signature if LPay requires

  try {
    const response = await fetch('https://www.lpay.win/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ success: false, message: 'API request failed' });
  }
}
