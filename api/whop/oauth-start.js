import { WhopServerSdk } from "@whop/api";

// Helper to create short-lived, httpOnly cookie
function stateCookie(name, value) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`;
}

export default async function handler(req, res) {
  try {
    const whop = WhopServerSdk({
      appApiKey: process.env.WHOP_API_KEY,
      appId: process.env.WHOP_CLIENT_ID,
    });

    const next = typeof req.query.next === "string" ? req.query.next : "/";
    const { url, state } = whop.oauth.getAuthorizationUrl({
      redirectUri: process.env.WHOP_REDIRECT_URI,
      scope: ["read_user"], // start minimal
    });

    res.setHeader("Set-Cookie", stateCookie(`oauth-state.${state}`, next));
    return res.redirect(302, url);
  } catch (err) {
    console.error("OAuth start error:", err);
    res.status(500).json({ error: err.message });
  }
}
