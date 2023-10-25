import Vue from 'vue'
import Vuex from 'vuex'
import social from "./modules/socail.module";
import phone from "./modules/phone.module";
import addresses from "./modules/addresses.module";
import collections from "./modules/collections.module";
import orders from "./modules/orders.module";
import products from "./modules/collections.module";
import news from "./modules/news.module";
import inquiry from "./modules/inquiry.module";
import filter from "./modules/filter.module";
import cart from "./modules/cart.module";
import like from "./modules/like.module";
import device from "./modules/device.module";
import company from "./modules/company.module";
import showroom from "./modules/showroom.module";
import contacts from "./modules/contacts.module";
import stores from "./modules/stores.module";
import search from "./modules/search.module";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    social,
    phone,
    addresses,
    collections,
    inquiry,
    products,
    orders,
    cart,
    news,
    filter,
    like,
    device,
    search,
    company,
    showroom,
    contacts,
    stores
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},

})