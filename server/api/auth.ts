export default defineEventHandler(async (event) => {
  const { scrfToken, idToken } = await readBody(event);
  if (!idToken) {
    deleteCookie(event, "__token");
  } else {
    setCookie(event, "session", idToken);
  }

  return true;
});
