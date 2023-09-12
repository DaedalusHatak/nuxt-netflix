
<script setup lang="ts">
import { getDatabase,onValue, ref as dbRef,set,update, child, push } from 'firebase/database';

const star = ref();
onMounted(()=>{
  const db = getDatabase();
  const starCountRef = dbRef(db, '/');
  console.log(starCountRef)
 onValue(starCountRef, (snap)=>{
  const data = snap.val();
  star.value = data;

})

})
const inp = ref();
function addData(bruh:any){
    const db = getDatabase();
    const database = dbRef(db, '/');
    const newPostKey:any = push(child(dbRef(db), 'posts')).key;
const newData:any = {}
newData[newPostKey] = bruh;
update(database,newData)
}
</script>

<template>
<section ><div v-for="post in star"><b>POST:</b><p>{{ post }}</p></div></section>
<div class="container"><button @click="addData(inp)">Add data</button>
<BaseInput name="Add new post" :background="true" type="text" v-model="inp" /></div>
</template>

<style scoped lang="scss">
section{
   
    background-color: rgb(51, 26, 187, 0.9);
    margin: 0 auto;
    text-align: left;
    padding-top: 300px;
    margin-bottom: 20px;

    div{
        display: flex;
        gap:20px;
        font-size: 1rem;
        max-width: 300px;
        margin: 0 auto;
        padding-bottom: 10px;
        p{
            font-size: 1rem;
        }
    }
}
.container{
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
    justify-content: center;
   
}
button{
    display: inline-flex;
  align-items: center;
  justify-content: center;



  flex: 0 0 auto;
  border: 0px;

  font-size: 1rem;
  font-weight: 400;

  padding: 0.75rem 1.5rem;
  background: red;
  cursor: pointer;
  color: rgb(255, 255, 255);
  border-radius: 5px;
}

@media screen and (min-width:420px) {
    .container{
        max-width:none;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    text-align: left;
    justify-content: center;
   
}
    .base-input{
    padding: 0 !important;
    max-width:300px !important;
    margin:0 !important;
}
}
</style>