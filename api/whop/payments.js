import { createWhopClient } from "./_client.js";

export default async function handler(req, res) {
  try {
    const companyId = process.env.WHOP_COMPANY_ID;
    if (!companyId) return res.status(400).json({ error: "Missing WHOP_COMPANY_ID" });

    const client = createWhopClient();
    const page = await client.payments.list({ company_id: companyId });
    res.status(200).json({ data: page.data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
