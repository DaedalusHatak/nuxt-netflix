<script setup lang="ts">
const { data } = await useFetch("/api/getData");
const arrOfPaths = ref<string[]>([
  "/3/movie/popular",
  "/3/movie/top_rated",
  "/3/tv/popular",
  "/3/tv/top_rated",
]);
const arrOfMovies = ref<any[]>([]);
async function apiCall(movies: string[]) {
  let l = 0;
  for (const i of movies) {
    const { data } = await useFetch("/api/getMovies", {
      method: "POST",
      body: i,
    });
    arrOfMovies.value.push(data.value);
  }
}
onNuxtReady(async () => {
  apiCall(arrOfPaths.value);
});
const currElement = ref();
function currElementHandler(e: any) {
  currElement.value = e;
}
const currPosition = ref();
function currPositionHandler(e: any) {
  currPosition.value = e;
}
</script>
<template>
  <Head>
    <Meta name="description" content="Movie database" />
  </Head>
  <div class="flex-center">
    <button @click="signOutUser()">Sign Out</button>
    <button @click="navigateTo('/')">Go Home, should not take you there</button>
    <div class="movie-wrapper">
      <MovieCarousel
        v-for="movie in arrOfMovies"
        @hov-element="currElementHandler"
        @position-element="currPositionHandler"
        :size="3"
        :sm="4"
        :md="5"
        :lg="6"
        :xl="7"
        :xxl="8"
        :data="movie"
      >
      </MovieCarousel>
    </div>
    <MovieCard
      v-if="currElement"
      @mouseleave="currElement = null"
      :slide="currElement"
      :position="currPosition"
    ></MovieCard>
  </div>
</template>

<style scoped>
.movie-wrapper {
  display: grid;
  gap: 50px;
}
.flex-center {
  text-align: center;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
