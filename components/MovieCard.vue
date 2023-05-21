<template>
  <div class="movies" v-if="data">
    <div v-for="movie in data.results" :key="movie.id">
      <img v-if="movie" :src="movie.imageLink" alt="Movie Image" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Movies } from "~~/types";
const props = defineProps<{
  data: any;
}>();
let image: any;
</script>

<style scoped>
.movies {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
img {
  width: 100%;
  height: auto;
}
</style>
