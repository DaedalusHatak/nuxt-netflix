<script setup lang="ts">

  const props = defineProps<{
    slide: Movie | TVSerie;
    position: DOMRect;
    text: boolean;
    isMobile?: boolean;

  }>();
const elementToWatch = ref();

const emit = defineEmits<{
   
    (e: "cardElement", value: DOMRect): void;
    (e: "mouseLeave",value:boolean):void;
  }>();


  onMounted(async () => {
  await nextTick();

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const rect = entry.contentRect;
      emit('cardElement', rect); // Emit updated dimensions
    }
  });

  // Start observing
  if (elementToWatch.value) {
    resizeObserver.observe(elementToWatch.value);
  }
})

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
    preload
      :src="props.slide.image"
      :alt="(props.slide as Movie).title || (props.slide as TVSerie).name "
      width="250"
      height="120"
    />
    <div class="info-rel">
      <div
        :class="props.text ? '' : 'hidden'"
        class="info"
      >
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
    </div>
    <button class="button-class" @click="emit('mouseLeave',true)" v-if="props.isMobile">Close</button>
  </div>
</template>

<style scoped lang="scss">
.button-class{
background-color: red;
position: absolute;
bottom: 0;
z-index: 25;
transform: translateY(calc(100% + 10px));
padding-top: 10px;
}
  .hovered {
    position: relative;
    --scale-size: 1.85;
    z-index: 26;
  }
  .info-rel {
 
    width: 100%;
    
  }
  .info {
    width: 100%;
    padding: 0.5rem 0.25rem;
    background-color: #181818;
    border-radius: 0 0 7px 7px;
    margin: -1px 0;
    transition: all 0.2s;
    height: max-content;
  }

  h3 {
    font-size: 9px;
    font-weight: 300;
    line-height: 17px;
    padding: 0;
    transform:  scale( calc(2 / var(--scale-size)));
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
  button {
	display: inline-flex;
	align-self: center;
	align-items: center;
	justify-content: center;
	writing-mode: horizontal-tb !important;
	width: 100%;
	max-width: 30rem;
	margin-top: 1rem;
	flex: 0 0 auto;
	border: 0px;
	
	font-size: 1.5rem;
	font-weight: 500;

	padding: 0.55rem 1rem;
	background: #331abbe6;
	cursor: pointer;
	color: rgb(255, 255, 255);
	border-radius: 1rem;
}
  img {
    object-fit: fill;
    width: 100%;
    height: auto;
    border-radius: 7px 7px 0 0;
  }
</style>
