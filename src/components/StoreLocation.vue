<template>
  <div class="container location__conatiner">
    <p class="location__title">
      Розничные магазины где вы можете купить обои Max Decor
    </p>

    <div class="container location-cards__container">
      <div class="location-card" v-for="card in stores" :key="card.id">
        <div class="location-card__name_small-screen" v-html="card.title"></div>
        <div class="location-card__img-container">
          <img class="location-card__img" :src="card.photo" alt="" />
        </div>
        <div class="location-card__content-container">
          <div class="location-card__first-column">
            <div class="location-card__name" v-html="card.title"></div>
            <div class="location-card__subtitle" v-html="card.info"></div>
            <div class="location-card__qualityMark" v-if="!is_certified">
              Сертифицированый магазин
            </div>
          </div>
          <div class="location-card__second-column">
            <div class="location-card__working-hours-container">
              <div
                class="location-card__firstWorkingHours"
                v-html="'Пн-Пт с 9:00 до 18:00'"
              ></div>
              <div
                class="location-card__secondWorkingHours"
                v-html="'Пн-Пт с 9:00 до 18:00'"
              ></div>
            </div>
            <a
              :href="card.addressLink"
              target="_blank"
              class="location-card__address"
              v-html="card.address"
            ></a>
            <a class="location-card__tel" :href="'tel:+998' + card.prettify">
              {{ prettify(card.phone_number) }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { prettify } from "@/use/prettify";
export default {
  data() {
    return {
      prettify,
      cards: [
        {
          id: 1,
          img: require("@/assets/img/whereToBuy/first.png"),
          name: "MAX DECOR SHOWROOM",
          subtitle: "Розничная продажа обоев Max Decor <br /> в Ташкенте",
          firstWorkingHours: "Пн-Пт с 9:00 до 18:00",
          secondWorkingHours: "Пн-Пт с 9:00 до 18:00",
          address: "г. Ташкент, Яшнабадский р-н,<br /> ул. Паркент 182,",
          addressLink: "https://yandex.uz/maps/-/CDUKuEmT",
          qualityMark: "Сертифицированый магазин",
          telText: "Тел.: +998 (95) 687-95-95",
          linkTel: "956879595",
        },
        {
          id: 2,
          img: require("@/assets/img/whereToBuy/second.png"),
          name: "OBOI MARKET SHOWROOM",
          subtitle: "Розничная продажа обоев Max Decor <br /> в Ташкенте",
          firstWorkingHours: "Пн-Пт с 9:00 до 18:00",
          secondWorkingHours: "Пн-Пт с 9:00 до 18:00",
          address:
            "г. Ташкент, Учтепинский р-н,<br /> строительный рынок “Урикзар”,<br /> павильон 4, магазин №26",
          addressLink: "https://yandex.uz/maps/-/CDUKuEmT",
          qualityMark: "Сертифицированый магазин",
          telText: "Тел.: +998 (95) 687-95-95",
          linkTel: "956879595",
        },
        {
          img: require("@/assets/img/whereToBuy/third.png"),
          name: "ELEGANT MIR OBOI",
          subtitle: "Розничная продажа обоев Max Decor <br /> в Ташкенте",
          firstWorkingHours: "Пн-Пт с 9:00 до 18:00",
          secondWorkingHours: "Пн-Пт с 9:00 до 18:00",
          address: "г. Ташкент, Яшнабадский р-н,<br /> ул. Паркент 182,",
          addressLink: "https://yandex.uz/maps/-/CDUKuEmT",
          qualityMark: "Сертифицированый магазин",
          telText: "Тел.: +998 (90) 957-75-58",
          linkTel: "909577558",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("stores", ["stores"]),
  },
  methods: {
    ...mapActions("stores", ["getStores"]),
  },
  async mounted() {
    await this.getStores();
    console.log(this.stores);
  },
};
</script>

<style></style>
