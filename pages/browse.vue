<script setup lang="ts">
  useHead({
    bodyAttrs: { class: "dark" },
  });
  const arrOfPaths = ref<string[]>([
    "3/movie/popular",
    "3/movie/top_rated",
    "3/tv/popular",
    "3/tv/top_rated",
  ]);
  const arrOfHeaders = ref<string[]>([
    "Popular movies",
    "Top rated movies",
    "Popular TV series",
    "Top rated TV series",
  ]);
  const userProfile =  useProfile();
  const firestoreClient = ref({
    avatar: userProfile?.value.photoURL
      ? userProfile.value.photoURL
      : "raiden.png",
    email: userProfile.value.email,
  });

  const movieCard = ref();
  const classy = ref();
  const currElement = ref();
  const scaledWidth = ref<number>();
  const isHovering = ref<boolean>(false);
  const showText = ref<boolean>(false);
  const currPosition = ref();
  const centerPosition = computed(() => {
    let x, y, width: number;

    if (currPosition.value) {
      x = currPosition.value.x + currPosition.value.width / 2;

      // 86 is from navbar moving it down a little
      y = currPosition.value.top - 25 + window.scrollY;
      // y =
      //   currPosition.value.y +
      //   currPosition.value.height / 2 +
      //   window.scrollY -
      //   86;
      if (scaledWidth.value) {
        width = scaledWidth.value;

        if (x >= window.innerWidth - width) {
          classy.value = "right";
        } else if (x - width <= 0) {
          classy.value = "left";
        } else {
          classy.value = "center";
        }
        return { x, y, width };
      }

      return { x, y };
    }
  });

  const setClasses = computed(() => {
    if (classy.value === "left" && showText.value) {
      return "trans-scale left";
    } else if (classy.value === "right" && showText.value) {
      return "trans-scale right";
    } else if (showText.value) {
      return "trans-scale";
    } else {
      return "";
    }
  });
  //Proper title header
  function setHeader(id: string | number) {
    if (typeof id === "number") return arrOfHeaders.value[id];
    else {
      return "";
    }
  }

  //Position of hovered element
  function currElementHandler(e: Movie) {
    isHovering.value = true;

    if (!currElement.value) currElement.value = e;
  }

  function currPositionHandler(e: DOMRect) {
    scaledWidth.value = e.width;
    if (!currPosition.value) currPosition.value = e;
  }
  //Transition functions
  function onBeforeEnter() {
    setTimeout(() => {
      showText.value = false;
    }, 1);
  }
  function onEnter() {
    setTimeout(() => {
      showText.value = true;
    }, 1);
  }
  //Hide & clear hovered element
  function onMouseLeave() {
    showText.value = false;

    setTimeout(() => {
      showText.value = false;
      isHovering.value = false;
      currElement.value = undefined;
      scaledWidth.value = 0;
      currPosition.value = undefined;
    }, 1);
  }
</script>
<template>
  <Head>
    <Meta
      name="description"
      content="Movie database"
    />
  </Head>
  <NavBar
    :is-account="false"
    :av="firestoreClient"
  ></NavBar>

  <div class="flex-center">
    <div class="movie-wrapper">
      <NuxtPage
        @hov-element="currElementHandler"
        @position-element="currPositionHandler"
      />
      <section
        v-for="(movie, index) in arrOfPaths"
        v-if="!$route.params.id"
        :key="movie"
        class="movie-section"
      >
        <h2>{{ setHeader(index) }}</h2>

        <MovieList
          :list="movie"
          @hov-element="currElementHandler"
          @position-element="currPositionHandler"
        />
      </section>
    </div>

    <Transition
      @enter="onEnter"
      @before-enter="onBeforeEnter"
      @before-leave="onMouseLeave"
    >
      <MovieCard
        v-if="isHovering && centerPosition"
        ref="movieCard"
        :class="setClasses"
        :text="showText"
        :slide="currElement"
        :position="currPosition"
        :style="{
          left: `${centerPosition.x}px`,
          top: `${centerPosition.y}px`,
          width: `${centerPosition.width}px`,
        }"
        @mouseleave="onMouseLeave()"
        class="trans"
      ></MovieCard>
    </Transition>
  </div>
</template>

<style scoped>
  .trans {
    transform: translate(-50%, -60%);
    transition: all 0.2s ease-in-out;
  }
  .trans-scale {
    transform-origin: center center;
    transform: scale(1.85) translate(-25%, -50%);
  }
  .left {
    transform-origin: left center;
  }
  .right {
    transform-origin: right center;
  }
  h2 {
    font-size: 2vw;
  }
  .movie-wrapper {
    display: grid;

    gap: 50px;
  }
  .movie-section {
    text-align: left;
  }
  .flex-center {
    text-align: center;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
    margin-bottom: 5rem;
    font-size: 1.5rem;
    font-weight: 500;
    min-height: 3.5rem;
    padding: 0.75rem 1.5rem;
    background: #331abbe6;
    cursor: pointer;
    color: rgb(255, 255, 255);
    border-radius: 1rem;
  }

  @media screen and (min-width: 420px) {
    .flex-center {
      text-align: center;
      padding: 2rem 3rem;
      display: flex;
      flex-direction: column;
    }
  }
  @media screen and (max-width: 800px) {
    h2 {
      font-size: 16px;
    }
  }
</style>
