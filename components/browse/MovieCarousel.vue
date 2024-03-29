<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from "vue";

  const props = defineProps<{
    data: MediaItem[];
    size: number;
    overflow?: boolean;
    padding?: number;
    buttonWidth?: number;
    buttonPadding?: number;
    buttonVisibile?: boolean;
    emitImage?: boolean;
    emitImageDelay?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  }>();

  const emit = defineEmits<{
    (e: "hovElement", value: MediaItem): void;
    (e: "positionElement", value: DOMRect): void;
  }>();

  const win = ref();
  let hoverTimer: NodeJS.Timeout;
  //Defines if hover occurs
  const hoverButtons = ref<boolean>();
  const hoverElement = ref<MediaItem>();

  //Defines start and end point for TouchEvent
  const touchMovement = ref<TouchMovement>({ start: 0, end: 0 });
  //Defines if screen is smaller than 640px
  const isMobile = ref<boolean>();
  //Defines which direction Carousel will move (1) -> Right or (-1) -> Left
  const carouselMove = ref<number>(0);
  //Defines a variable that prevents any action untill transition is finished
  const isTransitioning = ref<boolean>(false);
  //Defines if carousel was triggered allowing user to go back and creating infinite loop
  const wasTriggered = ref<number>(0);
  //Defines how many elements should be shown
  const screenVariable = ref<number>();
  //Returns right flex-basis (how much elements at DOM)
  const flexBasis = computed(() => {
    if (screenVariable.value) return 100 / screenVariable.value;
  });
  //copy of array
  const slides = ref<MediaItem[]>(props.data);

  //Adds proper styling based on buttons that were clicked and if its 1st click or not
  const transform = computed(() => {
    if (wasTriggered.value === 0) {
      return "translate3d(0%,0px,0px)";
    } else if (carouselMove.value === 1 && wasTriggered.value === 1) {
      return "translate3d(-100%,0px,0px)";
    } else if (carouselMove.value === 1) {
      return "translate3d(-200%,0px,0px)";
    } else if (carouselMove.value === -1) return "translate3d(0%,0px,0px)";
    else return "translate3d(-100%,0px,0px)";
  });
  const padding = computed(() => {
    return "0 " + props.padding + "rem";
  });

  onMounted(() => {
    win.value = true;
    setVariable();
    isTouchDevice();
    window.addEventListener("resize", setVariable);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", setVariable);
  });

  //Emits currently hovered element
  function currElement(e: MouseEvent, slide: MediaItem) {
    let timer;
    if (props.emitImageDelay) {
      timer = props.emitImageDelay;
    } else {
      timer = 550;
    }
    if (props.emitImage) {
      const touchDevice = isTouchDevice();
      const target = e.target as HTMLButtonElement;
      if (!touchDevice) {
        hoverElement.value = slide;

        hoverTimer = setTimeout(() => {
          if (hoverElement.value) emit("hovElement", hoverElement.value);
          if (e.target && hoverElement.value)
            emit("positionElement", target.getBoundingClientRect());
        }, timer);
      }
    }
  }
  function cancelHover() {
    clearTimeout(hoverTimer);
  }

  //Forward Button/Touch with cutting first X elements and putting them at the end
  //
  function forward() {
    if (slides.value) {
      carouselMove.value = 1;
      if (!isTransitioning.value) {
        isTransitioning.value = true;
        if (wasTriggered.value < 2) {
          wasTriggered.value++;
        }
        if (wasTriggered.value === 2) {
          for (let i = 0; i < screenVariable.value!; i++) {
            const slide = slides.value[i];

            slides.value.push(slide);
          }
          setTimeout(() => {
            for (let i = 0; i < screenVariable.value!; i++) {
              if (slides.value) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                slides.value.shift();
              }
            }
            isTransitioning.value = false;
            carouselMove.value = 0;
          }, 750);
        } else {
          setTimeout(() => {
            isTransitioning.value = false;
          }, 750);
        }
      }
    }
  }
  //Backward Button/Touch with cutting last X elements and putting them at the start

  function back() {
    carouselMove.value = -1;
    if (!isTransitioning.value) {
      isTransitioning.value = true;
      setTimeout(() => {
        for (let i = 0; i < screenVariable.value!; i++) {
          if (slides.value) {
            const slide = slides.value.pop();
            slides.value.unshift(slide!);
          }
        }
        isTransitioning.value = false;
        carouselMove.value = 0;
      }, 750);
    }
  }

  //Sets start value to X user touched
  function touchStart(event: TouchEvent) {
    touchMovement.value.start = event.touches[0].clientX;
  }
  //Sets end value for X user finished touching
  function touchMove(event: TouchEvent) {
    touchMovement.value.end = event.touches[0].clientX;
  }
  //Triggers forward() or back() function depending which direction movement occured
  function touchEnd() {
    if (
      touchMovement.value.start > touchMovement.value.end &&
      touchMovement.value.end > 0
    )
      forward();
    else if (
      touchMovement.value.start < touchMovement.value.end &&
      touchMovement.value.end > 0
    )
      back();
  }
  //Sets variable based on defined props and screen sizes
  //Sets second variable to true or false if screen is smaller than 640px
  function isTouchDevice(): boolean {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  function setVariable() {
    const touchDevice = isTouchDevice();
    isMobile.value = touchDevice;
    if(isMobile.value){
      screenVariable.value = props.size;
      return;
    }
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
      screenVariable.value = props.size;
    }
  }
</script>

<template>
  <div
    :style="{ padding: padding }"
    :class="props.overflow ? '' : 'overflow'"
    class="carousel"
  >
    <button
      v-if="wasTriggered && !isMobile"
      :style="{
        left: `${props.buttonPadding}rem`,
        width: `${props.buttonWidth}rem`,
      }"
      :class="hoverButtons || props.buttonVisibile ? '' : 'button-visible'"
      @click="back()"
      @mouseover="hoverButtons = true"
      @mouseleave="hoverButtons = false"
      class="handle left-handle"
      aria-label="Show previous movies"
    >
      <img
        v-if="hoverButtons"
        class="hover-button"
        src="@/assets/chevron-left-solid.svg"
        alt=""
      />
    </button>
    <div
      v-else-if="isMobile && wasTriggered"
      :style="{
        left: `${props.buttonPadding}rem`,
        width: `${props.buttonWidth}rem`,
      }"
      class="handle left-handle"
    ></div>
    <div
      :class="carouselMove === 1 || carouselMove === -1 ? 'animate' : ''"
      :style="{ transform: transform }"
      @touchstart.passive="touchStart"
      @touchmove.passive="touchMove"
      @touchend.passive="touchEnd"
      class="slider-wrapper"
    >
      <div
        v-for="slide in slides"
        :key="slide.id"
        :style="{ flexBasis: `${flexBasis}%` }"
        class="slider-element"
      >
        <nuxt-img
          :src="slide.image"
          :class="win ? '' : 'max-width'"
          :alt="slide.title || slide.name"
          preload
          @mouseover="currElement($event, slide)"
          @mouseleave="cancelHover()"
          height="120px"
          width="220px"
        />
      </div>
    </div>

    <button
      v-if="!isMobile"
      :style="{
        right: `${props.buttonPadding}rem`,
        width: `${props.buttonWidth}rem`,
      }"
      :class="hoverButtons || props.buttonVisibile ? '' : 'button-visible'"
      @mouseover="hoverButtons = true"
      @mouseleave="hoverButtons = false"
      @click="forward()"
      class="handle right-handle"
      aria-label="Show more movies"
    >
      <img
        v-if="hoverButtons"
        class="hover-button"
        src="@/assets/chevron-right-solid.svg"
        alt=""
      />
    </button>
    <div
      v-else
      :style="{
        right: `${props.buttonPadding}rem`,
        width: `${props.buttonWidth}rem`,
      }"
      class="handle right-handle"
    ></div>
  </div>
</template>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .overflow {
    overflow: hidden;
  }
  .button-visible {
    opacity: 0 !important;
  }
  .carousel {
    position: relative;
  }
  .animate {
    transition: all 0.75s ease 0s;
  }
  .slider-wrapper {
    position: relative;
    display: flex;
    z-index: 1;
  }

  .slider-element {
    flex-grow: 0;
    flex-shrink: 0;
    z-index: 1;
    padding: 0 0.25rem;
  }

  img {
    display: block;
    width: 100%;

    height: auto;
  }
  .max-width {
    max-width: 190px;
  }
  @media screen and (max-width: 640px) {
    .max-width {
      max-width: 170px;
    }
  }

  .handle {
    transition: opacity 0.35s;
    color: white;
    border: 0;
    width: 3rem;
    height: 100%;
    padding: 0;
    z-index: 15;
    position: absolute;
    background-color: #202020;
    opacity: 0.8;
  }
  .handle:hover {
    opacity: 0.6;
  }
  .handle > img {
    transform: scale(1.45);
  }

  .left-handle {
    top: 0;
    left: 0rem;
  }
  .right-handle {
    top: 0;
    right: 0rem;
  }
</style>
