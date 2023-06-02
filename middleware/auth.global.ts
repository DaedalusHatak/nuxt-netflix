
import { getAuth } from "firebase-admin/auth";
import { callWithNuxt } from "nuxt/app";


export default defineNuxtRouteMiddleware(async (to, from) => {
const test =  useCookie("token");

let papa;

   if(test.value){
await $fetch('/api/ser',{method:'POST',body:{test:test.value}}).then((set)=>{
  return papa =  set;
})
if(papa){

  if(to.path !== "/browse"){
    
    return navigateTo('/browse')}
  
  
}
else if(!papa && to.path === "/browse"){
 
  return navigateTo('/login')
}
   }







});
