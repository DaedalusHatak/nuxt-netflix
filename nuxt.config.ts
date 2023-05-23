// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.css", "~/assets/base.css"],
  // plugins: ['~/plugins/firebase.ts'],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],

  runtimeConfig: {
    apiSecret: "",
    apiLink: "",
    imgLink: "",

    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: "",
      },
      apiBase: "/api",
    },
  },
});
