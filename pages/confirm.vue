<script setup lang="ts">
const password = ref();
const email = ref();
onNuxtReady(async () => {
  const { session } = await useSession();
  console.log(session.value);
  email.value = session.value?.email;
});
</script>

<template>
  <div class="centered" autocomplete="off">
    <form @submit.prevent="createUser(email, password)">
      <input autocomplete="off" v-model="email" type="text" />
      <input autocomplete="new-password" v-model="password" type="password" />
      <button>Create user account</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.v-enter-from,
.v-leave-to {
  width: 100;
}
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
.centered {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: max-content;
  justify-content: center;
  min-height: 100vh;
  overflow-y: hidden;
}
</style>
