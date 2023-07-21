<template>
	<div>

		<button
			v-if="wasTriggered && !isMobile"
			@click="back()"
			@mouseover="hover = true"
			@mouseleave="hover = false"
			class="handle left-handle"
			aria-label="Show previous movies"
			><img v-if="hover" src="@/assets/chevron-left-solid.svg" alt=""
		/></button>
		<div v-else-if="isMobile && wasTriggered" class="handle left-handle"></div>
		<div
			v-if="data"
			:class="carouselMove === 1 || carouselMove === -1 ? 'animate' : ''"
			:style="transform"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
			class="slider-wrapper"
		>
			<div
				v-for="slide in slides"
				:key="slide.id"
				:style="{ flexBasis: `${flexBasis}%` }"
				class="slider-element"
			>
				<img
					v-if="slide"
					:src="slide.imageLink"
					alt="Slide Image"
				/>
			</div>
		</div>

		<button
			v-if="!isMobile"
			@mouseover="hover = true"
			@mouseleave="hover = false"
			@click="forward()"
			class="handle right-handle"
			aria-label="Show more movies"
			><img v-if="hover" src="@/assets/chevron-right-solid.svg" alt="" />
		</button>
		<div v-else class="handle right-handle"></div>
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
//Defines if hover occurs
const hover = ref<boolean>();
//Defines start and end point for TouchEvent
const touchMovement = ref({ start: 0, end: 0 });
//Defines if screen is smaller than 640px
const isMobile = ref<boolean>();
//Defines which direction Carousel will move (1) -> Right or (-1) -> Left
const carouselMove = ref(0);
//Defines a variable that prevents any action untill transition is finished
const isTransitioning = ref(false);
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
		return 'transform: translate3d(0%,0px,0px)';
	} else if (carouselMove.value === 1 && wasTriggered.value === 1) {
		return 'transform: translate3d(-100%,0px,0px)';
	} else if (carouselMove.value === 1) {
		return 'transform: translate3d(-200%,0px,0px)';
	} else if (carouselMove.value === -1)
		return 'transform: translate3d(0%,0px,0px)';
	else return 'transform: translate3d(-100%,0px,0px)';
});
//Forward Button/Touch with cutting first X elements and putting them at the end
//
function forward() {
	carouselMove.value = 1;
	if (!isTransitioning.value) {
		isTransitioning.value = true;
		if (wasTriggered.value < 2) {
			wasTriggered.value++;
		}
		if (wasTriggered.value === 2) {
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
		} else {
			setTimeout(() => {
				isTransitioning.value = false;
			}, 750);
		}
	}
}
//Backward Button/Touch with cutting last X elements and putting them at the start

function back() {
	carouselMove.value = -1;
	if (!isTransitioning.value) {
		isTransitioning.value = true;
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
function touchStart(event: any) {
	touchMovement.value.start = event.touches[0].clientX;
}
//Sets end value for X user finished touching
function touchMove(event: any) {
	touchMovement.value.end = event.touches[0].clientX;
}
//Triggers forward() or back() function depending which direction movement occured
function touchEnd(event: any) {
	if (touchMovement.value.start > touchMovement.value.end) forward();
	else if (wasTriggered.value) back();
}
//Sets variable based on defined props and screen sizes
//Sets second variable to true or false if screen is smaller than 640px
function isTouchDevice(): boolean {
	console.log('ontouchstart' in window || navigator.maxTouchPoints > 0);
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function setVariable() {
	const touchDevice = isTouchDevice();
	isMobile.value = touchDevice;
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
	} else if (window.innerWidth >= 768 && window.innerWidth < 1024 && props.md) {
		screenVariable.value = props.md;
	} else if (window.innerWidth >= 640 && window.innerWidth < 768 && props.sm) {
		screenVariable.value = props.sm;
	} else {
		screenVariable.value = props.size;
	}
}
onBeforeMount(() => {
	setVariable();
});
onMounted(() => {
	setVariable();
	isTouchDevice();
	window.addEventListener('resize', setVariable);
});
onBeforeUnmount(() => {
	window.removeEventListener('resize', setVariable);
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

	padding: 0 0.25rem;
}
img {
	width: 100%;
	display: block;
	height: auto;
}
.handle {
	transition: opacity 0.35s;
	color: white;
	border: 0;
	width: 3rem;
	height: 100%;
	z-index: 5;
	position: absolute;
	background-color: #202020;
	opacity: 0.6;
}
.handle:hover {
	opacity: 0.8;
}
.handle > img {
	transform: scale(1.45);
}

.left-handle {
	left: -3rem;
}
.right-handle {
	top: 0;
	right: -3rem;
}
</style>
