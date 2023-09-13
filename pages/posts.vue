<script setup lang="ts">
import {
	getDatabase,
	onValue,
	ref as dbRef,
	update,
	child,
	push,
	serverTimestamp,
set,
} from 'firebase/database';

import { addDoc, collection, doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";



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
const star = ref();
const cloud = ref();
const textarea = ref();
onMounted(async () => {
	const db = getDatabase();
    const firestore = getFirestore();
    const unsub = onSnapshot(collection(firestore,"avatar"),(doc)=>{
      console.log(doc.docs)
    })
	const starCountRef = dbRef(db, '/');
	console.log(starCountRef);
	onValue(starCountRef, (snap) => {
		const data = snap.val();
		star.value = data;
	});
});
const inp = ref('');

async function addData(bruh: any) {
	const db = getDatabase();
    const firestore = getFirestore();
	const database = dbRef(db, '/');

	

	const newData = {
		post: bruh,
		user: userProfile.value.email,
		createdAt: serverTimestamp(),
	};
    const newPostKey: any = push(database,newData);


addDoc(collection(firestore, "avatar"), newData)
	console.log('before', star.value);
	await set(newPostKey, newData);
	console.log('after', star.value);
	inp.value = '';
	textarea.value.style.height = 'auto';
}
function showTime(time: string) {
	const data = new Date(time);
	const currData = new Date();

	if (currData.getDate() - data.getDate() === 0) {
		return 'Today ' + data.getHours() + ':' + data.getMinutes();
	} else if (currData.getDate() - data.getDate() === 1) {
		return 'Yesterday ' + data.getHours() + ':' + data.getMinutes();
	} else {
		return (
			data.getDay().toString().padStart(2, '0') +
			'.' +
			data.getMonth().toString().padStart(2, '0') +
			'.' +
			data.getFullYear() +
			' ' +
			data.getHours() +
			':' +
			data.getMinutes()
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
</script>

<template>
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
    <div class="posts" v-for="post in cloud" :key="post">
			<transition @beforeEnter="onBeforeEnter" name="fade">
                <div class="post">
				<div class="user"
					>
					</div
				>{{ post }}
			</div>
            </transition>
            
		</div>
	<section>
 
        <!-- <TransitionGroup name="fade"> -->
		<div class="posts" v-for="post in star" :key="post">
			<transition @beforeEnter="onBeforeEnter" name="fade">
                <div class="post">
				<div class="user"
					>{{ post.user }}
					<span class="time">{{ showTime(post.createdAt) }}</span></div
				>{{ post.post }}
			</div>
            </transition>
            
		</div>
    <!-- </TransitionGroup> -->
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
.fade-leave-active {
	transition: all 5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
.post{
    transition: all 1s;
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
