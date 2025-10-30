import Whop from "@whop/sdk";
import fetch from "cross-fetch/dist/node-polyfill.js";
import { supabase } from "../_supabase.js";

// Ensure fetch exists for older Node runtimes
if (!globalThis.fetch) globalThis.fetch = fetch;

/**
 * Create a Whop SDK client.
 * - If a valid accessToken is provided → use per-community OAuth token
 * - Else fall back to environment WHOP_API_KEY for legacy mode
 */
export async function createWhopClient(accessToken = null) {
  // 1️⃣ Use per-community token if available
  if (accessToken) {
    return new Whop({ accessToken });
  }

  // 2️⃣ Otherwise, try to fall back gracefully
  const apiKey = process.env.WHOP_API_KEY;
  const appID = process.env.WHOP_APP_ID;

  if (!apiKey || !appID) {
    throw new Error("Missing Whop credentials. Either provide an OAuth accessToken or set WHOP_API_KEY / WHOP_APP_ID.");
  }

  return new Whop({ apiKey, appID });
}

/**
 * Helper: Retrieve stored access token for the first connected community
 * (used when you don’t explicitly know the community_id yet)
 */
export async function getDefaultCommunityToken() {
  const { data, error } = await supabase
    .from("communities")
    .select("id, whop_access_token")
    .not("whop_access_token", "is", null)
    .limit(1)
    .single();

  if (error || !data?.whop_access_token) {
    throw new Error("No connected Whop community found in Supabase.");
  }

  return data.whop_access_token;
}

