// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.css", "~/assets/base.css"],

  runtimeConfig: {
    apiSecret: "",
    apiLink: "",
    imgLink: "",
    public: {
      apiBase: "/api",
    },
  },
});
