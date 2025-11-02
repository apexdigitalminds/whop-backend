import crypto from "crypto";
import { supabase } from "../_supabase.js";

export const config = {
  api: {
    bodyParser: false, // Important: raw body for signature validation
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Read raw body
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const rawBody = Buffer.concat(chunks);
    const bodyString = rawBody.toString("utf8");

    // Verify signature
    const whopSecret = process.env.WHOP_WEBHOOK_SECRET;
    const receivedSig = req.headers["whop-signature"];
    if (!receivedSig || !whopSecret) {
      return res.status(400).json({ error: "Missing signature or secret" });
    }

    const expectedSig = crypto
      .createHmac("sha256", whopSecret)
      .update(bodyString)
      .digest("hex");

    if (expectedSig !== receivedSig) {
      console.warn("❌ Invalid signature");
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Parse JSON body
    const event = JSON.parse(bodyString);
    const type = event?.type || "unknown";
    console.log("✅ Verified webhook:", type);

    switch (type) {
      case "membership_activated":
        await supabase.from("profiles").upsert({
          whop_user_id: event.data.user.id,
          email: event.data.user.email,
          community_id: event.data.company_id,
          active: true,
          updated_at: new Date().toISOString(),
        });
        break;

      case "membership_deactivated":
        await supabase
          .from("profiles")
          .update({ active: false, updated_at: new Date().toISOString() })
          .eq("whop_user_id", event.data.user.id);
        break;

      case "payment_succeeded":
        console.log("💰 Payment succeeded for:", event.data.user.id);
        break;

      case "payment_failed":
        console.log("⚠️ Payment failed for:", event.data.user.id);
        break;

      default:
        console.log("Unhandled event:", type);
    }

    res.status(200).json({ received: true });
  } catch (e) {
    console.error("Webhook error:", e);
    res.status(500).json({ error: e.message });
  }
}
