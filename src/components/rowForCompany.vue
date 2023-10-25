<template>
  <div>
    <div class="about-history__year" v-html="item.year"></div>
    <div class="about-history__first-p" v-html="item.description"></div>
    <div
      class="about-history__hidden-container"
      :class="{ 'is-open-card': !item.isOpen }"
      ref="rowBody"
    >
      <div class="about-history__second-p" v-html="item.description_two"></div>
      <div class="about-history__img-container">
        <img :src="item.image" alt="" />
        <img :src="item.image_two" alt="" />
      </div>
    </div>
    <div class="about-history__btn-toggel_wrapper">
      <div class="about-history__btn-toggel" @click="toogelCard(item.id)">
        {{ item.isOpen ? "Свернуть" : "Развернуть" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  mounted() {
    this.$refs.rowBody.style.maxHeight = this.$refs.rowBody.scrollHeight + "px";
  },
  updated() {
    this.$nextTick(function () {
      this.$refs.rowBody.style.maxHeight =
        this.$refs.rowBody.scrollHeight + "px";
    });
  },
  methods: {
    toogelCard(id) {
      this.$emit("toogelCard", id);
    },
  },
};
</script>

<style></style>
