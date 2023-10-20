import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event: H3Event) => {
  const { idToken } = await readBody(event);
  const auth = await getAuth();
  const expiresIn = 60 * 60 * 24 * 14 * 1000;
  const options = { maxAge: expiresIn };
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    setCookie(event, "__token", sessionCookie, options);
    setResponseStatus(event, 200, "OK");
  } catch (err) {
    setResponseStatus(event, 401, "Not authorised");
  }
  return send(event);
});
