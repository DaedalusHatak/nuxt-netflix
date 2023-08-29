<template>
	<div class="hovered">
		<nuxt-img
			:src="props.slide.image"
			:alt="props.slide.title || props.slide.name"
			width="250"
			height="120"
		/>
		<div class="info">
			<h3
				><span class="name">Title:</span>
				{{ props.slide.title || props.slide.name }}</h3
			>
			<p><span class="name">Release date:</span> {{ releaseDate }}</p>
      <p><span class="name">Rating</span> {{ props.slide.vote_average }} <span class="name">Votes:</span> {{ props.slide.vote_count }}</p>
      <p class="overview" v-if="slide"><span class="name">Overview: </span> {{ props.slide.overview }} </p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Movie } from '~/types';

const props = defineProps<{
	slide: Movie;
	position: DOMRect;
}>();
console.log(props.slide)
const releaseDate = computed(() => {
	if (props.slide.release_date) {
		return props.slide.release_date.split('-').reverse().join('-');
	} else {
		return props.slide.first_air_date.split('-').reverse().join('-');
	}
});
</script>

<style scoped lang="scss">
.hovered {
	--scale-size: 1.55;
}
.info {
	background-color: #181818;
	border-radius: 0 0 7px 7px;
}
h3 {
	font-size: clamp(0.75rem, 2vw, 1.05rem);
	font-weight: 300;
	// transform:  scale( calc(1 / var(--scale-size)));
}
p {
	font-size: clamp(0.75rem, 2vw, 0.9rem);
	font-weight: 300;
}
.overview{
  font-size: 0.5rem;
}
.name {
	font-weight: 700;
}
.hovered {
	box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
	position: absolute;
	transform: translate(-50%, -50%) scale(var(--scale-size));
	display: grid;
	font-weight: 400;
	grid-template-rows: 1fr 1fr;
	z-index: 25;
}

img {
	display: block;
	object-fit: cover;
	width: 100%;
	height: auto;
	border-radius: 7px 7px 0 0;
}
</style>
