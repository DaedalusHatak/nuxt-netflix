export default defineEventHandler(async (event) => {
    const {token,isToken } = await readBody(event);
   if(isToken){
    const baba = await setCookie(event,'token',token);

   }
   else{
    console.log("else token",token)
    const baba = await setCookie(event,'token',token);
   
   }
   return isToken
  });
  