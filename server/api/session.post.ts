
import { H3Event,useSession } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const {email,secondStep} = await readBody(event)

    const session = await useSession<{email?:string, secondStep: boolean}>(event,{password:"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123"});


    await session.update({email: email,secondStep:secondStep})
    return session.data





       





})