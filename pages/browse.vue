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
const movieCard = ref();
const classy = ref();
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
  scaledWidth.value = e.width
  if (!currPosition.value) currPosition.value = e;
}
const scaledWidth = ref<number>();
const isHovering = ref();
const showText = ref();
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
       classy.value = "right"
      } else if (x - width <= 0) {
        classy.value = "left"
        
      }
      else{
        classy.value = "center"
      }
      console.log(classy.value)
      return { x, y, width };

    }

    return { x, y };
  }
});

function onBeforeEnter() {
setTimeout(()=>{
  showText.value = false;
},1)

}
function onEnter() {
  setTimeout(()=>{
  showText.value = true;
},1)

}

function onAfterLeave() {
  setTimeout(()=>{
  showText.value = false;
},1)
}

function onMouseLeave() {
showText.value= false;


  setTimeout(() => {
    showText.value = false;
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

const setClasses = computed(()=>{
  if(classy.value === "left" && showText.value){
    return  'trans-scale left' 
  }
  else if(classy.value === "right"  && showText.value){
    return 'trans-scale right' 
  }
  else if (showText.value) {
    return 'trans-scale' 
  }
  else{
    return ""
  }
})
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

<Transition @enter="onEnter" @before-enter="onBeforeEnter" @before-leave="onMouseLeave">
  <MovieCard
        :text="showText"
        class="trans"
        ref="movieCard"
        :class="setClasses"
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

  width:120px;
  transform: translate(-50%,-60%);
  transition: all .2s ease-in-out;
}
.trans-scale {
  transform-origin: center center; 
transform: scale(1.85) translate(-25%,-50%);
}
.left{
  transform-origin: left center; 
}
.right{
  transform-origin: right center; 
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
