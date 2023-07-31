<template>
  <div
    class="hovered"
    :style="{
      left: `${centerPosition.x}px`,
      top: `${centerPosition.y}px`,
      width: `${centerPosition.width}px`,
    }"
  >
    <img :src="props.slide.image" :alt="slide.title" />
    <div class="info">
      {{ props.slide.title || props.slide.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  slide: any;
  position: any;
}>();

const centerPosition = computed(() => {
  let x, y, width;
  console.log(props.slide);

  x = props.position.x + props.position.width / 2;
  y = props.position.y + props.position.height / 2 + window.scrollY;
  width = props.position.width * 1.55;
  return { x, y, width };
});
</script>

<style scoped lang="scss">
.hovered {
  position: absolute;
  height: 200px;

  transform: translate(-50%, -50%);
  z-index: 25;
  background-color: red;
}
img {
  width: 100%;
  height: auto;
}
</style>
