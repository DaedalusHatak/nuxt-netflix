import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event: H3Event) => {
  const { test } = await readBody(event);
  let papa;
  let res = false;
  if (test) {
    papa = await getAuth()
      .verifySessionCookie(test, true)
      .then((work) => {
        return (res = true);
      })
      .catch((err) => {
        return (res = false);
      });
  }
  return res;
});
