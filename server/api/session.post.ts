import { H3Event, useSession } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const { email, secondStep, token, profile } = await readBody(event);

  const session = await useSession<{
    email?: string;
    secondStep: boolean;
    __token: string;
    profile?: string;
  }>(event, {
    password:
      "123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",
  });

  await session.update({
    email: email,
    secondStep: secondStep,
    __token: token,
    profile: profile,
  });
  return session.data;
});
