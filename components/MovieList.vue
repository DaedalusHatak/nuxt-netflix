<script setup lang="ts">
import { ImageCarousel } from "vue-multi-slider";
import "vue-multi-slider/style.css";

const props = defineProps<{
  list: string;
}>();
const def = ref('');
const { pending,data } = await useFetch(`/api/getMovies?_=${props.list}`,{lazy:true});
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
  <div v-if="pending">Loading...</div>

  <ImageCarousel
  v-else
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
    :data="data!.results"
  />
</template>
<style scoped></style>
