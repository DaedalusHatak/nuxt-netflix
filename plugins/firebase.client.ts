import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { RuntimeConfig } from "nuxt/schema";
import { FirebaseClient } from "~/types";
import { getFirestore } from "firebase/firestore";
import { initUser } from "~/composables/getFirebase";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config: RuntimeConfig = useRuntimeConfig();
  const firebase = config.public.firebase;
  const user = useUser();
  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebase);
  const auth: Auth = getAuth();
  const db = getFirestore(app);
  await initUser();
  user.value = auth;

  useState("firebaseApp", () => app);

  useState("db", () => db);
});
