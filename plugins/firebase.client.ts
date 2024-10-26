import {  initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initUser } from "~/composables/useFirebase";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const firebase = config.public.firebase;
  const user = useUser();
  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebase);
  const auth: Auth = getAuth();
  const db = getDatabase(app);
  const firestore = getFirestore(app);
  user.value = auth;
  const applicationVerifier = new RecaptchaVerifier(auth, "recap", {
    size: "invisible",
  });

  useState<RecaptchaVerifier>("captcha", () => applicationVerifier);
  useState("firebaseApp", () => app);

  useState("db", () => db);
});
