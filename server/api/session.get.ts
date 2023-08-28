import { H3Event, useSession } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const session = await useSession<{
    email?: string;
    secondStep: boolean;
    __token: string;
    profile?: string;
  }>(event, {
    password:
      "123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",
  });

  return session.data;
});
