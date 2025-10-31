import { supabase } from "../_supabase.js";
import fetch from "cross-fetch";

export default async function handler(req, res) {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    // --- Environment vars ---
    const redirectUri =
      process.env.WHOP_REDIRECT_URI ||
      "https://whop-backend.vercel.app/api/whop/oauth-callback";
    const clientId =
      process.env.WHOP_CLIENT_ID || process.env.WHOP_APP_ID;
    const clientSecret = process.env.WHOP_CLIENT_SECRET;
    const tokenUrl = "https://api.whop.com/oauth/token";

    if (!clientId || !clientSecret) {
      return res.status(500).json({
        error: "Missing Whop OAuth credentials (WHOP_CLIENT_ID or WHOP_CLIENT_SECRET)",
      });
    }

    // --- Token exchange ---
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    let tokenData = null;
    try {
      tokenData = await response.json();
    } catch {
      return res.status(502).json({
        error: "Invalid JSON response from Whop token endpoint",
      });
    }

    if (!response.ok || !tokenData.access_token) {
      console.error("Whop OAuth token exchange failed:", tokenData);
      return res.status(response.status).json({
        error: tokenData.error_description || tokenData.error || "OAuth token exchange failed",
      });
    }

    // --- Calculate expiry timestamp ---
    const expiresAt = new Date(Date.now() + (tokenData.expires_in || 3600) * 1000);

    // --- Upsert into Supabase communities table ---
    const { error: dbError } = await supabase.from("communities").upsert({
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

