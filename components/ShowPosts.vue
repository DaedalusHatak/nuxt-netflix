<script setup lang="ts">
import { Timestamp, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Post } from '~/types';
const showNewElements = ref<boolean>(false);
  const isScrolling = ref<boolean>(false);
const userProfile = useProfile();
const menu = ref<HTMLDivElement | null>(null);
const isDataLoaded = ref<boolean>(false);
    const isTryingToDelete = ref<boolean>(false);
    const showMoreInfo = ref<Post | null>(null);
    const firestoreDatabase = ref<Post[]>([]);
        const newPosts = ref<Post[]>([]);
const isFirst = computed(() => {
  return isDataLoaded.value ? "fade" : "standard";
});

//VueUse for menu delete button
onClickOutside(menu, (event) => {
  showMoreInfo.value = null;
});



  window.addEventListener("scroll", scrolling);

  const firestore = getFirestore();
  const coll = query(collection(firestore, "avatar"), orderBy("createdAt"));
  const unsub = onSnapshot(coll, (doc) => {
    doc.docChanges({}).forEach(async (snapshot) => {
      let data = snapshot.doc.data() as Post;
      if (snapshot.type === "modified") {
        if (!isScrolling.value) {
          firestoreDatabase.value[firestoreDatabase.value.length - 1].createdAt =
            snapshot.doc.data().createdAt;
        } else {
          newPosts.value[newPosts.value.length - 1].createdAt =
            snapshot.doc.data().createdAt;
        }
      } else if (snapshot.type === "added") {
        data.id = snapshot.doc.id;
        if (!isScrolling.value) {
          firestoreDatabase.value.push(data);
        } else {
          showNewElements.value = true;
          newPosts.value.push(data);
        }
      } else {
        const index = (element: any) => element.id === snapshot.doc.id;
        if (newPosts.value.findIndex(index) !== -1) {
          const indexToDelete = newPosts.value.findIndex(index);
          newPosts.value.splice(indexToDelete, 1);
        } else {
          const indexToDelete = firestoreDatabase.value.findIndex(index);
          firestoreDatabase.value.splice(indexToDelete, 1);
        }
      }
    });
    setTimeout(() => {
      isDataLoaded.value = true;
    }, 1);
  });


function scrolling() {
  if (window.scrollY > 0) {
    isScrolling.value = true;
  }
}


function showElements() {
  showNewElements.value = false;
  for (const item of newPosts.value) {
    firestoreDatabase.value.push(item);
  }
  window.scrollTo(0, 0);
  newPosts.value = [];
}

async function deleteDocuments(element: any) {
  const firestore = getFirestore();
  if (userProfile.value.email === element.user) {
    const document = doc(firestore, "avatar", element.id);
    await deleteDoc(document);
  } else {
    isTryingToDelete.value = true;
  }
}


function showTime(time: Timestamp) {
  const data = ref();
  if (time) {
    data.value = new Date(time.toDate());
  } else {
    data.value = new Date();
  }

  const currData = new Date();
  const formattedData =
    data.value.getDate().toString().padStart(2, "0") +
    "." +
    (data.value.getMonth() + 1).toString().padStart(2,"0") +
    "." +
    data.value.getFullYear() +
    " ";
  const formattedTime =
    data.value.getHours().toString().padStart(2, "0") +
    ":" +
    data.value.getMinutes().toString().padStart(2, "0");

  if (currData.getDate() - data.value.getDate() === 0) {
    return "Today " + formattedTime;
  } else if (currData.getDate() - data.value.getDate() === 1) {
    return "Yesterday " + formattedTime;
  } else {
    return formattedData + formattedTime;
  }
}
</script>

<template>
      <div class="container">
    <button @click="showElements()" class="new-posts" v-if="showNewElements">
      Click me to show new Elements {{ newPosts.length }}
    </button>
  </div>
 <section>
    <TransitionGroup :name="isFirst">
      <div class="posts" v-for="post in firestoreDatabase" :key="post.id">
        <div class="post">
          <div class="user">
            {{ post.user }}
            <span class="time">{{ showTime(post.createdAt) }}</span>
          </div>
          {{ post.post.trim().replace(/\s\s+/g, "\n\n") }}
          <button
            class="show-more-button"
            @click="showMoreInfo = post"
            v-if="userProfile.email === post.user"
          >
            <IconInfo />
          </button>
          <div ref="menu" class="delete-menu" v-if="showMoreInfo === post">
            <button @click="deleteDocuments(post)" class="delete-button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </section>
</template>

<style scoped lang="scss">
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
.posts {
  background-color: rgb(53, 53, 88, 1);

  border-radius: 5px;
  border: 1px solid #86868b;
  max-width: 700px;
  width: 70vw;
  padding: 1rem 1.25rem 2rem 1.25rem;
  font-size: 1.15rem;
  margin: 0.6rem auto;
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
  color: #f7bc51;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 700;
}
.time {
  color: rgb(170, 170, 170);
}
.show-more-button {
    cursor: pointer;
    color:#fff;
    border: none;
  background-color: transparent;
  margin: 0;
  position: absolute;
  padding: 0.3rem;
  height: max-content;
  right: 0;
  top: -10px;
  z-index: 1;
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
.delete-button {
  background-color: rgba(255, 0, 0, 1);

  margin: 0;
  position: absolute;
  padding: 0.3rem 1.2rem;

  right: 65px;
  top: 35px;
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
</style>