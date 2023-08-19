<template>
  <div class="hovered">
    <img
      :src="props.slide.image"
      :alt="props.slide.title || props.slide.name"
      width="250"
      height="120"
    />
    <div class="info">
      <p>{{ props.slide.title || props.slide.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Movie } from "~/types";

const props = defineProps<{
  slide: Movie;
  position: DOMRect;
}>();
</script>

<style scoped lang="scss">
.hovered {
  --scale-size: 1.55;
}
.info {
  background-color: orange;
}
p {
  font-size: calc(1rem / var(--scale-size));
  // transform:  scale( calc(1 / var(--scale-size)));
}
.hovered {
  position: absolute;
  transform: translate(-50%, -50%) scale(var(--scale-size));
  display: grid;
  grid-template-rows: 1fr 1fr;
  z-index: 25;
}

img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: auto;
}
</style>
