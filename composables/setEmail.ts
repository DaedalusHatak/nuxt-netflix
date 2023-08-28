export const updateUserSession = async (email: any, step?: boolean) => {
  await $fetch("/api/session", {
    method: "POST",
    body: { email: email, secondStep: step },
  });
  await navigateTo("/confirm");
};
