<template>
  <div>
    <div v-if="wasTriggered" @click="back()" class="handle left-handle"></div>

    <div
      class="slider-wrapper"
      :class="carouselMove === 1 || carouselMove === -1 ? 'animate' : ''"
      v-if="data"
      :style="transform"
    >
      <div
        class="slider-element"
        :style="{ flexBasis: `${flexBasis}%` }"
        v-for="slide in slides"
        :key="slide.id"
      >
        <img v-if="slide" :src="slide.imageLink" alt="Slide Image" />
      </div>
    </div>

    <div @click="forward()" class="handle right-handle"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  size: number;
}>();
let image: any;
//Defines which direction Carousel will move (1) -> Right or (-1) -> Left
const carouselMove = ref(0);
//Defines if carousel was triggered allowing user to go back and creating infinite loop
const wasTriggered = ref(0);
//Defines how many elements should be shown
const screenVariable = ref<number>(props.size);
//Returns right flex-basis (how much elements at DOM)
const flexBasis = computed(() => {
  return 100 / screenVariable.value;
});
//copy of array
const slides = ref([...props.data.results]);
//Adds proper styling based on buttons that were clicked and if its 1st click or not
const transform = computed(() => {
  if (wasTriggered.value === 0) {
    return "transform: translate3d(0%,0px,0px)";
  } else if (carouselMove.value === 1 && wasTriggered.value === 1) {
    return "transform: translate3d(-100%,0px,0px)";
  } else if (carouselMove.value === 1) {
    return "transform: translate3d(-200%,0px,0px)";
  } else if (carouselMove.value === -1)
    return "transform: translate3d(0%,0px,0px)";
  else return "transform: translate3d(-100%,0px,0px)";
});
//Forward button with cutting first X elements and putting them at the end
function forward() {
  carouselMove.value = 1;
  if (wasTriggered.value < 2) {
    wasTriggered.value++;
  }

  if (wasTriggered.value === 2) {
    console.log(carouselMove.value);
    for (let i = 0; i < screenVariable.value; i++) {
      const slide = slides.value[i];

      slides.value.push(slide);
    }
    setTimeout(() => {
      for (let i = 0; i < screenVariable.value; i++) {
        const slide = slides.value.shift();
      }

      carouselMove.value = 0;
    }, 750);
  }
}
//Forward button with cutting last X elements and putting them at the start

function back() {
  console.log(carouselMove.value);
  carouselMove.value = -1;
  setTimeout(() => {
    for (let i = 0; i < screenVariable.value; i++) {
      const slide = slides.value.pop();
      slides.value.unshift(slide);
    }

    carouselMove.value = 0;
  }, 750);
}
//Sets variable based on defined props and screen sizes
function setVariable() {
  if (window.matchMedia("(max-width: 640px)").matches) {
    screenVariable.value = props.size;
  } else {
    if (window.innerWidth >= 1536 && props.xxl) {
      screenVariable.value = props.xxl;
    } else if (
      window.innerWidth >= 1280 &&
      window.innerWidth < 1536 &&
      props.xl
    ) {
      screenVariable.value = props.xl;
    } else if (
      window.innerWidth >= 1024 &&
      window.innerWidth < 1280 &&
      props.lg
    ) {
      screenVariable.value = props.lg;
    } else if (
      window.innerWidth >= 768 &&
      window.innerWidth < 1024 &&
      props.md
    ) {
      screenVariable.value = props.md;
    } else if (
      window.innerWidth >= 640 &&
      window.innerWidth < 768 &&
      props.sm
    ) {
      screenVariable.value = props.sm;
    } else {
      console.log(screenVariable.value);
      screenVariable.value = props.size;
    }
  }
}
onMounted(() => {
  setVariable();
  window.addEventListener("resize", setVariable);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", setVariable);
});
</script>

<style scoped lang="scss">
.animate {
  transition: all 0.75s ease 0s;
}
.slider-wrapper {
  display: flex;
}
.slider-element {
  flex-grow: 0;
  flex-shrink: 0;

  padding: 0.25rem;
}
img {
  width: 100%;
  display: block;
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
