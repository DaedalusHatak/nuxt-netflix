import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendSignInLinkToEmail,
} from "firebase/auth";

export const createUser = async (email: string) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/",
    handleCodeInApp: true,
  };
  const auth = getAuth();
  sendSignInLinkToEmail(auth, email, actionCodeSettings);
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
