
export default defineNuxtRouteMiddleware(async (to, from) => {

try{
  const cookie = useCookie("__token");

  const { data } = await useFetch<UserProfile>("/api/checkSession", {
    method: "POST",
    body: { cookieID: cookie },
  timeout:120000
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
