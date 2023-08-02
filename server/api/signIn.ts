import type { H3Event } from 'h3'
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event:H3Event) => {
  const { idToken, csrfToken } = await readBody(event);
  const auth = getAuth();
  const expiresIn = 60 * 60 * 24 * 14 * 1000;

  await auth
    .createSessionCookie(idToken, { expiresIn })
    .then((sessionCookie) => {
      const options = { maxAge: expiresIn };
      setCookie(event, "__token", sessionCookie, options);
      setResponseStatus(event, 200, "OK");
    })
    .catch((err) => {
      console.log(err);
      setResponseStatus(event, 401, "Not authorised");
    });
  return send(event);
});
