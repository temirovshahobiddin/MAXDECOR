<template>
  <div>
    <div class="title__page container">Фабрика мaxdecor</div>

    <!-- Банер -->
    <section class="about__banner">
      <div class="container about__banner-pos">
        <div class="banner__power">
          Мощность
          <span
            >99 000+ <br />
            рулонов в год</span
          >
        </div>
        <div class="banner__studio">
          Студия
          <img :src="bannerImg" alt="" />
        </div>
        <div class="banner__regions">
          Регионы
          <p>
            Производство находится <br />
            в <span>18 регионах</span> Узбекистана
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    bannerImg: require('@/assets/img/banner/about-banner-icon.png')
  }),
};
</script>

<style>
</style>