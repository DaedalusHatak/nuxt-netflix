<template>
  <div class="flex-center">
    <button @click="signOutUser()">DANG GO BACK FAAAAAST</button>
    <MovieCard class="mov" :data="data"> </MovieCard>
  </div>
</template>
<script setup lang="ts">


const { data } = await useFetch("/api/getData");
// definePageMeta({
//   middleware: "auth",
// });
</script>
<style scoped>
.flex-center {
  text-align: center;
  padding: 2rem 5rem;
  display: flex;
  flex-direction: column;
}
button {
  display: inline-flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  writing-mode: horizontal-tb !important;
  width: 100%;
  max-width: 30rem;
  margin-top: 1rem;
  flex: 0 0 auto;
  border: 0px;
  margin-bottom: 5rem;
  font-size: 1.5rem;
  font-weight: 500;
  min-height: 3.5rem;
  padding: 0.75rem 1.5rem;
  background: rgb(51, 26, 187, 0.9);
  cursor: pointer;
  color: rgb(255, 255, 255);
  border-radius: 1rem;
}
</style>
