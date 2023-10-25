<template>
  <div class="home">
    <Basket data-aos="fade-up" :basketOpen="basketOpen" />
    <VideoSlider data-aos="fade-up" />

    <div class="info-product">
      <div class="navigation-chain__container container">
        <a href="">Коллекции</a>
        <div class="navigation-chain__delimiter"></div>
        <a class="navigation-chain__current" href="">{{
          infoCollection.title
        }}</a>
      </div>
      <section class="description-product__container container">
        <div class="description-product__left-card">
          <p class="description-product__left-card_title">
            Коллекция {{ infoCollection.title }}
          </p>
          <p class="description-product__left-card_body">
            {{ infoCollection.description }}
          </p>
        </div>
        <div class="description-product__right-card">
          <p>
            {{ infoCollection.description_2 }}
          </p>
        </div>
      </section>
      <section class="card-product__container container">
        <!-- Блок с фото -->
        <div class="card-product__img-container transition">
          <div class="card-product__img transition">
            <div class="card-product__default">
              <img :src="favIcon" alt="" />
              <h3 class="card-product__default-title">Выберите обои</h3>
            </div>
            <img :src="hero" alt="" class="card-product__img-img" />
          </div>
        </div>

        <!-- Блок с информацией -->
        <div class="card-product__info">
          <div class="description-product__wrapper-mob">
            <div class="product-carousel__mob">
              <div class="product-carousel__mob-slide" v-for="slide in infoCollection.articuls" :key="slide.id"
                :id="slide.id" @click="changeHeroImg(slide, slide.id)">
                <div class="product-carousel__mob-slide__img" :class="{ 'select-slide': slide.isActive }">
                  <img :src="slide.photo" alt="" />
                </div>

                <p><span>{{ slide.title }}</span></p>
              </div>
            </div>

            <div class="description-product__btn-mob" @click="openDescr">
              Смотреть описание
              <img class="description-product__arrow" :class="{ 'description-product__arrow__active': isOpenDescr }"
                :src="arrow" alt="" />
            </div>
            <div class="description-product__container-mob" :class="{
              'description-product__container-mob__active': isOpenDescr,
            }" ref="descr">
              <div class="description-product__top-mob__container">
                <p class="description-product__top-mob__title">
                  Коллекция Bricly
                </p>
                <p class="description-product__top-mob__text">
                  Кухня — это самое популярное место в доме, место всеобщего
                  сбора, пространство, где получаешь удовольствие, как от
                  приготовления пищи, так и от прекрасного времяпрепровождения.
                </p>
              </div>

              <p class="description-product__bot-mob__text">
                Но на ряду с этим, кухня одно из самых часто часто загрязняемых
                мест в квартире. Поэтому обои для вашей кухни должны прекрасно
                чиститься с использованием специальных моющих средств. Коллекция
                обоев «BRICLY» — не боится многократного намокания, а его
                структура удерживает влагу на поверхности и не допускает её
                впитывания в основу обоев.
              </p>
            </div>
          </div>
          <div class="card-product__title-container">
            <div class="card-product__title">
              <p class="card-product__title_name">
                Коллекция {{ infoCollection.title }}
              </p>
              <p class="card-product__title_vendor">
                Артикул&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ articulName }}
              </p>
            </div>
            <div class="card-product__title-icon" @click="toggleFavoriteIcon(infoCollection.id)" :class="{
              'card-product__title-icon__select': infoCollection.favActive,
            }">
              <div class="heart-container">
                <i class="far fa-heart like-btn" :class="{
                  fas: infoCollection.favActive,
                  liked: infoCollection.favActive,
                }"></i>
              </div>
            </div>
          </div>

          <div class="card-product__options-container">
            <div class="card-product__options">
              <p class="card-product__options_key">Бренд</p>
              <div class="card-product__options_line"></div>
              <p class="card-product__options_value" v-for="item in infoCollection.brand" :key="item.id">
                {{ item.title }}
              </p>
            </div>

            <div class="card-product__options">
              <p class="card-product__options_key">Тип рисунка</p>
              <div class="card-product__options_line"></div>
              <p class="card-product__options_value" v-for="item in infoCollection.picture_type" :key="item.id">
                {{ item.title }}
              </p>
            </div>

            <div class="card-product__options">
              <p class="card-product__options_key">Тип помещения</p>
              <div class="card-product__options_line"></div>
              <p class="card-product__options_value" v-for="item in infoCollection.target_room" :key="item.id">
                {{ item.title }}
              </p>
            </div>

            <div class="card-product__options">
              <p class="card-product__options_key">Размер рулона</p>
              <div class="card-product__options_line"></div>
              <div class="card-product__options-wrapper">
                <p class="card-product__options_value" v-for="item in infoCollection.size" :key="item.id">
                  {{ item.width }} х {{ item.height }}
                </p>
              </div>
            </div>

            <div class="card-product__options">
              <p class="card-product__options_key">Способ производства</p>
              <div class="card-product__options_line"></div>
              <p class="card-product__options_value" v-for="item in infoCollection.manufacturing_method" :key="item.id">
                {{ item.title }}
              </p>
            </div>

            <div class="card-product__options">
              <p class="card-product__options_key">Основа</p>
              <div class="card-product__options_line"></div>
              <p class="card-product__options_value">
                {{ infoCollection.building_material.title }}
              </p>
            </div>

            <div class="card-product__options">
              <p class="card-product__options_key">Рулонов в коробке</p>
              <div class="card-product__options_line"></div>
              <p class="card-product__options_value">
                {{ infoCollection.no_in_pack }}
              </p>
            </div>
          </div>
          <div class="swiper product-carousel__mob-container">
            <div class="swiper-wrapper product-carousel__mob">
              <div class="product-carousel__mob-slide swiper-slide" v-for="slide in infoCollection.articuls"
                :key="slide.id" :id="slide.id" @click="changeHeroImg(slide, slide.id)">
                <div class="product-carousel__mob-slide__img" :class="{ 'select-slide': slide.isActive }">
                  <img :src="slide.photo" alt="" />
                </div>

                <p><span>{{ slide.title }}</span></p>
              </div>
            </div>
            <div class="swiper-scrollbar"></div>
          </div>
          <div class="card-product__price-container">
            <div class="card-product__price-wrapper">
              <p class="card-product__price-title">Стоимость :</p>
              <p class="card-product__price">
                {{ prettifySum(infoCollection.price) }}
              </p>
            </div>

            <p class="card-product__price-descr">цена указана за один рулон</p>
          </div>
          <!-- <div class="card-product__quantity">
            <div class="card-product__minus" @click="decrementQuantity">-</div>
            <div>{{ quantity }}</div>
            <div class="card-product__plus" @click="incrementQuantity">+</div>
          </div> -->

          <div class="card-product__btn-container">
            <div class="card-product__btn-call" @click="openModal">
              ЗАКАЗАТЬ ЗВОНОК
            </div>
            <Dialog header=" " :visible.sync="displayModal" containerStyle="max-width: 550px; width: 100%;" :modal="true">
              <form class="constructor-modal" style="
                  display: flex;
                  align-self: center;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                " @submit.prevent="submitHandler(infoCollection)">
                <h3 class="constructor-modal__title" style="
                    color: #1e1e1e;
                    text-align: center;
                    font-family: $medium;
                    font-size: 32px;
                    margin-bottom: 28px;
                    text-transform: uppercase;
                  ">
                  заказать звонок
                </h3>
                <p class="constructor-modal__txt" style="
                    color: #707070;
                    text-align: center;
                    font-family: $regular;
                    font-size: 16px;
                    max-width: 450px;
                    width: 100%;
                    margin-bottom: 47px;
                  ">
                  Оставьте заявку и наши менеджера свяжутся с вами в ближайшее
                  время
                </p>

                <div class="regist__name-cont" style="margin-bottom: 20px; width: 100%; max-width: 440px">
                  <input type="text" name="name" id="name" placeholder=" " v-model="name" required />
                  <label for="name">Имя*</label>
                </div>
                <div class="regist__tel-cont" style="margin-bottom: 20px; width: 100%; max-width: 440px">
                  <input type="tel" name="tel" id="tel" placeholder=" " v-model="phoneNumber" required />
                  <label for="tel">Номер телефона* </label>
                </div>
                <div class="regist__email-cont" style="margin-bottom: 20px; width: 100%; max-width: 440px">
                  <input type="email" name="email" id="email" placeholder=" " required v-model="comments" />
                  <label for="email">Коментарии</label>
                </div>
              </form>
              <template #footer>
                <div class="constructor-footer" style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    margin-bottom: 30px;
                    width: 100%;
                  ">
                  <button label="Оставить заявку" autofocus @click="submitHandler(infoCollection)"
                    class="constructor-modal__submit" :style="{
                      background: '#192965',
                      'max-width': '264px',
                      width: '100%',
                      'border-radius': '15px',
                      outline: 'none',
                      border: 'none !important',
                      'box-shadow': 'none !important',
                      'margin-bottom': '5px',
                      padding: '20px 0',
                      color: '#fff',
                      'margin-top': '60px',
                      transition: 'all .4s',
                    }" :class="{
  'is-success': isSubmitSuccess,
  'is-error': isSubmitError,
  'is-transitioning': isTransitioning,
  'is-timeout': isSubmitTimeout,
}">
                    {{
                      isSubmitSuccess
                      ? "ОТПРАВЛЕНО"
                      : isSubmitError
                        ? "ОТПРАВИТЬ"
                        : "ОТПРАВИТЬ"
                    }}
                  </button>
                  <p v-if="isSubmitError || isSubmitTimeout" :class="{ 'is-transitioning': isTransitioning }"
                    style="color: red">
                    Что-то пошло не так. Пожалуйста, попробуйте ещё раз.
                  </p>
                </div>
              </template>
            </Dialog>
            <div class="card-product__add-basket" @click="addToCart(infoCollection)">
              ДОБАВИТЬ В КОРЗИНУ
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- <ProductsSlider @update-hero-image="updateHeroImage" /> -->
    <CollectionSlider />
    <News />
    <FormCard />
  </div>
</template>

<script>
import Navbar from "@/components/TheNavbar.vue";
import Basket from "@/components/Basket.vue";
import VideoSlider from "@/components/VideoSlider.vue";
import ProductsSlider from "@/components/ProductsSlider.vue";
import CollectionSlider from "@/components/CollectionSlider.vue";
import News from "@/components/News.vue";
import FormCard from "@/components/FormCard.vue";
import Footer from "@/components/Footer.vue";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import { prettifySum } from "@/use/prettify";
import Dialog from "primevue/dialog";
import axios from "axios";
import Swiper, { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default {
  components: {
    Navbar,
    Basket,
    VideoSlider,
    ProductsSlider,
    CollectionSlider,
    News,
    FormCard,
    Footer,
    Dialog,
  },
  data: () => ({
    basketOpen: false,
    isOpenDescr: false,
    displayModal: false,
    productionIcon: require("@/assets/img/cards/card-product-icon.svg"),
    arrow: require("@/assets/img/info/arrow.svg"),
    favIcon: require("@/assets/img/fav.svg"),
    quantity: 1,
    prettifySum,
    name: "",
    phoneNumber: "",
    comments: "",
    isSubmitSuccess: false,
    isSubmitError: false,
    isTransitioning: false,
    isSubmitTimeout: false,
    currentSlide: null,
    currentSlideIndex: 0,
    articulName: "",
    articulID: null,
    hero: "",
  }),
  /*  props: {
    hero: {
      type: String,
      required: true,
    },
  }, */
  computed: {
    ...mapGetters("collections", ["collections", "infoCollection"]),
    ...mapGetters("cart", ["cart"]),
    ...mapGetters("like", ["like"]),
    /*  infoCollectionData() {
      return this.infoCollection;
    }, */
    totalPrice() {
      return (this.quantity * this.infoCollectionData.price).toFixed(2); // Using toFixed to format the price to two decimal places
    },
  },
  methods: {
    ...mapActions("cart", ["getCart", "addCart", "deleteCart"]),
    ...mapActions("collections", ["getCollections", "getInfoCollection"]),
    ...mapActions("like", ["addLike", "getLike"]),

    toggleBasket() {
      this.basketOpen = !this.basketOpen;
    },
    toggleFavoriteCard(index) {
      this.cards[index].isActive = !this.cards[index].isActive;
    },
    toggleFavoriteIcon(cardId) {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "",
          iconColor: "#192965",
          text: "Чтобы добавлять товар в избранное, пройдите регистрацию",
          showConfirmButton: false,
          timer: 15000, // Display for 1.5 seconds
        });
      } else {
        // Check if the collectionId exists in the like list
        const collectionInLike = this.like.find((item) => item.id === cardId);
        console.log(`asdasddasdasdasdasdas`, collectionInLike);
        if (collectionInLike) {
          // Set favActive to true for the collection
          collectionInLike.favActive = !collectionInLike.favActive;
          this.addLike(collectionInLike.id);
        }
      }
    },
    submitHandler(infoCollectionData) {
      const formData = {
        full_name: this.name,
        phone_number: this.phoneNumber,
        email: this.email,
        on_collection: infoCollectionData.id,
      };
      const jsonFormData = JSON.stringify(formData);

      // Send the POST request using Axios with proper headers
      this.isTransitioning = true;

      axios
        .post("/inquiries/inquiry/", jsonFormData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Handle the response if needed
          // Reset form fields after successful form submission
          this.name = "";
          this.phoneNumber = "";
          this.email = "";
          this.isSubmitSuccess = true;
          this.isSubmitError = false;
          this.isSubmitError = false;
        })
        .catch((error) => {
          // Handle error if needed

          this.isSubmitSuccess = false;
          this.isSubmitError = true;
          this.isTransitioning = false;

          setTimeout(() => { }, 1000);
        });
    },
    logMethod() { },
    toggleFavoriteCard(index) {
      this.cards[index].isActive = !this.cards[index].isActive;
    },
    updateHeroImage(image) {
      this.hero = image;
    },

    incrementQuantity() {
      this.quantity++;
    },
    openModal() {
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },
    // ...
    changeHeroImg(slide, index) {
      // Снимаем активность со всех слайдов
      this.infoCollection.articuls.forEach((slide) => {
        slide.isActive = false;
      });
      this.articulName = slide.title;
      this.articulID = slide.id;
      // Устанавливаем активность на текущий слайд
      slide.isActive = true;

      // Обновляем индекс активного слайда
      this.currentSlideIndex = index;

      this.hero = slide.photo;
    },
    openDescr() {
      this.isOpenDescr = !this.isOpenDescr;
      if (this.isOpenDescr) {
        this.$refs.descr.style.maxHeight = this.$refs.descr.scrollHeight + "px";
      } else {
        this.$refs.descr.style.maxHeight = "";
      }
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async addToCart(infoCollectionData) {
      axios.defaults.withCredentials = true;
      try {
        const device_id = localStorage.getItem("device_id");
        const cartItem = {
          device_id: device_id,
          collection: infoCollectionData.id,
          quantity: this.quantity,
          articul: this.articulID,
        };
        await this.addCart(cartItem);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    mouseDownHandler(e) {
      // Получите ссылку на элемент, к которому применяется перетаскивание
      const ele = e.currentTarget;

      // Инициализируйте начальные позиции
      pos = {
        left: ele.scrollLeft, // Используйте ele.scrollLeft для горизонтального скролла
        x: e.clientX,
        y: e.clientY,
      };

      // Добавьте обработчики событий для перемещения мыши и отпускания кнопки
      document.addEventListener("mousemove", this.mouseMoveHandler);
      document.addEventListener("mouseup", this.mouseUpHandler);

      // Установите стили для курсора и запретите выделение текста
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";
    },
    phoneNumberClick() {
      this.phoneNumber = "+998";
    },
    mouseMoveHandler(e) {
      // Реализуйте перемещение компонента только по горизонтали
      const dx = e.clientX - pos.x;

      this.$el.scrollLeft = pos.left - dx; // Используйте this.$el.scrollLeft для горизонтального скролла
    },
    mouseUpHandler() {
      // Удалите обработчики событий и восстановите стили
      document.removeEventListener("mousemove", this.mouseMoveHandler);
      document.removeEventListener("mouseup", this.mouseUpHandler);

      this.$el.style.cursor = "grab";
      this.$el.style.removeProperty("user-select");
    },
    // ...
    updateByRouting() {
      this.hero = this.infoCollection.articuls[0].photo;
    },
    updateHeroImage(image) {
      const img = document.querySelector(".card-product__img");
      img.classList.add("hidden");

      setTimeout(() => {
        this.hero = image;
        img.classList.remove("hidden");
      }, 300); // Задержка 300 мс (0.3 сек)
    },
    async fetchProductDetails(productId) {
      try {
        await this.getInfoCollection(productId);
        this.hero = this.infoCollection.photo;
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    const productId = this.$route.params.id;
    await this.fetchProductDetails(productId);
    await this.getInfoCollection();
    await this.getLike();

    // Check if the card.id exists in the liked products (this.like)
    const likedProduct = this.like.find(
      (liked) => liked.id === this.infoCollection.id
    );
    console.log(likedProduct);
    // If the product is liked, set favActive to true
    if (likedProduct) {
      this.infoCollection.favActive = true;
    }

    this.updateByRouting();
    this.articulName = this.infoCollection.articuls[0].title;
    this.articulID = this.infoCollection.articuls[0].id;
    if (this.infoCollection.articuls.length) {
      new Swiper(".product-carousel__mob-container", {
        modules: [Scrollbar],
        slidesPerView: 6,
        /*   spaceBetween: 20, */

        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
        },
      });
    }
    console.log(this.infoCollection.articuls.length);
    /*    new Swiper(".product-carousel__mob-container", {
      modules: [Scrollbar],
      slidesPerView: 7,
      spaceBetween: 20,
      grabCursor: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
      },
    }); */
  },
  beforeDestroy() {
    const swiper = document.querySelector(".product-carousel__mob-container");
    if (swiper) {
      swiper.destroy();
    }
  },
  /*  watch: {
    // Следим за изменениями в infoProduct и обновляем selectedImage
    infoCollection: {
      handler() {
        this.updateByRouting();
      },
      deep: true, // Глубокое слежение, если infoProduct имеет вложенные объекты
    },
  }, */
};
</script>

<style lang="scss" scoped>
.p-dialog-header {
  border-bottom: none !important;
}

.constructor-select__color {
  width: 35px !important;
  height: 35px !important;
  padding: 0 !important;
  border-radius: 50% !important;
}

.p-button-text {
  display: none !important;
}

.p-dialog-footer {
  align-items: center !important;
  justify-content: center !important;
  display: flex !important;
}

.p-dialog-content {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.p-dropdown-clear-icon {
  color: #495057;
  right: 3.357rem !important;
}

.constructor-modal__submit {
  /* ... your existing button styles ... */
  transition: background-color 0.3s, color 0.3s;
}

.is-transitioning {
  transition: opacity 0.3s;
}

.error-message {
  /* ... your existing error message styles ... */
  transition: opacity 0.3s;
  opacity: 0;
  /* Initially hide the error message */
}

.is-success {
  background: green !important;
  color: white !important;
}

.is-timeout {
  background: #192965 !important;
  color: white !important;
}

.is-error {
  color: white !important;
}

.is-transitioning {
  opacity: 1;
}
</style>
