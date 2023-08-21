
import { H3Event,useSession } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const {email} = await readBody(event)

    const session = await useSession<{email?:string}>(event,{password:"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123"});


    await session.update({email: email})
    return session.data





       





})