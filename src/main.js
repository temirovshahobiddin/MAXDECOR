import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./interceptors/axios";
import './assets/scss/main.scss'
import './assets/css/all.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'; // Choose the desired theme
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import i18n from "./i18n";
import AOS from 'aos'
import 'aos/dist/aos.css'
import "vue-progress-path/dist/vue-progress-path.css";
import VueProgress from "vue-progress-path";

export const eventBus = new Vue();
Vue.config.productionTip = false

Vue.use(VueProgress, {
  defaultShape: 'circle',
})
new Vue({
  router,
  store,
  i18n,

  render: h => h(App),
  mounted() {
    AOS.init()
  },
}).$mount('#app')