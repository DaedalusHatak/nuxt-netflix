<script setup lang="ts">
  import BaseInput from "@/components/BaseInput.vue";
  const isPageReady = ref<boolean>(false);
  const emailInput = ref<string>("");
  const password = ref<string>("");
  const isError = ref<boolean>(false);
  onMounted(() => {
    isPageReady.value = true;
  });
  const isSent = ref<boolean>(false);
  const sendData = async (email: string, password: string) => {
    isSent.value = true;
    try {
      const signingIn = await signIn(email, password);
      if (signingIn.user) {
        const idToken = await signingIn.user.getIdToken();
        const scrfToken = useCookie("__token");
        const signIn = await useFetch("/api/signIn", {
          method: "POST",
          body: { idToken },
        });
        await navigateTo("/browse");
      }
    } catch (err) {
      isSent.value = false;
      isError.value = true;
    }
  };
</script>

<template>
  <BaseModal
    v-if="isError"
    @closeModal="isError = false"
    message="Wrong email or password. Check your data!"
  ></BaseModal>
  <img
    class="hero-img"
    src="@/assets/background.png"
    alt=""
  />
  <div class="shadow-hero-image"></div>
  <div class="hero-wrapper">
    <nav>
      <span class="logo-span"
        ><img
          src="@/assets/daedalus.png"
          alt=""
        />
      </span>
    </nav>
    <div class="flex-hero">
      <div class="form-hero">
        <div class="login-form">
          <h1>Sign In</h1>
          <form
            @submit.prevent="sendData(emailInput, password)"
            name="login"
          >
            <div>
              <BaseInput
                v-model="emailInput"
                :background="true"
                name="Email or phone number"
                type="email"
              />
            </div>
            <div>
              <BaseInput
                v-model="password"
                :background="true"
                name="Password"
                type="password"
              />
            </div>
            <button
              v-if="isPageReady"
              class="get-started-button"
            >
              <span v-if="!isSent">Sign In</span>
              <div
                v-else
                class="loader"
              >
                <span class="loader-circle"></span>
              </div>
            </button>
          </form>
          <button
            v-if="isPageReady"
            @click="sendData('test@test.com', 'test1234')"
            class="get-started-button"
          >
            <span v-if="!isSent">Test login</span>
            <div
              v-else
              class="loader"
            >
              <span class="loader-circle"></span>
            </div>
          </button>
        </div>
        <div class="reg-link">
          New to Daedalus?
          <NuxtLink to="/">Sign up now</NuxtLink>.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  //basic
  h1 {
    text-align: left;
    margin-bottom: 2rem;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 5.375rem;
    margin: auto;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
  }

  form {
    display: flex;
    gap: 1rem;

    flex-direction: column;
    justify-content: center;
    text-align: left;
    position: relative;
  }

  a {
    color: white;
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  //classes
  .hero-img {
    display: none;
  }
  .shadow-hero-image {
    background: rgb(0 0 0 / 40%);
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8) 100%
    );
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .hero-wrapper {
    margin: auto;
  }
  .logo-span {
    margin-right: auto;
  }

  .flex-hero {
    display: flex;
    flex-direction: column;

    justify-content: center;
    min-height: 100vh;
  }

  .form-hero {
    display: flex;
    flex-direction: column;

    padding: 3rem 1rem 0 1rem;

    color: white;
    text-align: center;
  }

  .login-form {
    padding-bottom: 2rem;
    flex-grow: 1;
  }

  .reg-link {
    text-align: left;
    font-size: 16px;
    color: rgb(150, 150, 150);
  }

  .get-started-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    writing-mode: horizontal-tb !important;
    width: 100%;
    margin-top: 1rem;
    flex: 0 0 auto;
    border: 0px;

    font-size: 1.5rem;
    font-weight: 500;
    min-height: 3.5rem;
    padding: 0.75rem 1.5rem;
    background: rgb(51, 26, 187, 0.9);
    cursor: pointer;
    color: rgb(255, 255, 255);
    border-radius: 1rem;
  }
  .loader {
    border: 15px solid #f3f3f3; /* Light grey */
    border-top: 15px solid #3498db; /* Blue */
    border-radius: 100%;
    position: relative;
    height: 100%;

    animation: spin 2s linear infinite;
  }
  .loader span {
    background-color: rgb(51, 26, 187);
    display: block;
    position: absolute;
    inset: 0;
    left: -16px;
    top: -16px;
    border-radius: 100%;
    height: 32px;
    width: 32px;
    transform: scale(0.75, 0.75);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  //media
  @media screen and (min-width: 600px) {
    nav {
      max-width: calc(100% - 4rem);
    }
    .hero-img {
      height: 100%;
      width: 100%;
      min-height: 100dvh;
      display: block !important;
      position: absolute;
      object-fit: cover;
      transform: scale(1.25) translateY(-10%);
      overflow: hidden;
    }
    .flex-hero {
      max-width: 450px;
      margin: auto;
    }
    .form-hero {
      min-width: 500px;
      padding: 3rem 4rem;
      flex-grow: 0.3;
      max-width: calc(100% - 4rem);
      margin: 0 auto;
      color: white;
      text-align: center;

      background-color: rgba($color: #000000, $alpha: 0.8);
    }
  }
  @media screen and (min-width: 1280px) {
    nav {
      max-width: calc(83.33333333333334% - 6rem);
    }
    .form-hero {
      flex-grow: 0.07;
    }
  }
  @media screen and (min-width: 1920px) {
    nav {
      max-width: calc(66.66666666666666% - 6rem);
    }
    .form-hero {
      flex-grow: 0.05;
    }
  }

  @media (min-width: 720px) {
    .info {
      position: absolute;
      inset: 0;
      top: 70px;
      h1 {
        font-size: 2.8rem;
        font-family: fantasy;
        letter-spacing: 0.2ch;
        text-decoration: underline;
        font-weight: 600;
      }
      h3 {
        font-size: 2rem;
        font-weight: 600;
      }
    }
  }
</style>
