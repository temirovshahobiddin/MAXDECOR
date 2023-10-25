<template>
  <section class="ss-2">
    <div class="container">
      <div class="recom__container">
        <p class="recom__titel">Похожии коллекции</p>
        <div class="swiper-button__container">
          <div
            :class="`second-slider-prev slider-controls`"
            id="style-btn-prev"
          >
            <img :src="swiperArrow" alt="" />
          </div>
          <div
            :class="`second-slider-next slider-controls`"
            id="style-btn-next"
          >
            <img :src="swiperArrow" alt="" />
          </div>
        </div>
      </div>
      <div class="swiper mySwiper-2 container" :id="idSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="card in collections" :key="card.id">
            <div class="card__container" :key="card.id">
              <div
                class="card__figure"
                @mouseover="card.isActive = true"
                @mouseout="card.isActive = false"
              >
                <a class="" @click="getProductDetails(card.id)">
                  <img class="card__img" :src="card.photo" alt="" />

                  <div class="card__figure-elem">
                    <div
                      class="card__figure-btn"
                      :class="{ 'active__card-figure-btn': card.isActive }"
                      @click.stop="getProductDetails(card.id)"
                      style="text-transform: uppercase"
                    >
                      Смотреть коллекцию
                    </div>
                  </div>
                </a>
                <div
                  class="card__figure-btn-fav-icon"
                  @click="toggleFavoriteIcon(card.id)"
                  :class="{
                    'card__figure-btn-fav-icon_select': card.favActive,
                  }"
                >
                  <div class="heart-container">
                    <i
                      class="far fa-heart like-btn"
                      :class="{ fas: card.favActive, liked: card.favActive }"
                    ></i>
                  </div>
                </div>
              </div>
              <div class="card__body">
                <div class="card__body-first-column">
                  <div class="card__body-subtitle">{{ $t("collection") }}</div>
                  <div class="card__body-title">{{ card.title }}</div>
                </div>
                <div class="card__body-second-column">
                  <div class="card__body-subtitle">Тип рисунка</div>
                  <div
                    class="card__body-title"
                    v-for="item in card.picture_type"
                    :key="item.id"
                  >
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { prettifySum } from "@/use/prettify";
import Swal from "sweetalert2";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
export default {
  data: () => ({
    productionIcon: require("@/assets/img/cards/card-product-icon.svg"),
    swiperArrow: require("@/assets/img/slider/product-swiper-arrow.svg"),
    prettifySum,
    idSwiper: "swiper-" + Math.random(),
  }),
  async mounted() {
    await this.getCollections(1);
    new Swiper(document.getElementById(`${this.idSwiper}`), {
      modules: [Navigation],
      loop: false,

      spaceBetween: 54,
      breakpoints: {
        3500: {
          slidesPerView: 2,
          slidesPerView: 0,
        },
        1500: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 2,
        },
        100: {
          slidesPerView: 1,
        },
      },
      grabCursor: true,
      navigation: {
        nextEl: ".second-slider-next",
        prevEl: ".second-slider-prev",
      },

      /*    scrollbar: {
        el: ".swiper-scrollbar",
      }, */
    });
    try {
      await this.getCollections();
      this.collections.forEach((card) => {

        // Check if the card.id exists in the liked products (this.like)
        const likedProduct = this.like.find((liked) => liked.id === card.id);

        // If the product is liked, set favActive to true
        if (likedProduct) {
          card.favActive = true;
        }
      });
     
    } catch (error) {}
  },
  // .destroy();

  computed: {
    ...mapGetters("collections", [
      "collections",
      "infoCollection",
      "filteredcollections",
      "isLoading",
    ]),
    ...mapGetters("like", ["like"]),
  },
  methods: {
    ...mapActions("collections", [
      "getCollections",
      "getInfoCollection",
      "applyFilter",
    ]),
    ...mapActions("like", ["addLike"]),
    onWindowResize() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
    },
    async getProductDetails(productId) {
      if (!productId) {
        console.error("Invalid product ID");
        return;
      }

      await this.$store.dispatch("collections/getInfoCollection", productId);

      this.$nextTick(() => {
        this.$router.push({ name: "product", params: { id: productId } });
        this.$router.go()
      });
    },

    toggleFavoriteIcon(cardId) {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "",
          iconColor: "#192965",
          text: "Чтобы добавлять товар в избранное, пройдите регистрацию",
          showConfirmButton: false,
          timer: 15000, // Display for 1.5 seconds
        });
      } else {
        const card = this.collections.find((card) => card.id === cardId);
        if (card) {
          card.favActive = !card.favActive;
          this.addLike(card.id);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.second-slider-prev {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 46px !important;
  height: 46px !important;

  border-radius: 50%;
  background: #20202040;

  cursor: pointer;

  transition: all 0.2s linear 0s;

  &::after {
    display: none;
  }
}

.second-slider-next {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 46px !important;
  height: 46px !important;

  border-radius: 50%;
  background: #20202040;

  cursor: pointer;

  transition: all 0.2s linear 0s;

  img {
    transform: rotate(180deg);
  }

  &::after {
    display: none;
  }
}
#style-btn-next,
#style-btn-prev {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px !important;
  height: 46px !important;
  border-radius: 50%;
  background: #20202040;

  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    background: #192965;
  }
}
#style-btn-next {
  img {
    transform: rotate(180deg);
  }
}
.swiper-button-disabled {
  opacity: 0.3;
}
</style>
