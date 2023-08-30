<script setup lang="ts">
import { Movie } from "~/types";
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
const userProfile = useProfile();

const firestoreClient = ref({
  avatar: userProfile.value.photo,
  email: userProfile.value.email,
});

async function updatePhoto(photo: string) {
  firestoreClient.value.avatar = photo;
  await getStore(photo);
}
const currElement = ref();
function currElementHandler(e: Movie) {
  isHovering.value = true;

  if (!currElement.value) currElement.value = e;
}
const currPosition = ref();
function currPositionHandler(e: DOMRect) {
  if (!currPosition.value) currPosition.value = e;
}
const scaledWidth = ref<number>();
const isHovering = ref();
const showText = ref(false);
const centerPosition = computed(() => {
  let x, y, width: number;

  if (currPosition.value) {
    x = currPosition.value.x + currPosition.value.width / 2  ;

    // 86 is from navbar moving it down a little
    y = currPosition.value.top - 25 + window.scrollY;
    // y =
    //   currPosition.value.y +
    //   currPosition.value.height / 2 +
    //   window.scrollY -
    //   86;
    if (scaledWidth.value) {
      width = scaledWidth.value;
      if (x >= window.innerWidth - width) {
        const scrollBar = document.body.scrollWidth;
        x = x - 56;
      } else if (x - width <= 0) {
        x = x + 56;
      }
      return { x, y, width };
    }

    return { x, y };
  }
});
function onBeforeEnter() {
  scaledWidth.value = currPosition.value.width;
}

function onAfterEnter() {
  showText.value = true;
}
function onAfterLeave() {
  currElement.value = undefined;
}
function onMouseLeave() {
  showText.value = false;

  scaledWidth.value =  110
  setTimeout(() => {
    isHovering.value = false;
    currElement.value = undefined;
    scaledWidth.value = 0;
    currPosition.value = undefined;
  }, 1);
}

function setHeader(id: string | number) {
  if (typeof id === "number") return arrOfHeaders.value[id];
  else {
    return "";
  }
}
</script>
<template>
  <Head>
    <Meta name="description" content="Movie database" />
  </Head>
  <NavBar :av="firestoreClient"></NavBar>

  <div class="flex-center">
    <p></p>
    <button @click="updatePhoto('raiden.png')">Raiden</button>
    <button @click="updatePhoto('kokomi.png')">kokomi</button>
    <div class="movie-wrapper">
      <NuxtPage
        @hov-element="currElementHandler"
        @position-element="currPositionHandler"
      />
      <section
        v-if="!$route.params.id"
        class="movie-section"
        v-for="(movie, index) in arrOfPaths"
        :key="movie"
      >
        <h2>{{ setHeader(index) }}</h2>

        <MovieList
          @hov-element="currElementHandler"
          @position-element="currPositionHandler"
          :list="movie"
        />
      </section>
    </div>
    <Transition
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <MovieCard
        :text="showText"
        class="trans"
        v-if="isHovering && centerPosition"
        @mouseleave="onMouseLeave()"
        :slide="currElement"
        :position="currPosition"
        :style="{
          left: `${centerPosition.x}px`,
          top: `${centerPosition.y}px`,
          width: `${centerPosition.width}px`,
        }"
      ></MovieCard>
    </Transition>
  </div>
</template>

<style scoped>
.trans {
width:115px;

  transition: all .2s ease-in;
}

.v-leave-to {
  width: 150px;
}
h2 {
  font-size: 2vw;
}
.movie-wrapper {
  display: grid;
  gap: 50px;
}
.movie-section {
  text-align: left;
}
.flex-center {
  text-align: center;
  padding: 2rem 1rem;
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
  background: #331abbe6;
  cursor: pointer;
  color: rgb(255, 255, 255);
  border-radius: 1rem;
}

@media screen and (min-width: 420px) {
  .flex-center {
    text-align: center;
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
@media screen and (max-width: 800px) {
  h2 {
    font-size: 16px;
  }
}
</style>
