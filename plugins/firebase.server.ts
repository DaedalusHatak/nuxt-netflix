import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";


export default defineNuxtPlugin(async(nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = config.public.firebaseAdmin;
  
  // Initialize Firebase
  if(getApps().length == 0){
    const app =  initializeApp({credential: cert(firebaseConfig)});
    console.log('server firebase')
      const auth =   getAuth();
      const token =  useCookie('token')
       // @ts-ignore
  
      if(token.value){
        const dupa =  auth.verifyIdToken(token.value)
      }
      else{
       
       
      }
  }
 

});
