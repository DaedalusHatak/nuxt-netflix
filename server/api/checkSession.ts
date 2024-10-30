import type { H3Event } from "h3";
import { authAdmin } from "../utils/utils";

export default defineEventHandler(async (event: H3Event) => {
  const { cookieID } = await readBody(event);
  if (cookieID) {
    try {
      const auth = authAdmin;
      const verifySession = await auth.verifySessionCookie(cookieID, true);
      const user = await auth.getUser(verifySession.uid);
      return user;
    } catch (err) {
      return false;
    }
  }
  else return false

});
