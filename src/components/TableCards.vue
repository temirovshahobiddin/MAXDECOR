<template>
  <div class="card-table">
    <section class="table-card__container container">
      <Spinner v-if="isLoading" />
      <div class="card__container" v-for="card in displayedCollections" :key="card.id">
        <div class="card__figure" @mouseover="card.isActive = true" @mouseout="card.isActive = false">
          <a class="" @click="getProductDetails(card.id)">
            <img class="card__img" :src="card.photo" alt="" />

            <div class="card__figure-elem">
              <div class="card__figure-title" :class="{
                'no-status': card.status === null,
                new: card.status === 'New',
                sale: card.status === 'Sale',
              }">
                {{
                  card.status === "New"
                  ? "Новинка"
                  : card.status === "Hit"
                    ? "Хит"
                    : card.status === "Sale"
                      ? "Скидка"
                      : ""

                }}
              </div>
              <div class="card__figure-btn" :class="{ 'active__card-figure-btn': card.isActive }"
                @click.stop="getProductDetails(card.id)" style="text-transform: uppercase">
                Смотреть коллекцию
              </div>
            </div>
          </a>
          <div class="card__figure-btn-fav-icon" @click="toggleFavoriteIcon(card.id)"
            :class="{ 'card__figure-btn-fav-icon_select': card.favActive }">
            <div class="heart-container">
              <i class="far fa-heart like-btn" :class="{ fas: card.favActive, liked: card.favActive }"></i>
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
            <div class="card__body-title_type" v-for="item in card.picture_type" :key="item.id">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="card-table__open" @click="toggleCardTableOpen">
      {{ isCardTableOpen ? "ЗАКРЫТЬ" : $t("allCollection") }}
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { prettifySum } from "@/use/prettify";
import Spinner from "@/components/Spinner.vue";
export default {
  data: () => ({
    productionIcon: require("@/assets/img/cards/card-product-icon.svg"),
    paginationArrow: require("@/assets/img/cards/pagination_arrow.svg"),
    prettifySum,
    addedToCartIds: [],
    isCardTableOpen: false,
    loadingMore: false, // Flag to track if new data is being loaded
    hasMoreData: true, // Flag to track if there is more data to load
    itemsPerPage: 12, // Maximum items to display per page
    itemsToLoad: 6, // Number of items to load per scroll
    currentPage: 1, // Current page
  }),
  components: { Spinner },
  computed: {
    ...mapGetters("collections", [
      "collections",
      "infoProduct",
      "filteredCollections",
      "isLoading",
    ]),
    ...mapGetters("cart", ["cart"]),
    ...mapGetters("like", ["like"]),

    displayedCollections() {
      if (this.isLoading) {
        return []; // Return an empty array when data is loading
      }

      // If filteredProducts exist and is not empty, use them; otherwise, use products
      return this.filteredCollections && this.filteredCollections.length > 0
        ? this.filteredCollections
        : /*          this.isCardTableOpen */
        this.collections || [];
    },
  },

  methods: {
    ...mapActions("collections", [
      "getCollections",
      "getInfoCollection",
      "applyFilter",
    ]),
    ...mapActions("like", ["addLike", "getLike"]),
    ...mapActions("cart", ["getCart", "addCart", "deleteCart"]),
    /*   handleScroll() {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 50
      ) {
        const new_anime = this.getCollections();

        this.itemsPerPage = [...this.anime_list, ...new_anime];
      }
    }, */
    async getProductDetails(productId) {
      if (!productId) {
        console.error("Invalid product ID");
        return;
      }

      await this.$store.dispatch("products/getInfoCollection", productId);
      this.$router.push({ name: "product", params: { id: productId } });
    },

    async toggleFavoriteIcon(cardId) {
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
        const card = this.displayedCollections.find(
          (card) => card.id === cardId
        );
        if (card) {
          card.favActive = !card.favActive;
          await this.$store.dispatch("like/addLike", card.id);
        }
      }
    },
    toggleCardFigure(index, show) {
      this.$set(this.isActiveCardFigureBtn, index, show);
    },
    toggleCardTableOpen() {
      this.isCardTableOpen = !this.isCardTableOpen;
      const tableCardContainer = document.querySelector(
        ".table-card__container"
      );
      if (tableCardContainer) {
        tableCardContainer.style.maxHeight = this.isCardTableOpen
          ? tableCardContainer.scrollHeight + "px"
          : "";
      }
      if (!this.isCardTableOpen) {
        this.displayedCollections = [...this.collections];
      }
    },

    stopPr(e) {
      e.stopPropagation();
    },
  },
  async mounted() {
    await this.applyFilter();
    await this.getLike();

    const isMobileDevice = window.matchMedia("(max-width: 767px)").matches;
    window.addEventListener("scroll", this.handleScroll);
    try {
      await this.getCollections();
      this.displayedCollections.forEach((card) => {
        card.isActive = isMobileDevice;

        // Check if the card.id exists in the liked products (this.like)
        const likedProduct = this.like.find((liked) => liked.id === card.id);

        // If the product is liked, set favActive to true
        if (likedProduct) {
          card.favActive = true;
        }
      });
      this.collections.forEach((card) => {
        card.isActive = isMobileDevice;
      });
    } catch (error) { }
  },
  beforeDestroy() {
    // Remove the scroll event listener
    window.removeEventListener("scroll", this.loadMoreData);
  },
};
</script>

<style lang="scss" scoped>
.fade-in,
.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.no-status {
  display: none;
}

.fade-in {
  opacity: 1;
}

.active-page {
  color: #0b5ed7;
}

.new {
  background: #ed4546 !important;
  padding: 0 50px;
}

.sale {
  background: #fff !important;
  color: #ed4546 !important;

  padding: 0 50px;
}

.fade-out {
  opacity: 0;
}
</style>
