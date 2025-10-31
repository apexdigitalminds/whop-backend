import fetch from "cross-fetch";
import { supabase } from "../_supabase.js";

function readStateCookie(cookieHeader, state) {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`oauth-state.${state}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export default async function handler(req, res) {
  try {
    // --- Live env debug (shows in Vercel logs) ---
    console.log("WHOP DEBUG ENV:", {
      client_id: process.env.WHOP_CLIENT_ID,
      client_secret_length: process.env.WHOP_CLIENT_SECRET
        ? process.env.WHOP_CLIENT_SECRET.length
        : 0,
      redirect_uri: process.env.WHOP_REDIRECT_URI,
      frontend_origin: process.env.FRONTEND_ORIGIN,
    });

    const { code, state } = req.query;
    if (!code || !state) {
      console.error("Missing code or state:", { code, state });
      return res.status(400).json({ error: "Missing code or state" });
    }

    const next = readStateCookie(req.headers.cookie, state);
    if (!next) return res.status(400).json({ error: "Invalid or expired state" });

    // --- JSON body (as shown in Whop v5 docs) ---
    const body = {
      grant_type: "authorization_code",
      code,
      client_id: process.env.WHOP_CLIENT_ID,
      client_secret: process.env.WHOP_CLIENT_SECRET, // Whop may unify this with API key
      redirect_uri: process.env.WHOP_REDIRECT_URI,
    };

    console.log("DEBUG token request shape (no secrets):", {
      has_client_id: !!body.client_id,
      has_client_secret: !!body.client_secret,
      redirect_uri: body.redirect_uri,
    });

    const tokenRes = await fetch("https://api.whop.com/v5/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const rawText = await tokenRes.text();
    console.log("📦 Whop token response:", tokenRes.status, rawText);

    if (!tokenRes.ok) {
      throw new Error(`Token exchange failed: ${rawText}`);
    }

    const tokenData = JSON.parse(rawText);

    // Fetch Whop user
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

    const frontend = process.env.FRONTEND_ORIGIN ?? "https://yourfrontenddomain.com";
    return res.redirect(302, `${frontend}${next}`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).json({ error: err.message });
  }
}
