export default async function handler(req, res) {
  try {
    const base = "https://whop.com/oauth/authorize/";
    const params = new URLSearchParams({
      client_id: process.env.WHOP_CLIENT_ID,
      redirect_uri: process.env.WHOP_REDIRECT_URI,
      response_type: "code",
      scope: "member:basic:read payment:basic:read company:basic:read",
    });
    const redirectUrl = `${base}?${params.toString()}`;
    return res.redirect(302, redirectUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
