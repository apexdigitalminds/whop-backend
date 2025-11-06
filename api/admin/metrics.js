// /api/admin/metrics.js
import { supabaseAdmin } from "../_supabase.js";
import { getAuthedUser, requireAccess } from "../_whopAuth.js";

export default async function handler(req, res) {
  try {
    const { userId } = await getAuthedUser(req);
    const { companyId } = req.query;
    if (!companyId) return res.status(400).json({ error: "Missing companyId" });

    const gate = await requireAccess(companyId, userId, "admin");
    if (!gate.ok)
      return res.status(403).json({ error: "Admin access required", level: gate.level });

    // Weekly actions & member counts
    const { count: actionsCount } = await supabaseAdmin
      .from("actions_log")
      .select("id", { count: "exact" })
      .gte("created_at", new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString());

    const { count: memberCount } = await supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact" });

    res.json({
      ok: true,
      metrics: {
        weekly_actions: actionsCount || 0,
        total_members: memberCount || 0,
      },
    });
  } catch (e) {
    console.error("❌ Admin metrics error:", e.message);
    res.status(401).json({ error: e.message });
  }
}
