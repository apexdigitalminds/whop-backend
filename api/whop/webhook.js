export const config = { api: { bodyParser: { sizeLimit: "1mb" } } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    console.log("Webhook received:", req.body);
    // TODO: Verify signature and log to Supabase
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
