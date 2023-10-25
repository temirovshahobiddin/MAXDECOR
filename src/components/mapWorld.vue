<template>
    <div class="about-map__container">
      <img class="about-map__map-img" :src="mapImg" alt="" />
      <div
        class="about-map__points-container"
        v-for="point in points"
        :class="point.className"
        :key="point.id"
        @mouseover="point.isHover = true"
        @mouseout="point.isHover = false"
      >
        <div
          class="point__name-country"
          :class="{ 'point__name-country-active': point.isHover }"
        >
          {{ point.nameCountry }}
        </div>
        <div class="point__stick"></div>
        <div
          class="point__circle"
          :class="{ 'point__circle-active': point.isHover }"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mapImg: require("@/assets/img/about/map.svg"),
  
        points: [
          {
            id: 1,
            className: "point__rus",
            nameCountry: "Россия",
            isHover: false,
          },
          {
            id: 2,
            className: "point__uzb",
            nameCountry: "Узбекистан",
            isHover: false,
          },
          {
            id: 3,
            className: "point__kaz",
            nameCountry: "Казахстан",
            isHover: false,
          },
          {
            id: 4,
            className: "point__trk",
            nameCountry: "Туркменистан",
            isHover: false,
          },
          {
            id: 5,
            className: "point__ira",
            nameCountry: "Иран",
            isHover: false,
          },
          {
            id: 6,
            className: "point__kir",
            nameCountry: "Кыргызстан",
            isHover: false,
          },
          {
            id: 7,
            className: "point__taj",
            nameCountry: "Таджикистан",
            isHover: false,
          },
          {
            id: 8,
            className: "point__geo",
            nameCountry: "Грузия",
            isHover: false,
          },
          {
            id: 9,
            className: "point__arm",
            nameCountry: "Армения",
            isHover: false,
          },
          {
            id: 10,
            className: "point__sir",
            nameCountry: "Сирия",
            isHover: false,
          },
          {
            id: 11,
            className: "point__blr",
            nameCountry: "Беларусь",
            isHover: false,
          },
          {
            id: 12,
            className: "point__lat",
            nameCountry: "Латвия",
            isHover: false,
          },
        ],
      };
    },
  };
  </script>
  
  <style></style>
  