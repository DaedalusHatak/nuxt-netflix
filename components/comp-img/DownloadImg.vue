<template>
    <img class="background-img" src="@/assets/mobile-0819.jpg" alt="" />
      <div class="video-screen">
        <img class="videobox" src="@/assets/boxshot.png" alt="">
       <div class="status">
        <div>Stranger Things</div>
        <div class="blue">Downloading...</div>
       </div>
        <img class="download" src="@/assets/download-icon.gif" alt="">
        </div>
</template>

<style scoped>
.video-screen {
  font-size: 0.875rem;
  font-weight: 500;
  z-index: -1;
    overflow: hidden;
    position: absolute;
    left: 50%;
    bottom: 8%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    margin: 0 auto;
    background: rgba(0, 0, 0, 1);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 60%;
    min-width: 15rem;
    padding: 0.25rem 0.65rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 2em 0 rgba(0, 0, 0, 1);
    border-radius: 0.75rem;
    z-index: 1;
}
.blue{
  font-size: 0.75rem;

  color: #0071eb;
}
.status{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.videobox{
  margin-right: 1rem;
height: 3rem;
width: auto;
}
.download{
  height:3rem;
  width: auto;
}
.background-img{
width:100%;

}
@media only screen and (min-width: 600px){
.video-screen{
  font-size: 1rem;
}
.blue{
  font-size: 0.875rem;
}
}
@media only screen and (min-width: 960px){
  .download{
    height: 3.75rem;
  }
  .videobox{
    height: 4.75rem;
  }
  .video-screen{
 

    padding: 0.5rem 0.75rem;
  }
}
</style>