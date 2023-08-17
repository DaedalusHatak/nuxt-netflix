<script setup lang="ts">
const items = ref([{id:1,name:'foo'},{id:2,name:'boo'}])
const selected = ref(new Set<number>());

function checkSelect(){
	if(items.value.every(item => selected.value.has(item.id))){
		return selected.value.clear();
	}else{return items.value.forEach(item => selected.value.add(item.id))
		
		
	}
}
const selectAll = computed(()=>{

checkSelect()


})

const scaledWidth = ref()
function onBeforeEnter() {
  scaledWidth.value = 100;
}
function onEnter() {
  scaledWidth.value = 100 * 1.55;
}
function onLeave() {
  scaledWidth.value = 100;

}
const hover = ref();
</script>

<template>
	<div class="centered"
	
		>
<Transition @enter="onEnter" @before-enter="onBeforeEnter" @leave="onLeave">
	<div @mouseenter="hover = true" @mouseleave="hover = false" class="box" :style="{width:`${scaledWidth}px`}"><p v-if="hover">blablabla</p></div>
</Transition>
        <div
			><input v-model="selectAll"  type="checkbox" name="all" /> <label for="all">isAll?</label></div
		>
        <div
			><input v-model="selected" :value="items[0].id" type="checkbox" name="all" /> <label for="all">A</label></div
		>
        <div
			><input v-model="selected"  :value="items[1].id" type="checkbox" name="all" /> <label for="all">B</label></div
		>
        <button>Check</button>
        </div
	>
    
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
	transition: all 1s ease;
}
.v-enter-from,
.v-leave-to {
  width: 100;
}
.box{
	width:100px;
	height:100px;
	background-color: red;
}
.centered {
	margin: 0 auto;
	display: flex;
    flex-direction: column;
    width: max-content;
	justify-content: center;
	min-height: 100vh;
	overflow-y: hidden;
}
</style>
