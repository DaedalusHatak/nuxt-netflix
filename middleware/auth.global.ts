export default defineNuxtRouteMiddleware(async (to, from) => {
  const test = useCookie("__token");
  let sessione: boolean = false;
  await $fetch("/api/checkSession", {
    method: "POST",
    body: { test: test.value },
  }).then((isSession) => {
    sessione = isSession;

    return sessione;
  });
  if (sessione) {
    if (to.path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (!sessione && to.path === "/browse") {
    return navigateTo("/login");
  }
});
