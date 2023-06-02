
import { getAuth } from "firebase-admin/auth";
import { callWithNuxt } from "nuxt/app";


export default defineNuxtRouteMiddleware(async (to, from) => {
const test =  useCookie("token");

let papa;
const isAuthorised = ref();

   if(test.value){
await $fetch('/api/ser').then((set)=>{
  return papa =  set;
})
   }

if(papa){
  console.log('if')
  if(to.path !== "/browse"){
    console.log('if if ')
    return navigateTo('/browse')}
  
  
}
else if(!papa && to.path === "/browse"){
  console.log('else')
  return navigateTo('/login')
}





});
