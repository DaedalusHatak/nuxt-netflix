<template>
  
	<div
    class="hovered"

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
const scaledWidth = ref(props.position.width);
const centerPosition = computed(() => {
  let x, y, width;
  console.log(props.slide);

  x = props.position.x + props.position.width / 2;
  y = props.position.y + props.position.height / 2 + window.scrollY;
  width = scaledWidth.value;


  return { x, y, width };
});



</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: width 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.hovered {
  position: absolute;
  
	display: grid;
	grid-template-rows: 1fr 1fr;
  transform: translate(-50%, -50%);
  z-index: 25;
  background-color: red;
}

img {
  width: 100%;
  height: auto;
}
</style>
