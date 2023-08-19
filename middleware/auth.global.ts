export default defineNuxtRouteMiddleware(async (to, from) => {
  const test = useCookie("__token");
  let session: boolean = false;
  await $fetch("/api/checkSession", {
    method: "POST",
    body: { test: test.value },
  }).then((isSession) => {
    session = isSession;

    return session;
  });
  if (session) {
    if (to.path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (!session && to.path === "/browse") {
    return navigateTo("/login");
  }
});
