import {
  cert,
  initializeApp,
  getApps,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { RuntimeConfig } from "nuxt/schema";
const config: RuntimeConfig = useRuntimeConfig();
const firebaseConfig = config.firebaseAdmin as FirebaseServer;

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(firebaseConfig),
    });

export const authAdmin = getAuth(app);
export const firestoreAdmin = getFirestore(app);
