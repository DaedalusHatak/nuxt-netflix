// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const firebaseUser = useFirebaseUser();
// //   console.log("Middleware firebaseUser")
// // console.log(firebaseUser)

import { callWithNuxt } from "nuxt/app";

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

export default defineNuxtRouteMiddleware( async (to, from) => {
  if (process.server) return
  if (process.client) return
  const test =  useCookie("token");
  // @ts-ignore
  const app = useNuxtApp()

if(app){
  if (test.value && to.path === "/") {
    return callWithNuxt(app, () => navigateTo('/browse'))
  } else if (test.value && to.path === "/login") {
    return callWithNuxt(app, () => navigateTo('/browse'))
  } else if (!test.value && to.path === "/browse") {
    return callWithNuxt(app, () => navigateTo('/login'))
  }
}
});
