import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';

export const createUser = async (email: string, password: string) => {
	const auth = getAuth();
	const credentials = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	navigateTo('/browse');
	return credentials;
};
export const signIn = async (email: string, password: string) => {
	const auth = getAuth();
	const credentials = await signInWithEmailAndPassword(auth, email, password);

	navigateTo('/browse');
	return credentials;
};

export const initUser =  () => {
	const auth = getAuth();

	const scrfToken = useCookie('token');
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			const tok = await user.getIdToken();
			let response;
	
			if (scrfToken.value === tok) {
				await useFetch('/api/keepLogged', {
					method: 'POST',
					body: { token: scrfToken, isToken: true },
				})
     
			} else {
        console.log('uyser else')
				await useFetch("/api/keepLogged", { method: "POST", body: {token:null,isToken:false } })
       
				
	
			}
		} 
    
    else {
		}
	});
};

export const signOutUser = async () => {
	const auth = getAuth();
	const result = await auth.signOut();
	const authToken = null;
	const scrfToken = useCookie('token');
	await useFetch('/api/auth', { method: 'POST', body: { scrfToken, authToken } });

	navigateTo('/');
	return result;
};
