<script setup lang="ts">
  const userProfile = await useProfile();

  const imgs = import.meta.glob("@/public/*.webp");
  const newProfilePicture = ref<string[]>([]);

  for (const img in imgs) {
    newProfilePicture.value.push(img.replace("/public/", ""));
  }

  const firestoreClient = ref({
    avatar: userProfile.value.photoURL
      ? userProfile.value.photoURL
      : "raiden.png",
    email: userProfile.value.email,
    phone: userProfile.value.phoneNumber ? userProfile.value.phoneNumber : "",
  });
  //Updates user profile photo
  async function updatePhoto(photo: string) {
    firestoreClient.value.avatar = photo;
    await updatePicture(photo);
  }
</script>

<template>
  <div class="change-pictures">
    <img
      v-for="picture in newProfilePicture"
      :class="firestoreClient.avatar === picture ? 'selected' : ''"
      :src="picture"
      @click="firestoreClient.avatar = picture"
      @keydown.space.exact.prevent="firestoreClient.avatar = picture"
      @keydown.enter.exact.prevent="firestoreClient.avatar = picture"
      class="profile-pictures"
      alt=""
      tabindex="0"
    />
  </div>
  <div class="change-pictures">
    <button
      @click="updatePhoto(firestoreClient.avatar)"
      class="profile-button"
    >
      Save changes
    </button>
  </div>
</template>

<style scoped lang="scss">
  .change-pictures {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(82px, 1fr));
    gap: 10px;
    max-width: 600px;
    margin-inline: auto;
    margin-top: 20px;
    justify-content: center;
    justify-items: center;
  }
  .profile-pictures {
    background-color: #5555554d;
    cursor: pointer;

    border-radius: 5px;
    max-height: 82px;
  }
  .selected {
    border: 1px solid #ffffff;
  }
  .profile-button {
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: horizontal-tb !important;
    white-space: nowrap;
    flex: 0 0 auto;
    border: 0px;
    max-width: 200px;
    justify-self: center;
    font-size: 1.2rem;
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
