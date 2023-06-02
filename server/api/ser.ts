import { getAuth } from "firebase-admin/auth";


export default defineEventHandler(async (event) => {
    const test =  getCookie(event,'token')
    console.log(test)
let papa;
    if(test){
        papa = getAuth().verifyIdToken(test).then((work)=>{

        }).catch( ()=>{
         console.log('baba')
     
        })
    }
return true
  });
  
