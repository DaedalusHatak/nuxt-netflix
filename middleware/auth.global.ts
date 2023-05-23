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
import { useAuthStore } from "~/stores/auth"
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  console.log(authStore.isAuthenticated)
  if (authStore.isAuthenticated && to.path === "/") {
         return navigateTo("/browse", { replace: true });
       } else if (authStore.isAuthenticated && to.path === "/login") {
         return navigateTo("/browse", { replace: true });
       } else if (!authStore.isAuthenticated && to.path === "/browse") {
         return navigateTo("/login", { replace: true });
 
  }
})
