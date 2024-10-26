export const updateUserSession = async (email: any, step?: boolean) => {
  await useFetch("/api/session", {
    method: "POST",
    body: { email: email, secondStep: step },
  });
  await navigateTo("/confirm");
};
