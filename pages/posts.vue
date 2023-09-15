<script setup lang="ts">
import {
	addDoc,
	collection,
	doc,
	getFirestore,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
	deleteDoc,
} from 'firebase/firestore';

interface Post {
	user:string,
	createdAt: Timestamp,
	post: string,
	id? : string
}
const showMoreInfo = ref<Post | null>(null);
const menu = ref(null);

const isDataLoaded = ref(false);
const isTryingToDelete = ref(false);
const cloud = ref<Post[]>([]);
const textarea = ref();
const isScrolling = ref(false);
const showNewElements = ref(false);
const newPosts = ref<any[]>([]);
const post = ref('');
const isActive = ref(false);


const isFirst = computed(() => {
	return isDataLoaded.value ? 'fade' : 'standard';
});



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

//VueUse for menu delete button
onClickOutside(menu, (event) => {
	showMoreInfo.value = null;
});

//Gets firestore and sets event listener for scrolling
onMounted(async () => {
	window.addEventListener('scroll', scrolling);
	const firestore = getFirestore();
	const coll = query(collection(firestore, 'avatar'), orderBy('createdAt'));
	const unsub = onSnapshot(coll, (doc) => {
		doc.docChanges({}).forEach(async (snapshot) => {
			let data = snapshot.doc.data() as Post;
			if (snapshot.type === 'modified') {
				if (!isScrolling.value) {
					cloud.value[cloud.value.length - 1].createdAt =
						snapshot.doc.data().createdAt;
				} else {
					newPosts.value[newPosts.value.length - 1].createdAt =
						snapshot.doc.data().createdAt;
				}
			} else if (snapshot.type === 'added') {
				data.id = snapshot.doc.id;
				if (!isScrolling.value) {
					cloud.value.push(data);
				} else {
					showNewElements.value = true;
					newPosts.value.push(data);
				}
			} else {
				const index = (id: any) => id.id === snapshot.doc.id;
				if (newPosts.value.findIndex(index) !== -1) {
					const indexToDelete = newPosts.value.findIndex(index);
					newPosts.value.splice(indexToDelete, 1);
				} else {
					const indexToDelete = cloud.value.findIndex(index);
					cloud.value.splice(indexToDelete, 1);
				}
			}
		});
		setTimeout(() => {
			isDataLoaded.value = true;
		}, 1);
	});
});
//Sets a variable when scroll occured that will not show any new posts immediately
function scrolling() {
	if (window.scrollY > 0) {
		isScrolling.value = true;
	}
}

//Loading new data after button is clicked and resets an array of new posts
function showElements() {
	showNewElements.value = false;
	for (const item of newPosts.value) {
		cloud.value.push(item);
	}
	window.scrollTo(0, 0);
	isScrolling.value = false;
	newPosts.value = [];
}

// Resizing for textarea
function autoResize() {
	textarea.value.style.height = 'auto';
	textarea.value.style.height = textarea.value.scrollHeight + 'px';
}
//Label position based on focus in/out and input value
function focusIn() {
	isActive.value = true;
}
function focusOut() {
	if (post.value === '' || post.value === undefined) {
		isActive.value = false;
	}
}


//adds new document
async function addData(bruh: string) {
	isScrolling.value = false;
	isActive.value = false;
	const firestore = getFirestore();
	const timestamp = serverTimestamp();
	const newData = {
		post: bruh,
		user: userProfile.value.email,
		createdAt: timestamp,
	};
	addDoc(collection(firestore, 'avatar'), newData);
	post.value = '';
	textarea.value.style.height = 'auto';
}

//Deletes document 
async function deleteDocuments(element: any) {
	const firestore = getFirestore();
	if (firestoreClient.value.email === element.user) {
		const document = doc(firestore, 'avatar', element.id);
		await deleteDoc(document);
	} else {
		isTryingToDelete.value = true;
	}
}



//shows formatted time for data
function showTime(time: Timestamp) {
	const data = ref();
	if (time) {
		data.value = new Date(time.toDate());
	} else {
		data.value = new Date();
	}
	const currData = new Date();
	const formattedData =
		data.value.getDay().toString().padStart(2, '0') +
		'.' +
		data.value.getMonth().toString().padStart(2, '0') +
		'.' +
		data.value.getFullYear() +
		' ';
	const formattedTime =
		data.value.getHours().toString().padStart(2, '0') +
		':' +
		data.value.getMinutes().toString().padStart(2, '0');
	if (currData.getDate() - data.value.getDate() === 0) {
		return (
			'Today ' + formattedTime
		);
	} else if (currData.getDate() - data.value.getDate() === 1) {
		return (
			'Yesterday ' + formattedTime
		);
	} else {
		return (
			formattedData + formattedTime
		);
	}
}


</script>

<template>
	<BaseModal
		@closeModal="isTryingToDelete = false"
		v-if="isTryingToDelete"
		message="You can not delete other users posts!"
	></BaseModal>
	<NavBar :isAccount="true" :av="firestoreClient"></NavBar>
	<h1>Posts with realtime update</h1>
	<div class="container">
		<div class="new-post-textarea">
			<textarea
				@focusout="focusOut"
				@change="post === '' ? (isActive = false) : (isActive = true)"
				@focusin="focusIn"
				v-model="post"
				@input="autoResize"
				ref="textarea"
				name="post-area"
			/>
			<label
				class="label"
				:class="isActive ? 'label-active' : 'label'"
				for="post-area"
				>Add a new post</label
			>
		</div>
		<button @click="addData(post)">Add a new post</button>
	</div>
	<div class="container"
		><button @click="showElements()" class="new-posts" v-if="showNewElements"
			>Click me to show new Elements {{ newPosts.length }}</button
		></div
	>
	<section>
		<TransitionGroup :name="isFirst">
			<div class="posts" v-for="post in cloud" :key="post.id">
				<div class="post">
					<div class="user"
						>{{ post.user }}
						<span class="time">{{ showTime(post.createdAt) }}</span></div
					>{{ post.post.trim().replace(/\s\s+/g,"\n\n") }}
					<button
						class="show-more-button"
						@click="showMoreInfo = post"
						v-if="firestoreClient.email === post.user"
						><IconInfo
					/></button>
					<div ref="menu" class="delete-menu" v-if="showMoreInfo === post">
						<button @click="deleteDocuments(post)" class="delete-button"
							>Delete</button
						>
					</div>
				</div>
			</div>
		</TransitionGroup>
	</section>
</template>

<style scoped lang="scss">
h1{
	margin-inline: auto;
	width:70vw;
	max-width: 700px;
	text-align: center;
	font-size: 1.7rem;
}
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
.show-more-button {
	background-color: transparent;
	margin: 0;
	position: absolute;
	padding: 0.3rem;
	height: max-content;
	right: 0;
	top: -10px;
	z-index: 1;
}
.delete-menu {
	width: 150px;
	height: 70px;
	margin: 0;
	position: absolute;
	padding: 0.3rem;

	right: -65px;
	top: -15px;
}
.delete-button {
	background-color: rgba(255, 0, 0, 1);

	margin: 0;
	position: absolute;
	padding: 0.3rem 1.2rem;

	right: 65px;
	top: 35px;
}

.posts {
	background-color: rgb(53, 53, 88, 1);
	margin-bottom: 5px;
	border-radius: 5px;
	border: 1px solid #86868b;
	max-width: 700px;
	width: 70vw;
	padding: 1rem 1.25rem 2rem 1.25rem;
	font-size: 1.15rem;
	margin: 0.2rem auto;
	white-space: pre-line;
	word-break: break-word;
}
.new-posts {
	position: absolute;
	inset: 0;
	max-width: 700px;
	width: 70vw;
}
.user {
	display: flex;
	color:#f7bc51;
	gap: 15px;
	margin-bottom: 10px;
	font-size: 1rem;
	font-weight: 700;
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
	max-width: 700px;
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
	max-width: 700px;
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
	box-shadow: inset #333 0 0 0 700px;
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
