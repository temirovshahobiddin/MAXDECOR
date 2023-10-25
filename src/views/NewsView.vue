<template>
  <div class="news-view">
    <div class="container">
      <div class="news-view__wrapper">
   
        <div
          class="news_card"
          v-for="info in news"
          :key="info.id"
          @click="getNewsDetails(info.id)"
        >
          <div class="news-card__img-container">
            <img class="news-card__img" :src="info.photo" alt="" />
          </div>

          <div class="news-card__txt">
            <div class="news-card__data">{{ formatDate(info.created) }}</div>
            <div class="news-card__title">{{ info.title }}</div>
            <div class="news-card__body">
              {{ info.subtitle }}
            </div>
          </div>
          <a class="news-card__btn">подробнее</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatDate } from "@/use/prettify";
export default {
  data: () => ({
    formatDate,
  }),
  computed: {
    ...mapGetters("news", ["news", "infoNews"]),
    pageTitle() {
      // Check if the current route name is "news" and return the appropriate title
      return this.$route.name === "news"
        ? this.$t("otherNews")
        : this.$t("news");
    },
  },
  methods: {
    ...mapActions("news", ["getNews", "getInfoNews"]),
    async getNewsDetails(newsId) {
      if (!newsId) {
        console.error("Invalid News ID");
        return;
      }

      // Check if the user is already on the news details route
      if (this.$route.name === "news" && this.$route.params.id === newsId) {
        console.warn("Already on the news details page.");
        return;
      }

      await this.$store.dispatch("news/getInfoNews", newsId);
      this.$router.push({ name: "news", params: { id: newsId } });
    },
  },
  mounted() {
    this.getNews();
  },
};
</script>

<style>
</style>