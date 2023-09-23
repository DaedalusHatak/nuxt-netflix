<script setup lang="ts">
  const userProfile = useProfile();
  const firestoreClient = ref({
    avatar: userProfile.value.photoURL
      ? userProfile.value.photoURL
      : "raiden.png",
    email: userProfile.value.email,
    phone: userProfile.value.phoneNumber ? userProfile.value.phoneNumber : "",
  });
  const modal = useModal();
  const phone = usePhone();
  phone.value.number = firestoreClient.value.phone;
</script>

<template>
  <BaseModal
    v-if="modal.show"
    @closeModal="verifyCode"
    :message="modal.message"
  ></BaseModal>
  <InputModal v-if="phone.changePhone" />
  <NavBar
    :isAccount="true"
    :av="firestoreClient"
  ></NavBar>
  <div class="flex-center">
    <AccountDetails />
  </div>
</template>

<style scoped lang="scss">
  .flex-center {
    text-align: center;
    padding: 2rem 1rem;
    display: flex;
    width: 90%;
    margin: 0 auto;
    flex-direction: column;
    overflow: hidden;
  }

  :deep(.change-button) {
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: horizontal-tb !important;
    white-space: nowrap;
    flex: 0 0 auto;
    border: 0px;

    font-size: clamp(0.8rem, 1.5vw, 1rem);
    font-weight: 500;
    height: 100%;
    min-height: 2.5rem;
    max-height: 3.19rem;
    padding: 1.2rem 1rem;
    background: rgb(51, 26, 187, 0.9);
    cursor: pointer;
    color: rgb(255, 255, 255);
    border-radius: 5px;
  }
</style>
