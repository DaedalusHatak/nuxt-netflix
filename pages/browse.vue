<script setup lang="ts">
import { disablePersistentCacheIndexAutoCreation } from 'firebase/firestore';

useHead({
	bodyAttrs: { class: 'dark' },
});
const arrOfPaths = ref<string[]>([
	'3/movie/popular',
	'3/movie/top_rated',
	'3/tv/popular',
	'3/tv/top_rated',
]);
const arrOfHeaders = ref<string[]>([
	'Popular movies',
	'Top rated movies',
	'Popular TV series',
	'Top rated TV series',
]);
const userProfile = useProfile();
const firestoreClient = ref({
	avatar: userProfile?.value.photoURL
		? userProfile.value.photoURL
		: 'raiden.png',
	email: userProfile.value.email,
});

const movieCard = ref();
const XAxis = ref();
const YAxis = ref();
const currElement = ref();
const scaledWidth = ref<number>();
const scaledHeight = ref<number>();
const isHovering = ref<boolean>(false);
const showText = ref<boolean>(false);
const currPosition = ref();
const centerPosition = computed(() => {
	let x, y,height:number, width: number;
	if(!scaledHeight.value) scaledHeight.value = currPosition.value.height
	if (currPosition.value) {
		
		x = currPosition.value.x;
	


		// 86 is from navbar moving it down a little
		y = currPosition.value.top - (scaledHeight.value! /4) + window.scrollY;
		if (scaledWidth.value && scaledHeight.value) {
			width = scaledWidth.value;
			height = scaledHeight.value;
			if (x + currPosition.value.width >= window.innerWidth - width) {
				XAxis.value = 'right';
			} else if (x - width <= 0) {
				XAxis.value = 'left';
			} else {
				XAxis.value = 'center';
			}
      
			if (y - (currPosition.value.top + scaledHeight.value)  < 0 && currPosition.value.top + scaledHeight.value > window.innerHeight) {
				YAxis.value = 'bottom';
			} else if (( currPosition.value.top - scaledHeight.value /2)     < 0) {
				
				YAxis.value = 'top';
			
			} else {
				YAxis.value = 'center';
			}
 

			return { x, y, width,height };
		}


		return { x, y };
	}
});
const setStyles = computed(() => {
  if (centerPosition.value) {
    return {
      left: `${centerPosition.value.x}px`,
      top: YAxis.value === "center" ? `${centerPosition.value.y}px` : null,
      bottom: YAxis.value === "bottom" ? 0 : null,
      width: `${centerPosition.value.width}px`,
      transformOrigin: `${XAxis.value} ${YAxis.value}`
    };
  }
});
const setClasses = computed(() => {
if(showText.value){
	if(YAxis.value === "bottom")
	return `trans-scale bottom`
if( YAxis.value ==="top")
	return `trans-scale top`
else return 'trans-scale'
}
});

function handleCardElement(e:DOMRect){
scaledHeight.value = e.height  * 1.85
}

//Proper title header
function setHeader(id: string | number) {
	if (typeof id === 'number') return arrOfHeaders.value[id];
	else {
		return '';
	}
}

//Position of hovered element
function currElementHandler(e: Movie) {
	isHovering.value = true;

	if (!currElement.value) currElement.value = e;
}

function currPositionHandler(e: DOMRect) {
	scaledWidth.value = e.width;
	if (!currPosition.value) currPosition.value = e;
}
//Transition functions
function onBeforeEnter() {
	setTimeout(() => {
		showText.value = false;
	}, 1);
}
function onEnter() {
	setTimeout(() => {
		showText.value = true;
	}, 1);
}
watch(isHovering, (newVal) => {
  if (!newVal) {
    scaledWidth.value = 0;
    scaledHeight.value = 0;
    currPosition.value = undefined;
  }
});
//Hide & clear hovered element
function onMouseLeave() {
	showText.value = false;

	setTimeout(() => {
		showText.value = false;
		isHovering.value = false;
		currElement.value = undefined;
		scaledWidth.value = 0;
		scaledHeight.value = 0;
		currPosition.value = undefined;
	}, 1);
}
</script>
<template>
	<Head>
		<Meta name="description" content="Movie database" />
	</Head>
	<NavBar :is-account="false" :av="firestoreClient"></NavBar>

	<div class="flex-center">
		<div class="movie-wrapper">
			<NuxtPage
				@hov-element="currElementHandler"
				@position-element="currPositionHandler"
			/>
			<section
				v-for="(movie, index) in arrOfPaths"
				v-if="!$route.params.id"
				:key="movie"
				class="movie-section"
			>
				<h2>{{ setHeader(index) }}</h2>

				<MovieList
					:list="movie"
					@hov-element="currElementHandler"
					@position-element="currPositionHandler"
				/>
			</section>
		</div>

		<Transition
		class="relative"
			@enter="onEnter"
			@before-enter="onBeforeEnter"
			@before-leave="onMouseLeave"
		>
			<MovieCard
				v-if="isHovering && centerPosition "
				ref="movieCard"
				:class="setClasses"
				:text="showText"
				:slide="currElement"
				:position="currPosition"
				:style="setStyles"
				@mouseleave="onMouseLeave()"
				@card-element="handleCardElement"
				class="trans"
			></MovieCard>
		</Transition>
	</div>
</template>

<style scoped>
.relative{
	position: absolute;
}
.trans {

	transition: all 0.2s ease-in-out;
	
}

.trans-scale {
	transform-origin: center center;
	scale:1.85;
}



h2 {
	font-size: 2vw;
}
.movie-wrapper {
	display: grid;

	gap: 50px;
}
.movie-section {
	text-align: left;
}
.flex-center {
	position: relative;
	text-align: center;
	padding: 2rem 1rem;
	display: flex;
	flex-direction: column;
	
	flex-grow: 1;
	overflow: hidden;
}
button {
	display: inline-flex;
	align-self: center;
	align-items: center;
	justify-content: center;
	writing-mode: horizontal-tb !important;
	width: 100%;
	max-width: 30rem;
	margin-top: 1rem;
	flex: 0 0 auto;
	border: 0px;
	margin-bottom: 5rem;
	font-size: 1.5rem;
	font-weight: 500;
	min-height: 3.5rem;
	padding: 0.75rem 1.5rem;
	background: #331abbe6;
	cursor: pointer;
	color: rgb(255, 255, 255);
	border-radius: 1rem;
}

@media screen and (min-width: 420px) {
	.flex-center {
		text-align: center;
		padding: 2rem 3rem;
		display: flex;
		flex-direction: column;
	}
}
@media screen and (max-width: 800px) {
	h2 {
		font-size: 16px;
	}
}
</style>
