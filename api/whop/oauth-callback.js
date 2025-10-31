import { supabase } from "../_supabase.js";
import fetch from "cross-fetch";

export default async function handler(req, res) {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: "Missing authorization code" });

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.WHOP_REDIRECT_URI,
      client_id: process.env.WHOP_CLIENT_ID,
      client_secret: process.env.WHOP_CLIENT_SECRET,
    });

    const tokenResponse = await fetch("https://api.whop.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const text = await tokenResponse.text();
    console.log("📦 Whop Raw Response:", text);
    const tokenData = JSON.parse(text);

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({ error: tokenData });
    }

    const expiresAt = new Date(Date.now() + (tokenData.expires_in || 3600) * 1000);

    const { error: dbError } = await supabase.from("communities").upsert({
      whop_access_token: tokenData.access_token,
      whop_refresh_token: tokenData.refresh_token,
      whop_scope: tokenData.scope,
      whop_token_type: tokenData.token_type || "Bearer",
      whop_expires_at: expiresAt.toISOString(),
      whop_connected_at: new Date().toISOString(),
      whop_last_refreshed: new Date().toISOString(),
    });

    if (dbError) throw new Error(dbError.message);

    res.status(200).json({ message: "✅ Connected to Whop!", data: tokenData });
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    res.status(500).json({ error: err.message });
  }
}

