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

<style scoped lang="scss">
.movies {
  display: grid;
  grid-template-columns: repeat(5, auto); 
  justify-self: center;


  gap: 2rem;
div{
  max-width: fit-content;
}
}
img {
  width: 100%;
  height: auto;
}
/* @media (min-width: 600px) {
  .movies {
    display: grid;
    justify-self: center;
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  .movies {
    display: grid;
    justify-self: center;
    grid-template-columns: 1fr 1fr 1fr;
  }
} */
</style>
