export default defineNuxtRouteMiddleware((to, from) => {
  const supabase = useSupabaseUser();
  if (supabase.value?.email && to.path === "/") {
    return navigateTo("/browse", { replace: true });
  } else if (supabase.value?.email && to.path === "/login") {
    return navigateTo("/browse", { replace: true });
  } else if (!supabase.value?.email && to.path === "/browse") {
    return navigateTo("/login", { replace: true });
  }
});
