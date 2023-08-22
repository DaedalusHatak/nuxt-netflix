<script setup lang="ts">
const {data} = await useFetch('/api/session')
console.log((data.value))
const secondStep = ref(data.value?.secondStep)
function updatePage(){
  updateUserSession(data.value?.email,true)
  secondStep.value = true;
};
</script>

<template>

 <div class="confirm-page">
  <NavBarRegistration>

</NavBarRegistration>
<div class="centered" >
  <FirstStep v-if="secondStep" :data="data?.email"/>
<div class="register-info" v-else>
  <h2>Finish setting up your account</h2>
  <p>Netflix is personalized for you.</p>
  <p> Create a password to start watching Netflix.</p>
  <button @click="updatePage">Next</button>
</div>
</div>
 </div>
</template>

<style scoped>
h2{
    font-weight: 500;
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
.confirm-page {
  position: relative;
  display:flex;

  flex-direction: column;
  min-height: 100dvh;
  background-color: white;
  color: black;
  
}
.register-info{
  max-width: 320px;
  text-align: center;
}
.centered {

display: flex;
flex-direction: column;
width: max-content;
justify-content: center;
align-items: center;

height: 100%;
width:100%;
flex: 1;
overflow-y: hidden;

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
</style>
