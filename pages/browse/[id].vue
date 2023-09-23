<script setup lang="ts">
  const router = useRoute();
  const test = useHead({ title: "Movies" }, { tagPosition: "bodyOpen" });
  const arrOfPaths = ref<string[]>([
    "3/movie/popular",
    "3/movie/top_rated",
    "3/tv/popular",
    "3/tv/top_rated",
  ]);
  const arrOfHeaders = ref<string[]>([
    "Popular movies",
    "Top rated movies",
    "Popular TV series",
    "Top rated TV series",
  ]);
  const arrOfDynamicPaths = ref<string[]>([]);
  const arrOfDynamicHeaders = ref<string[]>([]);
  const arrOfGenrePaths = computed(() => {
    const arr = arrOfDynamicPaths.value;
    return arr;
  });

  for (let i = 0; i < arrOfPaths.value.length; i++) {
    if (arrOfPaths.value[i].includes(router.params.id.toString())) {
      arrOfDynamicPaths.value.push(arrOfPaths.value[i]);
      arrOfDynamicHeaders.value.push(arrOfHeaders.value[i]);
    }
  }

  function setHeader(id: string | number) {
    if (typeof id === "number") return arrOfDynamicHeaders.value[id];
    else {
      return "";
    }
  }
</script>
<template>
  <section>
    <div
      v-for="(movie, index) in arrOfGenrePaths"
      v-if="arrOfDynamicPaths.length > 0"
      :key="movie"
      class="movie-section"
    >
      <h2>{{ setHeader(index) }}</h2>

      <MovieList
        :list="movie"
        @hov-element="$emit('hovElement', $event)"
        @position-element="$emit('positionElement', $event)"
      />
    </div>
    <div v-else><h1>No matching titles found.</h1></div>
  </section>
</template>

<style scoped lang="scss">
  h1 {
    padding-top: 100px;
    font-size: 25px;
    font-weight: 400;
  }
  h2 {
    text-align: left;
    padding-top: 60px;
    font-size: 25px;
    font-weight: 400;
  }
</style>
