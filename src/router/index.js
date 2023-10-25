import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import NewsView from "../views/NewsView.vue";
import NewsRetrieveView from "../views/NewsRetrieveView.vue";
import Auth from "../views/Auth.vue";
import AboutCompanyView from "../views/AboutCompanyView.vue";
import VerifyOrderView from "../views/VerifyOrderView.vue";
import UserPlace from "../views/UserPlace.vue";
import UserOrders from "@/components/UserOrders.vue";
import UserFavorites from "@/components/UserFavorites.vue";
import Logout from "@/components/Logout.vue";
import WhereToBuy from "@/views/WhereToBuy.vue";
import Showroom from "@/views/ShowroomView.vue";
import ContactsView from "@/views/ContactsView.vue";
import ResetPassword from "@/views/ResetPassword.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/product/:id/",
    name: "product",
    component: ProductView,
    props: false,
  },
  {
    path: "/news-view/",
    name: "news-view",
    component: NewsView,
  },
  {
    path: "/news/:id/",
    name: "news",
    component: NewsRetrieveView,
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
  },
  {
    path: "/company",
    name: "company",
    component: AboutCompanyView,
  },
  {
    path: "/verify-order",
    name: "verify-order",
    component: VerifyOrderView,
  },
  {
    path: "/where-to-buy",
    name: "where-to-buy",
    component: WhereToBuy,
  },
  {
    path: "/showroom",
    name: "showroom",
    component: Showroom,
  }, {
    path: "/users/reset_password/reset/:uidb/:token/",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/contacts",
    name: "contacts",
    component: ContactsView,
  },
  {
    path: "/user",
    name: "user",
    component: UserPlace,
    beforeEnter: (to, from, next) => {
      if (hasValidToken()) {
        next();
      } else {
        next("/auth");
      }
    },
    children: [{
        path: "orders",
        name: "userOrders",
        component: UserOrders,
      },
      {
        path: "favorites",
        name: "userFavorites",
        component: UserFavorites,
      },
      {
        path: "logout",
        name: "logout",
        component: Logout,
      },
    ],
  },
];

function hasValidToken() {
  const token = localStorage.getItem("token");
  return !!token;
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
    };
  },
});

export default router;