<template>
  <div>
    <div class="showroom__container container">
      <div class="showroom__title" v-html="showroom[0].title"></div>

      <div class="showroom-discription__wrapper">
        <div class="showroom-discription__first-container">
          <div
            class="showroom-discription__paragraph"
            v-html="showroom[0].content"
          ></div>
        </div>
        <div class="showroom-discription__second-container">
          <div
            class="showroom-discription__card"
            v-for="card in showroom[0].stats"
            :key="card.id"
          >
            <img
              class="showroom-discription-card__img"
              :src="card.icon"
              alt=""
            />
            <div
              class="showroom-discription-card__title"
              v-html="card.title"
            ></div>
            <div
              class="showroom-discription-card__subtitle"
              v-html="card.content"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="showroom-video__container">
      <video
        autoplay="autoplay"
        loop="true"
        muted="muted"
        playsinline
        class="showroom__video"
        :src="videoLink"
      ></video>
    </div>
    <div class="showroom-bloks__container">
      <ShowroomCardVue
        v-for="item in showroom[0].details"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>
  
  <script>
import ShowroomCardVue from "./ShowroomCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "Самый большой шоу-рум обоев в Ташкенте!",
      firstParagraph:
        "Ощутите силу преображения в нашем эксклюзивном шоу-руме обоев! <br /> <br /> Ташкент, колыбель красоты и роскоши, приветствует вас своим грандиозным шоу-румом обоев Max Decor – оазисом для истинных ценителей стильного интерьера. Это не просто место, это портал в мир дизайнерских решений, где каждый найдёт обои своей мечты.",
      secondParagraph:
        "Окунитесь в необъятное пространство, где размещены более 4000 видов обоев от лидирующих производителей!",
      thirdParagraph:
        "Здесь вы найдёте эксклюзивные коллекции, способные вдохнуть новую жизнь в ваше пространство. От ведущих брендов Европы, России, Турции, Узбекистана, Китая и Беларуси — у нас есть всё.",
      cards: [
        {
          id: 1,
          img: require("@/assets/img/company/star.svg"),
          title: "4 000+",
          subtitle: "Артикулов <br /> в ассортименте",
        },
        {
          id: 2,
          img: require("@/assets/img/company/squer.svg"),
          title: "480 кв.м",
          subtitle: "Площадь <br /> шоу-рума",
        },
        {
          id: 3,
          img: require("@/assets/img/company/world.svg"),
          title: "20+ Фабрик",
          subtitle: "Фабрики-партнёры",
        },
        {
          id: 4,
          img: require("@/assets/img/company/people.svg"),
          title: "2021 год",
          subtitle: "Дата открытия",
        },
      ],
      videoLink: require("@/assets/video/about.mp4"),
      bloks: [
        {
          id: 1,
          title: "Свежие тенденции",
          text: "Самые свежие тенденции, самые актуальные дизайны, самые стильные обои — всё это ждёт вас в нашем шоу-руме. Мы пристально следим за модой в мире обоев и постоянно обновляем свой ассортимент, чтобы предложить вам самые модные и стильные решения.",
          photo: [
            {
              img: require("@/assets/img/about/firstimg.png"),
            },
            {
              img: require("@/assets/img/about/secondimg.png"),
            },
            {
              img: require("@/assets/img/about/firstimg.png"),
            },
            {
              img: require("@/assets/img/about/secondimg.png"),
            },
          ],
        },
        {
          id: 2,
          title: "Поможем выбрать!",
          text: "Наши специалисты — настоящие мастера своего дела, готовые прийти на помощь в любой ситуации и с удовольствием помогут вам сориентироваться в этом многообразии и подобрать именно те обои, которые идеально подойдут в ваш интерьер. Мы окружим вас заботой и поможем выбрать идеальные обои, которые подчеркнут вашу индивидуальность и неповторимость.",
          photo: [
            {
              img: require("@/assets/img/about/firstimg.png"),
            },
            {
              img: require("@/assets/img/about/secondimg.png"),
            },
            {
              img: require("@/assets/img/about/firstimg.png"),
            },
            {
              img: require("@/assets/img/about/secondimg.png"),
            },
          ],
        },
        {
          id: 3,
          title: "Скидки и акции",
          text: "Скидки и акции — наш подарок для вас! Мы заботимся о вашем кошельке, предлагая сезонные скидки и специальные предложения на самые популярные коллекции.",
          photo: [
            {
              img: require("@/assets/img/about/firstimg.png"),
            },
            {
              img: require("@/assets/img/about/secondimg.png"),
            },
            {
              img: require("@/assets/img/about/firstimg.png"),
            },
            {
              img: require("@/assets/img/about/secondimg.png"),
            },
          ],
        },
        {
          id: 4,
          title: "Где мы находимся",
          text: "Не оставляйте возможность посетить мир красоты, креативности и уюта. Погрузитесь в атмосферу нашего шоу-рума и позвольте нам преобразить ваше пространство. Мы находимся по адресу город Ташкент, Яшнабадский район, улица Паркент 182, чтобы помочь вам найти обои вашей мечты!",
          photo: [
            {
              img: require("@/assets/img/about/firstimg.png"),
            },
            {
              img: require("@/assets/img/about/secondimg.png"),
            },
            {
              img: require("@/assets/img/about/firstimg.png"),
            },
            {
              img: require("@/assets/img/about/secondimg.png"),
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters("showroom", ["showroom"]),
  },
  async mounted() {
    await this.getShowroom();
    console.log(this.showroom);
    const thirdParagraph = this.$refs.thirdParagraph;

    if (window.matchMedia("(max-width: 762px)").matches) {
      thirdParagraph.style.maxHeight = 0;
      thirdParagraph.style.overflow = "hidden";
    }
  },

  methods: {
    ...mapActions("showroom", ["getShowroom"]),
    openThirdParagraph() {
      const thirdParagraph = this.$refs.thirdParagraph;
      const btnOpenThirdParagraph = this.$refs.btnOpenThirdParagraph;

      thirdParagraph.style.maxHeight = thirdParagraph.scrollHeight + "px";
      btnOpenThirdParagraph.style.display = "none";
    },
  },
  components: {
    ShowroomCardVue,
  },
};
</script>
  
  <style></style>
  