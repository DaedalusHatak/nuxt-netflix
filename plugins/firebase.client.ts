import { auth } from 'firebase-admin';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { RuntimeConfig } from 'nuxt/schema';
import { FirebaseClient } from 'types';
export default defineNuxtPlugin(async (nuxtApp) => {
	const config: RuntimeConfig = useRuntimeConfig();
	const firebaseConfig: FirebaseClient = {
		apiKey: config.public.firebase.apiKey,
	};
	// Initialize Firebase
	const app: FirebaseApp = initializeApp(firebaseConfig);
	const auth: Auth = getAuth();

	// await initUser();

	nuxtApp.vueApp.provide('auth', auth);
	nuxtApp.provide('auth', auth);
});
