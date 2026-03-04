<script setup lang="ts">

  const props = defineProps<{
    slide: Movie | TVSerie;
    position: DOMRect;
    text: boolean;
  }>();

const scroll = ref(props.position.y + window.scrollY)

  function isTouchDevice(): boolean {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  const emit = defineEmits<{

    (e: "touch-click", value: boolean): void;
  }>();
function handleTouchClick() {
    emit("touch-click", true);
  }
const calculateTopPosition = () => {
      if (props.position.y && props.position.height) {
        const center = props.position.y + props.position.height / 2;
        scroll.value =center - 48 + window.scrollY;
      }}

  const releaseDate = computed(() => {
    if ((props.slide as Movie).release_date) {
      return (props.slide as Movie).release_date.split("-").reverse().join("-");
    } else {
      return (props.slide as TVSerie).first_air_date
        .split("-")
        .reverse()
        .join("-");
    }
  });
</script>

<template>
  <div
    ref="elementToWatch"
    class="hovered"
    
  >
    <nuxt-img
      :src="props.slide.image"
      :alt="(props.slide as Movie).title || (props.slide as TVSerie).name "
      width="250"
      height="120"
    />
    <div class="info-rel">
      <div
        :class="props.text ? '' : 'hidden'"
        class="info-container"
      >
        <div class="info">
          <h3>
          <span class="name">Title:</span>
          {{ (props.slide as Movie).title || (props.slide as TVSerie).name }}
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
              <button class="close-button" v-if="isTouchDevice()" @click="handleTouchClick">
        Close
      </button>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .hovered {
    --scale-size: 1.85;
  }
  .info-rel {
    position: relative;
    width: 100%;
  }
  .info-container {
    position: absolute;
    width: 100%;
  
    background-color: #181818;
    border-radius: 0 0 7px 7px;
    margin: -1px 0;
    transition: all 0.2s;
    height: max-content;
  }
  .info{
      padding: 0.5rem 0.25rem;
  }
.close-button {

 
  height: 30px;
  width: 100%;
  left: 0;
  bottom: 0;
  border: none;
  border-radius: 0 0 10px 10px;
  background-color: #ff0000;
  color: white;
}

  h3 {
    font-size: 19px;
    font-weight: 300;
    line-height: 17px;
    padding: 0;
     transform:  scale( calc(1 / var(--scale-size)));
  }
  p {
    font-size: 8px;
    font-weight: 300;
    padding: 2px 0;
  }
  .overview {
 
    font-size: 10px;
  }
  .name {
    font-weight: 700;
  }
@media screen and (max-width: 420px) {
  .info-container{
  
  }
    .info{
    padding: 0.25rem 0.125rem;
  }
  .overview {
    font-size: 8px;
  }
}
  .hovered {
    line-height: normal;
    box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
    position: absolute;
    display: grid;
    align-items: flex-end;
    font-weight: 400;
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
