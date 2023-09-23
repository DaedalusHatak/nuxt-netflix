<script setup lang="ts">
  const props = defineProps<{
    message: string | undefined;
  }>();

  const emit = defineEmits<{
    (e: "closeModal", status: any): void;
  }>();

  const inputCode = ref<string | null>(null);
  //Emits input or boolean
  function closeModal() {
    if (props.message === "Enter verification code") {
      emit("closeModal", inputCode.value);
    } else if (props.message === "success") {
      emit("closeModal", true);
    } else {
      emit("closeModal", false);
    }
  }
</script>

<template>
  <div
    class="modal-backdrop"
    style=""
  >
    <div class="modal">
      <header
        v-if="message !== 'success' && message !== 'Enter verification code'"
        class="modal-header"
      >
        Error
      </header>
      <header
        v-else-if="message === 'success'"
        class="modal-header"
      >
        Success
      </header>
      <header
        v-else
        class="modal-header"
      >
        Verification
      </header>
      <section
        v-if="message !== 'success' && message !== 'Enter verification code'"
        class="modal-body"
      >
        Sorry. Something went wrong
        <span class="error">Error: {{ message }}</span>
      </section>
      <section
        v-else-if="message === 'success'"
        class="modal-body"
      >
        You may now log in.
      </section>
      <section
        v-else
        class="modal-body"
      >
        Enter verification code: <input v-model="inputCode" />
      </section>
      <footer class="modal-footer">
        <button
          @click="closeModal"
          type="button"
          class="btn-input"
        >
          Confirm
        </button>
        <button
          v-if="props.message === 'Enter verification code'"
          @click="emit('closeModal', false)"
          type="button"
          class="btn-input"
        >
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .modal-backdrop {
    z-index: 999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000004d;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width: calc(100% - 4rem);
    z-index: 999;
    background: #ffffff;
    border-radius: 15px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 15px;
    display: flex;

    gap: 1.25rem;
    justify-content: flex-end;
  }
  .modal-header {
    font-size: 20px;
  }
  .modal-body {
    flex-direction: column;
  }

  .modal-header,
  .modal-body {
    border-bottom: 1px solid #eeeeee;
    color: #242424;
    justify-content: space-between;
  }
  .error {
    color: red;
  }

  .btn-input {
    color: #fff;
    cursor: pointer;

    padding: 8px;
    background: rgba(51, 26, 187, 0.9);
    border: 1px solid rgba(51, 26, 187, 0.9);
    border-radius: 8px;
  }
  @media screen and (min-width: 420px) {
    .modal {
      width: 420px;
    }
  }
</style>
