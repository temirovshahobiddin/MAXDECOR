<template>
  <div class="app" ref="app">
    <Navbar :basketOpen="basketOpen" @toggle-basket="toggleBasket" />
    <Basket :class="{ open_aside: basketOpen }" @toggle-basket="toggleBasket" />
    <div class="app-page">
      <transition name="fade" mode="out-in">
        <router-view @toggle-favorite-icon="toggleFavoriteIcon"></router-view>
      </transition>
    </div>
    <Footer></Footer>
    <Dialog
      header=" "
      :visible.sync="displayModal"
      containerStyle="max-width: 688px; width: 100%; "
      :modal="true"
      class="fullscreen-dialog"
    >
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <template #footer>
        <Button>qalesan</Button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
import { mapActions, mapGetters } from "vuex";
import Navbar from "@/components/TheNavbar.vue";
import Footer from "@/components/Footer.vue";
import Basket from "@/components/Basket.vue";

export default {
  components: {
    Navbar,
    Footer,
    Basket,
    Dialog,
  },
  data() {
    return {
      basketOpen: false,
      displayModal: false,
    };
  },
  computed: {
    ...mapGetters("device", ["getDeviceId", "csrf"]),
    someMethod() {
      this.generateDeviceId();
      const device_id = this.getDeviceId;
    },
  },
  methods: {
    ...mapActions("device", ["generateDeviceId", "getCsrf"]),
    toggleBasket() {
      this.basketOpen = !this.basketOpen;
    },
    toggleFavoriteIcon(index) {
      const navSelect = document.querySelector(".nav__select");
      if (navSelect) {
        navSelect.classList.add("nav__select-click");
        setTimeout(() => {
          navSelect.classList.remove("nav__select-click");
        }, 1500);
      }
    },
    scrollToFooter() {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    },

    openModal() {
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },
  },
  mounted() {
    window.addEventListener("click", this.closeBasket);
    this.generateDeviceId();
    this.getCsrf();
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeBasket);
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
