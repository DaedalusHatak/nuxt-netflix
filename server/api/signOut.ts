import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event: H3Event) => {
  const { idToken } = await readBody(event);
  const auth = getAuth();

  try {
    const verifySession = await auth.verifySessionCookie(idToken, true);
    const revokeToken = await auth.revokeRefreshTokens(verifySession.uid);

    deleteCookie(event, "__token");
    return true;
  } catch (err) {
    return false;
  }
});
