<script setup lang="ts">
import { NuxtLinkOptions, NuxtLinkProps } from 'nuxt/app';

const props = defineProps<{
	av: any;
	isAccount: boolean;
}>();
const user = useProfile();
const photo = computed(() => {
	if (user.value.photoURL) {
		return user.value.photoURL;
	} else {
		return 'raiden.png';
	}
});

const logo = 'daedalus.png';
const isHoveredMenu = ref<boolean>(false);
const isHoveredProfile = ref<boolean>(false);
const isKeyboardNavigating = ref<boolean>(false);
const isNavigating = ref<boolean>(false);
let timer: NodeJS.Timeout;
let timerProfile: NodeJS.Timeout;
const scr = ref<number>();
const scroll = ref<number>();
function updateScreenWidth() {
	scr.value = window.innerWidth;
}
function updateNavOnScroll() {
	scroll.value = window.scrollY;
	isHoveredMenu.value = false;
}

function hover() {
	clearTimeout(timer);
	if (!isNavigating.value) {
		isHoveredMenu.value = true;
	}
}
function unHover() {
  profileCounter.value = 0;
	timer = setTimeout(() => {
		isHoveredMenu.value = false;
	}, 200);
}
function hoverProfile() {
	clearTimeout(timerProfile);
	if (!isNavigating.value) {
		isHoveredProfile.value = true;
	}
}
function unHoverProfile() {
  profileCounter.value = 0;
	timerProfile = setTimeout(() => {
		isHoveredProfile.value = false;
	}, 200);
}
const account = ref<ComponentPublicInstance | null>(null);
const mainPage = ref<ComponentPublicInstance | null>(null);
const dropdown = ref();
const menuDropdown = ref();
const profileCounter = ref(0);

function PreviousArrowKey($event: any) {
	if (profileCounter.value > 0) {
		profileCounter.value--;
	}
	if (isHoveredMenu.value === true) {
		menuDropdown.value.children[profileCounter.value].focus();
	} else if (isHoveredProfile.value === true) {
		dropdown.value.children[profileCounter.value].focus();
	}
}
function NextArrowKey($event: any) {
	if (profileCounter.value < 3) {
		profileCounter.value++;
	}
	if (isHoveredMenu.value === true) {
		menuDropdown.value.children[profileCounter.value].focus();
	} else if (isHoveredProfile.value === true) {
		dropdown.value.children[profileCounter.value].focus();
	}
}

function startArrowKeys($event: any) {
	if (isHoveredMenu.value === true) {

		mainPage.value?.$el.focus();
	} else if (isHoveredProfile.value === true) {
		account.value?.$el.focus();
	}
}

async function signOut() {
	isNavigating.value = true;
	isHoveredMenu.value = false;
	isHoveredProfile.value = false;
	const team = await signOutUser();
	await navigateTo('/');
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
			<nuxt-img
      :tabindex="isAccount ? '0' : ''"
      @keydown.space.exact.prevent="isAccount ? navigateTo('/browse') : ''"
        @keydown.enter.exact="isAccount ? navigateTo('/browse') : ''"
				@click="isAccount ? navigateTo('/browse') : ''"
				:style="{ cursor: isAccount ? 'pointer' : '' }"
				:src="logo"
				preload
				format="webp"
				height="64px"
				width="185px"
				class="logo"
				alt="Daedalus logo"
			/>

			<ul v-if="!props.isAccount" class="desktop-list">
				<NuxtLink to="/browse">Main Page</NuxtLink>
				<NuxtLink to="/browse/tv">Series</NuxtLink>
				<NuxtLink to="/browse/movie">Movies</NuxtLink>
				<NuxtLink to="/browse/popular">New and popular</NuxtLink>
			</ul>
			<button
				v-if="!props.isAccount"
        @keydown.space.exact.prevent="isHoveredMenu ? unHover() : hover()"
        @keydown.enter.exact="isHoveredMenu ? unHover() : hover()"
				@keydown.esc.exact="unHover()"
				@keydown.up.exact.prevent="startArrowKeys"
				@keydown.down.exact.prevent="startArrowKeys"
				@mouseover="hover()"
				@mouseleave="unHover()"
			>
				Browse <span>▼</span>
			</button>
			<div
				class="mobile-list"
				v-if="isHoveredMenu"
				
				@mouseover="hover()"
				@mouseleave="unHover()"
			>
				<ul ref="menuDropdown" class="list">
					<NuxtLink
						ref="mainPage"
						@keydown.shift.tab="unHover()"
						@keydown.down.exact.prevent="NextArrowKey"
						to="/browse"
						>Main Page</NuxtLink
					>
					<NuxtLink
						@keydown.up.exact.prevent="PreviousArrowKey"
						@keydown.down.exact.prevent="NextArrowKey"
						to="/browse/tv"
						>Series</NuxtLink
					>
					<NuxtLink
						@keydown.up.exact.prevent="PreviousArrowKey"
						@keydown.down.exact.prevent="NextArrowKey"
						to="/browse/movie"
						>Movies</NuxtLink
					>
					<NuxtLink
						@keydown.up.exact.prevent="PreviousArrowKey"
						@keydown.tab.exact="unHover()"
						to="/browse/popular"
						>New and popular</NuxtLink
					>
				</ul>
			</div>
			<div
				tabindex="0"
				aria-haspopup="true"
				aria-controls="menu"
        @keydown.enter.exact="isHoveredProfile ? unHoverProfile() : hoverProfile()"
        @keydown.space.exact.prevent="isHoveredProfile ? unHoverProfile() : hoverProfile()"
				@keydown.esc.exact="unHoverProfile()"
				@keydown.up.exact.prevent="startArrowKeys"
				@keydown.down.exact.prevent="startArrowKeys"
				@mouseover="hoverProfile()"
				@mouseleave="unHoverProfile()"
				class="profile"
			>
				<nuxt-img
					:src="photo"
					preload
					format="webp"
					height="40px"
					width="40px"
				/>
			</div>
		</div>
		<div
			@keydown.esc.exact="unHoverProfile()"
			v-if="isHoveredProfile"
			@mouseleave="unHoverProfile()"
			@mouseover="hoverProfile()"
			class="mobile-list"
		>
			<ul ref="dropdown" class="account">
				<NuxtLink
					ref="account"
					@keydown.shift.tab="unHoverProfile()"
					@keydown.down.exact.prevent="NextArrowKey"
					to="/YourAccount"
					>Account</NuxtLink
				>
				<NuxtLink
					ref="posts"
					@keydown.up.exact.prevent="PreviousArrowKey"
					@keydown.down.exact.prevent="NextArrowKey"
					to="/posts"
					>Posts</NuxtLink
				>
				<NuxtLink
					ref="logout"
					@keydown.tab.exact="unHoverProfile()"
					@keydown.up.exact.prevent="PreviousArrowKey"
					@click="signOut()"
					to="/"
					>Logout</NuxtLink
				>
			</ul>
		</div>
	</nav>
</template>

<style scoped lang="scss">
button {
	display: none;
	visibility: hidden;
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
.list {
	left: 0;
}
.account {
	right: 0;
	transition: all;
	opacity: 1;
	transition-duration: 150ms;
	display: flex;
	position: absolute;
	background-color: rgba(46, 41, 41, 0.9);

	border: 1px solid hsla(0, 0%, 100%, 0.15);

	color: #fff;
	cursor: default;
	font-size: 13px;
	line-height: 21px;
	min-width: 20vw;
	z-index: 12;
	flex-direction: column;
	list-style-type: none;

	gap: 0;
	margin: 1rem;
	text-align: center;
	font-size: 20px;
	a {
		width: 100%;
	}
}
p {
	font-size: 12px;
}
a {
	cursor: pointer;
	transition: all 250ms;
	line-break: strict;
	width: max-content;
	padding: 1rem 1rem;
	font-size: 0.85rem;
	color: white;
	text-decoration: none;
}
a:hover {
	color: #b3b3b3;
}
ul {
	display: flex;
	list-style-type: none;
	width: max-content;
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
	gap: 10px;
	align-items: center;
	justify-content: flex-start;
	height: 5.375rem;
	margin: auto;
	width: 100%;
	left: 0;
	right: 0;
	padding: 0 1rem;
}
.profile {
	display: flex;
	height: 40px;
	align-items: center;
	justify-self: end;
	cursor: pointer;
	grid-column-end: -1;
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
@media screen and (max-width: 400px) {
	button {
		font-size: 0.9rem;
	}
}
@media screen and (max-width: 880px) {
	.navbar {
		grid-template-columns: 30% 1fr max-content;
	}
	button {
		display: block;
		visibility: visible;
	}
	.mobile-list {
		top: 100%;
		position: absolute;
		width: 100%;
	}
	.profile {
		justify-self: end;
	}
	.right {
		min-width: 35vw;
	}
	.desktop-list {
		display: none;
	}
	ul {
		transition: all;
		opacity: 1;
		transition-duration: 150ms;
		display: flex;
		position: absolute;
		background-color: rgba(46, 41, 41, 0.9);

		border: 1px solid hsla(0, 0%, 100%, 0.15);

		color: #fff;
		cursor: default;
		font-size: 13px;
		line-height: 21px;
		min-width: 50vw;
		z-index: 12;
		flex-direction: column;
		list-style-type: none;

		gap: 0;
		margin: 1rem;
		text-align: center;
		font-size: 20px;
	}
	a {
		width: 100%;
		font-size: 1rem;
		padding: 2rem 3rem 2rem 3rem;
	}
	a:hover {
		color: white;
		background-color: #ffffff15;
	}
}
@media screen and (min-width: 800px) {
	.navbar {
		max-width: calc(100% - 4rem);
	}
}
@media screen and (min-width: 1024px) {
	a {
		font-size: 1rem;
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
