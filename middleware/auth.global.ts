
export default defineNuxtRouteMiddleware(async (to, from) => {

try{
  const cookie = useCookie("__token");

if(cookie.value){
  const data = await $fetch<UserProfile | string>("/api/checkSession", {
    method: "POST",
    body: { cookieID: cookie.value },
    cache:'no-store'
  });
   const userInfo = useProfile();
  if (typeof data !== "string" && cookie.value) {
    userInfo.value = data;
    if (to.path === "/YourAccount") {
      return;
    } else if (to.path === "/posts") {
      return;
    } else if (to.matched[0].path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (
  
    to.matched[0].path === "/browse"
  ) {
    await $fetch("/api/signOut", {
      method: "POST",
      body: { idToken:cookie.value },
    });
    return navigateTo("/login");
  }
}
}
catch(err){
  console.log(err)
}

});
