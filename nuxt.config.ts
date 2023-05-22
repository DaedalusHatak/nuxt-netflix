// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.css", "~/assets/base.css"],
  plugins: ["~/plugins/firebase.ts"],
  runtimeConfig: {
    apiSecret: "",
    apiLink: "",
    imgLink: "",
    public: {
      firebase: {
        apiKey: "",
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
