import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";


export default defineEventHandler(async (event: H3Event) => {
  const { cookieID } = await readBody(event);

  let res = false;
  if (cookieID) {
    try {
      const papa = getAuth();
      const verifySession = await papa.verifySessionCookie(cookieID, true);
      const user = await papa.getUser(verifySession.uid);
        papa.updateUser(user.uid, {providersToUnlink:['phone']})
      return user;
    } catch (err) {
    
      res = false;
    }
  }
  return false;
});
