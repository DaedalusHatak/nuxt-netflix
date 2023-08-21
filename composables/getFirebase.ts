import { Auth, updatePassword, updateProfile } from "firebase/auth";
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
  updateProfile(auth.currentUser!, { photoURL: photo });
};

export const createUser = async (email: string, password: string) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);
  await $fetch('/api/session',{method:"POST", body:{email:''}})
  await navigateTo("/login");
};
export const updateUser = async (pass: string) => {
  const auth = getAuth();
  updatePassword(auth.currentUser!, pass);
  navigateTo("/browse");
};
export const signIn = async (email: string, password: string) => {
  console.log("signIn");
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((err) => {
    alert("Check your data!");
    return err;
  });
  return credentials;
};

export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();

  const idToken = useCookie("__token");
  await useFetch("/api/signOut", {
    method: "POST",
    body: { idToken },
  });

  navigateTo("/");
  return result;
};
