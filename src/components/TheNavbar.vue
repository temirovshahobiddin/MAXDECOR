<template>
  <nav class="nav__wrapper">
    <div class="nav-search__menu" :class="{ opened: searchedPruductsModal }">
      <div class="nav-search__inner">
        <a @click="closeSearchMenu" class="nav-search__close">Закрыть</a>

        <div class="search-menu__wrapper">
          <Spinner v-if="isLoading" />
          <p
            class="search-menu__title"
            v-if="!searchedResponse.length"
            :style="{ display: isLoading ? 'none' : 'block' }"
          >
            {{ articulName }}
          </p>
          <div
            class="search-menu__list"
            :style="{ display: isLoading ? 'none' : 'flex' }"
            :class="{ finded: searchedResponse.length }"
          >
            <div
              class="card__container"
              v-for="card in searchedResponse"
              :key="card.id"
            >
              <div class="card__figure">
                <a class="" @click="getProductDetails(card.collection.id)">
                  <img class="card__img" :src="card.photo" alt="" />
                </a>
              </div>
              <div class="card__body">
                <div class="card__body-first-column">
                  <div class="card__body-subtitle">{{ $t("collection") }}</div>
                  <div class="card__body-title">
                    {{ card.collection.title }}
                  </div>
                </div>
                <div class="card__body-second-column">
                  <div class="card__body-subtitle">Артикул</div>
                  <div class="card__body-title_type">
                    {{ card.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav__container">
      <div class="nav-logo__container" @click="toScrollTop">
        <img :src="headerLogo" alt="" />
      </div>

      <div class="nav-center__container">
        <div class="nav-link__container">
          <div class="nav-link__first-item" ref="saleCollection">
            <div
              class="nav-link__item nav-link__item-collections"
              :class="{ 'nav-link__item-active': ONCLICKOPENCOLLECTIONS }"
              @click="ONCLICKOPENCOLLECTIONS = !ONCLICKOPENCOLLECTIONS"
            >
              Коллекции
              <div
                :class="{
                  'nav-link__item-arrow__rotate': ONCLICKOPENCOLLECTIONS,
                }"
              >
                <img
                  class="nav-link__collections-arrow"
                  :src="headerArrow"
                  alt=""
                />
              </div>
            </div>

            <div
              class="nav-collections__container"
              :class="{
                'nav-collections__container-active': ONCLICKOPENCOLLECTIONS,
              }"
            >
              <div class="nav__swiper-title">Скидочные коллекции</div>
              <div class="swiper nav__swiper">
                <div class="swiper-wrapper nav__swiper-wrapper">
                  <div
                    class="swiper-slide nav__swiper-slide"
                    v-for="card in saleCollections"
                    :key="card.id"
                    @click="getProductDetails(card.id)"
                  >
                    <div class="nav-card__container">
                      <div class="nav-card__img-container">
                        <img class="nav-card__img" :src="card.photo" alt="" />
                        <div class="nav-card__title">скидка</div>
                      </div>
                      <div class="nav-card__body">
                        <div class="nav-card__collection-container">
                          <div class="nav-card__collection-title">
                            Коллекция
                          </div>
                          <div class="nav-card__collection-name">
                            {{ card.title }}
                          </div>
                        </div>
                        <div class="nav-card__type-container">
                          <div class="nav-card__type-title">Коллекция</div>
                          <div
                            class="nav-card__type-name"
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
                <div class="swiper-scrollbar"></div>
              </div>
            </div>
          </div>
          <router-link
            class="nav-link__item"
            to="/company"
            @click.native="closePhoneMenu()"
            >О фабрике</router-link
          >
          <router-link
            to="/showroom"
            class="nav-link__item"
            @click.native="closePhoneMenu()"
            >Шоурум</router-link
          >
          <router-link
            to="/news-view"
            class="nav-link__item"
            @click.native="closePhoneMenu()"
          >
            Новости
          </router-link>
          <router-link
            to="/where-to-buy"
            class="nav-link__item"
            @click.native="closePhoneMenu()"
            >Где купить?</router-link
          >
          <router-link
            to="/contacts"
            class="nav-link__item"
            @click.native="closePhoneMenu()"
            >Контакты</router-link
          >
        </div>

        <div class="nav-search__container">
          <label class="nav-search__label" for="headerSearch">
            <img :src="headerSearch" alt=""
          /></label>
          <input
            class="nav-search__input"
            id="headerSearch"
            type=""
            placeholder="Введите артикул"
            v-model="searchTerm"
            @click="openSearchedCollections"
          />
          <button class="nav-search__button" @click="performSearch">
            поиск
          </button>
        </div>
      </div>

      <div class="nav-btn__container">
        <div class="nav-btn__item nav-favourite" @click="openFavorite()">
          <div
            class="nav-favourite-any"
            v-for="(item, index) in like"
            :key="index"
          >
            {{ likeItemCount }}
          </div>
          <img :src="headerLike" alt="" />
        </div>
        <div class="nav-btn__item nav-basket" @click="toggleBasket">
          <div
            class="nav-basket-any"
            v-for="(item, index) in cart"
            :key="index"
          >
            {{ cartItemCount }}
          </div>
          <img :src="headerBascket" alt="" />
        </div>
        <div class="nav-btn__item" @click="nav__login_auth">
          <img :src="headerUser" alt="" />
        </div>
      </div>

      <div class="nav-lang__container">
        <div
          class="nav-lang__item"
          v-for="(lang, index) in languages"
          :key="lang.name"
          @click.stop="changeHandler(index, lang.value)"
          :class="{ active: lang === languages[langIndex] }"
        >
          {{ lang.name }}
        </div>
      </div>
    </div>

    <!-- Для небольших экранов -->
    <div class="nav-min__container">
      <div class="nav-min__first-row">
        <div class="nav-min-logo__container" @click="toScrollTop">
          <img :src="headerLogo" alt="" />
        </div>

        <div class="nav-min-search__container">
          <label class="nav-min-search__label" for="headerSearch">
            <img :src="headerSearch" alt=""
          /></label>
          <input
            class="nav-min-search__input"
            id="headerSearch"
            type=""
            placeholder="Введите артикул"
            v-model="searchTerm"
            @click="openSearchedCollections"
          />
          <button class="nav-min-search__button" @click="performSearch">
            поиск
          </button>
        </div>

        <div class="nav-min__right-container">
          <div class="nav-min-btn__container">
            <div class="nav-min-btn__item" @click="openFavorite()">
              <div
                class="nav-favourite-any"
                v-for="(item, index) in like"
                :key="index"
              >
                {{ likeItemCount }}
              </div>
              <img :src="headerLike" alt="" />
            </div>
            <div class="nav-min-btn__item" @click="toggleBasket">
              <div
                class="nav-basket-any"
                v-for="(item, index) in cart"
                :key="index"
              >
                {{ cartItemCount }}
              </div>
              <img :src="headerBascket" alt="" />
            </div>
            <div class="nav-min-btn__item" @click="nav__login_auth">
              <img :src="headerUser" alt="" />
            </div>
          </div>

          <div class="nav-min__btn-menu__wrapper">
            <div class="nav-min__btn-menu-container" @click="openPhoneMenu()">
              <div
                class="nav-min__btn-menu"
                :class="{ 'nav-min__btn-menu_open': ONCLICKOPENMENU }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!--Меню для телефона и небольших экранов -->
      <div
        class="menu__container"
        :class="{ 'menu__container-active': ONCLICKOPENMENU }"
        key=""
      >
        <div class="menu-first">
          <ul class="menu-list">
            <div class="menu-list__link" @click="clickPhoneMenu()">
              Коллекции
            </div>

            <router-link
              @click.native="closePhoneMenu()"
              to="/company"
              class="menu-list__link"
              >О фабрике</router-link
            >

            <router-link
              @click.native="closePhoneMenu()"
              class="menu-list__link"
              to="/showroom"
              >Шоурум</router-link
            >

            <router-link
              to="/news-view"
              class="menu-list__link"
              @click.native="closePhoneMenu()"
            >
              Новости
            </router-link>

            <router-link
              @click.native="closePhoneMenu()"
              class="menu-list__link"
              to="/where-to-buy"
              >Где купить?</router-link
            >

            <router-link
              @click.native="closePhoneMenu()"
              class="menu-list__link"
              to="/contacts"
              >Контакты</router-link
            >
            <div class="nav-lang__container">
              <div
                class="nav-lang__item"
                v-for="(lang, index) in languages"
                :key="lang.name"
                @click.stop="changeHandler(index, lang.value)"
                :class="{ active: lang === languages[langIndex] }"
              >
                {{ lang.name }}
              </div>
            </div>
          </ul>
        </div>
        <div class="menu-second" :class="{ clicked: phoneCollectionMenu }">
          <div class="menu-second__back" @click="clickPhoneMenu()">Назад</div>
          <div class="menu-second__list">
            <div
              class="nav__swiper-slide"
              v-for="card in saleCollections"
              :key="card.id"
              @click="getProductDetails(card.id)"
            >
              <div class="nav-card__container">
                <div class="nav-card__img-container">
                  <img class="nav-card__img" :src="card.photo" alt="" />
                  <div class="nav-card__title">скидка</div>
                </div>
                <div class="nav-card__body">
                  <div class="nav-card__collection-container">
                    <div class="nav-card__collection-title">Коллекция</div>
                    <div class="nav-card__collection-name">
                      {{ card.title }}
                    </div>
                  </div>
                  <div class="nav-card__type-container">
                    <div class="nav-card__type-title">Коллекция</div>
                    <div
                      class="nav-card__type-name"
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
    </div>

    <!-- Для телефонов -->
    <div class="nav-tel__container">
      <div class="nav-tel__first-row">
        <div class="nav-tel-logo__container" @click="toScrollTop">
          <img :src="headerLogo" alt="" />
        </div>

        <div class="nav-tel__right-container">
          <div class="nav-tel-btn__container">
            <div class="nav-tel-btn__item" @click="openFavorite()">
              <div
                class="nav-favourite-any"
                v-for="(item, index) in like"
                :key="index"
              >
                {{ likeItemCount }}
              </div>
              <img :src="headerLike" alt="" />
            </div>
            <div class="nav-tel-btn__item" @click="toggleBasket">
              <div
                class="nav-basket-any"
                v-for="(item, index) in cart"
                :key="index"
              >
                {{ cartItemCount }}
              </div>
              <img :src="headerBascket" alt="" />
            </div>
            <div class="nav-tel-btn__item" @click="nav__login_auth">
              <img :src="headerUser" alt="" />
            </div>
          </div>

          <div class="nav-tel__btn-menu__wrapper">
            <div class="nav-tel__btn-menu-container" @click="openPhoneMenu()">
              <div
                class="nav-tel__btn-menu"
                :class="{ 'nav-tel__btn-menu_open': ONCLICKOPENMENU }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-tel__second-row">
        <div class="nav-tel-search__container">
          <label class="nav-tel-search__label" for="headerSearch">
            <img :src="headerSearch" alt=""
          /></label>
          <input
            class="nav-tel-search__input"
            id="headerSearch"
            type=""
            placeholder="Введите артикул"
            v-model="searchTerm"
            @click="openSearchedCollections"
          />
          <button class="nav-tel-search__button" @click="performSearch">
            поиск
          </button>
        </div>
      </div>
      <!--Меню для телефона и небольших экранов -->
      <div
        class="menu__container"
        :class="{ 'menu__container-active': ONCLICKOPENMENU }"
      >
        <div class="menu-wrapper">
          <div class="menu-first">
            <ul class="menu-list">
              <div class="menu-list__link" @click="clickPhoneMenu()">
                Коллекции
              </div>

              <router-link
                @click.native="openPhoneMenu()"
                to="/company"
                class="menu-list__link"
                >О фабрике</router-link
              >

              <router-link
                @click.native="openPhoneMenu()"
                class="menu-list__link"
                to="/showroom"
                >Шоурум</router-link
              >

              <router-link
                to="/news-view"
                class="menu-list__link"
                @click.native="openPhoneMenu()"
              >
                Новости
              </router-link>

              <router-link
                @click.native="openPhoneMenu()"
                class="menu-list__link"
                to="/where-to-buy"
                >Где купить?</router-link
              >

              <router-link
                @click.native="openPhoneMenu()"
                class="menu-list__link"
                to="/contacts"
                >Контакты</router-link
              >
              <div class="nav-lang__container">
                <div
                  class="nav-lang__item"
                  v-for="(lang, index) in languages"
                  :key="lang.name"
                  @click.stop="changeHandler(index, lang.value)"
                  :class="{ active: lang === languages[langIndex] }"
                >
                  {{ lang.name }}
                </div>
              </div>
            </ul>
          </div>
          <div class="menu-second" :class="{ clicked: phoneCollectionMenu }">
            <div class="menu-second__back" @click="clickPhoneMenu()">Назад</div>
            <div class="menu-second__list">
              <div
                class="nav__swiper-slide"
                v-for="card in saleCollections"
                :key="card.id"
                @click="getProductDetails(card.id)"
              >
                <div class="nav-card__container">
                  <div class="nav-card__img-container">
                    <img class="nav-card__img" :src="card.photo" alt="" />
                    <div class="nav-card__title">скидка</div>
                  </div>
                  <div class="nav-card__body">
                    <div class="nav-card__collection-container">
                      <div class="nav-card__collection-title">Коллекция</div>
                      <div class="nav-card__collection-name">
                        {{ card.title }}
                      </div>
                    </div>
                    <div class="nav-card__type-container">
                      <div class="nav-card__type-title">Коллекция</div>
                      <div
                        class="nav-card__type-name"
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
      </div>
    </div>
  </nav>
</template>
  
<script>
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";
import { prettifySum } from "@/use/prettify";
import axios from "axios";

import Swiper, { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Spinner from "@/components/Spinner.vue";
export default {
  data() {
    return {
      searchTerm: "",
      ONCLICKOPENCOLLECTIONS: false,
      ONCLICKOPENMENU: false,
      phoneCollectionMenu: false,
      headerLogo: require("@/assets/img/header/header-logo.svg"),
      headerLike: require("@/assets/img/header/header-like.svg"),
      headerBascket: require("@/assets/img/header/header-bascket.svg"),
      headerUser: require("@/assets/img/header/header-user.svg"),
      headerArrow: require("@/assets/img/header/header-arrow.svg"),
      headerSearch: require("@/assets/img/header/header-search.svg"),
      langIndex: parseInt(localStorage.getItem("localeIndex")) || 0,
      searchedPruductsModal: false,
      articulName: "Введите названия артикула",
      cards: [
        {
          id: 1,
          img: require("@/assets/img/cards/card/1.png"),
          nameCollections: "Coffe",
          typePicture: "Абстракция",
        },
        {
          id: 2,
          img: require("@/assets/img/cards/card/1.png"),
          nameCollections: "Coffe",
          typePicture: "Абстракция",
        },
        {
          id: 3,
          img: require("@/assets/img/cards/card/1.png"),
          nameCollections: "Coffe",
          typePicture: "Абстракция",
        },
        {
          id: 4,
          img: require("@/assets/img/cards/card/1.png"),
          nameCollections: "Coffe",
          typePicture: "Абстракция",
        },
        {
          id: 5,
          img: require("@/assets/img/cards/card/1.png"),
          nameCollections: "Coffe",
          typePicture: "Абстракция",
        },
        {
          id: 6,
          img: require("@/assets/img/cards/card/1.png"),
          nameCollections: "Coffe",
          typePicture: "Абстракция",
        },
      ],
    };
  },
  components: { Spinner },
  computed: {
    ...mapGetters("collections", [
      "collections",
      "infoProduct",
      "saleCollections",
    ]),
    ...mapGetters("collections", ["collections"]),
    ...mapGetters("cart", ["cart"]),
    ...mapGetters("like", ["like"]),
    ...mapGetters("search", ["searchedResponse", "isLoading"]),
    cartItemCount() {
      // Calculate and return the total count of unique products in the cart
      return Object.keys(this.cart).length;
    },
    likeItemCount() {
      // Calculate and return the total count of unique products in the cart
      return Object.keys(this.like).length;
    },
    languages: () => [
      {
        name: "RU",
        value: "ru",
      },
      { name: "UZ", value: "uz" },
      { name: "EN", value: "en" },
    ],
  },
  methods: {
    ...mapActions("collections", [
      "getCollections",
      "getInfoCollection",
      "applyFilter",
      "getSaleCollections",
    ]),

    ...mapActions("cart", ["getCart", "addCart", "deleteCart"]),
    ...mapActions("like", ["addLike", "getLike"]),
    ...mapActions("search", ["getSearch"]),
    closeSaleCollection(event) {
      if (!this.$refs.saleCollection.contains(event.target)) {
        this.ONCLICKOPENCOLLECTIONS = false;
      }
    },
    async openNews() {
      try {
        await this.$store.dispatch("news/getNews");
        const allNews = this.$store.getters["news/news"];
        allNews.sort((a, b) => new Date(b.created) - new Date(a.created));
        if (allNews.length > 0) {
          this.$router.push({ name: "news", params: { id: allNews[0].id } });
        } else {
          console.warn("No news found.");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      this.openPhoneMenu();
    },
    closePhoneMenu() {
      this.ONCLICKOPENMENU = false;
      this.phoneCollectionMenu = false;
      document.body.classList.remove("menu-open");
    },
    openPhoneMenu() {
      this.ONCLICKOPENMENU = !this.ONCLICKOPENMENU;
      this.phoneCollectionMenu = false;
      if (this.ONCLICKOPENMENU) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    },
    performSearch() {
      if (!this.searchTerm) {
        // Если поле поиска пустое, отобразить "Введите имя артикула"
        this.articulName = "Введите имя артикула";
        this.searchedPruductsModal = true;
      } else {
        // Выполнять поиск и проверять результаты
        // Например:
        const searchResults = this.searchedResponse; // Ваши результаты поиска
        if (searchResults.length > 0) {
          // Если есть результаты, отобразить их
          this.articulName = "Нет такого артикула"; // Сбросить имя артикула
          this.searchedPruductsModal = true;
        } else {
          // Если результатов нет, отобразить "Нет такого артикула"
          this.articulName = "Нет такого артикула";
          this.searchedPruductsModal = true;
        }
      }
      this.getSearch(this.searchTerm);
      console.log(this.searchedResponse.articuls);
    },
    openSearchedCollections() {
      this.searchedPruductsModal = true;
    },
    closeSearchMenu() {
      this.searchedPruductsModal = false;
      this.searchedResponse = " 2";
    },
    clickPhoneMenu() {
      this.phoneCollectionMenu = !this.phoneCollectionMenu;
    },
    async getProductDetails(productId) {
      if (!productId) {
        console.error("Invalid product ID");
        return;
      }

      await this.$store.dispatch("collections/getInfoCollection", productId);

      this.$nextTick(() => {
        this.$router.push({ name: "product", params: { id: productId } });
        this.$router.go();
      });
    },

    changeHandler(index, value) {
      localStorage.setItem("locale", value);
      localStorage.setItem("localeIndex", index); // Store the selected language index
      this.$i18n.locale = value;
      this.langIndex = index;
      this.langContainerIsActive = false;
      window.location.reload();
      this.$forceUpdate();
    },
    openFavorite() {
      const token = localStorage.getItem("token");

      if (token) {
        // User has a token, navigate to user/favorites
        this.$router.push({ name: "userFavorites" });
      } else {
        // User doesn't have a token, show a warning message
        Swal.fire({
          icon: "warning",
          iconColor: "#192965",
          text: "Чтобы добавлять товар в избранное, пройдите регистрацию",
          showConfirmButton: false,
          /*  timer: 5000, // Display for 5 seconds */
        });
      }
    },
    toggleBasket() {
      this.$emit("toggle-basket");
    },
    toScrollTop() {
      // Проверяем, находимся ли мы на главной странице
      if (this.$route.name === "home") {
        // Если да, то прокручиваем страницу наверх
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Если нет, переходим на главную страницу
        this.$router.push({ name: "home" });
      }
    },
    nav__login_auth() {
      // Check if the user has a valid token in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        // If the user has a token, route them to /user
        this.$router.push({ name: "user" });
      } else {
        // If there is no token, route them to /auth
        this.$router.push({ name: "auth" });
      }
    },
  },
  async mounted() {
    this.getLike();
    await this.getSaleCollections();
    new Swiper(".nav__swiper", {
      modules: [Scrollbar],
      slidesPerView: 4,
      spaceBetween: 20,
      grabCursor: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
      },
    });

    window.addEventListener("mouseup", this.closeSaleCollection);
    // window.addEventListener("click", this.closeSaleCollection);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeSaleCollection);
  },
};
</script>
  
<style></style>
  