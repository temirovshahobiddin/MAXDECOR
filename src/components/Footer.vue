<template>
  <footer id="footer" class="footer">
    <div class="footer-container">
      <div class="footer__top-container">
        <div class="footer__top-wrapper">
          <div class="footer__link-container">
            <div class="footer__link-column">
              <p class="footer__link-title">Новинки</p>
              <div class="footer__link-wrapper">
                <a class="footer__link" v-for="item in footerNewCollections" :key="item.id"
                  @click="getProductDetails(item.id)">{{ item.title }}</a>
              </div>
            </div>

            <div class="footer__link-column">
              <p class="footer__link-title">Хиты</p>
              <div class="footer__link-wrapper">
                <a class="footer__link" v-for="item in footerHitCollections" :key="item.id"
                  @click="getProductDetails(item.id)">{{ item.title }}</a>

              </div>
            </div>

            <div class="footer__link-column">
              <p class="footer__link-title">Информация</p>
              <div class="footer__link-wrapper">
                <router-link to="/company"></router-link>
                <div class="footer__link">О фабрике</div>
                </router-link>

                <router-link to="/news-view">
                  <div class="footer__link">Новости</div>
                </router-link>

                <router-link to="/where-to-buy">
                  <div class="footer__link">Где купить?</div>
                </router-link>

                <router-link to="/showroom">
                  <div class="footer__link">Шоурум</div>
                </router-link>

                <router-link to="/contacts">
                  <div class="footer__link">Контакты</div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="footer__bottem-border-mob"></div>
          <div class="footer__contact-container">
            <div class="footer__contact-adress_container">
              <a :href="addresses[0].address_link" target="_blank" class="footer__contact-adress">
                {{ addresses[0].region }}
                {{ addresses[0].district }}
                {{ addresses[0].street }}</a>
              <a :href="`tel:${phone[1].phone_number}`" class="footer__contact-tel">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <g clip-path="url(#clip0_2145_854)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M1.99976 0.999776C2.18849 0.815995 2.75026 0.0916793 2.99976 -0.000224225C2.73358 -0.0164365 3.24926 -0.0921277 2.99976 -0.000224225C3.26595 0.015988 3.76393 -0.121688 3.99976 -0.000224225C4.2356 0.121239 4.83595 0.794523 4.99976 0.999776L6.99976 2.99978C7.35462 3.44473 7.13998 4.45278 6.99976 4.99978L5.99976 6.99978C5.96612 6.88126 5.96926 7.11909 5.99976 6.99978C6.0334 7.11829 6.91068 7.91274 6.99976 7.99978L8.99976 9.99978C9.08911 10.0868 9.87803 10.967 9.99976 10.9998C9.87726 11.0297 10.1215 11.0326 9.99976 10.9998L11.9998 9.99978C12.2765 9.93228 12.7206 9.94237 12.9998 9.99978C13.2789 10.0572 13.7745 9.82905 13.9998 9.99978L15.9998 11.9998C16.8939 12.6783 16.8001 14.2203 15.9998 14.9998L14.9998 15.9998C14.2016 16.7782 13.1118 17.3816 11.9998 16.9998C9.15351 16.0231 7.13031 14.0834 4.99976 11.9998C2.86335 9.92227 1.00137 7.7752 -0.000238471 4.99978C-0.390695 3.91631 0.20159 2.77819 0.999762 1.99978L1.99976 0.999776Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2145_854">
                      <rect width="17" height="17" fill="white" transform="translate(0 -0.000244141)" />
                    </clipPath>
                  </defs>
                </svg>
                {{ prettify(phone[1].phone_number) }}
              </a>
            </div>
            <div class="footer__contact-tel_container">
              <a :href="addresses[1].address_link" target="_blank" class="footer__contact-adress">
                {{ addresses[1].region }}
                {{ addresses[1].district }}
                {{ addresses[1].street }}</a>
              <a :href="`tel:${phone[0].phone_number}`" class="footer__contact-tel">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <g clip-path="url(#clip0_2145_854)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M1.99976 0.999776C2.18849 0.815995 2.75026 0.0916793 2.99976 -0.000224225C2.73358 -0.0164365 3.24926 -0.0921277 2.99976 -0.000224225C3.26595 0.015988 3.76393 -0.121688 3.99976 -0.000224225C4.2356 0.121239 4.83595 0.794523 4.99976 0.999776L6.99976 2.99978C7.35462 3.44473 7.13998 4.45278 6.99976 4.99978L5.99976 6.99978C5.96612 6.88126 5.96926 7.11909 5.99976 6.99978C6.0334 7.11829 6.91068 7.91274 6.99976 7.99978L8.99976 9.99978C9.08911 10.0868 9.87803 10.967 9.99976 10.9998C9.87726 11.0297 10.1215 11.0326 9.99976 10.9998L11.9998 9.99978C12.2765 9.93228 12.7206 9.94237 12.9998 9.99978C13.2789 10.0572 13.7745 9.82905 13.9998 9.99978L15.9998 11.9998C16.8939 12.6783 16.8001 14.2203 15.9998 14.9998L14.9998 15.9998C14.2016 16.7782 13.1118 17.3816 11.9998 16.9998C9.15351 16.0231 7.13031 14.0834 4.99976 11.9998C2.86335 9.92227 1.00137 7.7752 -0.000238471 4.99978C-0.390695 3.91631 0.20159 2.77819 0.999762 1.99978L1.99976 0.999776Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2145_854">
                      <rect width="17" height="17" fill="white" transform="translate(0 -0.000244141)" />
                    </clipPath>
                  </defs>
                </svg>
                {{ prettify(phone[0].phone_number) }}
              </a>
            </div>
          </div>
        </div>
        <div class="footer__bottem-border"></div>
      </div>

      <div class="footer__bottom-container">
        <a href="" class="footer__logo">
          <img :src="footerLogo" alt="" />
        </a>
        <div class="footer__copy-right">maxdecor © 2023</div>
        <div class="footer__socialmedia-container">
          <a :href="item.site" target="_blank" class="footer__socialmedia" v-for="item in combinedLinks" :key="item.id">
            <i :class="item.img"></i>
          </a>

        </div>
      </div>
    </div>
    <div class="cm-mark-container">
      <a class="cm-mark" href="https://centrismedia.uz/" target="_blanck">СДЕЛАНО В <img class="cm-mark-img" :src="cmMark"
          alt="" /></a>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { prettify } from "@/use/prettify";
export default {
  data: () => ({
    cmMark: require("@/assets/img/footer/cm-mark.svg"),
    footerLogo: require("@/assets/img/footer/footer__logo.svg"),
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
  }),
  mounted() {
    this.getPhone();
    this.getSocial();
    this.getAddresses();
    this.getFooterHitCollections()
    this.getFooterNewCollections()
  },
  computed: {
    ...mapGetters("phone", ["phone"]),
    ...mapGetters("social", ["social"]),
    ...mapGetters("addresses", ["addresses"]),
    ...mapGetters("collections", ["footerHitCollections", "footerNewCollections"]),

    combinedLinks() {
      const combined = [];

      for (let i = 0; i < this.social.length; i++) {
        const socialMedia = this.social[i].social_media;
        const matchingSocialImg = this.socialsImg.find(
          (imgObj) => imgObj.verifyLink === socialMedia
        );
        console.log(this.socialsImg);
        if (matchingSocialImg) {
          combined.push({
            link: this.social[i][socialMedia],
            site: this.social[i].link, // Assuming that the social object has properties like 'tg', 'fb', and 'ig'.
            img: matchingSocialImg.img,
            class: matchingSocialImg.class,
          });
        }
      }

      return combined;
    },
  },
  methods: {
    ...mapActions("phone", ["getPhone"]),
    ...mapActions("social", ["getSocial"]),
    ...mapActions("addresses", ["getAddresses"]),
    ...mapActions("collections", ["getFooterHitCollections", "getFooterNewCollections"]),
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
  },
};
</script>

<style></style>
