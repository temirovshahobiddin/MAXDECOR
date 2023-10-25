<template>
  <div>
    <Contacts />
    <News data-aos="fade-up" />
    <FormCard data-aos="fade-up" />
  </div>
</template>

<script>
import Navbar from "@/components/TheNavbar.vue";
import Basket from "@/components/Basket.vue";
import News from "@/components/News.vue";
import FormCard from "@/components/FormCard.vue";
import Footer from "@/components/Footer.vue";
import Contacts from "@/components/Contacts.vue";
export default {
  components: {
    Navbar,
    Basket,
    News,
    FormCard,
    Footer,
    Contacts,
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

<style></style>
