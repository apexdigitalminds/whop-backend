// api/whop/webhook.js
import { supabase } from "../_supabase.js";

export const config = {
  api: {
    bodyParser: false, // Whop sends raw JSON
  },
};

export default async function handler(req, res) {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString("utf8");

    const event = JSON.parse(body);
    console.log("📩 Webhook event received:", event.type);

    switch (event.type) {
      case "membership_activated":
        await supabase.from("profiles").upsert({
          id: event.data.user.id,
          email: event.data.user.email,
          community_id: event.data.company_id,
          whop_user_id: event.data.user.id,
          updated_at: new Date().toISOString()
        });
        break;

      case "membership_deactivated":
        await supabase
          .from("profiles")
          .update({ active: false, updated_at: new Date().toISOString() })
          .eq("whop_user_id", event.data.user.id);
        break;

      default:
        console.log("Unhandled event:", event.type);
    }

    res.status(200).json({ received: true });
  } catch (e) {
    console.error("Webhook error:", e);
    res.status(500).json({ error: e.message });
  }
}
