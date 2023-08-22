
import { H3Event,useSession } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const session = await useSession<{email?:string,secondStep:boolean}>(event,{password:'123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123'});

    return session.data





       





})