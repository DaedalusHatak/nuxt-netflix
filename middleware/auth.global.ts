import { useUserInfo } from "~/store/userInfo";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const test = useCookie("__token");
  const { data } = await useFetch("/api/checkSession", {
    method: "POST",
    body: { test: test.value },
  });
  console.log(data.value);
  const userInfo = useUserInfo();
  userInfo.getUserInfo(data.value);
  if (data.value) {
    if (to.path === "/YourAccount") {
      return;
    } else if (to.path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (!data.value && to.path === "/browse") {
    return navigateTo("/login");
  }
});
