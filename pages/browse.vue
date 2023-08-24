<script setup lang="ts">
import { Movie } from '~/types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firestoreClient = ref({
	avatar: '',
	email: '',
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
onNuxtReady(async () => {
	const auth = getAuth();

	await onAuthStateChanged(auth, (user) => {
		if (user) {
			firestoreClient.value = {
				avatar: user.photoURL || 'raiden.png',
				email: user.email!,
			};
		}
	});
});
function updatePhoto(photo: string) {
	firestoreClient.value.avatar = photo;
	getStore(photo);
}
const currElement = ref();
function currElementHandler(e: Movie) {
	isHovering.value = true;
	if (!currElement.value) currElement.value = e;
}
const currPosition = ref();
function currPositionHandler(e: DOMRect) {
	if (!currPosition.value) currPosition.value = e;
}
const scaledWidth = ref<number>();
const centerPosition = computed(() => {
	let x, y, width: number;

	if (currPosition.value) {
		x = currPosition.value.x + currPosition.value.width / 2;
		// 86 is from navbar moving it down a little
		y = currPosition.value.top + window.scrollY;
		// y =
		//   currPosition.value.y +
		//   currPosition.value.height / 2 +
		//   window.scrollY -
		//   86;
		if (scaledWidth.value) {
			width = scaledWidth.value;
			return { x, y, width };
		}

		return { x, y };
	}
});
function onBeforeEnter() {
	scaledWidth.value = currPosition.value.width;
}
function onAfterLeave() {
	currElement.value = undefined;
}
function onMouseLeave() {
	scaledWidth.value = 75;
	setTimeout(() => {
		isHovering.value = false;
		currElement.value = undefined;
		scaledWidth.value = 0;
		currPosition.value = undefined;
	}, 1);
}
const isHovering = ref();

function setHeader(id: string | number) {
	if (typeof id === 'number') return arrOfHeaders.value[id];
	else {
		return '';
	}
}
</script>
<template>
	<Head>
		<Meta name="description" content="Movie database" />
	</Head>
	<NavBar :av="firestoreClient"></NavBar>
	<div class="flex-center">
		<button @click="signOutUser()">Sign Out</button>
		<button @click="updatePhoto('raiden.png')">Raiden</button>
		<button @click="updatePhoto('kokomi.png')">kokomi</button>
		<div class="movie-wrapper">
			<section
				class="movie-section"
				v-for="(movie, index) in arrOfPaths"
				:key="movie"
			>
				<h2>{{ setHeader(index) }}</h2>
				<p>{{ movie }}</p>

 <MovieList :list="movie" />


			</section>
		</div>
		<Transition @before-enter="onBeforeEnter" @after-leave="onAfterLeave">
			<MovieCard
				class="trans"
				v-if="isHovering && centerPosition"
				@mouseleave="onMouseLeave()"
				:slide="currElement"
				:position="currPosition"
				:style="{
					left: `${centerPosition.x}px`,
					top: `${centerPosition.y}px`,
					width: `${centerPosition.width}px`,
				}"
			></MovieCard>
		</Transition>
	</div>
</template>

<style scoped>
.trans {
	width: 70px;

	transition: all 0.25s ease-in;
}

.v-leave-to {
	width: 100px;
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
	text-align: center;
	padding: 2rem 1rem;
	display: flex;
	flex-direction: column;
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
	background: rgb(51, 26, 187, 0.9);
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
		overflow: hidden;
	}
}
@media screen and (max-width: 800px) {
	h2 {
		font-size: 16px;
	}
}
</style>
