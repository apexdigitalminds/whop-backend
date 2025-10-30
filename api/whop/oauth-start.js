export default async function handler(req, res) {
  const redirectUri = process.env.WHOP_REDIRECT_URI;
  const clientId = process.env.WHOP_CLIENT_ID;
  const scope = "member:basic:read payment:basic:read company:basic:read";
  const url =
    `https://whop.com/oauth/authorize?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code&scope=${encodeURIComponent(scope)}`;
  return res.redirect(url);
}
