import fetch from "cross-fetch";
import { supabase } from "../_supabase.js";

function readStateCookie(cookieHeader, state) {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith(`oauth-state.${state}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    if (!code || !state)
      return res.status(400).json({ error: "Missing code or state" });

    const next = readStateCookie(req.headers.cookie, state);
    if (!next) return res.status(400).json({ error: "Invalid or expired state" });

    const tokenRes = await fetch("https://api.whop.com/v5/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.WHOP_REDIRECT_URI,
        client_id: process.env.WHOP_CLIENT_ID,
        client_secret: process.env.WHOP_CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(JSON.stringify(tokenData));

    // Fetch user details
    const meRes = await fetch("https://api.whop.com/v5/me/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const meData = await meRes.json();

    // Store in Supabase
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (tokenData.expires_in ?? 3600) * 1000);

    await supabase.from("profiles").upsert({
      whop_user_id: meData.id,
      username: meData.username,
      email: meData.email ?? null,
      updated_at: now.toISOString(),
    });

    await supabase.from("communities").upsert({
      whop_access_token: tokenData.access_token,
      whop_refresh_token: tokenData.refresh_token,
      whop_scope: tokenData.scope,
      whop_token_type: tokenData.token_type || "Bearer",
      whop_expires_at: expiresAt.toISOString(),
      whop_connected_at: now.toISOString(),
      whop_last_refreshed: now.toISOString(),
    });

    // Redirect to frontend
    const frontend = process.env.FRONTEND_ORIGIN ?? "https://yourfrontenddomain.com";
    return res.redirect(302, `${frontend}${next}`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).json({ error: err.message });
  }
}

