<script setup lang="ts">
const items = ref([{id:1,name:'foo'},{id:2,name:'boo'}])
const selected = ref(new Set<number>());


const selectAll = computed({
get: ()=>{
if(items.value.every(item => selected.value.has(item.id))) {
	return true;
}
},
set: (test)=>{
	if(test){
		items.value.forEach(item => selected.value.add(item.id))
	}
	else{
		selected.value.clear();
	}
}
})
</script>

<template>
	<div class="centered"
		>
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
