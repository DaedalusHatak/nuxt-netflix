<template>
  <div class="delete">
    <button
      @click="deletePhone()"
      id="recaptcha-container"
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
