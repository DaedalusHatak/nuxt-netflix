
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthStore } from "~/stores/auth";

export const createUser = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  navigateTo("/browse");
  return credentials;
};
export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  const authStore = useAuthStore();
  authStore.setAuthenticated(true);
navigateTo('/browse')
  return credentials;
};

export const initUser = async () => {
  const auth = getAuth();
  const firebaseUser = useFirebaseUser();
  // @ts-ignore
  // firebaseUser.value = auth.currentUser;
  // @ts-ignore
  const authStore = useAuthStore();
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      authStore.setAuthenticated(true);
      //@ts-ignore
      firebaseUser.value = user;
      
    } else {

    }

  });

  // @ts-ignore
};
