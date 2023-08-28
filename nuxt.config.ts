// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Daedalus",
      meta: [
        { name: "keywords", content: "HTML, CSS, JavaScript, Vue.js, Nuxt.js" },
        { name: "author", content: "Paweł Kiciński" },
      ],
      htmlAttrs: { lang: "en" },
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  modules: ["@nuxt/image"],
  routeRules: {
    "/": { prerender: true },
  },
  css: ["~/assets/main.css", "~/assets/base.css"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  dev: true,
  runtimeConfig: {
    apiSecret: "",
    apiLink: "",
    apierLink: "wert",
    imgLink: "",
    firebaseAdmin: {
      projectId: process.env.FIREBASE_SA_PROJECT_ID,

      privateKey: process.env.FIREBASE_PRIVATE_SA_KEY
        ? process.env.FIREBASE_PRIVATE_SA_KEY.replace(/\\n/gm, "\n")
        : undefined,
      clientEmail: process.env.FIREBASE_SA_CLIENT_EMAIL,
    },
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
      apiBase: "/api",
    },
  },
});
