 <template>
  <div class="contacts__wrapper">
    <div class="" v-for="item in contacts" :key="item.id">
      <div class="contacts__contaciner">
        <div class="contacts__title container" v-html="item.company_name"></div>
        <a
          class="contacts__address container"
          :href="item.address_link"
          target="_blank"
          v-html="item.address"
        ></a>
        <div class="contacts__row-container container">
          <div class="contacts__tel-contaienr">
            <div
              class="contacts__tel-title"
              v-html="item.phonenumbers.title"
            ></div>
            <a
              :href="'tel:' + item.phonenumbers.phonenumbers"
              class="contacts__tel"
              v-html="prettify(item.phonenumbers.phone_number)"
            ></a>
          </div>
          <div class="contacts__info-company-container">
            <div
              class="contacts__info-company-title"
              v-html="item.company_name"
            ></div>
            <div
              class="contacts__info-company-text"
              v-html="item.description"
            ></div>
          </div>
          <div class="contacts__socialmedia-container">
            <div class="contacts__socialmedia-title">Мы в соц.сетях</div>
            <div class="contacts__socialmedia-pos">
              <a
                class="contacts__socialmedia-item"
                v-for="item in item.social_media"
                :href="item.link"
                :key="item.id"
                ><i :class="item.icon"></i
              ></a>
            </div>
          </div>
        </div>
      </div>

      <div class="contacts__map" v-html="item.location"></div>
      <div
        class="contacts__map-mob"
        v-html="item.location"
        style="overflow: hidden; height: 300px"
      ></div>
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
      socialsImg: [
        {
          img: "fab fa-telegram-plane",
          class: "footer__social-tg",
          verifyLink: "Telegram",
        },
        {
          img: "fab fa-youtube",
          class: "footer__social-Yb",
          verifyLink: "YouTube",
        },
        {
          img: "fab fa-instagram",
          class: "footer__social-inst",
          verifyLink: "Instagram",
        },
      ],
      cards: [
        {
          id: 1,
          titleCard: "Контакты фабрика",
          addressText:
            "220400, Республика Узбекистан, Хорезмская область, район Тупроккала, город Питнак, на территории Свободной экономической зоны «Хазорасп».",
          addressLink: "https://yandex.uz/maps/-/CDUkmVMf",
          telTitle: "Отдел оптовых продаж",
          telText: "тел.:+998 (95) 602-62-62",
          telNumber: "+998956026262",
          infoCompanyTitle: "OOO «New Best Style»",
          infoCompanyText: "INN: 304828516; OKPO: 27081713; OKED: 17240;",
          socialmediaTitle: "Мы в соц.сетях",
          tgLink: "",
          tgImg: require("@/assets/img/contacts/tg.svg"),
          instLink: "",
          instImg: require("@/assets/img/contacts/ins.svg"),
          ytbLink: "",
          ytbImg: require("@/assets/img/contacts/ytb.svg"),
          map: '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad5ac3af36dc7ca4602d985e60f75945eace2b504c8b1c748c1b9df6f7ecf7edd&amp;source=constructor" width="100%" height="500" frameborder="0"></iframe>',
          mapMob:
            '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad5ac3af36dc7ca4602d985e60f75945eace2b504c8b1c748c1b9df6f7ecf7edd&amp;source=constructor" width="100%" height="300" frameborder="0"></iframe>',
        },
        {
          id: 2,
          titleCard: "Max Decor Showroom",
          addressText:
            "100007 Республика Узбекистан, город Ташкент, Яшнабадский район, улица Паркент 182.",
          addressLink:
            "https://yandex.uz/maps/10335/tashkent/house/YkAYdQRmTkMFQFprfX9xeXxlZg==/?ll=69.336762%2C41.308063&z=17.07&utm_source=share",
          telTitle: "Круглосуточный Call-center",
          telText: "тел.:+998 (99) 461-80-80",
          telNumber: "+998994618080",
          infoCompanyTitle: "",
          infoCompanyText: "",
          socialmediaTitle: "Мы в соц.сетях",
          tgLink: "",
          tgImg: require("@/assets/img/contacts/tg.svg"),
          instLink: "",
          instImg: require("@/assets/img/contacts/ins.svg"),
          ytbLink: "",
          ytbImg: require("@/assets/img/contacts/ytb.svg"),
          map: '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A586462096dbf4a29d629c68917cc532125789420cd18393ec46b57f9facc60b7&amp;source=constructor" width="100%" height="500" frameborder="0"></iframe>',
          mapMob:
            '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A586462096dbf4a29d629c68917cc532125789420cd18393ec46b57f9facc60b7&amp;source=constructor" width="100%" height="300" frameborder="0"></iframe>',
        },
      ],
    };
  },
  computed: {
    ...mapGetters("contacts", ["contacts"]),
    combinedLinks() {
      const combined = [];
      for (let i = 0; i < this.contacts.length; i++) {
        for (let j = 0; j < this.contacts[i].social_media.length; j++) {
          const socialMedia = this.contacts[i].social_media[j].social_media;
          const matchingSocialImg = this.socialsImg.find(
            (imgObj) => imgObj.verifyLink === socialMedia
          );

          if (matchingSocialImg) {
            combined.push({
              link: this.contacts[i].social_media[i][socialMedia],
              site: this.contacts[i].social_media[i].link, // Assuming that the social object has properties like 'tg', 'fb', and 'ig'.
              img: matchingSocialImg.img,
              class: matchingSocialImg.class,
            });
          }
        }
      }

      return combined;
    },
  },
  methods: {
    ...mapActions("contacts", ["getContacts"]),
  },
  async mounted() {
    console.log(this.combinedLinks);
    await this.getContacts();
  },
};
</script>

<style></style>
