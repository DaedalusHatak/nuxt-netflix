<script setup lang="ts">
const password = ref();
const email = ref();
const {data} = await useFetch('/api/session')
if(data.value?.email){
    email.value = data.value.email
  }
</script>

<template>
  <NavBarRegistration>

  </NavBarRegistration>
  <div class="centered" >
    <form @submit.prevent="createUser(email, password)">
      <input autocomplete="email" v-model="email" type="text" />
      <input autocomplete="new-password" v-model="password" type="password" />
      <button>Create user account</button>
    </form>
  </div>
</template>

<style scoped:  !important;>
main {
  background-color: white;
  color: white;
}

.centered {
margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: max-content;
  justify-content: center;
  min-height: 100dvh;
  overflow-y: hidden;
  
}
</style>
