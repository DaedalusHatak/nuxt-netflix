import { defineStore } from 'pinia'
export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false)
  const userData = ref();
  function setAuthenticated(a:any,b:any) {
    const data = b;
    isAuthenticated.value = a
    if(isAuthenticated.value === true)
    {
      userData.value = data.email;
    }
  }
  return { userData,isAuthenticated, setAuthenticated }
},
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: 'strict'
      }),
    }
  }
)