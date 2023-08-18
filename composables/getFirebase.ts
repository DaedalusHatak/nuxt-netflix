import { Auth } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { Firestore, collection, getDocs } from "firebase/firestore";

export const getStore = async () => {
  const firestore = useState("db").value as Firestore;
  const auth: Auth = useState("auth").value as Auth;
  let test: any;
  if (auth.currentUser && firestore) {
    const querySnapshot = await getDocs(collection(firestore, "avatar"));
    querySnapshot.forEach((doc) => {
      if (doc.id === "users") test = doc.data();
    });

    for (const l in test) {
      if (l === auth.currentUser.uid) {
        return { avatar: test[l], email: auth.currentUser.email };
      }
    }
  }
};

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
