<script setup lang="ts">
import BaseInput from './BaseInput.vue';

defineProps({
    isMax: String,
});

</script>

<template>

<div class="get-started">
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <form :style="isMax ? `max-width:${isMax}` : ''" action="">
              <div class="input">
                <BaseInput type="email" name="Email Address"  :background="false"
             />

              </div>
              <button class="get-started-button">
                Get Started
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="Hawkins-Icon Hawkins-Icon-Standard"
                  data-name="ChevronRight"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.29297 19.2928L14.5859 12L7.29297 4.70706L8.70718 3.29285L16.7072 11.2928C16.8947 11.4804 17.0001 11.7347 17.0001 12C17.0001 12.2652 16.8947 12.5195 16.7072 12.7071L8.70718 20.7071L7.29297 19.2928Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </form>
          </div>

     
</template>


<style scoped lang="scss">
.get-started {
    
    text-align: center;
  margin: 1.5rem 0 0;
}
.input {
  display: flex;
  flex: 1 1 100%;
  border: 1px solid;
  border-radius: 1rem;
  background: rgba(22, 22, 22, 0.7);
  border-color: rgba(128, 128, 128, 0.7);
  font-size: 1rem;
  font-weight: 400;
  min-width: 12.5rem;
width: 100%;
  height: 3.5rem;
  padding: 0px;


  color: rgb(255, 255, 255);
}

.get-started-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  writing-mode: horizontal-tb !important;
  width: max-content;
  margin-top:1rem;
  flex: 0 0 auto;
  border: 0px;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  min-height: 3.5rem;
  padding: 0.75rem 1.5rem;
  background: rgb(51, 26, 187,0.9);
  cursor: pointer;
  color: rgb(255, 255, 255);
  border-radius: 1rem;
}
form {
  max-width: 36.625rem;
  
  align-items: center;
  flex-direction: column;
  text-align: left;
  margin: 1rem auto 0;
  vertical-align: text-top;
  display: flex;
width: 100%;
}
@media (min-width: 600px) {
    form{
        align-items: flex-start;
        flex-direction: row;
        
    }
    .get-started-button{
      margin-top:0;
    }
}
</style>