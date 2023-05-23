import { defineStore } from 'pinia'
export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false)
  function setAuthenticated(a:any) {
    isAuthenticated.value = a
  }
  return { isAuthenticated, setAuthenticated }
},
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: 'strict'
      }),
    }
  }
)