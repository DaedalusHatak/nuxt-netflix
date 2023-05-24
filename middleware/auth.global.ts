
export default defineNuxtRouteMiddleware((to, from) => {
    const supabase = useSupabaseUser();
   
  console.log( supabase.value)
  if ( supabase.value && to.path === "/") {
         return navigateTo("/browse", { replace: true });
       } else if ( supabase.value && to.path === "/login") {
         return navigateTo("/browse", { replace: true });
       } else if (! supabase.value && to.path === "/browse") {
         return navigateTo("/login", { replace: true });
 
  }
})