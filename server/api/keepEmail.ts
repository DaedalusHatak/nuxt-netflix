export default defineEventHandler(async (event:any) => {
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
  