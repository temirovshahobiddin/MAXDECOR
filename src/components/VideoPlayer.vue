<template>
  <div class="">
    <section class="player__container">
      <div class="player__container-pos">
        <video
          loop
          :poster="playposter"
          muted
          class="main__video"
          :src="video"
          ref="video"
          autoplay
          playsinline
          loading="lazy"
        ></video>
        <img
          class="play__btn"
          :src="playBtn"
          alt=""
          @click="toggleVideoPlayback"
          v-if="!isVideoPlaying"
          loading="lazy"
        />
      </div>
    </section>

    <div class="pr">
      <div class="p-r"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    video: require("@/assets/video/about.mp4"),
    playBtn: require("@/assets/video/playBtn.svg"),
    playposter: require("@/assets/video/10501-frame.jpg"),
    isVideoPlaying: true,
  }),
  mounted() {
    this.$refs.video.addEventListener("ended", this.handleVideoEnded);
  },
  methods: {
    toggleVideoPlayback() {
      if (this.$refs.video.paused) {
        this.$refs.video.play();
        this.isVideoPlaying = true;
      } else {
        this.$refs.video.pause();
        this.isVideoPlaying = false;
      }
    },
    handleVideoEnded() {
      this.isVideoPlaying = false;
    },
  },
};
</script>

<style>
</style>