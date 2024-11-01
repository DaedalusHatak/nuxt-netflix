<script setup lang="ts">

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


function isTouchDevice(): boolean {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  const isMobile = ref<boolean>();
const movieCard = ref();
const XAxis = ref();
const YAxis = ref();
const currElement = ref();
const scaledWidth = ref<number>();
const scaledHeight = ref<number>();
const isHovering = ref<boolean>(false);
const showText = ref<boolean>(false);
const currPosition = ref();


onMounted(()=>{
	isMobile.value = isTouchDevice();

	addEventListener('resize', isTouchDevice)
})

const centerPosition = computed(() => {
	let x, y,height:number, width: number;
	if(!scaledHeight.value) scaledHeight.value = currPosition.value.height
	if (currPosition.value) {
	
		x = currPosition.value.x;
		


		if(currPosition.value.height === window.innerHeight && currPosition.value.width === window.innerWidth){
			x= currPosition.value.width /4;
			y= currPosition.value.height /4;
			width=scaledWidth.value! / 2;
			height=scaledHeight.value! / 2;
			YAxis.value = 'center';
			XAxis.value = 'center'
			console.log(x,y,width,height)
			return {x,y,width,height}
		}


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
			console.log(currPosition.value)
				console.log(scaledHeight.value)
				console.log(window.innerHeight)
			if ( currPosition.value.top +  (scaledHeight.value / 2)  > window.innerHeight) {
		
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
	let top:number | string | null = centerPosition.value.y;


if(YAxis.value === "center" ){
	top = `${centerPosition.value.y}px` 
}
else {
	top = null;
}
if(isMobile.value){
top = "20px";
}
    return {
      left: `${centerPosition.value.x}px`,
      top: top,
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
scaledHeight.value = isMobile.value ? e.height  * 1.5 : e.height  * 1.85 
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
	
		

	setTimeout(() => {
		showText.value = false;
		isHovering.value = false;
		currElement.value = undefined;
		scaledWidth.value = 0;
		scaledHeight.value = 0;
		currPosition.value = undefined;
	},20);
}
</script>
<template>
	<Head>
		<Meta name="description" content="Movie database" />
	</Head>
	<div v-if="isMobile && isHovering" class="blur"></div>
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
				:is-mobile="isMobile"
				@mouseleave="() => !isMobile ? onMouseLeave() : ''"
				@mouse-leave="onMouseLeave()"
				@card-element="handleCardElement"
				class="trans"
			></MovieCard>
		</Transition>

	</div>
</template>

<style scoped>
.blur{
	position: absolute;
	z-index: 25;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(100,100,100,0.7);
}


.relative{
	position: absolute;
}
.trans {

	transition: all 0.3s ease-in-out;
	
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
	z-index: 9999;
	flex-grow: 1;
	overflow-y: hidden;
	overflow-x: hidden;
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

@media (max-width:600px) {
.flex-center{
	overflow-x: clip;
	overflow-y: visible;
}
	.trans-scale.main{
		background-color: red;
	}

	.trans-scale {
	transform-origin: center center;
	scale:1.50;
}
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
