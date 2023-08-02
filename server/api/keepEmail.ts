import type { H3Event } from 'h3'

export default defineEventHandler(async (event:H3Event) => {
    const {email,isToken } = await readBody(event);
    const cookieOptions = {

        expires: new Date(Date.now() + 1 * 1000)
    }
   if(isToken){
    const baba = await setCookie(event,'signUp',email,cookieOptions);

   }
   else{
    console.log("else token")
    const baba = await setCookie(event,'signUp',email);
   
   }
   return isToken
  });
  