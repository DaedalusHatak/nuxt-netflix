<template>
    <img src="@/assets/tv.png" alt="" />
      <div class="video-screen">
        <video
          data-uia="video"
          autoplay="true"
          playsinline="true"
          muted="true"
          loop="true"
        >
          <source src="@/assets/video.mp4" type="video/mp4" />
        </video>
        </div>
</template>

<style scoped>
.video-screen {
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 73%;
  max-height: 54%;
  position: absolute;
  top: 47.7%;
  left: 49.5%;
  transform: translate(-50%, -50%);
}
img{
    z-index: 1;
  width: 100%;
}</style>