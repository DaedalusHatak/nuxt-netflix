import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
 
  initUser();
  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);
});