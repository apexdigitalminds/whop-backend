import Whop from "@whop/sdk";
import { supabase } from "../_supabase.js";
import { refreshWhopToken } from "./_refreshToken.js";

/**
 * Helper: Fetch valid access token for a community.
 * Refreshes automatically if token expired or expiring soon.
 */
async function getValidAccessToken() {
  const { data: community, error } = await supabase
    .from("communities")
    .select("id, whop_access_token, whop_refresh_token, whop_expires_at")
    .not("whop_access_token", "is", null)
    .limit(1)
    .single();

  if (error || !community) throw new Error("No connected Whop community found.");

  const expiresAt = new Date(community.whop_expires_at);
  const now = new Date();
  const expiresSoon = expiresAt < new Date(now.getTime() + 5 * 60 * 1000); // 5-min threshold

  if (expiresSoon) {
    console.log("⏳ Whop access token expiring soon – refreshing...");
    const newToken = await refreshWhopToken(community.id);
    return { accessToken: newToken, communityId: community.id };
  }

  return { accessToken: community.whop_access_token, communityId: community.id };
}

/**
 * Syncs Whop members into Supabase profiles table.
 */
export default async function handler(req, res) {
  try {
    // 1️⃣ Ensure we have a valid access token
    const { accessToken, communityId } = await getValidAccessToken();

    // 2️⃣ Create Whop client using the current access token
    const client = new Whop({ accessToken });

    // 3️⃣ Get memberships from Whop API
    const page = await client.memberships.list({});
    const members = page.data || [];

    let successCount = 0;
    let errorCount = 0;

    // 4️⃣ Upsert each member into Supabase
    for (const m of members) {
      try {
        const whopUserId = m.user_id;
        const userEmail = m.user?.email || null;
        const username = m.user?.username || m.user?.name || "Unknown";

        const { error } = await supabase
          .from("profiles")
          .upsert(
            {
              whop_user_id: whopUserId,
              email: userEmail,
              username: username,
              community_id: communityId,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "whop_user_id" }
          );

        if (error) {
          console.warn(`❌ Error syncing ${username}:`, error.message);
          errorCount++;
        } else {
          successCount++;
        }
      } catch (innerErr) {
        console.error("Inner sync error:", innerErr.message);
        errorCount++;
      }
    }

    // 5️⃣ Return sync result
    res.status(200).json({
      message: `✅ Synced ${successCount} members (errors: ${errorCount})`,
      synced: successCount,
      errors: errorCount,
      data: members,
    });
  } catch (e) {
    console.error("❌ Error syncing Whop members:", e);
    res.status(500).json({ error: e.message });
  }
}

