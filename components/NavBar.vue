<script setup lang="ts">
const props = defineProps<{
	av: any;
}>();

const isHovered = ref();
let timer: any;
const scr = ref();
const scroll = ref();
function updateScreenWidth() {
	scr.value = window.innerWidth;
}
function updateNavOnScroll() {
	scroll.value = window.scrollY;
	isHovered.value = false;
}

function hover() {
	clearTimeout(timer);
	isHovered.value = true;
}
function unHover() {
	timer = setTimeout(() => {
		isHovered.value = false;
	}, 200);
}
onMounted(() => {
	scr.value = window.innerWidth;
	window.addEventListener('resize', updateScreenWidth);
	window.addEventListener('scroll', updateNavOnScroll);
});
</script>

<template>
	<nav :style="{ backgroundColor: scroll ? '#331abbe6' : 'transparent' }">
		<div class="navbar">
			<img class="logo" src="@/assets/daedalus.png" alt="" />
			<ul v-if="scr > 800">
				<RouterLink to="/browse">Main Page</RouterLink>
				<RouterLink to="/series">Series</RouterLink>
				<RouterLink to="/movies">Movies</RouterLink>
				<RouterLink to="/new-popular">New and popular</RouterLink>
			</ul>
			<button v-if="scr <= 800" @click="hover()" @mouseover="hover()" @mouseleave="unHover()"
				>Browse <span>▼</span></button
			>

			<div v-if="props.av" class="profile">
				<p>{{ props.av.email }}</p>
				<img :src="`/img/${props.av.avatar}`" alt="" />
			</div>
		</div>
		<div
			class="mobile-list"
			v-if="isHovered"
			@mouseleave="unHover()"
			@mouseover="hover()"
		>
			<ul>
				<RouterLink to="/browse">Main Page</RouterLink>
				<RouterLink to="/series">Series</RouterLink>
				<RouterLink to="/movies">Movies</RouterLink>
				<RouterLink to="/new-popular">New and popular</RouterLink>
			</ul>
		</div>
	</nav>
</template>

<style scoped lang="scss">
button {
	background: none;
	border: none;
	font-size: 1.25rem;
	font-weight: 600;
	color: white;
	justify-self: start;
	padding: 1rem 0;
	cursor: pointer;
	span {
		font-size: 0.75rem;
	}
}
p {
	font-size: 12px;
}
ul {
	display: flex;
	list-style-type: none;
	gap: 30px;
	padding: 0;
}
nav {
	position: sticky;
	top: 0;
	z-index: 25;
	transition: all 0.3s;

	width: 100%;
	margin: 0 auto;
}
.navbar {
	display: grid;
	grid-template-columns: max-content 1fr max-content;
	gap: 30px;
	align-items: center;
	justify-content: flex-start;
	height: 5.375rem;
	margin: auto;
	width: 100%;
	left: 0;
	right: 0;
}
.profile {
	display: flex;
	height: 40px;
	align-items: center;
}

img {
	align-self: center;
	display: block;
	height: 100%;
	width: auto;
}
.logo {
	width: 100%;
	height: auto;
}
@media screen and (max-width: 800px) {
	.navbar {
		grid-template-columns: 30% 1fr max-content;
	}
	.mobile-list {
		width: 100%;
	}
	.profile {
		justify-self: end;
	}
	ul {
		transition: all;
		opacity: 1;
		transition-duration: 150ms;
		display: flex;
		position: absolute;
		background-color: rgba(46, 41, 41, 0.9);
		left: 0;

		border: 1px solid hsla(0, 0%, 100%, 0.15);

		color: #fff;
		cursor: default;
		font-size: 13px;
		line-height: 21px;
		min-width: 60vw;
		z-index: 12;
		flex-direction: column;
		list-style-type: none;

    gap:0;
		margin: 1rem;
		text-align: center;
		font-size: 20px;
	}
	a {
		line-break: strict;
		width: 100%;
    padding: 2rem 3rem 2rem 3rem;
    color:white;
    text-decoration: none;
	}
  a:hover{
   background-color: #ffffff15;
  }
}
@media screen and (min-width: 800px) {
	.navbar {
		max-width: calc(100% - 4rem);
	}
}

@media screen and (min-width: 1280px) {
	.navbar {
		max-width: calc(83.33333333333334% - 6rem);
	}
}
@media screen and (min-width: 1920px) {
	.navbar {
		max-width: calc(66.66666666666666% - 6rem);
	}
}
</style>
