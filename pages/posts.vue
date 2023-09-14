<script setup lang="ts">


import { database } from "firebase-admin";
import { addDoc, collection, doc, getFirestore, onSnapshot, orderBy, query, setDoc,serverTimestamp, Timestamp, updateDoc, deleteDoc } from "firebase/firestore";



const userProfile = useProfile();
const firestoreClient = ref({
	avatar: userProfile.value.photoURL
		? userProfile.value.photoURL
		: 'raiden.png',
	email: userProfile.value.email,
	phone: userProfile.value.providerData[0].phoneNumber
		? userProfile.value.providerData[0].phoneNumber
		: '',
});
const indexOfDeletedElement = ref();
const isDataLoaded = ref(false)
const isFirst = computed(()=>{
	return isDataLoaded.value ? "fade" : "standard"
})
const isTryingToDelete = ref(false)
const cloud = ref<any[]>([]);
const textarea = ref();
const isScrolling = ref(false);
const showNewElements = ref(false)
const newPosts = ref<any[]>([]);
function scrolling(){
	if(window.scrollY > 0){
		isScrolling.value =true;
	}
}
onMounted(async () => {
	window.addEventListener("scroll", scrolling);
    const firestore = getFirestore();
	const coll = query(collection(firestore,"avatar"), orderBy("createdAt"))
    const unsub = onSnapshot(coll,(doc)=>{
      doc.docChanges({}).forEach(async snapshot=>{

		let data = snapshot.doc.data();
		if(snapshot.type === "modified"){
			console.log("modified",snapshot.doc.id)
			if(!isScrolling.value){
				cloud.value[cloud.value.length -1].createdAt = snapshot.doc.data().createdAt
			}
			else{
				newPosts.value[newPosts.value.length -1].createdAt = snapshot.doc.data().createdAt
			}
		}
		else if(snapshot.type ==="added"){
			data.id = snapshot.doc.id
			if(!isScrolling.value){
				cloud.value.push(data)
				
			}
			else{
				showNewElements.value = true;
				newPosts.value.push(data)
				
			}
		}else{
			cloud.value.splice(indexOfDeletedElement.value,1)
		}
	  })
setTimeout(()=>{
	isDataLoaded.value = true;
},1)
    })
});
const inp = ref('');

async function addData(bruh: any) {
	isActive.value = false;
    const firestore = getFirestore();
	const timestamp = serverTimestamp()
	const newData = {
		post: bruh,
		user: userProfile.value.email,
		createdAt: timestamp,
	};
addDoc(collection(firestore, "avatar"), newData)
	inp.value = '';
	textarea.value.style.height = 'auto';
}
function showTime(time: Timestamp) {
	const data = ref()
	if(time){
	 data.value = new Date(time.toDate());
	
}
else{
	data.value = new Date();
}
const currData = new Date();
	if (currData.getDate() - data.value.getDate() === 0) {
		return 'Today ' + data.value.getHours().toString().padStart(2, '0') + ':' + data.value.getMinutes().toString().padStart(2, '0');
	} else if (currData.getDate() - data.value.getDate() === 1) {
		return 'Yesterday ' + data.value.getHours().toString().padStart(2, '0') + ':' + data.value.getMinutes().toString().padStart(2, '0');
	} else {
		return (
			data.value.getDay().toString().padStart(2, '0') +
			'.' +
			data.value.getMonth().toString().padStart(2, '0') +
			'.' +
			data.value.getFullYear() +
			' ' +
			data.value.getHours() +
			':' +
			data.value.getMinutes()
		);
	}

}

function autoResize() {
	textarea.value.style.height = 'auto';
	textarea.value.style.height = textarea.value.scrollHeight + 'px';
}

const isActive = ref(false);
function focusIn() {
	isActive.value = true;
	console.log('sasa');
}
function focusOut() {
	if (inp.value === '' || inp.value === undefined) {
		isActive.value = false;
	}
}
function onBeforeEnter() {
	console.log('HAHAHA');
}
async function deleteDocuments(element:any){
	const firestore = getFirestore();
if(firestoreClient.value.email === element.user)
{
	indexOfDeletedElement.value = cloud.value.indexOf(element)
	const document = doc(firestore,"avatar",element.id)
await deleteDoc(document)
}
else{
	isTryingToDelete.value = true;
}
	

}
function showElements(){
	console.log(newPosts.value)
	showNewElements.value = false;
	for (const item of newPosts.value) {
  cloud.value.push(item);
}
window.scrollTo(0,0)
isScrolling.value = false;
newPosts.value = [];


}
const showMoreInfo = ref(null);
</script>

<template>
	<BaseModal @closeModal="isTryingToDelete = false" v-if="isTryingToDelete" message="You can not delete other users posts!"></BaseModal>
	<NavBar :isAccount="true" :av="firestoreClient"></NavBar>
	<div class="container">
		<div class="new-post-textarea">
			<textarea
				@focusout="focusOut"
				@change="inp === '' ? (isActive = false) : (isActive = true)"
				@focusin="focusIn"
				v-model="inp"
				@input="autoResize"
				ref="textarea"
				name="post-area"
			>
			</textarea>
			<label
				class="label"
				:class="isActive ? 'label-active' : 'label'"
				for="post-area"
				>Add a new post</label
			>
		</div>
		<button @click="addData(inp)">Add a new post</button>
		
	</div>
	<div class="container"><button @click="showElements()" class="new-posts" v-if="showNewElements">Click me to show new Elements {{ newPosts.length }}</button></div>
	<section>
	
<TransitionGroup :name="isFirst">

	<div class="posts" v-for="post in cloud" :key="post" >
			
			<div class="post">
			<div class="user"
				>{{ post.user }}
				<span class="time">{{ showTime(post.createdAt) }}</span></div
			>{{ post.post }}
			<button class="show-more-button" @click="showMoreInfo = post" v-if="firestoreClient.email === post.user" ><IconInfo/></button>
			<div @mouseleave="showMoreInfo = null" class="delete-menu" v-if="showMoreInfo === post">
			<button   @click="deleteDocuments(post)" class="delete-button">Delete</button>
			</div>
		</div> 
	</div>
</TransitionGroup>
	</section>
</template>

<style scoped lang="scss">
section {
	display: flex;
	flex-direction: column-reverse;
	margin: 0 auto;
	text-align: left;

	padding-bottom: 20px;
}
.fade-enter-active,
.fade-move,
.fade-leave-active {
	transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
.fade-leave-active {
  position: absolute;
}
.show-more-button{
	background-color: transparent;
	margin: 0;
	position: absolute;
	padding: 0.3rem;
	height:max-content;
    right: 0;
    top: -10px;
	z-index: 1;
}
.delete-menu{

	width:150px;
	height:70px;
	margin: 0;
	position: absolute;
	padding: 0.3rem;

    right: -65px;
  top:-15px;
	
}
.delete-button{
	background-color: rgba(255, 0, 0, 0.411);


	margin: 0;
	position: absolute;
	padding: 0.3rem 1.2rem;

    right: 65px;
  top:35px;
	
}

.posts {

	background-color: rgb(51, 26, 187, 1);
	margin-bottom: 5px;
	border-radius: 10px;
	max-width: 1000px;
	width: 70vw;
	padding: 0.65rem;
	font-size: 1rem;
	margin: 0.2rem auto;
	padding-bottom: 10px;
	word-break: break-word;
}
.new-posts{
	position: absolute;
	inset: 0;
	max-width: 1000px;
	width:70vw;
}
.user {
	display: flex;
	gap: 15px;
	margin-bottom: 10px;
	font-size: 0.75rem;
}
.time {
	color: rgb(170, 170, 170);
}
.container {
	width: 70vw;
	margin: 0 auto;
	padding-top: 50px;
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
	max-width: 1000px;
	margin: 0 auto;
	justify-content: center;
}
button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin: 0.5rem auto;
	flex: 0 0 auto;
	border: 0px;
	width: max-content;
	font-size: 1rem;
	font-weight: 400;

	padding: 0.75rem 2.5rem;
	background: red;
	cursor: pointer;
	color: rgb(255, 255, 255);
	border-radius: 5px;
}

@media screen and (min-width: 420px) {
	.base-input {
		padding: 0 !important;
		max-width: 300px !important;
		margin: 0 !important;
	}
}

textarea {
	display: block;
	color: inherit;
	padding: 1.5rem 1rem 0.5rem;
	border: none;
	border-radius: 1rem;
	resize: none;
	overflow-y: hidden;
	height: auto;
	width: 70vw;
	max-width: 1000px;
	background-clip: padding-box;
	appearance: none;
	background-color: rgba(172, 172, 172, 0.425) !important;
}

.label {
	width: max-content;
	position: absolute;
	z-index: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition-property: top, font-size, line-height;
	transition-duration: 250ms;
	pointer-events: none;
	font-size: 0.85rem;
	transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
	opacity: 0.7;
	left: 1rem;
	line-height: 1.5rem;
	right: 1rem;
	top: 1rem;
}

.label-active {
	position: absolute;
	z-index: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition-property: top, font-size, line-height;
	transition-duration: 250ms;
	pointer-events: none;
	font-size: 0.75rem;
	transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
	opacity: 0.7;
	left: 1rem;
	line-height: 1.125rem;
	right: 1rem;
	top: 0.5rem;
}

// Background color
.background:-webkit-autofill {
	-webkit-text-size-adjust: auto;
	-webkit-text-fill-color: #fff;
	box-shadow: inset #333 0 0 0 1000px;
	-webkit-background-clip: text;
}

textarea:-webkit-autofill + .label {
	position: absolute;
	z-index: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition-property: top, font-size, line-height;
	transition-duration: 250ms;
	pointer-events: none;
	font-size: 0.75rem;
	transition-timing-function: cubic-bezier(0.5, 0, 0.1, 1);
	opacity: 0.7;
	left: 1rem;
	line-height: 1.125rem;
	right: 1rem;
	top: 0.5rem;
}
</style>
