import { createWhopClient } from "./_client.js";
import { supabase } from "../_supabase.js";

export default async function handler(req, res) {
  try {
    const companyId = process.env.WHOP_COMPANY_ID;
    if (!companyId) {
      return res.status(400).json({ error: "Missing WHOP_COMPANY_ID" });
    }

    const client = createWhopClient();
    const page = await client.memberships.list({ company_id: companyId });

    const members = page.data || [];

    let successCount = 0;
    let errorCount = 0;

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

    res.status(200).json({
      message: `Synced ${successCount} members to Supabase (errors: ${errorCount}).`,
      synced: successCount,
      errors: errorCount,
      data: members,
    });
  } catch (e) {
    console.error("Error syncing Whop members:", e);
    res.status(500).json({ error: e.message });
  }
}
