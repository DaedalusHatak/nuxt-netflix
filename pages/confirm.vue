<script setup lang="ts">
useHead({
  bodyAttrs: {class:'white'}
})
let runtime: any;
onNuxtReady(() => {
  runtime = useRuntimeConfig();
});
const isModal = ref<string>();
const { data } = await useFetch("/api/session");
const secondStep = ref(data.value?.secondStep);
function updatePage() {
  updateUserSession(data.value?.email, true);
  secondStep.value = true;
}
function showModal(e: any) {
  if (e) {
    isModal.value = e;
  } else {
    isModal.value = "success";
  }
}
async function closeModal(e: any) {
  if (e) {
    navigateTo("/login");
  } else {
    isModal.value = e;
  }
}
</script>

<template>
  <BaseModal
    v-if="isModal"
    @closeModal="closeModal"
    :message="isModal"
  ></BaseModal>

    <NavBarRegistration> </NavBarRegistration>
    <p v-if="runtime">{{ runtime.apierLink }}</p>
    <div class="centered">
      <FirstStep v-if="secondStep" @showModal="showModal" :data="data?.email" />
      <div class="register-info" v-else>
        <h2>Finish setting up your account</h2>
        <p>Daedalus is personalized for you.</p>
        <p>Create a password to start watching Daedalus.</p>
        <button @click="updatePage">Next</button>
      </div>

  </div>
</template>

<style scoped>
h2 {
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.75rem;
  margin-bottom: 15px;
  color: black;
}
p {
  font-weight: 400;
  margin-bottom: 5px;
  font-size: 19px;
}

.register-info {
  max-width: 420px;
  text-align: center;
}
.centered {
  display: flex;
  flex-direction: column;
  width: max-content;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: calc(100dvh - 6rem);
  width: 100%;
  flex: 1;
  overflow-y: hidden;
}
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  writing-mode: horizontal-tb !important;
  width: 100%;
  margin-top: 1rem;
  flex: 0 0 auto;
  border: 0px;

  font-size: 1.5rem;
  font-weight: 400;
  min-height: 3.5rem;
  padding: 0.75rem 1.5rem;
  background: rgb(51, 26, 187, 0.9);
  cursor: pointer;
  color: rgb(255, 255, 255);
  border-radius: 5px;
}
</style>
