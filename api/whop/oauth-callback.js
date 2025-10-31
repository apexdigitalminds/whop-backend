import { supabase } from "../_supabase.js";
import fetch from "cross-fetch";

export default async function handler(req, res) {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: "Missing authorization code" });

    const clientId = process.env.WHOP_CLIENT_ID;
    const clientSecret = process.env.WHOP_CLIENT_SECRET;
    const redirectUri = process.env.WHOP_REDIRECT_URI;

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    console.log("🔁 Starting token exchange with Whop...");
    console.log("➡️ Endpoint:", "https://api.whop.com/oauth/token");
    console.log("➡️ Body:", params.toString());

    const tokenResponse = await fetch("https://api.whop.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const rawText = await tokenResponse.text();

    console.log("📦 Raw response from Whop:");
    console.log("===========================================");
    console.log(rawText);
    console.log("===========================================");

    let tokenData;
    try {
      tokenData = JSON.parse(rawText);
    } catch {
      console.error("❌ Response was not valid JSON. Here’s the first 400 chars:");
      console.error(rawText.slice(0, 400));
      return res.status(500).json({
        error: "Invalid JSON response from Whop token endpoint",
        preview: rawText.slice(0, 400),
      });
    }

    if (!tokenResponse.ok) {
      console.error("❌ OAuth token exchange failed:", tokenData);
      return res.status(tokenResponse.status).json({ error: tokenData });
    }

    const expiresAt = new Date(Date.now() + (tokenData.expires_in || 3600) * 1000);

    const { error: dbError } = await supabase
      .from("communities")
      .upsert({
        whop_access_token: tokenData.access_token,
        whop_refresh_token: tokenData.refresh_token,
        whop_scope: tokenData.scope,
        whop_token_type: tokenData.token_type || "Bearer",
        whop_expires_at: expiresAt.toISOString(),
        whop_connected_at: new Date().toISOString(),
        whop_last_refreshed: new Date().toISOString(),
      });

    if (dbError) {
      console.error("❌ Failed to save tokens in Supabase:", dbError.message);
      return res.status(500).json({ error: "Failed to store tokens in Supabase" });
    }

    console.log("✅ Whop OAuth connection successful");
    return res.status(200).json({
      message: "✅ Connected to Whop successfully!",
      scope: tokenData.scope,
      expires_at: expiresAt,
    });
  } catch (err) {
    console.error("⚠️ OAuth callback unexpected error:", err);
    res.status(500).json({ error: err.message });
  }
}
