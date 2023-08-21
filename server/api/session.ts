
import { H3Event,useSession,updateSession } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const {email} = await readBody(event);
    let session;

    if(email){
       
        session = await updateSession(event,{password:''},{email:email})
        console.log('if',session)

    }
    else{
        session = await useSession(event,{password:''})
        console.log('else',session)
        
    }
    return true
})