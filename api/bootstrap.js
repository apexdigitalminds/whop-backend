// /api/bootstrap.js
import { supabaseAdmin } from "./_supabase.js";
import { getAuthedUser, requireAccess } from "./_whopAuth.js";

export default async function handler(req, res) {
  try {
    const { userId } = await getAuthedUser(req);
    const { experienceId } = req.query;
    if (!experienceId) return res.status(400).json({ error: "Missing experienceId" });

    // Verify access
    const gate = await requireAccess(experienceId, userId, "customer");
    if (!gate.ok) return res.status(403).json({ error: "Access denied", level: gate.level });

    // Upsert user profile
    await supabaseAdmin.from("profiles").upsert(
      {
        whop_user_id: userId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "whop_user_id" }
    );

    // Retrieve updated profile
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("whop_user_id", userId)
      .single();

    if (error) throw error;

    res.json({ ok: true, profile });
  } catch (e) {
    console.error("❌ Bootstrap error:", e.message);
    res.status(401).json({ error: e.message });
  }
}
