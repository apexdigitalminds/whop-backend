import crypto from "crypto";
import { supabase } from "../_supabase.js";

export const config = {
  api: {
    bodyParser: false, // Required: we need the raw body for signature verification
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Collect raw request body
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const rawBody = Buffer.concat(chunks);
    const bodyString = rawBody.toString("utf8");

    // Validate webhook secret and signature
    const whopSecret = process.env.WHOP_WEBHOOK_SECRET;
    const receivedSig = req.headers["whop-signature"];
    if (!whopSecret || !receivedSig) {
      return res.status(400).json({ error: "Missing signature or secret" });
    }

    const expectedSig = crypto
      .createHmac("sha256", whopSecret)
      .update(bodyString)
      .digest("hex");

    if (expectedSig !== receivedSig) {
      console.warn("❌ Invalid webhook signature");
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Parse JSON payload
    let event;
    try {
      event = JSON.parse(bodyString);
    } catch (e) {
      console.error("❌ Invalid JSON body", e);
      return res.status(400).json({ error: "Invalid JSON" });
    }

    const type = event?.type || "unknown";
    console.log("✅ Verified webhook:", type);

    // --- Handle Whop events ---
    switch (type) {
      case "membership_activated": {
        const m = event.data;
        console.log("💡 Membership activated:", m.user?.email || m.user?.id);
        await supabase.from("profiles").upsert(
          {
            whop_user_id: m.user?.id,
            email: m.user?.email || null,
            username: m.user?.username || m.user?.name || "Member",
            active: true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "whop_user_id" }
        );
        break;
      }

      case "membership_deactivated": {
        const m = event.data;
        console.log("🚪 Membership deactivated:", m.user?.email || m.user?.id);
        await supabase
          .from("profiles")
          .update({
            active: false,
            updated_at: new Date().toISOString(),
          })
          .eq("whop_user_id", m.user?.id);
        break;
      }

      case "payment_succeeded": {
        const p = event.data;
        console.log("💰 Payment succeeded:", p.user?.email || p.user?.id);
        // Optionally record in Supabase or log analytics
        break;
      }

      case "payment_failed": {
        const p = event.data;
        console.log("⚠️ Payment failed:", p.user?.email || p.user?.id);
        // Optionally record failed payment attempts
        break;
      }

      default:
        console.log("📦 Unhandled event type:", type);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}
