<script setup lang="ts">
import { UserProfile } from "~/types";

const isTryingToDelete = ref<boolean>(false);

const userProfile = await useProfile();
const firestoreClient = ref<UserProfile>({
  photoURL: userProfile.value.photoURL
    ? userProfile.value.photoURL
    : "raiden.png",
  email: userProfile.value.email,
  phoneNumber: userProfile.value.phoneNumber
    ? userProfile.value.phoneNumber
    : "",
});
</script>

<template>
  <BaseModal
    v-if="isTryingToDelete"
    @closeModal="isTryingToDelete = false"
    message="You can not delete other users posts!"
  ></BaseModal>
  <NavBar :isAccount="true" :av="firestoreClient"></NavBar>
  <h1>Posts with realtime update</h1>
  <AddPost :firestore-client="firestoreClient" />

  <ClientOnly> <ShowPosts /></ClientOnly>
</template>

<style scoped lang="scss">
h1 {
  margin-inline: auto;
  width: 70vw;
  max-width: 700px;
  text-align: center;
  font-size: 1.7rem;
}
</style>
