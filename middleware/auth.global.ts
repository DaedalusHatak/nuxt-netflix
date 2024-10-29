
export default defineNuxtRouteMiddleware(async (to, from) => {

try{
  const cookie = useCookie("__token");

  const data = await $fetch<UserProfile>("/api/checkSession", {
    method: "POST",
    body: { cookieID: cookie.value },
    cache:'no-store'
  });

  const userInfo = useProfile();
  if (data && cookie.value) {
    userInfo.value = data;
    if (to.path === "/YourAccount") {
      return;
    } else if (to.path === "/posts") {
      return;
    } else if (to.matched[0].path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (
    !data &&
    to.path !== "/" &&
    to.path !== "/confirm" &&
    to.path !== "/login" &&
    to.path !== "/test"
  ) {
    return navigateTo("/login");
  }
}
catch(err){
  console.log(err)
}


});
