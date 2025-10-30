import { supabase } from "../_supabase.js";

export default async function handler(req, res) {
  try {
    // Extract the authorization code from Whop redirect
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    // Exchange the code for access + refresh tokens
    const tokenResponse = await fetch("https://api.whop.com/oauth/token", {
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

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Whop OAuth error:", tokenData);
      return res.status(500).json({ error: tokenData.error_description || "OAuth token exchange failed" });
    }

    // Calculate expiry timestamp (Whop usually returns expires_in in seconds)
    const expiresAt = new Date(Date.now() + (tokenData.expires_in || 3600) * 1000);

    // Store OAuth data in Supabase (upsert keeps record consistent)
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
      console.error("Supabase save error:", dbError.message);
      return res.status(500).json({ error: "Failed to store tokens in Supabase" });
    }

    console.log("✅ Whop OAuth connection successful");
    return res.status(200).json({
      message: "✅ Connected to Whop successfully!",
      scope: tokenData.scope,
      expires_at: expiresAt,
    });

  } catch (err) {
    console.error("OAuth callback handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}
