import { createWhopClient, getDefaultCommunityToken } from "../_client.js";
import { supabase } from "../_supabase.js";

export default async function handler(req, res) {
  try {
    const token = await getDefaultCommunityToken();
    const client = await createWhopClient(token);
    const memberships = await client.memberships.list();

    let success = 0, errors = 0;
    for (const m of memberships.data) {
      const { user } = m;
      const { error } = await supabase.from("profiles").upsert({
        whop_user_id: m.user_id,
        email: user?.email || null,
        username: user?.username || user?.name || "Unknown",
        updated_at: new Date().toISOString(),
      });
      if (error) errors++; else success++;
    }

    res.status(200).json({ synced: success, errors, count: memberships.data.length });
  } catch (e) {
    console.error("Sync error:", e);
    res.status(500).json({ error: e.message });
  }
}
