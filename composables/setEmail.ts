export const updateEmail = async (email: any) => {
 await $fetch('/api/session',{method:"POST",body:{email:email}})
  await navigateTo("/confirm");
};
