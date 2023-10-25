<template>
  <section class="ss container">
    <div class="first-navigation-next">
      <img :src="swiperArrow" alt="" />
    </div>
    <div class="swiper mySwiper" ref="swiper">
      <div class="swiper-wrapper">
        <div
          id="slide_1"
          class="swiper-slide"
          v-for="slide in infoProductData.articuls"
          :key="slide.id"
          @click="changeHeroImg(slide)"
        >
          <img :src="slide.photo" alt="" />
          <p>
            <span>{{ slide.title }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="first-navigation-prev">
      <img :src="swiperArrow" alt="" />
    </div>
  </section>
</template>

<script>
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    idSwiper: "swiper-" + Math.random(),

    swiperArrow: require("@/assets/img/slider/product-swiper-arrow.svg"),
  }),

  computed: {
    ...mapGetters("products", ["products", "infoProduct"]),
    ...mapGetters("collections", ["collections"]),

    infoProductData() {
      return this.infoProduct;
    },
  },
  mounted() {
    new Swiper(this.$refs.swiper, {
      modules: [Navigation],
      loop: false,
      slidesPerView: 4,
      spaceBetween: 54,
      grabCursor: true,
      navigation: {
        nextEl: ".first-navigation-next",
        prevEl: ".first-navigation-prev",
      },
      /*    scrollbar: {
        el: ".swiper-scrollbar",
      }, */
    });
    const firstSlide = this.infoProductData.variants[0];
    this.changeHeroImg(firstSlide);
  },
  beforeDestroy() {
    this.isActive = false; // Деактивируем компонент
    if (this.swiper) {
      this.swiper.destroy();
    }
  },
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct"]),
    ...mapActions("collections", ["getCollections"]),

    onWindowResize() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
    },
    async fetchProductDetails(productId) {
      try {
        // Call the getInfoProduct action to fetch the data
        await this.getInfoProduct(productId);

        // Once the data is fetched, update the component's data with the received information
      } catch (error) {
        console.error(error);
      }
    },
    changeHeroImg(slide) {
      this.$emit("update-hero-image", slide.photo);
    },
  },
};
</script>

<style></style>
