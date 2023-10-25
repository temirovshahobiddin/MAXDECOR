<template>
  <section class="slider-prod__container">
    <div v-for="item in infoCollection.videos" :key="item.id">
      <img
        class="slider-prod__big-img-1"
        :class="{ 'slider-prod__img-active': activeImage === item.id }"
        :src="item.photo"
        alt=""
        loading="lazy"
        @click="showImage(item.id)"
      />
    </div>
    <div class="slider-prod__gradient"></div>

    <div class="slider-prod__btn-container">
      <div
        class="slider-prod__btn-1"
        v-for="item in infoCollection.videos"
        :key="item.id"
        @click="showImage(item.id)"
        :class="{ 'slider-prod__img-active': activeButton === item.id }"
      >
        <img :src="item.photo" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import router from "@/router";
export default {
  data() {
    return {
      video: require("@/assets/video/10501.mp4"),
      playBtn: require("@/assets/img/product/playBtn-video-prod.svg"),
      playposter: require("@/assets/img/product/video-prod-poster.png"),
      first: require("@/assets/img/product/big_kitchen.jpg"),
      second: require("@/assets/img/product/10501-4.jpg"),
      activeImage: "img1",
      activeButton: null,
    };
  },
  computed: {
    ...mapGetters("collections", [
      "collections",
      "infoCollection",
      "filteredcollections",
    ]),
    firstVideo() {
      if (this.infoCollection.videos.length > 0) {
        return this.infoCollection.videos[0].photo;
      }
      return null;
    },
  },
  methods: {
    ...mapActions("collections", [
      "getcollections",
      "getInfoCollection",
      "applyFilter",
    ]),
    showImage(imageId) {
      this.activeImage = imageId;
      /* if (this.activeImage !== "video") {
        this.$refs.video.pause();
      } */
      this.activeButton = imageId;
    },
    showVideo() {
      this.activeImage = "video";
      this.$refs.video.play();
    },
    activePicture() {
      if (this.infoCollection.videos[0].id) {
        this.activeImage = this.infoCollection.videos[0].id;
      }
    },
  },
  async mounted() {
    await this.getInfoCollection();
    this.activePicture();
  },
  watch: {
    // Следим за изменениями в infoProduct и обновляем selectedImage
    infoCollection: {
      handler() {
        this.activePicture();
      },
      deep: true, // Глубокое слежение, если infoProduct имеет вложенные объекты
    },
  },
};
</script>

<style>
/* Add any necessary styles for the component here */
</style>
