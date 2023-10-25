<template>
  <div class="user">
    <section class="personalArea__header container">
      <div class="personalArea__header-title_container">
        <router-link
          :to="{ name: 'userOrders' }"
          class="personalArea-link"
          :class="{
            active:
              isChildRouteActive('userOrders') || isDefaultRoute('userOrders'),
            disabled: isChildRouteActive('logout'),
          }"
          :disabled="isChildRouteActive('logout')"
          >Заказы</router-link
        >

        <router-link
          :to="{ name: 'userFavorites' }"
          class="personalArea-link"
          :class="{
            active: isChildRouteActive('userFavorites'),
            disabled: isChildRouteActive('logout'),
          }"
          :disabled="isChildRouteActive('logout')"
          >Избранное</router-link
        >

        <a
          @click="logout"
          class="personalArea-link"
          :class="{ active: isChildRouteActive('logout') }"
          >Выход</a
        >
      </div>

      <div class="personalArea__heade_under-line"></div>
    </section>
    <div class="user-routing">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <FormCard />
  </div>
</template>

<script>
import News from "@/components/News.vue";
import FormCard from "@/components/FormCard.vue";
import axios from "axios"; // Import Axios
export default {
  components: {
    News,
    FormCard,
  },
  data: () => ({
    exitImg: require("@/assets/img/exit-icon.svg"),
    deleteImg: require("@/assets/img/basket/basket-item__delete.svg"),
    basketFirstImg: require("@/assets/img/basket/basket_BIG_img.png"),
    links: [
      {
        clickActive: true,
      },
      {
        clickActive: true,
      },
      {
        clickActive: true,
      },
    ],
  }),
  methods: {
    isDefaultRoute(routeName) {
      return this.$route.name === routeName;
    },
    isChildRouteActive(routeName) {
      return this.$route.matched.some((route) => route.name === routeName);
    },
    async logout() {
      try {
        // Send a POST request to the logout URL
        await axios.get("/users/logout/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Clear the token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");

        // Redirect the user to the login page after logout
        this.$router.push({ name: "logout" });
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
};
</script>

<style>
.user-routing {
  margin-bottom: 150px;
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 10px;
}

.user-routing::-webkit-scrollbar {
  height: 3px;
}

.user-routing::-webkit-scrollbar-track {
  background: #ffffff;
}

.user-routing::-webkit-scrollbar-thumb {
  background-color: #192965;
  height: 3px;
  border-radius: 20px;
}

@media (max-width: 1500px) {
  .user-routing {
    margin: 0 20px;
  }
}

@media (max-width: 500px) {
  .user-routing {
    margin-bottom: 50px;
  }
}
</style>
