<template>
  <div class="hovered">
    <nuxt-img
      :src="props.slide.image"
      :alt="props.slide.title || props.slide.name"
      width="250"
      height="120"
    />
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
</template>

<script setup lang="ts">
import { Movie } from "~/types";

const props = defineProps<{
  slide: Movie;
  position: DOMRect;
  text: boolean;
}>();
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
.info {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.25rem;
  background-color: #181818;
  border-radius: 0 0 7px 7px;
  margin: -1px 0;
  height: max-content;
  overflow: hidden;
}

.hidden {
  h3,
  p {
    white-space: nowrap;
    visibility: hidden;
  }
}

h3 {
  font-size: calc(clamp(0.4rem, 1.5dvw, 0.7rem) / 1.1);
  font-weight: 300;
  line-height: 1.1rem;
  // transform:  scale( calc(1 / var(--scale-size)));
}
p {
  font-size: calc(clamp(0.4rem, 1.5dvw, 0.7rem) / 1.1);
  font-weight: 300;
  padding: 0.1rem 0;
}
.overview {
  font-size: calc(clamp(0.2rem, 1.5dvw, 0.6rem) / 1.1);
}
.name {
  font-weight: 700;
}
.hovered {
  line-height: normal;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  position: absolute;
  transform: translate(-50%, -50%) scale(var(--scale-size));
  display: grid;
  font-weight: 400;

  grid-template-rows: min-content 1fr;

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
