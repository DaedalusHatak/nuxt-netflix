import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, RecaptchaVerifier, getAuth } from "firebase/auth";
import { RuntimeConfig } from "nuxt/schema";
import { FirebaseClient } from "~/types";
import { getDatabase } from "firebase/database";
import { initUser } from "~/composables/getFirebase";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config: RuntimeConfig = useRuntimeConfig();
  const firebase = config.public.firebase;
  const fireData = config.public.fireDatabase
  const user = useUser();
  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebase);
  const auth: Auth = getAuth();
  const db = getDatabase(app);
  user.value = auth;
  console.log(auth);
  const applicationVerifier = new RecaptchaVerifier(auth, "recap", {
    size: "invisible",
  });
  await initUser();
  useState<RecaptchaVerifier>("captcha", () => applicationVerifier);
  useState("firebaseApp", () => app);

  useState("db", () => db);
});
