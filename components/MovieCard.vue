<template>
	<div class="hovered">
		<img :src="props.slide.image" :alt="slide.title" />
		<div class="info">
			{{ props.slide.title || props.slide.name }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { Movie } from 'types';

const props = defineProps<{
	slide: Movie;
	position: DOMRect;
}>();
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
	transition: width 1s ease;
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
