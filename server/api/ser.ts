import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
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
        console.log(err);
        return (res = false);
      });
  }
  return res;
});
