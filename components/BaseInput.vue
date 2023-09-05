<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
	name: string;
	type: string;
	modelValue: string;
	background: boolean;
	pattern?: string;
	border?: boolean;
	required?: boolean;
	checkValid?: boolean;
  errorMessage?: Array<string>;
}>();
const isActive = ref(false);
const invalid = ref(false);
const checkIsActive = computed(() => {
	if (props.modelValue) {
		isActive.value = true;
	} else isActive.value = false;
});
defineEmits(['update:modelValue']);

function focusIn() {

	isActive.value = true;
}
function focusOut() {
	if (props.modelValue === '' || props.modelValue === undefined) {
		if (props.checkValid) {
			invalid.value = true;
		}

		isActive.value = false;
	}
  else if(props.modelValue.length < 5){
    if (props.checkValid) {
			invalid.value = true;
		}
    isActive.value = true;
  }
   else {
		if (props.checkValid) {
			invalid.value = false;
		}

		isActive.value = true;
	}

}
</script>

<template>
	<div class="base-input">
		<input
			:class="{ background, border, invalid: invalid }"
			:type="props.type"
			:required="props.required"
			:value="props.modelValue"
			@input="
				$emit('update:modelValue', ($event.target as HTMLInputElement).value)
			"
			name="test"
			@focusout="focusOut"
			@change="props.modelValue === '' ? (isActive = false) : (isActive = true)"
			@focusin="focusIn"
			:is-active="checkIsActive"
			:autocomplete="props.type === 'password' ? 'current-password' : 'email'"
			:id="props.type"
			:pattern="props.pattern"
			minlength="5"
			maxlength="50"
		/>
		<label :class="isActive ? 'label-active' : 'label'" :for="props.type">{{
			props.name
		}}</label>
		<p class="error" v-if="invalid"
			>
     <error></error>
    <span v-if="props.modelValue.length === 0">
      {{ props.errorMessage![0] }}
    </span>
    <span v-else>
      {{ props.errorMessage![1] }}
    </span>
  </p>
	</div>
</template>

<style scoped lang="scss">
p {
  margin-top: 5px;
	font-size: 13px;
	color: red;
}
.base-input {
	width: 100%;
}
.background {
	background-color: #333 !important;
	color: white;
	
}

.border {
	border: 1px solid black;
	border-radius: 5px;
}
.invalid {
	border: 1px solid red;
}
.error{
  display: flex;
  gap: 5px;


}
input {
	display: block;
	color: inherit;
	padding: 1.5rem 1rem 0.5rem;
	border: none;
	border-radius: 1rem;
	height: 100%;
	width: 100%;
	background-clip: padding-box;
	appearance: none;
	background-color: transparent !important;
}

.label {
	width: max-content;
	position: absolute;
	z-index: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition-property: top, font-size, line-height;
	transition-duration: 250ms;
	pointer-events: none;
	font-size: 1rem;
	transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
	opacity: 0.7;
	left: 1rem;
	line-height: 1.5rem;
	right: 1rem;
	top: 1rem;
}

.label-active {
	position: absolute;
	z-index: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition-property: top, font-size, line-height;
	transition-duration: 250ms;
	pointer-events: none;
	font-size: 0.75rem;
	transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
	opacity: 0.7;
	left: 1rem;
	line-height: 1.125rem;
	right: 1rem;
	top: 0.5rem;
}

// Background color
.background:-webkit-autofill {
	-webkit-text-size-adjust: auto;
	-webkit-text-fill-color: #fff;
	box-shadow: inset #333 0 0 0 1000px;
	-webkit-background-clip: text;
}

input:-webkit-autofill + .label {
	position: absolute;
	z-index: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition-property: top, font-size, line-height;
	transition-duration: 250ms;
	pointer-events: none;
	font-size: 0.75rem;
	transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
	opacity: 0.7;
	left: 1rem;
	line-height: 1.125rem;
	right: 1rem;
	top: 0.5rem;
}
</style>
