<script setup lang="ts">
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
const props = defineProps<{
  list: string;
}>();
const errorCount = ref(0);
const { data, refresh, error } = await useFetch(
  `/api/getMovies?_=${props.list}`
);
if (error.value && errorCount.value < 5) {
  errorCount.value++;
  await refresh();
}
</script>

<template>
  <MovieCarousel
    v-if="data?.results"
    :emit-image="true"
    :emit-image-delay="350"
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
    @hov-element="$emit('hovElement', $event)"
    @position-element="$emit('positionElement', $event)"
    :data="data!.results"
  />
</template>

<style scoped></style>
