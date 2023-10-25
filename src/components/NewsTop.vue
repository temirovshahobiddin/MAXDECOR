<template>
  <div>
    <div class="news__title-container container">
      <p class="news__title">
        {{ infoNewsData.title }}
      </p>
      <p class="news__title_descr">
       {{infoNewsData.subtitle}}
      </p>
    </div>

    <!-- Свайпер -->
    <div>
      <div class="swiper mySwiper news__swiper" ref="swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="slide in infoNewsData.pictures"
            :key="slide"
          >
            <img :src="slide.photo" alt="" />
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>

      <section class="news__body container">
        <div class="news__body-title">
          <p class="news__body-title_date">
            {{ formatDate(infoNewsData.created) }}
          </p>
          <p class="news__body-title_name">
            {{ infoNewsData.title }}
          </p>
        </div>

        <div class="news__body-copy" v-html="infoNewsData.content"></div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatDate } from "@/use/prettify";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  data: () => ({
    formatDate,
  }),
  computed: {
    ...mapGetters("news", ["news", "infoNews"]),
    infoNewsData() {
      return this.infoNews;
    },
  },
  methods: {
    logMethod() {},
    ...mapActions("news", ["getNews", "getInfoNews"]),
    onWindowResize() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
    },
    async fetchNewsDetails(newsId) {
      try {
        await this.getInfoNews(newsId);
      } catch (error) {
        console.error(error);
      }
    },
    initSwiper() {
      new Swiper(this.$refs.swiper, {
        modules: [Navigation, Pagination],
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        /*    scrollbar: {
          el: ".swiper-scrollbar",
        }, */
      });
    },
  },
  async mounted() {
    // Get the news ID from the route parameter
    const newsId = this.$route.params.id;

    // Fetch the news details using the news ID
    await this.fetchNewsDetails(newsId);

    // Initialize the Swiper after fetching the news details
    this.initSwiper();
  },
};
</script>

<style>
</style>