<template>
  <section class="personalArea__select container">
    <!-- Карточка -->

    <Spinner v-if="isLoading" />
    <div v-if="cartItemCount === 0" class="personalArea__table-empty">
      <p class="table__empty-txt">У вас пока нет избранного</p>
    </div>

    <div
      class="personalArea-card__container"
      v-for="item in like"
      :key="item.id"
    >
      <div class="personalArea-card__item">
        <div class="personalArea-card__img">
          <img :src="item.photo" alt="" />
        </div>

        <div class="personalArea-card__body">
          <div class="personalArea-card-item__name">
            {{ item.title }}
            <div
              class="personalArea-card-item__price"
              v-for="(smth, index) in item.picture_type"
              :key="index"
            >
              {{ smth.title }}
            </div>
          </div>

          <div
            class="personalArea-card-item__add-basket"
            @click="getProductDetails(item.id)"
          >
            Смотреть коллекцию
          </div>
        </div>

        <div
          class="personalArea-card-item__delete"
          @click="toggleFavoriteIcon(item)"
        >
          <img :src="deleteImg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatDate, prettifySum } from "@/use/prettify";
import Spinner from "@/components/Spinner.vue";
import axios from "axios";
export default {
  data: () => ({
    exitImg: require("@/assets/img/exit-icon.svg"),
    deleteImg: require("@/assets/img/basket/basket-item__delete.svg"),
    basketFirstImg: require("@/assets/img/basket/basket_BIG_img.png"),
    formatDate,
    prettifySum,
  }),
  components: { Spinner },
  computed: {
    ...mapGetters("products", [
      "products",
      "infoProduct",
      "filteredProducts",
      "isLoading",
    ]),
    ...mapGetters("like", ["like", "isLoading"]),
    ...mapGetters("cart", ["cart"]),
    cartItemCount() {
      // Check if this.like is defined and not null, then calculate the count
      return this.like ? Object.keys(this.like).length : 0;
    },
  },

  methods: {
    ...mapActions("like", ["addLike", "getLike"]),
    ...mapActions("cart", ["getCart", "addCart", "deleteCart"]),
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),

    async getProductDetails(productId) {
      if (!productId) {
        console.error("Invalid product ID");
        return;
      }

      await this.$store.dispatch("products/getInfoProduct", productId);
      this.$router.push({ name: "product", params: { id: productId } });
    },

    toggleFavoriteIcon(item) {
      this.getLike();
      this.$store.dispatch("like/addLike", item.id);
    },
  },
  mounted() {},
};
</script>

<style>
</style>