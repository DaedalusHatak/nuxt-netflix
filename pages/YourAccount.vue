<script setup lang="ts">
import { PhoneAuthProvider, RecaptchaVerifier, getAuth, updatePhoneNumber } from 'firebase/auth';

const userProfile = useProfile();
console.log((userProfile))
const modalMessage = ref();
const firestoreClient = ref({
  avatar:  userProfile.value.photoURL || "raiden.png",
  email: userProfile.value.email,
  phone: userProfile.value.providerData[0].phoneNumber ? userProfile.value.providerData[0].phoneNumber : ''
});
const isVeryfing = ref(false);
const changePhone = ref(false);
const newNumber = ref<string>("");
let verificationId:any ;
let verificationCode:any;
let applicationVerifier:any;
async function updatePhone(number:string){
  const auth = getAuth();
  auth.useDeviceLanguage();
try{
   applicationVerifier = new RecaptchaVerifier(auth,'recap', {
  'size':'invisible',
  'callback': (response:any) => {

  }})
  
  const provider = new PhoneAuthProvider(auth);
  verificationId = await provider.verifyPhoneNumber(number, applicationVerifier);
  console.log((verificationId))
  modalMessage.value = "Enter verification code"
  isVeryfing.value = true;
}
catch(err){
  modalMessage.value = "Too many requests!"
  isVeryfing.value = true;
}





 
}
function verifyCode(verificationCode:any){
  isVeryfing.value = false;
  if(verificationCode)
  {changePhone.value = true;}
}

async function sendPhone(verificationCode:any ){
  changePhone.value = false;
 if(verificationCode){
  const auth = getAuth();
 console.log("id",verificationId)
 console.log("Code",verificationCode)
await updatePhone(newNumber.value)
 const phoneCredential = await PhoneAuthProvider.credential(verificationId, verificationCode);
 
await updatePhoneNumber(auth.currentUser!, phoneCredential);
 }

}
</script>

<template>
<div id="recap"></div>
 <BaseModal v-if="isVeryfing" @closeModal="verifyCode" :message="modalMessage"></BaseModal>
 <div v-if="changePhone"  class="modal-backdrop" style="">
  <form @submit.prevent="sendPhone(newNumber)" action="">
    <div class="modal">
      <header class="modal-header">Change Phone Number</header>
     
      <section class="modal-body">
      Enter new phone number
     
        <input v-model="newNumber" type="text">
    
      </section>
    
      <footer class="modal-footer">
        <button @click="sendPhone" type="button" class="btn-green">
          Confirm
        </button>
        <button @click="changePhone = false"  type="button" class="btn-green">
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
   <div> Membership and billing</div>
   <div class="details">
<div class="detail-item">
  <p>{{ firestoreClient.email }}</p>
    <button>Change your email address</button>
</div>
<div class="detail-item">
  <p>Password: ********</p>
    <button>Change password</button>
</div>

<div class="detail-item">
  <p>{{ firestoreClient.phone }}</p>
    <button id="recaptcha-container" @click="updatePhone('+48665123514')">Change phone number</button>
    <form @submit.prevent="sendPhone(verificationCode)">
      <input   v-model="verificationCode" type="text">
      <button >Submit form</button>
    </form>
</div>
   </div>
   
  </div>
 </div>
</template>

<style scoped>
h1{
  font-size: 1.5em;
  text-align: left;
}
.account{
  display:grid;
  grid-template-columns: 300px 2fr;
  border-top: 1px solid #999;
}
.details{
  display:grid;
  grid-template-columns: 1fr;
  justify-content: space-between;
}
.detail-item{
  display:flex;
  justify-content: space-between;
}
.flex-center {
  text-align: center;
  padding: 2rem 1rem;
  display: flex;
  width:90%;
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
@media screen and (min-width: 420px) {
  .modal {
    width: 420px;
  }
}
</style>
