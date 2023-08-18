
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { RuntimeConfig } from 'nuxt/schema';
import { FirebaseClient } from '../types';
import { getFirestore } from "firebase/firestore";
export default defineNuxtPlugin(async (nuxtApp) => {
	const config: RuntimeConfig = useRuntimeConfig();
	const firebaseConfig: FirebaseClient = {
		apiKey: config.public.firebase.apiKey,
	};
	const firebase = config.public.firebase
	// Initialize Firebase
	const app: FirebaseApp = initializeApp(firebase);
	const db = getFirestore(app)
	const auth: Auth = getAuth();

	// await initUser();
	nuxtApp.provide('db', db);
	nuxtApp.vueApp.provide('db', db)
	nuxtApp.vueApp.provide('auth', auth);
	nuxtApp.provide('auth', auth);
});
