<script setup lang="ts">
const phone = usePhone();
</script>

<template>
	<div class="delete">
		<button
			id="recaptcha-container"
			@click="deletePhone()"
			class="change-button"
		>
			<span>Delete phone number</span>
		</button>
	</div>
</template>

<style scoped lang="scss">
.delete {
	width: 100%;
	padding: 2rem;
	button {
		width: 100%;
	}
}
</style>
