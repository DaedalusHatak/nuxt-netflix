<template>
    <section
      v-if="$route.params.id"
        class="movie-section"
        v-for="(movie, index) in arrOfGenrePaths"
        :key="movie"
      >
        <h2>{{ setHeader(index) }}</h2>

        <MovieList :list="movie" />
      </section>
</template>

<script setup lang="ts">
const router = useRoute();
const arrOfPaths = ref<string[]>([
  "3/movie/popular",
  "3/movie/top_rated",
  "3/tv/popular",
  "3/tv/top_rated",
]);
const arrOfDynamicPa = ref<string[]>([]);
const arrOfGenrePaths = computed(()=>{
    const arr =  arrOfDynamicPa.value
return arr
})

for (let i = 0; i < arrOfPaths.value.length; i++) {

    if (arrOfPaths.value[i].includes(router.params.id.toString())) {
      arrOfDynamicPa.value.push(arrOfPaths.value[i])

    }
    console.log(arrOfDynamicPa.value)
}
const arrOfHeaders = ref<string[]>([
  "Popular movies",
  "Top rated movies",
  "Popular TV series",
  "Top rated TV series",
]);
function setHeader(id: string | number) {
  if (typeof id === "number") return arrOfHeaders.value[id];
  else {
    return "";
  }
}
</script>


<style scoped lang="scss">
</style>