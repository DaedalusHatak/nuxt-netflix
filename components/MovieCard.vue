<template>
  <div class="handle left-handle"></div>

    <div class="movies" :style="{transform:`translateX(-100% * ${currSlideStyle})` }" id="movie" v-if="data">
    <div class="slider" v-for="movie in data.results" :key="movie.id">
      <img v-if="movie" :src="movie.imageLink" alt="Movie Image" />
    </div>
  </div>

  <div @click="addProp()" class="handle right-handle"></div>
</template>


<script setup lang="ts">
import { Movies } from "~~/types";
const currSlide = ref(0);
const currSlideStyle = computed(()=>{
  return currSlide.value
})
const props = defineProps<{
  data: any;
}>();
let image: any;

function addProp(){
currSlide.value++;
console.log((currSlide.value))
console.log((currSlideStyle.value))

}
</script>

<style scoped lang="scss">
.movies {
  display: flex;
  width: 100%;
  
  z-index: 5;
}

.slider{
  --slider-index:0;
  flex: 0 0 50%;
 max-width:50%;
 aspect-ratio: 16/9;
 padding: .25rem;
transform: translateX(calc(-100% * var(--slider-index)));
}

img {
  width: 100%;
  display:block;
  height: auto;
}
 .handle{

  z-index: 15;
  width:3rem;
  height: calc(100% - 0.5rem);
position: absolute;
  background-color: red;
margin-top:0.25rem;
 }
 .left-handle{
  left:-3rem;
 }
 .right-handle{
  right:-3rem;
 }
 @media screen and (min-width: 420px) {
  .slider{
  flex: 0 0 33.333%;
 max-width:33.333%;
 aspect-ratio: 16/9;
 padding: .25rem;

}
  
 }
 @media screen and (min-width: 920px) {
  .slider{
  flex: 0 0 25%;
 max-width:25%;
 aspect-ratio: 16/9;
 padding: .25rem;

}
  
 }
</style>
