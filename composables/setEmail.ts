export const updateEmail = async (email: any) => {
  const { session, update } = await useSession();
  await update({ email: email });
  await navigateTo("/confirm");
};
