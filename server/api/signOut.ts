import type { H3Event } from "h3";
import { authAdmin } from "../utils/utils";

export default defineEventHandler(async (event: H3Event) => {
  const { idToken } = await readBody(event);
  const auth = authAdmin;

  try {
    const verifySession = await auth.verifySessionCookie(idToken, true);
     await auth.revokeRefreshTokens(verifySession.uid);

    deleteCookie(event, "__token");
    return true;
  } catch (err) {
    return false;
  }
});
