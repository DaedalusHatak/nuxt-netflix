<script setup lang="ts">
import { ref } from 'vue'
import GetStartedForm from './GetStartedForm.vue'
const note = ref<string>('Note that this is not official netflix page!')
interface Question {
  name: string
  answer: string
  isActive: boolean
}
const arrOfQuestions = ref<Question[]>([
  {
    name: 'What is Netflix?',
    answer: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
    
    You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!`,
    isActive: false
  },
  {
    name: 'How much does Netflix cost?',
    answer: `Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from 29 zł to 60 zł a month. No extra costs, no contracts.`,
    isActive: false
  },
  {
    name: 'Where can I watch?',
    answer: `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
Note that this is not official netflix page!`,
    isActive: false
  },
  {
    name: 'How do I cancel?',
    answer: `Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.`,
    isActive: false
  },
  {
    name: 'Where can I watch?',
    answer: `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
Note that this is not official netflix page!`,
    isActive: false
  },
  {
    name: 'Where can I watch?',
    answer: `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
`,
    isActive: false
  }
])
</script>

<template>
  <div class="ask-section">
    <h2>Frequently Asked Questions</h2>
    <ul>
      <li v-for="question in arrOfQuestions" :key="question.name">
        <h3>
          <button
            :style="question.isActive ? 'border-radius: 1rem 1rem 0 0' : 'border-radius:1rem'"
            @click="question.isActive = !question.isActive"
          >
            {{ question.name }}

            <p class="add-sign">
              <svg fill=currentColor height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 330 330" xml:space="preserve">
<path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
</svg>
            </p>
          </button>
        </h3>
        <Transition>
         
            <p  v-if="question.isActive" class="answer" :class="{'expand':question.isActive}">
              {{ question.answer }}
              <br /><br />
              <b>{{note}}</b>
            </p>
 
        </Transition>
      </li>
    </ul>
    <get-started-form class="spacing"></get-started-form>
  </div>
</template>

<style scoped lang="scss">
b{
    font-weight: 700;
}
h2{
    text-align: center;
}
h3 {
  margin-bottom: 0.0625rem;
}
svg {
  width: 36px;
  height: 36px;
}
.spacing{
  margin-top: 2.85rem;
}
.ask-section {
  padding: 6rem 0;
  ul {
    padding: 0;
    margin: 1.5rem 0 0;
    li {
      list-style: none;
      margin: 0 0 0.5rem 0;
    }
  }
}

button {

  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  cursor: pointer;
  color: white;
  background-color: rgba(1,1,1, 1);
  border: 2px orangered groove;
  font-size: 1.5rem;
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  max-height: 75rem;
  padding: 1.5rem;
  transition-duration: 0.6s;
  transition-property: background-color,border-radius;
}
button:hover {
  transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
  background-color: rgb(40, 40, 40);
}
.add-sign {
  height: 36px;
}
.answer {
  font-size: 1.5rem;
  font-weight: 500;
  border-radius: 0 0 1rem 1rem;
  max-height: 0;
  white-space: pre-line;
  letter-spacing: normal;
  padding: 1.5rem;
  background-color: rgb(1,1,1);
  overflow: hidden;
}
.expand{
  max-height:100%;
}
.v-enter-active {
  overflow: hidden;
  animation: hei 0.25s;
}
.v-leave-active {
  overflow: hidden;
  animation: hei 0.25s reverse;
} 

@keyframes hei {
  0% {
    transform-origin: top;
  transform: scaleY(0);
  }

  100% {
    transform-origin: top;
    transform: scaleY(1);
  }
}
</style>
