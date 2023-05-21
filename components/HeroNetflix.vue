<script setup lang="ts">
import GetStartedForm from '@/components/GetStartedForm.vue';
import { RouterLink } from 'vue-router';

</script>

<template>
        <img
      class="hero-img"
      src="@/assets/hero.jpg"
      alt=""
    />
    <div class="shadow-hero-image"></div>
    <div class="hero-wrapper">
      <nav>
        <span class="logo-span"
          ><img src="@/assets/daedalus.png" alt="">
        </span>
        <RouterLink to="/login"  class="sign-in-button">Sign In</RouterLink>
      </nav>
      <div class="flex-hero">
        <div class="info">  <h1>THIS IS NOT NETFLIX PAGE</h1>
          <h1>IT IS ONLY PORTFOLIO PURPOSE</h1>
          <h3>DON'T USE YOUR ACTUAL NETFLIX DATA</h3>
        </div>
        <div class="header-hero">
       
          <h1>Unlimited movies, TV shows, and more</h1>
      
          <p class="subtitle-hero">Watch anywhere. Cancel anytime.</p>
         <GetStartedForm/>
        </div>
      </div>
    </div>
</template>
<style scoped lang="scss">
@media screen and (min-width: 600px) {
  nav {
    max-width: calc(100% - 4rem);
  }
}
@media screen and (min-width: 1280px) {
  nav {
    max-width: calc(83.33333333333334% - 6rem);
  }
}
@media screen and (min-width: 1920px) {
  nav {
    max-width: calc(66.66666666666666% - 6rem);
  }
}
.info{
  color:gold;

inset: 0;
margin: auto;
text-align: center;
 h1{
  font-size:2.5rem;
  font-family:fantasy;
  letter-spacing: 0.2ch;
  text-decoration:underline;
  font-weight: 600;
 }
 h3{
  font-size: 2rem;
  padding-top: 1rem;
  font-weight: 600;
 }
}
@media (min-width: 720px) {

  .info{
    position: absolute;
    inset: 0;
    top: 70px;
    h1{
  font-size:2.8rem;
  font-family:fantasy;
  letter-spacing: 0.2ch;
  text-decoration:underline;
  font-weight: 600;
 }
 h3{
  font-size: 2rem;
  font-weight: 600;
 }
  }
  
}
nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 5.375rem;
  margin: auto;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
}
.logo-span {
  margin-right: auto;
}
.hero-image {

  background: rgb(0 0 0 / 40%);

}
.hero-wrapper {
  margin: auto;
}
.hero-img {
  height: 100%;
  width: 100%;
  
  position: absolute;
  object-fit: cover;
  transform: scale(1.25) translateY(-10%);
  overflow: hidden;
}
.flex-hero {
  display: flex;
  flex-direction: column;
  padding: 9.875rem 0 4rem;
  min-height: 43.75rem;
}
a{
    display: flex;
    align-items: center;
    text-decoration: none;
}
.shadow-hero-image {
  background: rgb(0 0 0 / 40%);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.header-hero {
  max-width: calc(100% - 4rem);
  margin: auto;
  color: white;
  text-align: center;
  font-size: 50px;
}
.subtitle-hero {
  margin: 1rem 0 0;
}


.logo {
  width: 9.25rem;
  height: 2.5rem;
  color: rgba(229, 9, 20, 1);
  fill: currentColor;
  display: block;
}



.sign-in-button {
  z-index: 1000;
  border: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  fill: currentColor;
  position: relative;
  transition-duration: 250ms;
  transition-property: background-color, border-color;
  transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
  vertical-align: text-top;
  width: auto;
  line-height: 1;
  font-size: 0.875rem;
  font-weight: 500;
  min-height: 2rem;
  padding: 0.25rem 0.95rem;
  background: rgb(229, 9, 20);
  color: rgb(255, 255, 255);
}

</style>