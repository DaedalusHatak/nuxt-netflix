<script setup lang="ts">
const props = defineProps<{
    data?: string;
}>()
const password = ref("");
const email = ref("");
if(props.data){
    email.value = props.data
}

</script>

<template>

  


    <form @submit.prevent="createUser(email, password)">
     <div class="title">   <h2>Create a password to start your membership</h2>
        <p>Just a few more steps and you're done!</p>
<p>We hate paperwork, too.</p></div>
      <BaseInput :errorMessage="['E-mail address is required.','E-mail address should have between 5-50 characters.']" checkValid :border="true" :background="false" name="Email" type="email" v-model="email"/>
      <BaseInput :errorMessage="['Password is required.','Password should have between 5-50 characters.']" checkValid :border="true" :background="false" name="Add a password" type="password" v-model="password"/>
      <button @click="" class="next-button">Next</button>
    </form>


</template>

<style scoped lang="scss">
.title{
    margin-bottom: 5px;
}
h2{
    font-weight: 600;
    font-size: 2rem;
    line-height: 2.75rem;
    margin-bottom: 15px;
    color: black;
}
p{
    font-weight: 400;
    margin-bottom: 5px;
    font-size: 19px;
   
}

button{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  writing-mode: horizontal-tb !important;
  width: max-content;
  margin-top: 1rem;
  flex: 0 0 auto;
  border: 0px;

  font-size: 1.5rem;
  font-weight: 400;
  min-height: 3.5rem;
  padding: 0.75rem 1.5rem;
  background: rgb(51, 26, 187, 0.9);
  cursor: pointer;
  color: rgb(255, 255, 255);
  border-radius: 5px;
}
form{
   
    font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form > * {
  max-width: 440px;
}
@media screen and (min-width:440px) {
  form{
    margin: 0 auto;
  }
  form > * {
  width: 440px;
}
  
}
</style>