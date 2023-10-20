import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event: H3Event) => {
  const { cookieID } = await readBody(event);

  let res = false;
  if (cookieID) {
    try {
      const auth = await getAuth();
      const verifySession = await auth.verifySessionCookie(cookieID, true);
      const user = await auth.getUser(verifySession.uid);
      return user;
    } catch (err) {
      return err;
    }
  }
  return false;
});
