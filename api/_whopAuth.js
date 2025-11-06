// /api/_whopAuth.js
import Whop from "@whop/sdk";

export const whopsdk = new Whop({
  apiKey: process.env.WHOP_API_KEY,
  appID: process.env.WHOP_APP_ID,
});

// Extract Whop user info from iframe request
export async function getAuthedUser(req) {
  const token = req.headers["x-whop-user-token"];
  if (!token) throw new Error("Missing x-whop-user-token");
  const { userId } = await whopsdk.verifyUserToken({
    get(name) {
      return name === "x-whop-user-token" ? token : undefined;
    },
  });
  return { userId };
}

// Check if user has access to resource (experience/company)
export async function requireAccess(resourceId, userId, requiredLevel = "any") {
  const access = await whopsdk.users.checkAccess(resourceId, { id: userId });

  if (!access.has_access) return { ok: false, level: "no_access" };
  if (requiredLevel === "admin" && access.access_level !== "admin")
    return { ok: false, level: access.access_level };
  if (requiredLevel === "customer" && access.access_level !== "customer")
    return { ok: false, level: access.access_level };

  return { ok: true, level: access.access_level };
}
