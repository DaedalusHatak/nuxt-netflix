// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.css", "~/assets/base.css"],
  // plugins: ['~/plugins/firebase.ts'],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
dev:true,
  runtimeConfig: {
    apiSecret: "",
    apiLink: "",
    imgLink: "",

    public: {
      firebaseAdmin: {
        projectId: process.env.FIREBASE_SA_PROJECT_ID,

        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
          : undefined,
        clientEmail: process.env.FIREBASE_SA_CLIENT_EMAIL,

        
      },
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
