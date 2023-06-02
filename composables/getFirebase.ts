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
     url: 'http://localhost:3000/',
  handleCodeInApp: true
       }
  const auth = getAuth();
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
  localStorage.setItem('emailForSignIn', email)


};
export const signIn = async (email: string, password: string) => {
  console.log('signIn')
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  navigateTo('/browse')
  return credentials;
};

export const initUser = async () => {
  const auth = getAuth();
  const scrfToken = useCookie("token");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const tok = await user.getIdToken();
      let response;

      if (scrfToken.value === tok) {
        await useFetch("/api/keepLogged", {
          method: "POST",
          body: { token: scrfToken, isToken: true },
        });
      } else {
        console.log("uyser else");
        await useFetch("/api/keepLogged", {
          method: "POST",
          body: { token: null, isToken: false },
        });
        const router = useRoute();
        console.log(router.path);
        if (router.path === "/browse" && !scrfToken.value) {
          navigateTo("/login");
        }
      }
    } else {
    }
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  const authToken = null;
  const scrfToken = useCookie("token");
  await useFetch("/api/auth", {
    method: "POST",
    body: { scrfToken, authToken },
  });

  navigateTo("/");
  return result;
};
