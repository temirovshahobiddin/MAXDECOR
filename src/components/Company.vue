<template>
  <div>
    <div class="about__container container">
      <div class="about__title" v-html="title"></div>

      <div class="about-discription__wrapper">
        <div class="about-discription__first-container">
          <div
            class="about-discription__paragraph"
            v-html="firstParagraph"
          ></div>
          <div
            class="about-discription__paragraph"
            v-html="secondParagraph"
          ></div>
          <div class="about-discription__container_btn-open">
            <div
              class="about-discription__btn-open"
              ref="btnOpenThirdParagraph"
              @click="openThirdParagraph"
            >
              Читать полностью
            </div>
          </div>
          <div
            class="about-discription__paragraph"
            ref="thirdParagraph"
            v-html="thirdParagraph"
          ></div>
        </div>
        <div class="about-discription__second-container">
          <div
            class="about-discription__card"
            v-for="card in companyStats"
            :key="card.id"
          >
            <img class="about-discription-card__img" :src="card.icon" alt="" />
            <div
              class="about-discription-card__title"
              v-html="card.title"
            ></div>
            <div
              class="about-discription-card__subtitle"
              v-html="card.content"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-video__container">
      <video
        autoplay="autoplay"
        loop="true"
        muted="muted"
        playsinline
        class="about__video"
        :src="videoLink"
      ></video>
    </div>
    <div class="about-history__container container">
      <div class="about-history__title">история компании</div>
      <rowForCompanyVue
        class="about-history__card"
        v-for="item in company"
        :key="item.id"
        :item="item"
        @toogelCard="toogelCard"
      ></rowForCompanyVue>
    </div>
    <div class="about__map container">
      <div class="about__map-title">{{ mapTitle }}</div>
      <mapWorld />
    </div>
    <div class="about__map-mob">
      <div class="about__map-mob-title">{{ mapTitle }}</div>
      <img :src="mapMob" alt="" />
    </div>
  </div>
</template>

<script>
import mapWorld from "./mapWorld.vue";
import rowForCompanyVue from "./rowForCompany.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "Обойная фабрика Max Decor",
      firstParagraph:
        "Фабрика предлагает широкий ассортимент настенных обоев: горячего тиснения, вспененный винил, кухонный ингибитор, под покраску.<br /> Размеры рулонов 0,53х10,05м, 1,05х10,05м, 1,05х25,05м.",
      secondParagraph:
        "Вы можете быть уверены, что выбрав обои Max Decor, вы получаете продукт, который прослужит долгие годы и будет радовать вас внешним видом. Каждая коллекция отличается своим уникальным дизайном и высоким качеством производства.",
      thirdParagraph:
        "Благодаря постоянному развитию и стремлению к высоким стандартам качества, мы занимаем лидирующие позиции на рынке Узбекистана. Мы продолжим стремится удивлять потребителей новыми и интересными решениями в оформление дизайна вашего дома!",
      cards: [
        {
          id: 1,
          img: require("@/assets/img/company/watch.svg"),
          title: "2019 год",
          subtitle: "Дата основания",
        },
        {
          id: 2,
          img: require("@/assets/img/company/gears.svg"),
          title: "5 000 000+",
          subtitle: "Произведенно <br /> евро-рулонов",
        },
        {
          id: 3,
          img: require("@/assets/img/company/star.svg"),
          title: "70+",
          subtitle: "Коллекций в <br /> ассортименте",
        },
        {
          id: 4,
          img: require("@/assets/img/company/people.svg"),
          title: "220 чел.",
          subtitle: "Сотрудников <br /> компании",
        },
        {
          id: 5,
          img: require("@/assets/img/company/squer.svg"),
          title: "10 Га.",
          subtitle: "Территория <br /> фабрики",
        },
        {
          id: 6,
          img: require("@/assets/img/company/world.svg"),
          title: "12 стран",
          subtitle: "География экспорта",
        },
      ],
      videoLink: require("@/assets/video/about.mp4"),
      history: [
        {
          id: 1,
          year: "2019",
          isOpen: false,
          firstImg: require("@/assets/img/about/firstimg.png"),
          secindImg: require("@/assets/img/about/secondimg.png"),
          firstP:
            "Обойная фабрика Max Decor начала свою работу в декабре 2019 года. При содействии Karpos Group за короткий срок было налажено производство обоев из вспененного винила на флезелиновой основе, были введены в работу две печатные ",
          secondP:
            "линии, что позволило произвести более 400 000 рулонов обоев. В это время в компании работало 43 сотрудника, которые совместными усилиями создали качественный и привлекательный продукт завоевав внимание потребителя.",
        },

        {
          id: 2,
          year: "2020",
          isOpen: false,
          firstImg: require("@/assets/img/about/firstimg.png"),
          secindImg: require("@/assets/img/about/secondimg.png"),
          firstP:
            "В июне 2020 года компания расширила свои возможности введя в работу третью печатную линию, что позволило добавить в ассортимент, обои производства по технологии горячего тиснения. Этот шаг способствовал повышению спроса на",
          secondP:
            "продукцию компании в Республике Узбекистан, увеличив спрос на обои, что позволило произвести более 1 000 000 рулонов обоев, и расширить штат сотрудников до 95 человек. Кроме того, компания начала экспортировать свою продукцию в 7 стран, подтверждая ее высокое качество и способность конкурировать на международной арене. ",
        },
        {
          id: 3,
          year: "2021",
          isOpen: false,
          firstImg: require("@/assets/img/about/firstimg.png"),
          secindImg: require("@/assets/img/about/secondimg.png"),
          firstP:
            "В 2021 году в рамках стратегии развития компания создала свою дизайн-студию. Покупателям были представлены уникальные дизайнерские решения и широкий ассортимент коллекций бренда Max Décor.",
          secondP:
            "Благодаря этому, компания приобрела собственный стиль и укрепила свои позиции на рынке.",
        },
        {
          id: 4,
          year: "2022",
          isOpen: false,
          firstImg: require("@/assets/img/about/firstimg.png"),
          secindImg: require("@/assets/img/about/secondimg.png"),
          firstP:
            "В 2022 году производство компании достигло более 1 200 000 рулонов обоев, а экспорт расширился на 10 стран. Это свидетельствует о растущей популярности и доверии к продукции компании со стороны потребителей",
          secondP:
            "в разных уголках мира. (Так же получили серификат O'z DSt ISO 9001:2015)",
        },

        {
          id: 5,
          year: "2023",
          isOpen: false,
          firstImg: require("@/assets/img/about/firstimg.png"),
          secindImg: require("@/assets/img/about/secondimg.png"),
          firstP:
            "В июле 2023 года компания продолжила свое развитие и запустила четвертую линию производства. Кроме того, оборудование было обновлено, чтобы соответствовать всем европейским стандартам качества.",
          secondP:
            "Усовершенствование оборудования позволили компании произвести более 1 500 000 рулонов обоев. На сегодняшний день в компании работает 220 человек что свидетельствует о постоянном росте и развитии компании.",
        },
      ],
      mapTitle: "Карта сотрудничества",
      mapMob: require("@/assets/img/company/map-world-mob.png"),
    };
  },
  async mounted() {
    const thirdParagraph = this.$refs.thirdParagraph;

    await this.getCompany();
    await this.getCompanyStats();
    console.log(this.company);
    if (window.matchMedia("(max-width: 762px)").matches) {
      thirdParagraph.style.maxHeight = 0;
      thirdParagraph.style.overflow = "hidden";
    }
  },
  computed: {
    ...mapGetters("company", ["company", "companyStats"]),
  },
  methods: {
    ...mapActions("company", ["getCompany", "getCompanyStats"]),
    openThirdParagraph() {
      const thirdParagraph = this.$refs.thirdParagraph;
      const btnOpenThirdParagraph = this.$refs.btnOpenThirdParagraph;

      thirdParagraph.style.maxHeight = thirdParagraph.scrollHeight + "px";
      btnOpenThirdParagraph.style.display = "none";
    },
    toogelCard(idx) {
      const selectElement = this.company.find((item) => {
        return item.id == idx;
      });
      const localStorage = selectElement.isOpen;
      this.company.forEach((item) => {
        item.isOpen = false;
      });
      selectElement.isOpen = true;

      this.company.forEach((item) => {
        item.isOpen = false;
      });

      selectElement.isOpen = !localStorage;
    },
  },
  components: { rowForCompanyVue, mapWorld },
};
</script>

<style></style>
