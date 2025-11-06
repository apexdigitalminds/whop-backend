// /api/actions/record.js
import { supabaseAdmin } from "../_supabase.js";
import { getAuthedUser, requireAccess } from "../_whopAuth.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "POST method required" });

    const { userId } = await getAuthedUser(req);
    const { experienceId, actionType, xp = 0 } = req.body;
    if (!experienceId || !actionType)
      return res.status(400).json({ error: "Missing fields" });

    const gate = await requireAccess(experienceId, userId, "customer");
    if (!gate.ok) return res.status(403).json({ error: "Access denied" });

    // Find the user's profile record
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id, xp")
      .eq("whop_user_id", userId)
      .single();

    if (!profile) throw new Error("Profile not found");

    // Insert action log
    await supabaseAdmin.from("actions_log").insert({
      user_id: profile.id,
      community_id: null,
      action_type: actionType,
      xp_gained: xp,
      source: "app",
    });

    // Increment XP using stored function (fallback to manual if unavailable)
    try {
      await supabaseAdmin.rpc("increment_xp", {
        p_user_id: profile.id,
        p_xp: xp,
      });
    } catch {
      await supabaseAdmin
        .from("profiles")
        .update({ xp: (profile.xp || 0) + xp })
        .eq("id", profile.id);
    }

    res.json({ ok: true });
  } catch (e) {
    console.error("❌ Action record error:", e.message);
    res.status(401).json({ error: e.message });
  }
}
