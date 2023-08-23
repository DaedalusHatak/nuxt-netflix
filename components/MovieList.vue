<script setup lang="ts">
import { ImageCarousel } from "vue-multi-slider";
import "vue-multi-slider/style.css";

const props = defineProps<{
  list: string;
}>();
const { data: mov } = await useFetch("/api/getMovies", {
  method: "POST",
  body: props.list,
});
const movies = mov.value;
console.log(movies?.results);
// const isHovering = ref();
// const currElement = ref();
// function currElementHandler(e: Movie) {
//   isHovering.value = true;
//   if (!currElement.value) currElement.value = e;
// }
// const currPosition = ref();
// function currPositionHandler(e: DOMRect) {
//   if (!currPosition.value) currPosition.value = e;
// }
</script>

<template>
  {{ props.list }}
  <ImageCarousel
    :emit-image="true"
    :size="2"
    :sm="3"
    :md="4"
    :lg="5"
    :overflow="true"
    :button-padding="-3"
    :button-width="3"
    :button-visibile="true"
    :xl="6"
    :xxl="7"
    :data="mov!.results"
  />
</template>
<style scoped></style>
