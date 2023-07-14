<template>
  <div>
    <div @click="back()" class="handle left-handle"></div>

    <div
      class="movies"
      :class="test === 1 ? 'animate' : ''"
      v-if="data"
      :style="{
        transform:
          test === 1
            ? 'translate3d(-200%,0px,0px)'
            : 'translate3d(-100%,0px,0px)',
      }"
    >
      <div class="slider" v-for="movie in data.results" :key="movie.id">
        <img v-if="movie" :src="movie.imageLink" alt="Movie Image" />
      </div>
    </div>

    <div @click="forward()" class="handle right-handle"></div>
  </div>
</template>
<script setup lang="ts">
import { Transform } from "stream";
import { Movies } from "~~/types";
const test = ref(0);
let image: any;
const props = defineProps<{
  data: any;
}>();

function forward() {
  test.value = 1;
  console.log(test.value);

  setTimeout(() => {
    if (test.value === 1) {
      for (let i = 0; i < 4; i++) {
        const slide = props.data.results.shift();
        props.data.results.push(slide);
      }
    }
    test.value = 0;
  }, 1000);

  console.log(test.value);
}

function back() {
  if (test.value > 0) test.value--;
  else test.value = 4;
}
</script>

<style scoped lang="scss">
.animate {
  transition: all 0.75s ease 0s;
}
.movies {
  display: flex;
  .slider {
    flex: 0 0 25%;
    width: 25%;
    padding: 0.25rem;
  }
}
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
}
.handle {
  width: 3rem;
  height: 100%;
  z-index: 5;
  position: absolute;
  background-color: red;
}
.left-handle {
  left: -3rem;
}
.right-handle {
  top: 0;
  right: -3rem;
}
</style>
