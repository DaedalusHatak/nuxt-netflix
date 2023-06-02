import { getAuth } from "firebase-admin/auth";


export default defineEventHandler(async (event) => {
    const test =  getCookie(event,'token')
    console.log(test)
let papa;
let res = false;
    if(test){
        papa = getAuth().verifyIdToken(test).then((work)=>{
            return res = true;
        }).catch( ()=>{
         console.log('baba')
            return res = false;
        })
    }
return res
  });
  
