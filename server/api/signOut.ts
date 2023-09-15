import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event: H3Event) => {
  const { idToken } = await readBody(event);
  const auth = getAuth();

  await auth
    .verifySessionCookie(idToken)
    .then((decodedClaims) => {
      deleteCookie(event, "__token");
      auth.revokeRefreshTokens(decodedClaims.sub);
      return true;
    })
    .catch((err) => {
      setResponseStatus(event, 401, "Something went wrong");
    });
  return send(event);
});
