<script setup lang="ts">
const props = defineProps<{
  av: any;
}>();
const isHoveredMenu = ref();
const isHoveredProfile = ref();
const isNavigating = ref(false);
let timer: any;
let timerProfile: any;
const scr = ref();
const scroll = ref();
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
  timerProfile = setTimeout(() => {
    isHoveredProfile.value = false;
  }, 200);
}
async function signOut() {
  isNavigating.value = true;
  isHoveredMenu.value = false;
  isHoveredProfile.value = false;
  await signOutUser();
  navigateTo("/");
}
onMounted(() => {
  scr.value = window.innerWidth;
  window.addEventListener("resize", updateScreenWidth);
  window.addEventListener("scroll", updateNavOnScroll);
});
</script>

<template>
  <nav :style="{ backgroundColor: scroll ? '#331abbe6' : 'transparent' }">
    <div class="navbar">
      <nuxt-img preload class="logo" src="daedalus.png" alt="" />
      <ul class="desktop-list">
        <RouterLink to="/browse">Main Page</RouterLink>
        <RouterLink to="/series">Series</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
        <RouterLink to="/new-popular">New and popular</RouterLink>
      </ul>
      <button @click="hover()" @mouseover="hover()" @mouseleave="unHover()">
        Browse <span>▼</span>
      </button>

      <div
        @click="hoverProfile()"
        @mouseover="hoverProfile()"
        @mouseleave="unHoverProfile()"
        class="profile"
      >
        <nuxt-img preload :src="`${props.av.avatar}`" />
      </div>
    </div>
    <div
      v-if="isHoveredProfile"
      @mouseleave="unHoverProfile()"
      @mouseover="hoverProfile()"
      class="mobile-list"
    >
      <ul class="right">
        <RouterLink to="/YourAccount">Account</RouterLink>
        <a @click="signOut()" to="/">Logout</a>
      </ul>
    </div>
    <div
      class="mobile-list"
      v-if="isHoveredMenu"
      @mouseleave="unHover()"
      @mouseover="hover()"
    >
      <ul class="left">
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
.left {
  left: 0;
}
.right {
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
