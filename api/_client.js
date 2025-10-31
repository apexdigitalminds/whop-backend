import { WhopAPI } from "@whop/api";
import fetch from "cross-fetch";
import { supabase } from "../_supabase.js";

if (!globalThis.fetch) globalThis.fetch = fetch;

/**
 * Create a Whop API client.
 * If a community access token exists, use that.
 * Otherwise, fall back to the environment API key (admin mode).
 */
export async function createWhopClient(accessToken = null) {
  if (accessToken) {
    return new WhopAPI({
      token: accessToken,
      appId: process.env.WHOP_CLIENT_ID,
    });
  }

  const apiKey = process.env.WHOP_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Whop credentials — provide accessToken or set WHOP_API_KEY");
  }

  return new WhopAPI({ token: apiKey, appId: process.env.WHOP_CLIENT_ID });
}

/**
 * Helper: fetch first connected community token.
 */
export async function getDefaultCommunityToken() {
  const { data, error } = await supabase
    .from("communities")
    .select("id, whop_access_token")
    .not("whop_access_token", "is", null)
    .limit(1)
    .single();

  if (error || !data?.whop_access_token)
    throw new Error("No connected Whop community found in Supabase.");

  return data.whop_access_token;
}
