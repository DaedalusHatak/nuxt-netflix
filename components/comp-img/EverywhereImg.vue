<template>
  <img src="@/assets/pot1.png" alt="" />
  <div class="video-screen">
    <img src="@/assets/video.jpg" alt="" />
    <!-- <video
      data-uia="nmhp-card-animation-asset-video"
      autoplay="true"
      playsinline="true"
      muted="true"
      loop="true"
    >
      <source src="@/assets/video-devices.mp4" type="video/mp4" />
    </video> -->
  </div>
</template>

<style scoped>
.video-screen {
  z-index: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 63%;
  max-height: 47%;
  position: absolute;
  top: 36%;
  left: 53%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%) scale(1.05);
}
img {
  z-index: 1;
  width: 100%;
}
</style>
