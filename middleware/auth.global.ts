import { userInfo } from "os";
interface APISession {
  photoURL: string,
  email: string,
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const test = useCookie("__token");
  const { data } = await useFetch<APISession>("/api/checkSession", {
    method: "POST",
    body: { test: test.value },
  });
  const userInfo = useProfile()
if(data.value){
  userInfo.value = {photo: data.value!.photoURL, email: data.value!.email};
}
  if (data.value) {
    if (to.path === "/YourAccount") {
      return;
    } else if (!to.path.startsWith("/browse")) {
      return navigateTo("/browse");
    }
  } else if (!data.value && to.path.startsWith("/browse")) {
    return navigateTo("/login");
  }
});
