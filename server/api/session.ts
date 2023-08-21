
import { H3Event,useSession,updateSession } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const session = useSession<{email?:string}>(event,{password:'123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123'});
if(event.node.req.method === "POST"){
    const {email} = await readBody(event)
    ;(await session).update({email: email})
}




       




    return (await session).data
})