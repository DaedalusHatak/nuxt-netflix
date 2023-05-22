import { log } from "console";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

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

  return credentials;
};
export const initUser = async () => {
  const auth = getAuth();
  const firebaseUser = useFirebaseUser();
  // @ts-ignore
  firebaseUser.value = auth.currentUser;
  // @ts-ignore
  console.log(firebaseUser.value);
  const userCookie = useCookie("userCookie");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //@ts-ignore
      firebaseUser.value = user;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // @ts-ignore
  console.log(firebaseUser);
};
