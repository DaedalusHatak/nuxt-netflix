// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const firebaseUser = useFirebaseUser();
// //   console.log("Middleware firebaseUser")
// // console.log(firebaseUser)

// console.log("Middleware value of firebaseUser")
//   console.log(firebaseUser.value)
//   if (firebaseUser.value && to.path === "/") {
//     return navigateTo("/browse");
//   } else if (firebaseUser.value && to.path === "/login") {
//     return navigateTo("/browse");
//   } else if (!firebaseUser.value && to.path === "/browse") {
//     return navigateTo("/login");
//   }
// });
import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const test = useCookie("token");
  console.log("middleware cookie", test.value);
  if (test.value && to.path === "/") {
    return navigateTo("/browse", { replace: true });
  } else if (test.value && to.path === "/login") {
    return navigateTo("/browse", { replace: true });
  } else if (!test.value && to.path === "/browse") {
    return navigateTo("/login", { replace: true });
  }
});
