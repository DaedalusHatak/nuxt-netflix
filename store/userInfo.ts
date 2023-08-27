import { defineStore } from "pinia";

export const useUserInfo = defineStore("filterStore", () => {
  const userInfo = ref({});

  function getUserInfo(value: any) {
    userInfo.value = value;
  }
  return { getUserInfo, userInfo };
});
