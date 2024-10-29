// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Daedalus",
      script:[{
        src:" https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1227600212000715",
        async:true,
        crossorigin:'anonymous'
      }],
      meta: [
        { name: "keywords", content: "HTML, CSS, JavaScript, Vue.js, Nuxt.js" },
        { name: "author", content: "Paweł Kiciński" },
      ],
      htmlAttrs: { lang: "en" },
    },
  },
vite:{
  css:{
    preprocessorOptions:{
      scss:{
        api: 'modern-compiler'
      }
    }
  }
},
  nitro: {
    compressPublicAssets: true,
  },

  modules: ["@nuxt/image",  '@vueuse/nuxt',],

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
        databaseURL: process.env.FIREBASE_DATABASE,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
      apiBase: "/api",
    },
  },

  compatibilityDate: "2024-10-26",
});