<template>
  <div class="header" :style="{ cursor: cursorStyle }" @mouseenter="showCursor" @mouseleave="hideCursor">
    <div :class="[
      'g-cursor',
      { 'g-cursor_hover': hover },
      { 'g-cursor_hide': hideCursor },
    ]">
      <div :style="cursorCircle" class="g-cursor__circle"></div>
      <div class="g-cursor__point" ref="point" :style="cursorPoint"></div>
    </div>
    <div class="swiper mySwiper" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide in bannerPage" :key="slide.id" :style="{
          background: 'url(' + slide.photo + ') center center / cover',
        }">
          <div class="container container-a_p">
            <div class="slide-card__container">
              <div class="slide-card__subtitle" style="text-transform: uppercase" :style="{
                backgroundColor:
                  slide.status === 'New'
                    ? '#ED4546'
                    : slide.status === 'Hit'
                      ? '#192965'
                      : 'Green',
              }">
                {{
                  slide.status === "New"
                  ? "Новинка"
                  : slide.status === "Hit"
                    ? "Хит"
                    : "Новости"
                }}
              </div>
              <div class="slide-card__descriptor">Коллекция</div>
              <div class="slide-card__title" :class="{ 'news-status': !slide.status }">{{ slide.title
              }}</div>
              <div class="slide-card__button-container">
                <a class="slide-card__button"
                  @click="!slide.status ? getNewsDetails(slide.id) : getProductDetails(slide.id)">
                  <!-- {{ slide.about }} -->
                  Смотреть
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { prettifySum } from "@/use/prettify";
import { mapActions, mapGetters } from "vuex";
import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
export default {
  data: () => ({
    prettifySum,
    hitSlides: [],
    cursorStyle: "default",
    xChild: 0,
    yChild: 0,
    xParent: 0,
    yParent: 0,
    hover: false,
    hideCursor: true, // Set text color conditionally
  }),
  computed: {
    ...mapGetters("collections", [
      "Collections",
      "hitCollections",
      "infoCollection",
      "filteredCollections",
      "bannerPage",
    ]),
    cursorCircle() {
      return `transform: translateX(${this.xParent}px) translateY(${this.yParent}px) translateZ(0) translate3d(0, 0, 0);`;
    },
    cursorPoint() {
      return `transform: translateX(${this.xChild - 3}px) translateY(${this.yChild - 3
        }px) translateZ(0) translate3d(0, 0, 0);`;
    },
  },
  methods: {
    ...mapActions("collections", [
      "getCollections",
      "getHitCollections",
      "getInfoCollection",
      "applyFilter",
      "getCombinedCollections",
    ]),
    showCursor() {
      this.hideCursor = false;
    },
    hideCursor() {
      this.hideCursor = true;
    },
    moveCursor(e) {
      if (!this.hideCursor) {
        this.xChild = e.clientX;
        this.yChild = e.clientY;
        setTimeout(() => {
          this.xParent = e.clientX - 15;
          this.yParent = e.clientY - 15;
        }, 100);
      }
    },

    async getProductDetails(productId) {
      if (!productId) {
        console.error("Invalid product ID");
        return;
      }

      await this.$store.dispatch("collections/getInfoCollection", productId);
      this.$router.push({ name: "product", params: { id: productId } });
    },
    async getNewsDetails(newId) {
      if (!newId) {
        console.error("Invalid product ID");
        return;
      }

      await this.$store.dispatch("news/getInfoNews", newId);
      this.$router.push({ name: "news", params: { id: newId } });
    },

    onWindowResize() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
    },
    changeCursor(style) {
      this.cursorStyle = style;
    },
  },

  async mounted() {
    await this.getCombinedCollections(); // Wait for data fetching to complete

    // Initialize the Swiper only after the data has been fetched and processed
    new Swiper(this.$refs.swiper, {
      modules: [Navigation, Pagination, EffectFade, Autoplay],
      loop: true,
      effect: "fade",
      spaceBetween: 30,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    Swiper.autoplay.start();
    document.addEventListener("mousemove", this.moveCursor);

    // Add event listeners for entering and leaving the .header element
    this.$el.addEventListener("mouseenter", this.showCursor);
    this.$el.addEventListener("mouseleave", this.hideCursor);
  },
};
</script>

<style>
/* Add your styles here */
</style>
