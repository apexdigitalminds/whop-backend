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

    // Log environment sanity (Your logging is good)
    console.log("WHOP DEBUG ENV:", {
      client_id: process.env.WHOP_CLIENT_ID,
      redirect_uri: process.env.WHOP_REDIRECT_URI,
      secret_length: process.env.WHOP_CLIENT_SECRET?.length || 0,
      api_key_length: process.env.WHOP_API_KEY?.length || 0,
    });

    if (!code || !state)
      return res.status(400).json({ error: "Missing code or state" });

    const next = readStateCookie(req.headers.cookie, state);
    if (!next)
      return res.status(400).json({ error: "Invalid or expired state" });

    // ✅ Use the App API Key as the secret in the token exchange
    // This part is NOT a JSON object for the body
    const tokenParams = new URLSearchParams();
    tokenParams.append("grant_type", "authorization_code");
    tokenParams.append("code", code);
    tokenParams.append("client_id", process.env.WHOP_CLIENT_ID);
    tokenParams.append(
      "client_secret",
      process.env.WHOP_API_KEY || process.env.WHOP_CLIENT_SECRET
    );
    tokenParams.append("redirect_uri", process.env.WHOP_REDIRECT_URI);


    console.log("DEBUG token request (no secrets):", {
      grant_type: "authorization_code",
      code_present: !!code,
      client_id: process.env.WHOP_CLIENT_ID,
      using_api_key: !!process.env.WHOP_API_KEY,
    });

    // ===================================================================
    // ⬇️ THIS IS THE FIX ⬇️
    // ===================================================================

    const tokenRes = await fetch("https.api.whop.com/v5/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams, // Use the URLSearchParams object directly
    });

    // ===================================================================
    // ⬆️ THIS IS THE FIX ⬆️
    // ===================================================================

    const rawText = await tokenRes.text();
    console.log("📦 Whop token response:", tokenRes.status, rawText);

    if (!tokenRes.ok)
      throw new Error(`Token exchange failed: ${rawText}`);

    const tokenData = JSON.parse(rawText);

    // Fetch user info
    const meRes = await fetch("https.api.whop.com/v5/me/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const meData = await meRes.json();

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