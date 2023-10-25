<template>
  <nav class="nav__container">
    <div class="nav__container-pos container">
      <!-- Первая линия -->
      <div class="nav__first-line">
        <router-link to="/" class="nav__logo-container">
          <img class="nav__logo" :src="logo" alt="" />
        </router-link>

        <div class="nav__search-container">
          <label class="nav__search-label" for="nav_search">
            <img :src="search" alt="" />
          </label>
          <input
            class="nav__search-input"
            type="text"
            name=""
            id="nav_search"
            placeholder="Поиск..."
            v-model="searchTerm"
          />
          <button class="nav__search-btn" @click="performSearch">искать</button>
        </div>
        <div :style="{ display: searchResults.length > 0 ? 'block' : 'none' }">
          <div
            class="nav-search__result"
            v-if="showSearchResults && searchResults.length > 0"
          >
            <div class="inner container">
              <a
                href="#!"
                @click="closeSearchResults"
                class="nav-result__close"
              ></a>
              <div class="table-card__container">
                <div
                  v-for="card in searchResults"
                  :key="card.id"
                  class="card__container"
                >
                  <div
                    class="card__figure"
                    @mouseover="card.isActive = true"
                    @mouseout="card.isActive = false"
                  >
                    <a class="" @click="getProductDetails(card.id)">
                      <img class="card__img" :src="card.photo" alt="" />

                      <div class="card__figure-elem">
                        <div class="card__figure-title">
                          {{ card.status }}
                        </div>
                        <div
                          class="card__figure-btn"
                          :class="{
                            'active__card-figure-btn': card.isActive,
                          }"
                          @click.stop="addToCart(card)"
                        >
                          {{ $t("addBasket") }}
                        </div>
                      </div>
                    </a>
                    <div
                      class="card__figure-btn-fav-icon"
                      @click="toggleFavoriteIcon(card.id)"
                      :class="{
                        'card__figure-btn-fav-icon_select': card.favActive,
                      }"
                    >
                      <img :src="productionIcon" alt="" />
                    </div>
                  </div>
                  <div class="card__body">
                    <div class="card__body-subtitle">
                      {{ $t("collection") }}
                    </div>
                    <div class="card__body-title">
                      {{ card.get_collection }}
                    </div>
                    <div class="card__body-price">
                      {{ prettifySum(card.price) }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="searchNoResults">
                <p>No products found.</p>
                <button @click="closeSearchResults">Close</button>
              </div>

              <!--     <div v-else>
                <p>No products found.</p>
              </div> -->
            </div>
          </div>
        </div>
        <a @click="nav__login_auth" class="nav__login-auth">
          {{ isAuthenticated ? "Войти в Кабинет" : $t("registrationAuth") }}
        </a>
      </div>

      <!-- Вторая линия -->
      <div class="nav__second-line">
        <div class="nav__nav">
          <div id="collections" class="nav__nav-collections">
            <a
              id="collections_p"
              ref="navDropdown"
              @click="toggleMenu(), closeDropdown()"
              >{{ $t("collection") }}
              <img
                id="nav__nav_arrow"
                class="nav__nav-arrow"
                :src="arrow"
                :class="{ active_arrow: menuIsActive }"
                alt=""
            /></a>
          </div>
          <router-link class="nav__nav-about" to="/company">{{
            $t("aboutfactory")
          }}</router-link>
          <a class="nav__nav-Show" href="">{{ $t("Showroom") }}</a>
          <a class="nav__nav-new" style="cursor: pointer" @click="openNews()">{{
            $t("news")
          }}</a>
          <a class="nav__nav-buy" href="">{{ $t("whereBuy") }}</a>
          <a
            class="nav__nav-cont"
            href=""
            @click.prevent="$emit('contactClick')"
            >{{ $t("contacts") }}</a
          >
        </div>

        <div
          id="nav_drop_menu"
          class="nav__drop-menu-container"
          :class="{ active: menuIsActive }"
        >
          <a
            class="menu-i"
            to="/product"
            style="text-transcrm: capitalize !important"
            v-for="item in products"
            :key="item.id"
            @click="getProductDetails(item.id)"
            >{{ item.title }}</a
          >
        </div>

        <div class="nav__second-line__right-container">
          <div class="nav__second-line__icon-container">
            <div
              @click="openFavorite()"
              class="nav__select"
              :class="{ 'nav__select-click': anyLikeActive }"
            >
              <div
                class="nav__select-any"
                v-for="(item, index) in like"
                :key="index"
              >
                {{ likeItemCount }}
              </div>
              <img :src="select" alt="" />
            </div>
            <div class="nav__basket" @click="toggleBasket">
              <div
                class="nav__basket-any"
                v-for="(item, index) in cart"
                :key="index"
              >
                {{ cartItemCount }}
              </div>
              <img :src="bascket" alt="" />
            </div>
          </div>

          <div
            class="nav__lang-container"
            ref="navLang"
            @click="toggleLangContainer"
            :class="{ 'nav__lang-container-active': langContainerIsActive }"
          >
            <p>{{ languages[langIndex].name }}</p>
            <img
              :src="arrow"
              alt=""
              class="nav-arrow"
              :class="{ deg180: langContainerIsActive }"
            />

            <div
              v-if="langContainerIsActive"
              class="nav__lang-container_select"
              :class="{
                'nav__lang-container_select-active': langContainerIsActive,
              }"
            >
              <p
                v-for="(lang, index) in languages"
                :key="lang.name"
                @click="changeHandler(index, lang.value)"
              >
                {{ lang.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Кнопка открытия меню для телефона -->
        <div
          class="nav__btn-phone-menu"
          @click="toggleMobMenu"
          :class="{ 'nav__btn-phone-menu-active': mobMenuIsActive }"
        >
          <div
            class="btn-phone-menu__top"
            :class="{ 'btn-phone-menu__top-active': mobMenuIsActive }"
          ></div>
          <div
            class="btn-phone-menu__mid"
            :class="{ 'btn-phone-menu__mid-active': mobMenuIsActive }"
          ></div>
          <div
            class="btn-phone-menu__bot"
            :class="{ 'btn-phone-menu__bot-active': mobMenuIsActive }"
          ></div>
        </div>
      </div>

      <!-- Третья линия (для телефона)-->
      <div class="nav__third-line">
        <div class="third-line__search-container">
          <label class="third-line__search-label" for="third-line_search">
            <img :src="search" alt="" />
          </label>
          <input
            class="third-line__search-input"
            type="text"
            id="third-line_search"
            placeholder="Поиск..."
            v-model="searchTerm"
          />
          <button class="nav__search-btn" @click="performSearch">искать</button>
        </div>

        <div :style="{ display: searchResults.length > 0 ? 'block' : 'none' }">
          <div
            class="nav-search__result"
            v-if="showSearchResults && searchResults.length > 0"
          >
            <div>
              <div class="inner container">
                <a
                  href="#!"
                  @click="closeSearchResults"
                  class="nav-result__close"
                ></a>
                <div class="table-card__container">
                  <div
                    v-for="card in searchResults"
                    :key="card.id"
                    class="card__container"
                  >
                    <div
                      class="card__figure"
                      @mouseover="card.isActive = true"
                      @mouseout="card.isActive = false"
                    >
                      <a class="" @click="getProductDetails(card.id)">
                        <img class="card__img" :src="card.photo" alt="" />

                        <div class="card__figure-elem">
                          <div class="card__figure-title">
                            {{ card.status }}
                          </div>
                          <div
                            class="card__figure-btn"
                            :class="{
                              'active__card-figure-btn': card.isActive,
                            }"
                            @click.stop="addToCart(card)"
                          >
                            {{ $t("addBasket") }}
                          </div>
                        </div>
                      </a>
                      <div
                        class="card__figure-btn-fav-icon"
                        @click="toggleFavoriteIcon(card.id)"
                        :class="{
                          'card__figure-btn-fav-icon_select': card.favActive,
                        }"
                      >
                        <img :src="productionIcon" alt="" />
                      </div>
                    </div>
                    <div class="card__body">
                      <div class="card__body-subtitle">
                        {{ $t("collection") }}
                      </div>
                      <div class="card__body-title">
                        {{ card.get_collection }}
                      </div>
                      <div class="card__body-price">
                        {{ prettifySum(card.price) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="searchNoResults">
                  <p>No products found.</p>
                  <button @click="closeSearchResults">Close</button>
                </div>

                <!--     <div v-else>
                <p>No products found.</p>
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Меню для телефона -->
    <div class="nav__menu-phone" :class="{ 'display-none': !mobMenuIsActive }">
      <div
        class="nav__menu-phone__item-container"
        :class="{ 'display-none': collectionActive }"
      >
        <div
          class="nav__menu-phone__item-collections"
          @click="toggleCollection"
        >
          Коллекции
        </div>

        <router-link class="nav__menu-phone__item" to="/company">{{
          $t("aboutfactory")
        }}</router-link>
        <a class="nav__menu-phone__item" href="">{{ $t("Showroom") }}</a>
        <a class="nav__menu-phone__item" @click.prevent="openNews()">{{
          $t("news")
        }}</a>
        <a class="nav__menu-phone__item" href="">{{ $t("whereBuy") }}</a>
        <a
          class="nav__menu-phone__item"
          href=""
          @click.prevent="handleContactClick"
          >{{ $t("contacts") }}</a
        >
      </div>

      <div
        class="nav__menu-phone__collections-container"
        :class="{ 'display-none': !collectionActive }"
      >
        <div class="nav__menu-phone__prev" @click="toggleCollection">Назад</div>

        <div class="nav__menu-phone__collections-item">Bricly</div>
        <div class="nav__menu-phone__collections-item">Karacum</div>
        <div class="nav__menu-phone__collections-item">Magik</div>
        <div class="nav__menu-phone__collections-item">Carat</div>
        <div class="nav__menu-phone__collections-item">Plants</div>
      </div>

      <div
        class="nav__lang-container lang-collections__mob-pos"
        ref="navLangMob"
        @click="toggleLangContainerMob"
        :class="{
          'nav__lang-container-active': langContainerIsActiveMob,
          'lang__mob-pos': collectionActive,
        }"
      >
        <p>{{ languages[langIndex].name }}</p>
        <img
          :src="arrow"
          alt=""
          class="nav-arrow"
          :class="{ deg180: langContainerIsActiveMob }"
        />
        <div
          class="nav__lang-container_select lang-select__mob"
          :class="{
            'nav__lang-container_select-active': langContainerIsActiveMob,
          }"
        >
          <p
            v-for="(lang, index) in languages"
            :key="lang.name"
            @click.stop="changeHandler(index, lang.value)"
          >
            {{ lang.name }}
          </p>
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
export default {
  data: () => ({
    logo: require("@/assets/img/header/header-logo.svg"),
    search: require("@/assets/img/header/header-search.svg"),
    arrow: require("@/assets/img/header/header-arrow.svg"),
    select: require("@/assets/img/header/header-select.svg"),
    bascket: require("@/assets/img/header/header-bascket.svg"),
    productionIcon: require("@/assets/img/cards/card-product-icon.svg"),
    menuIsActive: false,
    langContainerIsActive: false,
    langContainerIsActiveMob: false,
    mobMenuIsActive: false,
    collectionActive: false,
    langIndex: parseInt(localStorage.getItem("localeIndex")) || 0,
    searchTerm: "",
    searchResults: [],
    prettifySum,
    searchNoResults: false,
    showSearchResults: true,
    anyLikeActive: false,
  }),
  computed: {
    ...mapGetters("products", ["products", "infoProduct"]),
    ...mapGetters("collections", ["collections"]),
    ...mapGetters("cart", ["cart"]),
    ...mapGetters("like", ["like"]),
    /*     anyCardFavActive() {
      return this.products.some((card) => card.favActive);
    }, */
    filteredProducts() {
      if (!this.searchTerm) {
        return this.products;
      }

      const searchTermLower = this.searchTerm.toLowerCase();
      return this.products.filter((product) =>
        product.title.toLowerCase().includes(searchTermLower)
      );
    },
    isAuthenticated() {
      // Return true if token exists, false otherwise
    },
    likeItemCount() {
      // Calculate and return the total count of unique products in the cart
      return Object.keys(this.like).length;
    },
    cartItemCount() {
      // Calculate and return the total count of unique products in the cart
      return Object.keys(this.cart).length;
    },
    languages: () => [
      {
        name: "RU",
        value: "ru",
      },
      { name: "UZ", value: "uz" },
      { name: "EN", value: "en" },
    ],
    /*     filteredLanguages() {
      // Return a filtered array excluding the language with langIndex
      return this.languages.filter((lang, index) => {
        return index !== this.langIndex;
      });
    }, */
  },
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),
    ...mapActions("collections", ["getCollections"]),
    ...mapActions("cart", ["getCart", "addCart", "deleteCart"]),
    ...mapActions("like", ["addLike", "getLike"]),

    toggleFavoriteIcon(cardId) {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          iconColor: "#192965",
          icon: "warning",
          title: "У вас нет аккаунта!",
          text: "Чтобы добавлять товар в избранное, пройдите регистрацию",
          showConfirmButton: false,
          timer: 15000, // Display for 1.5 seconds
        });
      } else {
        const card = this.searchResults.find((card) => card.id === cardId);
        if (card) {
          card.favActive = !card.favActive;
          this.storeFavActiveInCookies(card.id, card.favActive);
          this.addLike(card.id);
        }
      }
    },
    async addToCart(card) {
      axios.defaults.withCredentials = true;
      let cartItem;

      try {
        const token = localStorage.getItem("token");

        if (token) {
          cartItem = {
            collection: card.id,
            quantity: 1,
          };
        } else {
          const device_id = localStorage.getItem("device_id");
          cartItem = {
            device_id: device_id,
            collection: card.id,
            quantity: 1,
          };
        }

        // Dispatch the addCart action with the cart item data
        await this.addCart(cartItem);
      } catch (error) {
        console.error("Error adding to cart:", error);
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
    changeHandler(index, value) {
      localStorage.setItem("locale", value);
      localStorage.setItem("localeIndex", index); // Store the selected language index
      this.$i18n.locale = value;
      this.langIndex = index;
      this.langContainerIsActive = false;
      window.location.reload();
      this.$forceUpdate();
    },
    toggleMenu() {
      this.menuIsActive = !this.menuIsActive;
    },
    closeDropdown(event) {
      if (!this.$refs.navDropdown.contains(event.target)) {
        this.menuIsActive = false;
      }
    },
    closeLang(event) {
      if (!this.$refs.navLang.contains(event.target)) {
        this.langContainerIsActive = false;
      }
    },
    closeLangMob(event) {
      if (!this.$refs.navLangMob.contains(event.target)) {
        this.langContainerIsActiveMob = false;
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
      this.mobMenuIsActive = false;
    },
    toggleBasket() {
      this.$emit("toggle-basket");
    },

    toggleLangContainer() {
      this.langContainerIsActive = !this.langContainerIsActive;
    },

    toggleLangContainerMob() {
      this.langContainerIsActiveMob = !this.langContainerIsActiveMob;
    },
    handleContactClick() {
      this.$emit("contactClick");
      this.mobMenuIsActive = false;
    },
    toggleMobMenu() {
      this.mobMenuIsActive = !this.mobMenuIsActive;
    },
    toggleCollection() {
      this.collectionActive = !this.collectionActive;
    },
    performSearch() {
      if (!this.searchTerm) {
        this.searchResults = [];
        this.searchNoResults = false; // Reset the "No products found" message
        this.showSearchResults = true;
      } else {
        const searchTermLower = this.searchTerm.toLowerCase();
        this.searchResults = this.products.filter((product) =>
          product.title.toLowerCase().startsWith(searchTermLower)
        );
        this.searchNoResults = this.searchResults.length === 0; // Set the "No products found" message
        this.showSearchResults = true;
      }
    },
    closeSearchResults() {
      this.searchTerm = ""; // Clear the search input
      this.searchResults = []; // Clear the search results
      this.searchNoResults = false; // Hide the "No products found" message
      this.showSearchResults = false;
    },
    async getProductDetails(productId) {
      if (!productId) {
        console.error("Invalid product ID");
        return;
      }

      await this.$store.dispatch("products/getInfoProduct", productId);
      this.$router.push({ name: "product", params: { id: productId } });
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
    storeFavActiveInCookies(productId, favActive) {
      // Set the cookie for favActive status
      document.cookie = `favActive_${productId}=${favActive}`;
    },
  },
  async mounted() {
    this.getCart();
    this.getLike();
    this.$store.watch(
      (state) => state.like.like,
      (newLike) => {
        this.anyLikeActive = Object.keys(newLike).length > 0;
      }
    );
    window.addEventListener("click", this.closeDropdown);
    window.addEventListener("click", this.closeLang);
    window.addEventListener("click", this.closeLangMob);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeDropdown);
    window.removeEventListener("click", this.closeLang);
    window.removeEventListener("click", this.closeLangMob);
  },
};
</script>

<style></style>
