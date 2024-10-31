<script setup lang="ts">
const props = defineProps<{
	list: string;
}>();
const i18n = useI18n();
const errorCount = ref(0);
const browserLang = useBrowserLocale() || i18n.locale.value;
const tmdbLang = i18n.locales.value.map((locale) => locale.code || locale);

const lang = tmdbLang.includes(browserLang) ? browserLang : i18n.locale.value;
const { data, refresh, error } = await useFetch(
	`/api/getMovies?_=${props.list}&lang=${lang}`
);
if (error.value && errorCount.value < 5) {
	errorCount.value++;
	await refresh();
}
</script>

<template>
	<MovieCarousel
		v-if="data?.results"
		:emit-image="true"
		:emit-image-delay="350"
		:size="2"
		:sm="3"
		:md="4"
		:lg="5"
		:overflow="true"
		:button-padding="-3"
		:button-width="3"
		:button-visibile="true"
		:xl="6"
		:xxl="7"
		:data="data!.results"
		@hov-element="$emit('hovElement', $event)"
		@position-element="$emit('positionElement', $event)"
	/>
</template>

<style scoped></style>
