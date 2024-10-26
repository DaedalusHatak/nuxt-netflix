import { cert, getApps, initializeApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";


export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = config.firebaseAdmin as FirebaseServer;

  // Initialize Firebase
  if (getApps().length == 0) {
    const app = initializeApp({ credential: cert(firebaseConfig) });

    const auth: Auth = getAuth();

    // @ts-ignore
  }
});
