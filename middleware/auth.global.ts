interface APISession {
  photoURL: string;
  email: string;
  providerData: ProviderData[]
}interface ProviderData {
	displayName: string | null;
	email: string | null;
	phoneNumber: string | null;
	photoURL: string | null;
	providerId: string;
	uid: string;
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const test = useCookie("__token");

  const { data } = await useFetch<APISession>("/api/checkSession", {
    method: "POST",
    body: { test: test.value },
  });
  const userInfo = useProfile();
  if (data.value) {
    userInfo.value = data.value
  }
  if (data.value) {
    if (to.path === "/YourAccount") {
      return;
    } else if (to.matched[0].path !== "/browse") {
      return navigateTo("/browse");
    }
  } else if (!data.value && to.path !== "/" && to.path !== "/confirm" && to.path !== "/posts" && to.path !== "/login") {
    return navigateTo("/login");
  }
});
