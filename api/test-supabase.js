import { supabase } from "./_supabase.js";

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.from("profiles").select("*").limit(1);
    if (error) throw error;

    res.status(200).json({
      message: "✅ Supabase connection successful!",
      sample: data,
    });
  } catch (e) {
    console.error("Supabase test error:", e);
    res.status(500).json({
      message: "❌ Failed to connect to Supabase",
      error: e.message,
    });
  }
}

