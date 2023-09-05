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
        papa.updateUser(user.uid, {providersToUnlink:['phone']})
      return user;
    } catch (err) {
        console.log(err)
      res = false;
    }
  }
  return false;
});
