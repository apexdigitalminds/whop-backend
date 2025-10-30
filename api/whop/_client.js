import Whop from "@whop/sdk";
import fetch from "cross-fetch/dist/node-polyfill.js"; // ✅ fixed import for ESM

// Ensure the global fetch API is available (for older Node runtimes)
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

export function createWhopClient() {
  const apiKey = process.env.WHOP_API_KEY;
  const appID = process.env.WHOP_APP_ID;

  if (!apiKey || !appID) {
    throw new Error("Missing required Whop credentials (WHOP_API_KEY or WHOP_APP_ID)");
  }

  return new Whop({
    apiKey,
    appID,
  });
}
