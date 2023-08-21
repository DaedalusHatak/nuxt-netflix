
import { H3Event,useSession,SessionConfig } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const {email} = await readBody(event);
    const session = await useSession(event,email)
return session
})