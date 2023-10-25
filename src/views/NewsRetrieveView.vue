<template>
  <div class="home">
    <Basket data-aos="fade-up" :basketOpen="basketOpen" />
    <NewsTop data-aos="fade-up" />
    <News data-aos="fade-up" />
    <FormCard data-aos="fade-up" />
  </div>
</template>

<script>
import Basket from "@/components/Basket.vue";
import NewsTop from "@/components/NewsTop.vue";
import News from "@/components/News.vue";
import FormCard from "@/components/FormCard.vue";

export default {
  components: {
    Basket,
    News,
    NewsTop,
    FormCard,
  },
  data: () => ({
    basketOpen: false,
  }),
  methods: {
    toggleBasket() {
      this.basketOpen = !this.basketOpen;
    },
    toggleFavoriteCard(index) {
      this.cards[index].isActive = !this.cards[index].isActive;
    },
  },
};
</script>

<style>
</style>