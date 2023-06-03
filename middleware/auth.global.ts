export default defineNuxtRouteMiddleware(async (to, from) => {
  const test = useCookie("__token");
  let firebase;
  await $fetch("/api/ser", { method: "POST", body: { test: test.value } }).then(
    (set) => {
      firebase = set;
      return firebase;
    }
  );
  if (firebase) {
    if (to.path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (!firebase && to.path === "/browse") {
    return navigateTo("/login");
  }
});
