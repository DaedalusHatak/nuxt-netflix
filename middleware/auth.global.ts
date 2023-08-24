export default defineNuxtRouteMiddleware(async (to, from) => {
  const test = useCookie("__token");

  const session:boolean = await $fetch("/api/checkSession", {
    method: "POST",
    body: { test: test.value },
  })
  if (session) {
    if (to.path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (!session && to.path === "/browse") {
    return navigateTo("/login");
  }
});
