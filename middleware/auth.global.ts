import { APISession } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("__token");
  const { data } = await useFetch<APISession>("/api/checkSession", {
    method: "POST",
    body: { cookieID: cookie },
  });

  const userInfo = useProfile();
  if (data.value && cookie.value) {
    userInfo.value = data.value;
    if (to.path === "/YourAccount") {
      return;
    } else if (to.path === "/posts") {
      return;
    } else if (to.matched[0].path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (
    !data.value &&
    to.path !== "/" &&
    to.path !== "/confirm" &&
    to.path !== "/login"
  ) {
    return navigateTo("/login");
  }
});
