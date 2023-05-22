export default defineNuxtRouteMiddleware((to, from) => {
  const firebaseUser = useFirebaseUser();
  console.log(firebaseUser.value);
  if (firebaseUser.value && to.path === "/") {
    return navigateTo("/browse");
  } else if (firebaseUser.value && to.path === "/login") {
    return navigateTo("/browse");
  } else if (!firebaseUser.value && to.path === "/browse") {
    return navigateTo("/login");
  }
});
