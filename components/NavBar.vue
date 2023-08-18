<script setup lang="ts">
const props = defineProps<{
  av: any;
}>();
</script>

<template>
  <nav>
    <div class="navbar">
      <span class="logo-span"><img src="@/assets/daedalus.png" alt="" /> </span>
      <ul>
        <RouterLink to="/browse">Main Page</RouterLink>
        <RouterLink to="/series">Series</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
        <RouterLink to="/new-popular">New and popular</RouterLink>
      </ul>

      <div v-if="props.av" class="profile">
        <p>{{ props.av.email }}</p>
        <img :src="`_nuxt/assets/img/${props.av.avatar}`" alt="" />
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
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
  position: absolute;
  background-color: dimgray;
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
@media screen and (min-width: 600px) {
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
