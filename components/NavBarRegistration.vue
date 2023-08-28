<script setup lang="ts"></script>

<template>
  <nav>
    <div class="navbar">
      <span class="logo-span"><img src="@/assets/daedalus.png" alt="" /> </span>

      <div class="profile">
        <RouterLink to="/login">Sign in</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
a {
  font-size: 19px;
  font-weight: 500;
  line-height: 90px;
  color: #333;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
ul {
  display: flex;
  list-style-type: none;
  gap: 30px;
  padding: 0;
}
nav {
  background-color: white;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #e6e6e6;
}
.navbar {
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 30px;
  align-items: center;
  justify-content: flex-start;
  height: 5.375rem;
  margin: auto;
  width: 100%;
  max-width: calc(100% - 4rem);
  left: 0;
  right: 0;
}

img {
  align-self: center;
  display: block;
  height: auto;
  max-height: 64px;
  width: 100%;
  max-width: 185px;
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
