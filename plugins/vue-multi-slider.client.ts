import ImageCarousel from "vue-multi-slider";

export default defineNuxtPlugin(async (nuxtApp) => {
  useNuxtApp().vueApp.use(ImageCarousel);
});
