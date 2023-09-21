import { FirebaseError } from "firebase/app";
import {
  updatePassword,
  updateProfile,
} from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


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

export const initUser = async () => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      const phone = user.phoneNumber;
      const prov = user.providerData;
      return prov;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};

export const updateUser = async (pass: string) => {
  const auth = getAuth();
  updatePassword(auth.currentUser!, pass);
  navigateTo("/browse");
};

export const updatePicture = async (photo: any) => {
  const auth = getAuth();
  const userProfile = useProfile();
  userProfile.value.photoURL = photo;
  await updateProfile(auth.currentUser!, { photoURL: photo });
};


export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(auth, email, password);

  return credentials;
};

export const signOutUser = async () => {
  const auth = getAuth();
  const idToken = useCookie("__token");
  await signOut(auth)
  const { data } = await useFetch("/api/signOut", {
    method: "POST",
    body: { idToken },
  });
  return data.value;
};
