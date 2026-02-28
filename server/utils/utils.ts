import {
  cert,
  initializeApp,
  getApps,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { RuntimeConfig } from "nuxt/schema";
import type { ServiceAccount } from "firebase-admin";
const config: RuntimeConfig = useRuntimeConfig();
const firebaseConfig = {
  projectId: config.firebaseAdmin.projectId,
  clientEmail: config.firebaseAdmin.clientEmail,
  privateKey: config.firebaseAdmin.privateKey?.replace(/\\n/g, "\n"),
};
const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(firebaseConfig),
    });

export const authAdmin = getAuth(app);
export const firestoreAdmin = getFirestore(app!);

