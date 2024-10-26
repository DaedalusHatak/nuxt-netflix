<script setup lang="ts">
  import {
    addDoc,
    collection,
    getFirestore,
    serverTimestamp,
  } from "firebase/firestore";
  import { UserProfile } from "~/types";

  const userProfile = await useProfile();
  const textarea = ref<HTMLTextAreaElement | null>(null);
  const isScrolling = ref<boolean>(false);
  const post = ref<string>("");
  const isActive = ref<boolean>(false);

  function autoResize() {
    textarea.value!.style.height = "auto";
    textarea.value!.style.height = textarea.value!.scrollHeight + "px";
  }
  //Label position based on focus in/out and input value
  function focusIn() {
    isActive.value = true;
  }
  function focusOut() {
    if (post.value === "" || post.value === undefined) {
      isActive.value = false;
    }
  }
  //Adds new post
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
    addDoc(collection(firestore, "avatar"), newData);
    post.value = "";
    textarea.value!.style.height = "auto";
  }
</script>

<template>
  <div class="container">
    <div class="new-post-textarea">
      <textarea
        id="post-area"
        ref="textarea"
        v-model="post"
        @focusout="focusOut"
        @change="post === '' ? (isActive = false) : (isActive = true)"
        @focusin="focusIn"
        @input="autoResize"
      />
      <label
        :class="isActive ? 'label-active' : 'label'"
        for="post-area"
        class="label"
        >Add a new post</label
      >
    </div>
    <button @click="addData(post)">Add a new post</button>
  </div>
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
