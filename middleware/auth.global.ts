

export default defineNuxtRouteMiddleware(async (to, from) => {


const test =  useCookie("token");

let papa;

  
await $fetch('/api/ser',{method:'POST',body:{test:test.value}}).then((set)=>{
  console.log('fetch')
  return papa =  set;
})
if(papa){

  if(to.path !== "/browse"){
    
    return navigateTo('/browse')}
  
  
}
else if(!papa && to.path === "/browse"){
 
  return navigateTo('/login')
}
 







});
