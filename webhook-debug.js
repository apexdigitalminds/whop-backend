export const config = {
  api: { bodyParser: true },
};

/**
 * Minimal diagnostic endpoint to confirm delivery from Whop → Vercel.
 */
export default async function handler(req, res) {
  console.log("📥 DEBUG webhook reached:", req.method, new Date().toISOString());
  console.log("📦 Headers:", req.headers);
  console.log("📨 Body:", req.body);

  return res.status(200).json({
    ok: true,
    method: req.method,
    time: new Date().toISOString(),
    received: req.body,
  });
}
