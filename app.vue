
<template>

  <main>
    <div id="recap"></div>
 
      <NuxtPage />
      </main>
</template>
<script setup>
const lang = useBrowserLocale();
console.log('lang',lang)
</script>

<style scoped>


iframe{
  overflow: hidden !important;
  overflow-y: hidden !important;
  width:50vw;
}
</style>
<!-- {
  "rules": {
    ".read": "now < 1697061600000",  // 2023-10-12
    ".write": "now < 1697061600000",  // 2023-10-12
  }
} -->