<script setup lang="ts">
import {
  ConfirmationResult,
  PhoneAuthProvider,
  RecaptchaVerifier,
  getAuth,
  linkWithPhoneNumber,
  signInWithCredential,
  signInWithPhoneNumber,
  updateCurrentUser,
  updatePhoneNumber,
} from "firebase/auth";
onNuxtReady(() => {});
const userProfile = useProfile();
const useAuth = useUser();

console.log(useAuth.value);

const modalMessage = ref();
const firestoreClient = ref({
  avatar: userProfile.value.photoURL || "raiden.png",
  email: userProfile.value.email,
  phone: userProfile.value.providerData[0].phoneNumber
    ? userProfile.value.providerData[0].phoneNumber
    : "",
});
const firstTimePhone = ref<string>("");
const showModal = ref<boolean>(false);
const buttonCaptcha = ref<boolean>(false);
const changePhone = ref<boolean>(false);
const newNumber = ref<string>("");
const verCode = ref<string>("");

let verificationId: string;
const applicationVerifier = useState<RecaptchaVerifier>("captcha");

console.log(applicationVerifier.value);
async function updatePhone(number: string) {
number = number.replace(/\s+/g, "");
console.log((number))
  //Button animates on Captcha loading
  buttonCaptcha.value = true;
  //Provider of auth
  const provider = new PhoneAuthProvider(useAuth.value);
  try {
    //Starts verification process
const test = await applicationVerifier.value.verify()
console.log(test)
if(test){
	verificationId = await provider.verifyPhoneNumber(
      number,
      applicationVerifier.value
    );
}

    //Shows modal for verification code
    modalMessage.value = "Enter verification code";
  } catch (err) {
    console.log("err", err);
    modalMessage.value = "Too many requests!";
  }
  showModal.value = true;
}

async function verifyCode(verificationCode: any) {
  //Hides modal
  buttonCaptcha.value = false;
  showModal.value = false;
  if (verificationCode) {
    //Shows modal for new number
    if (!newNumber.value && !firstTimePhone.value) {
      changePhone.value = true;
      return;
    }
    verCode.value = verificationCode;
    setPhoneNumber();
  }
}
async function verifyNewNumber(number: any) {
  //hides modal
  changePhone.value = false;
  //Provider of auth
  const provider = new PhoneAuthProvider(useAuth.value);

  //Button cancel animate
  buttonCaptcha.value = false;
  try {
    //verifies new number
    verificationId = await provider.verifyPhoneNumber(
      number,
      applicationVerifier.value
    );
  } catch (err) {
    console.log("err", err);
  }
  //shows modal to enter verification code for new number
  showModal.value = true;
}
async function setPhoneNumber() {
  showModal.value = false;
  try {
    //sets phone credentials
    const phoneCredential = await PhoneAuthProvider.credential(
      verificationId,
      verCode.value
    );
    // Updates phone number
    await updatePhoneNumber(useAuth.value.currentUser!, phoneCredential);
    //updates phone number before refresh

    firestoreClient.value.phone = newNumber.value.replace(/\s+/g, "");;
    if(firstTimePhone.value){
      firestoreClient.value.phone = firstTimePhone.value.replace(/\s+/g, "");;
    }
  } catch (err) {
    modalMessage.value = err;
    showModal.value = true;
    console.log(err);
  }
}
async function deletePhone() {
	const test = useCookie("__token");

const { data } = await useFetch("/api/deletePhone", {
  method: "POST",
  body: { test: test.value },
});
firestoreClient.value.phone = "";
}
</script>

<template>
  <BaseModal
    v-if="showModal"
    @closeModal="verifyCode"
    :message="modalMessage"
  ></BaseModal>
  <div v-if="changePhone" class="modal-backdrop" style="">
    <form @submit.prevent="verifyNewNumber(newNumber)" action="">
      <div class="modal">
        <header class="modal-header">Change Phone Number</header>

        <section class="modal-body">
          Enter new phone number

          <input v-model="newNumber" type="text" />
        </section>

        <footer class="modal-footer">
          <button
            @click="verifyNewNumber(newNumber)"
            type="button"
            class="btn-green"
          >
            Confirm
          </button>
          <button @click="changePhone = false" type="button" class="btn-green">
            Cancel
          </button>
        </footer>
      </div>
    </form>
  </div>
  <NavBar :isAccount="true" :av="firestoreClient"></NavBar>
  <div class="flex-center">
    <h1>Account</h1>
    <div class="account">
      <div class="category"><h2>MEMBSERSHIP AND BILLING</h2></div>
      <div class="details">
        <div class="detail-item">
          <p>{{ firestoreClient.email }}</p>
          <button class="change-button">Change your email address</button>
        </div>
        <div class="detail-item">
          <p>Password: ********</p>
          <button class="change-button">Change password</button>
        </div>

        <div class="detail-item" :class="!firestoreClient.phone ? 'item-input' : ''">
		
<form class="item-input" ref="phoneForm" @submit.prevent="updatePhone(firstTimePhone)" v-if="!firestoreClient.phone" action="">
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
            </button></form>
	


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
<div class="delete">
	<button
              id="recaptcha-container"
              @click="deletePhone()"
              :class="buttonCaptcha ? 'button-spinner' : ''"
              class="change-button"
            >
              <span v-if="!buttonCaptcha">Delete phone number</span>
              <div v-else class="loader">
                <span class="loader-circle"></span>
              </div>
            </button>
</div>
  </div>
</template>

<style scoped lang="scss">

	.item-input{
	display: flex;
	text-align: left;
	width:100%;
	justify-content: space-between;
	.base-input{
			max-width: 300px !important;

}
}
span{
	font-weight: 500;
}
h1 {
  font-size: 1.5em;
  text-align: left;
  padding-bottom: 1rem;
}
p {
  font-size: 17px;
}
.account {
  display: grid;
  grid-template-columns: 120px 2fr;
  gap:70px;
  padding-top: 1rem;
  border-top: 1px solid #999;
}
.category{
	font-size: 1.125em;
	text-align: left;
	color: #dbdbdb;
	h2{
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
.change-button {
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: horizontal-tb !important;
  white-space:nowrap;
  flex: 0 0 auto;
  border: 0px;

  font-size: clamp(0.5rem, 1.5vw, 1rem);
  font-weight: 500;
  height: 100%;
  min-height: 2.5rem;
  max-height: 3.19rem;
  padding: 1.2rem 1rem;
  background: rgb(51, 26, 187, 0.9);
  cursor: pointer;
  color: rgb(255, 255, 255);
  border-radius: 5px;
}
.button-spinner {
  min-width: 200px;
}
.flex-center {
  text-align: center;
  padding: 2rem 1rem;
  display: flex;
  width: 90%;
  margin: 0 auto;
  flex-direction: column;
  overflow: hidden;
}

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

.btn-green {
  color: #fff;
  cursor: pointer;

  padding: 8px;
  background: rgba(51, 26, 187, 0.9);
  border: 1px solid rgba(51, 26, 187, 0.9);
  border-radius: 8px;
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
.delete{
	width:100%;
	padding: 2rem;
	button{
		width:100%;
	}
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
@media screen and (min-width: 420px) {
  .modal {
    width: 420px;
  }
}
@media screen and (max-width: 500px) {
  .account {
    grid-template-columns: auto;
    grid-template-rows: max-content 1fr;
	gap:10px;
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
@media screen and (min-width:500px) and (max-width: 740px) {
  .account {
    grid-template-columns: auto;
	gap:10px;
  }

  .change-button {
    font-size: 14px;
  }

}
</style>
