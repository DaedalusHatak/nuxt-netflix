export default defineEventHandler(async (event) => {
    const {scrfToken,authToken } = await readBody(event);
    const baba = await setCookie(event,'token',authToken);
    console.log('baba auth')
return true;

  });
  