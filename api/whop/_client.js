import Whop from "@whop/sdk";
import "cross-fetch/polyfill";

export function createWhopClient() {
  if (!process.env.WHOP_API_KEY || !process.env.WHOP_APP_ID) {
    throw new Error("Missing WHOP_API_KEY or WHOP_APP_ID");
  }
  return new Whop({
    appID: process.env.WHOP_APP_ID,
    apiKey: process.env.WHOP_API_KEY,
  });
}
