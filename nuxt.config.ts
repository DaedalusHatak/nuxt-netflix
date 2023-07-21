
import tsu from 'nuxt-elements'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
app:{head:{
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  title:'Daedalus',
  meta:[{name:'keywords', content:'HTML, CSS, JavaScript, Vue.js, Nuxt.js'},{name:"author",content:'Paweł Kiciński'}],
  htmlAttrs:{lang:'en'}

}},
nitro:{
  compressPublicAssets: true
},
  css: ["~/assets/main.css", "~/assets/base.css"],
  // plugins: ['~/plugins/firebase.ts'],
  modules: ['@nuxt/image'],
  
  dev: true,
  runtimeConfig: {
    apiSecret: "",
    apiLink: "",
    imgLink: "",

    public: {
      firebaseAdmin: {
        projectId: process.env.FIREBASE_SA_PROJECT_ID,

        privateKey: process.env.FIREBASE_PRIVATE_SA_KEY
          ? process.env.FIREBASE_PRIVATE_SA_KEY.replace(/\\n/gm, "\n")
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
