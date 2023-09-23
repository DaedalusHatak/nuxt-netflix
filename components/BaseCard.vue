<script setup lang="ts">
  const props = defineProps({
    header: String,
    desc: String,
    reverse: Boolean,
  });
</script>

<template>
  <div
    :style="props.reverse ? ' flex-direction: row-reverse' : ''"
    class="tv"
  >
    <div class="screen text">
      <h2>{{ props.header }}</h2>
      <p>{{ props.desc }}</p>
    </div>
    <div class="screen">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .tv {
    height: 100%;
    min-height: auto;
    margin: auto;
    flex-wrap: nowrap;
    padding: 4.5rem 0;

    align-items: center;
  }
  h2 {
    font-size: 2rem;
    font-weight: 900;
  }
  p {
    margin: 1rem 0 0;
  }

  video {
    position: absolute;
    width: 100%;
  }
  img {
    z-index: 1;

    width: 100%;
  }
  .text {
    margin-bottom: 0.5rem;
  }
  .screen {
    line-height: 1;
    position: relative;
    flex-basis: 50%;
  }
  @media (min-width: 600px) {
    .tv {
      display: flex;
      flex-direction: row;
    }
    p {
      font-size: 1rem;
    }
  }

  @media (min-width: 960px) {
    h2 {
      font-size: 3rem;
    }
  }
</style>
