export const updateUserSession = async (email: any, step?: boolean) => {
  console.log("ss", email);
  await $fetch("/api/session", {
    method: "POST",
    body: { email: email, secondStep: step },
  });
  await navigateTo("/confirm");
};
