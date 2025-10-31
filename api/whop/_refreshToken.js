import { supabase } from "../_supabase.js";

export async function refreshWhopToken(communityId) {
  try {
    const { data: community, error } = await supabase
      .from("communities")
      .select("*")
      .eq("id", communityId)
      .single();

    if (error || !community?.whop_refresh_token) {
      throw new Error("No refresh token available.");
    }

const response = await fetch("https://api.whop.com/v5/oauth/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    grant_type: "refresh_token",
    refresh_token: community.whop_refresh_token,
    client_id: process.env.WHOP_CLIENT_ID,
    client_secret: process.env.WHOP_CLIENT_SECRET,
  }),
});


    const tokenData = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(tokenData));

    const newExpiresAt = new Date(Date.now() + (tokenData.expires_in || 3600) * 1000);

    await supabase
      .from("communities")
      .update({
        whop_access_token: tokenData.access_token,
        whop_refresh_token: tokenData.refresh_token || community.whop_refresh_token,
        whop_expires_at: newExpiresAt.toISOString(),
        whop_last_refreshed: new Date().toISOString(),
      })
      .eq("id", communityId);

    console.log(`🔄 Whop token refreshed for community ${communityId}`);
    return tokenData.access_token;
  } catch (e) {
    console.error("Token refresh error:", e);
    throw e;
  }
}
