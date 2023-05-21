<template>
  <MovieCard :data="data"> </MovieCard>
</template>
<script setup lang="ts">
const { data } = await useFetch("/api/getData");
</script>
