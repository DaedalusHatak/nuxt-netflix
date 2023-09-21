<script setup lang="ts">
import { PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';

const userProfile = useProfile();
const firestoreClient = ref({
  avatar: userProfile.value.photoURL
    ? userProfile.value.photoURL
    : "raiden.png",
  email: userProfile.value.email,
  phone: userProfile.value.phoneNumber
    ? userProfile.value.phoneNumber
    : "",
});
const useAuth = useUser();
const phone = usePhone();
const modal = useModal();

const applicationVerifier = useState<RecaptchaVerifier>("captcha");
  phone.value.applicationVerifier = applicationVerifier.value;

console.log(phone.value)



</script>

<template>
 <div class="account">
      <div class="category"><h3>MEMBSERSHIP AND BILLING</h3></div>
      <div class="details">
        <div class="detail-item">
          <p>{{ firestoreClient.email }}</p>
          <button class="change-button">Change your email address</button>
        </div>
        <div class="detail-item">
          <p>Password: ********</p>
          <button class="change-button">Change password</button>
        </div>

        <div
          class="detail-item"
          :class="!phone.number ? 'item-input' : ''"
        >
          <form
            class="item-input"
            ref="phoneForm"
            @submit.prevent="updatePhone(phone.firstNumber)"
            v-if="!phone.number"
            action=""
          >
            <BaseInput
              :border="true"
              :background="true"
              name="Phone Number"
              type="tel"
              pattern="^\+\d{1,4}(\s?\d){9,12}$"
              v-model="phone.firstNumber"
              required
            />

            <button
              id="recaptcha-container"
              :class="phone.buttonCaptcha ? 'button-spinner' : ''"
              class="change-button"
            >
              <span v-if="!phone.buttonCaptcha">Change phone number</span>
              <div v-else class="loader">
                <span class="loader-circle"></span>
              </div>
            </button>
          </form>

          <p v-else>{{ phone.number }}</p>

          <div class="btn" v-if="phone.number">
            <button
              id="recaptcha-container"
              @click="updatePhone(phone.number)"
              :class="phone.buttonCaptcha ? 'button-spinner' : ''"
              class="change-button"
            >
              <span v-if="!phone.buttonCaptcha">Change phone number</span>
              <div v-else class="loader">
                <span class="loader-circle"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
.account {
  display: grid;
  grid-template-columns: 120px 2fr;
  gap: 70px;
  padding-top: 1rem;
}
.category {
  font-size: 1.125em;
  text-align: left;
  color: #dbdbdb;
  h3 {
    color: #a0a0a0;
    font-size: 1.125em;
    font-weight: 700;
  }
}
.details {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;
}
.detail-item {
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  align-items: center;
}

.button-spinner {
  min-width: 200px;
}



.loader {
  border: 11px solid #f3f3f3; /* Light grey */
  border-top: 11px solid #3498db; /* Blue */
  border-radius: 100%;
  position: relative;
  height: 100%;
  max-height: 20px;
  animation: spin 2s linear infinite;
}

.loader span {
  background-color: rgb(51, 26, 187);
  display: block;
  position: absolute;
  inset: 0;
  left: -12px;
  top: -12px;
  border-radius: 100%;
  height: 24px;
  width: 24px;

  transform: scale(0.75, 0.75);
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.item-input {
  display: flex;
  text-align: left;
  width: 100%;
  justify-content: space-between;
  .base-input {
    max-width: 300px !important;
  }
}

@media screen and (max-width: 500px) {
  .account {
    grid-template-columns: auto;
    grid-template-rows: max-content 1fr;
    gap: 10px;
  }
  .detail-item {
    display: block;
    width: 100%;
  }
  .item-input {
    display: block;
    .base-input {
      max-width: 100% !important;
    }
  }
  .change-button {
    width: 100%;
    font-size: 17px;
  }
}
@media screen and (min-width: 500px) and (max-width: 740px) {
  .account {
    grid-template-columns: auto;
    gap: 10px;
  }

  .change-button {
    font-size: 14px;
  }
}
</style>