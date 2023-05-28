export default defineEventHandler(async (event) => {
  const { scrfToken, idToken } = await readBody(event);

  const test = await setCookie(event, "token", idToken);
  console.log("server", idToken);
  console.log("token", scrfToken);
  return idToken;
});
