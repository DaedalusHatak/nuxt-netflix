import { FirebaseError } from "firebase/app";
import {
  Auth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  updateCurrentUser,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { Firestore, collection, getDocs } from "firebase/firestore";

export const getStore = async (photo: any) => {
  const auth = getAuth();

  await updateProfile(auth.currentUser!, { photoURL: photo });
};

export const createUser = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const createuser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await $fetch("/api/session", { method: "POST", body: { email: "" } });
  } catch (err) {
    if (err instanceof FirebaseError) {
      return err.message;
    }
  }
};
export const updateUser = async (pass: string) => {
  const auth = getAuth();
  updatePassword(auth.currentUser!, pass);
  navigateTo("/browse");
};
export const updatPhone = async (verificationCode: any) => {
  
};
export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(auth, email, password);

  return credentials;
};

export const signOutUser = async () => {
  const auth = getAuth();
  const idToken = useCookie("__token");
  await useFetch("/api/signOut", {
    method: "POST",
    body: { idToken },
  });
  const result = await auth.signOut();
  return result;
};
