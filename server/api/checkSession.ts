import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event: H3Event) => {
  const { test } = await readBody(event);

  let res = false;
  if (test) {
    try {
      const auth = getAuth();
      const verifySession = await auth.verifySessionCookie(test, true);
      const user = await auth.getUser(verifySession.uid);
      return user;
    } catch (err) {
      res = false;
    }
  }
  return false;
});
