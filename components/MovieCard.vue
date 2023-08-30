<template>
  <div ref="elementToWatch" class="hovered">

    <nuxt-img
      :src="props.slide.image"
      :alt="props.slide.title || props.slide.name"
      width="250"
      height="120"
    />
<div class="info-rel">
	<div class="info" :class="props.text ? '' : 'hidden'">
      <h3>
        <span class="name">Title:</span>
        {{ props.slide.title || props.slide.name }}
      </h3>
      <p><span class="name">Release date:</span> {{ releaseDate }}</p>
      <p>
        <span class="name">Rating</span> {{ props.slide.vote_average }}
        <span class="name">Votes:</span> {{ props.slide.vote_count }}
      </p>
      <p class="overview">
        <span class="name">Overview: </span> {{ props.slide.overview }}
      </p>
    </div>
</div>
  </div>
</template>

<script setup lang="ts">
import { Movie } from "~/types";

const props = defineProps<{
  slide: Movie;
  position: DOMRect;
  text: boolean;
}>();
const pos = ref<any>({height: 0});
	const elementToWatch = ref();
onMounted(()=>{
if(elementToWatch.value){

	pos.value = elementToWatch.value.clientHeight;
	watch(
      elementToWatch,
      (newHeight) => {
        pos.value = newHeight;
        console.log('elementToWatch height changed:', newHeight);
      }
    );
}

})


const renderText = computed(() => {
  if (props.text) return props.text;
});
const releaseDate = computed(() => {
  if (props.slide.release_date) {
    return props.slide.release_date.split("-").reverse().join("-");
  } else {
    return props.slide.first_air_date.split("-").reverse().join("-");
  }
});
</script>

<style scoped lang="scss">
.hovered {
  --scale-size: 1.85;
}
.info-rel{
	position: relative;
	width:100%;
}
.info {

  position: absolute;
	width: 100%;
  padding: 0.5rem 0.25rem;
  background-color: #181818;
  border-radius: 0 0 7px 7px;
  margin: -1px 0;
  transition: all 0.2s;
  height: max-content;
  overflow: hidden;
}

.hidden {

  .overview{
	display: none;
  }

}

h3 {
  font-size:10px;
  font-weight: 300;
  line-height: 1.1rem;
  padding: 0;
  // transform:  scale( calc(1 / var(--scale-size)));
}
p {
	font-size:10px;
  font-weight: 300;
  padding: 0.1rem 0;
}
.overview {
	font-size:10px;
}
.name {
  font-weight: 700;
}
@container (min-width: 50px) {
   h3 {
	font-size: calc(clamp(0.4rem, 1vw, 0.7rem) / 1.1);
  }
  p{
	font-size: calc(clamp(0.3rem, 1vw, 0.7rem) / 1.1);
  }
  .overview {
  font-size: calc(clamp(0.2rem, 1vw, 0.6rem) / 1.1);
}
}
.hovered {
  line-height: normal;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  position: absolute;

  display: grid;
  align-items: flex-end;
  font-weight: 400;
  transform-origin: bottom center; 
  transform:  scale(var(--scale-size)) translate(-25%, -12%);
  grid-template-rows: auto 1fr;

  gap: 0;

  padding: 0;
  z-index: 25;
}

img {
  object-fit: fill;
  width: 100%;
  height: auto;
  border-radius: 7px 7px 0 0;
}
</style>
