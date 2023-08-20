<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  name: string;
  type: string;
  modelValue: string;
  background: boolean;
}>();

const isActive = ref<boolean>(false);
defineEmits(["update:modelValue"]);

if (props.modelValue) {
  isActive.value = true;
}
</script>

<template>
  <div class="base-input">
    <input
      :class="props.background ? 'background' : ''"
      :type="props.type"
      :value="props.modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      name="test"
      @focusout="
        props.modelValue === '' || props.modelValue === undefined
          ? (isActive = false)
          : (isActive = true)
      "
      @change="props.modelValue === '' ? (isActive = false) : (isActive = true)"
      @focusin="isActive = true"
      :is-active="isActive"
      :autocomplete="props.type === 'password' ? 'current-password' : 'email'"
      :id="props.type"
      minlength="5"
      maxlength="50"
    />
    <label :class="isActive ? 'label-active' : 'label'" :for="props.type">{{
      props.name
    }}</label>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  width: 100%;
}
.background {
  background-color: #333 !important;
}
input {
  display: block;
  color: white;
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
  color: rgba(255, 255, 255, 0.7);
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
  color: rgba(255, 255, 255, 0.7);
  left: 1rem;
  line-height: 1.125rem;
  right: 1rem;
  top: 0.5rem;
}

// Background color
input:-webkit-autofill {
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
  color: rgba(255, 255, 255, 0.7);
  left: 1rem;
  line-height: 1.125rem;
  right: 1rem;
  top: 0.5rem;
}
</style>
