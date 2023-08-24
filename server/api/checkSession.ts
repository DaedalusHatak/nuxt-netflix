import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event: H3Event) => {
  const { test } = await readBody(event);

  let res = false;
  if (test) {
   try{
    const papa = await getAuth().verifySessionCookie(test, true)
    res = true;
   }
   catch(err){
    res = false;
   }
  }
  return res;
});
