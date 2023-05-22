import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: "AIzaSyAjZ54XXWBxz34QBgyQTGGP2T3HkXfV5ds",
    authDomain: "nuxt-netflix.firebaseapp.com",
    projectId: "nuxt-netflix",
    storageBucket: "nuxt-netflix.appspot.com",
    messagingSenderId: "937997712218",
    appId: "1:937997712218:web:c1a85e144dceea64405163",
    measurementId: "G-G7DYDSJV2E",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  console.log(auth.currentUser);
  initUser();
  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);
});
