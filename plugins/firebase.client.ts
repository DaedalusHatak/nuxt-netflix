import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { RuntimeConfig } from "nuxt/schema";
import { FirebaseClient } from "../types";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config: RuntimeConfig = useRuntimeConfig();
  const firebase = config.public.firebase;
  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebase);
  const auth: Auth = getAuth();
  const db = getFirestore(app);

  useState("firebaseApp", () => app);
  useState("auth", () => auth);
  useState("db", () => db);
});
