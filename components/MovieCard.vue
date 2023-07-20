<template>
  <div>
    <div v-if="wasTriggered && !isMobile" @click="back()"  class="handle left-handle"></div>

    <div
      class="slider-wrapper"
	  @touchstart="touchStart"
	  @touchmove="touchMove"
	  @touchend="touchEnd"
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

    <div v-if="!isMobile" @click="forward()" class="handle right-handle"></div>
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
//Defines start and end point for TouchEvent
const touchMovement = ref({start: 0,end:0});
//Defines if screen is smaller than 640px
const isMobile=ref<boolean>()
//Defines which direction Carousel will move (1) -> Right or (-1) -> Left
const carouselMove = ref(0);
//Defines a variable that prevents any action untill transition is finished
const isTransitioning = ref(false)
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
//Forward Button/Touch with cutting first X elements and putting them at the end
//
function forward() {
  carouselMove.value = 1;
if(!isTransitioning.value){
	isTransitioning.value = true;
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
	  isTransitioning.value = false;
      carouselMove.value = 0;
    }, 750);
  }
  else{
	setTimeout(()=>{
		isTransitioning.value = false;
	},750)
  }
  
}
}
//Backward Button/Touch with cutting last X elements and putting them at the start

function back() {

  carouselMove.value = -1;
  if(!isTransitioning.value){
	isTransitioning.value = true
	setTimeout(() => {
    for (let i = 0; i < screenVariable.value; i++) {
      const slide = slides.value.pop();
      slides.value.unshift(slide);
    }
	isTransitioning.value = false;
    carouselMove.value = 0;
  }, 750);
  }
}

//Sets start value to X user touched
function touchStart(event:any){
touchMovement.value.start = event.touches[0].clientX
}
//Sets end value for X user finished touching
function touchMove(event:any){
	touchMovement.value.end = event.touches[0].clientX
}
//Triggers forward() or back() function depending which direction movement occured
function touchEnd(event:any){
	if(touchMovement.value.start > touchMovement.value.end)
forward();
else if(wasTriggered.value) back();
}
//Sets variable based on defined props and screen sizes
//Sets second variable to true or false if screen is smaller than 640px
function setVariable() {
    if (window.innerWidth >= 1536 && props.xxl) {
		isMobile.value = false;
      screenVariable.value = props.xxl;
    } else if (
      window.innerWidth >= 1280 &&
      window.innerWidth < 1536 &&
      props.xl
    ) {
		isMobile.value = false;
      screenVariable.value = props.xl;
    } else if (
      window.innerWidth >= 1024 &&
      window.innerWidth < 1280 &&
      props.lg
    ) {
		isMobile.value = false;
      screenVariable.value = props.lg;
    } else if (
      window.innerWidth >= 768 &&
      window.innerWidth < 1024 &&
      props.md
    ) {
		isMobile.value = false;
      screenVariable.value = props.md;
    } else if (

      window.innerWidth >= 640 &&
      window.innerWidth < 768 &&
      props.sm
    ) {
		isMobile.value = false;
      screenVariable.value = props.sm;
    } else{
		isMobile.value = true;
      screenVariable.value = props.size;

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
