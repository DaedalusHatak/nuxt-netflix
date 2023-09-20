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
const modalMessage = ref();
const firstTimePhone = ref<string>("");
const showModal = ref<boolean>(false);
const buttonCaptcha = ref<boolean>(false);
const changePhone = ref<boolean>(false);
const newNumber = ref<string>("");
const verCode = ref<string>("");

const applicationVerifier = useState<RecaptchaVerifier>("captcha");
let verificationId: string;

async function updatePhone(number: string) {
  number = number.replace(/\s+/g, "");

  //Button animates on Captcha loading
  buttonCaptcha.value = true;
  //Provider of auth
  const provider = new PhoneAuthProvider(useAuth.value);
  try {
    //Starts verification process
    const test = await applicationVerifier.value.verify();

    if (test) {
      verificationId = await provider.verifyPhoneNumber(
        number,
        applicationVerifier.value
      );
    }

    //Shows modal for verification code
    modalMessage.value = "Enter verification code";
  } catch (err) {
    modalMessage.value = "Too many requests!";
  }
  showModal.value = true;
}



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
          :class="!firestoreClient.phone ? 'item-input' : ''"
        >
          <form
            class="item-input"
            ref="phoneForm"
            @submit.prevent="updatePhone(firstTimePhone)"
            v-if="!firestoreClient.phone"
            action=""
          >
            <BaseInput
              :border="true"
              :background="true"
              name="Phone Number"
              type="tel"
              pattern="^\+\d{1,4}(\s?\d){9,12}$"
              v-model="firstTimePhone"
              required
            />

            <button
              id="recaptcha-container"
              :class="buttonCaptcha ? 'button-spinner' : ''"
              class="change-button"
            >
              <span v-if="!buttonCaptcha">Change phone number</span>
              <div v-else class="loader">
                <span class="loader-circle"></span>
              </div>
            </button>
          </form>

          <p v-else>{{ firestoreClient.phone }}</p>

          <div class="btn" v-if="firestoreClient.phone">
            <button
              id="recaptcha-container"
              @click="updatePhone(firestoreClient.phone)"
              :class="buttonCaptcha ? 'button-spinner' : ''"
              class="change-button"
            >
              <span v-if="!buttonCaptcha">Change phone number</span>
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
</style>