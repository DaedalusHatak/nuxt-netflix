<script setup lang="ts">
  const somevar = ref(false);
  const counter = ref(0);
  function somefunc(value: any) {
    if (counter.value < 5) {
      counter.value++;
      return;
    }
    somevar.value = false;
  }
</script>

<template>
  <div>
    <input
      type="checkbox"
      v-model="somevar"
      @change="somefunc(!somevar)"
    />
    {{ somevar }}
  </div>
</template>

<style scoped lang="scss">
  div {
    width: 100%;
    height: 100vh;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
  input {
    font-size: 25px;
  }
  h1 {
    margin-inline: auto;
    width: 70vw;
    max-width: 700px;
    text-align: center;
    font-size: 1.7rem;
  }
</style>
