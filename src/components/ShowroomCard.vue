<template>
  <div class="showroom-card__container container">
    <div class="showroom-card__title" v-html="item.title"></div>
    <div class="showroom-card__text" v-html="item.content"></div>
    <div class="showroom-card__swiper" :id="idSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide another" v-for="(obj, idx) in item.images" :key="idx">
          <img :src="obj.image" alt="" />
        </div>
      </div>
      <div class="navigation__wrapperr">
        <div class="first-navigation__container">
          <div
            :class="`first-navigation-prev-${this.idSwiper}`"
            id="style-btn-prev__showroom"
          >
            <img :src="arrowPagination" alt="" />
          </div>
          <div
            :class="`first-navigation-next-${this.idSwiper}`"
            id="style-btn-next__showroom"
          >
            <img :src="arrowPagination" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
export default {
  props: ["item"],
  data() {
    return {
      idSwiper: "swiper-" + Math.random(),
      arrowPagination: require("@/assets/img/about/arrow.svg"),
    };
  },

  mounted() {
    new Swiper(document.getElementById(`${this.idSwiper}`), {
      modules: [Navigation],
      loop: true,
      autoHeight: true,
      slidesPerView: 2,
      spaceBetween: 50,
      grabCursor: true,
      breakpoints: {
        762: {
          slidesPerView: 2,
        },
        100: {
          slidesPerView: 1,
        },
      },
      pagination: {
        el: `[class='swiper-pagination-${this.idSwiper}']`,
        clickable: true,
      },
      navigation: {
        nextEl: `[class='first-navigation-next-${this.idSwiper}']`,
        prevEl: `[class='first-navigation-prev-${this.idSwiper}']`,
      },
    });
  },
};
</script>

<style></style>
