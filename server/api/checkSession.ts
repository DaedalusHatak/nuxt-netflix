import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";


export default defineEventHandler(async (event: H3Event) => {
  const { test } = await readBody(event);

  let res = false;
  if (test) {
    try {
      const papa = getAuth();
      const verifySession = await papa.verifySessionCookie(test, true);
      const user = await papa.getUser(verifySession.uid);

      return user;
    } catch (err) {
      res = false;
    }
  }
  return false;
});
