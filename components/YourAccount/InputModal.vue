<script setup lang="ts">
  const phone = usePhone();
</script>

<template>
  <div
    class="modal-backdrop"
    style=""
  >
    <div class="modal">
      <form
        @submit.prevent="verifyNewNumber(phone.newNumber)"
        action=""
      >
        <header class="modal-header">Change Phone Number</header>

        <section class="modal-body">
          Enter new phone number

          <input
            v-model="phone.newNumber"
            type="text"
          />
        </section>

        <footer class="modal-footer">
          <button
            @click="verifyNewNumber(phone.newNumber)"
            type="button"
            class="btn-input"
          >
            Confirm
          </button>
          <button
            @click="phone.changePhone = false"
            type="button"
            class="btn-input"
          >
            Cancel
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
