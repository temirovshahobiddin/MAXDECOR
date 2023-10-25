<template>
  <section class="filter__container container">
    <!-- Кнопка фильтра -->
    <div class="filter__btn" @click="toggleFilter">
      <div class="filter__btn__icon">
        <div class="btn_top-line">
          <div
            class="btn_top-circle"
            :class="{ 'filter__btn-active-top': isActiveTopCircle }"
          ></div>
        </div>
        <div class="btn_bot-line">
          <div
            class="btn_bot-circle"
            :class="{ 'filter__btn-active-bot': isActiveBotCircle }"
          ></div>
        </div>
      </div>
      <div class="filter__btn__txt">FILTER</div>
    </div>

    <!-- Таблица фильтра -->
    <div
      class="table-filter__container"
      :class="{ 'table-filter__visible': isActiveTopCircle }"
      :style="{ maxHeight: tableFilterMaxHeight }"
      ref="tableFilterContainer"
    >
      <div class="reset-filter" @click="resetFilters">СБРОСИТЬ ВСЁ</div>
      <div class="table-filter__column-pos">
        <div class="table-filter__column table-picture">
          <p class="table-filter__title">{{ $t("picture") }}</p>

          <div
            class="table-filter__element"
            v-for="item in firstPictureTypes"
            :key="item.id"
            @click="toggleMarkActive('pictures', item.id)"
          >
            <div class="table-filter__marker">
              <img
                :src="checkMark"
                class="check-mark"
                :class="{ active: isActiveMarkActive('pictures', item.id) }"
                alt=""
              />
            </div>
            <p>{{ item.title }}</p>
          </div>
        </div>

        <div class="table-filter__column table-picture">
          <p class="table-filter__title">{{ $t("picture") }}</p>

          <div
            class="table-filter__element"
            v-for="item in secondPictureTypes"
            :key="item.id"
            @click="toggleMarkActive('pictures', item.id)"
          >
            <div class="table-filter__marker">
              <img
                :src="checkMark"
                class="check-mark"
                :class="{ active: isActiveMarkActive('pictures', item.id) }"
                alt=""
              />
            </div>
            <p>{{ item.title }}</p>
          </div>
        </div>

        <div class="table-filter__column">
          <p class="table-filter__title">{{ $t("destination") }}</p>
          <div
            class="table-filter__element"
            v-for="item in rooms"
            :key="item.id"
            @click="toggleMarkActive('destination', item.id)"
          >
            <div class="table-filter__marker">
              <img
                :src="checkMark"
                class="check-mark"
                alt=""
                :class="{ active: isActiveMarkActive('destination', item.id) }"
              />
            </div>
            <p>{{ item.title }}</p>
          </div>
        </div>

        <div class="table-filter__column">
          <p class="table-filter__title">{{ $t("size") }}</p>
          <div
            class="table-filter__element"
            v-for="item in sizes"
            :key="item.id"
            @click="toggleMarkActive('sizes', item.id)"
          >
            <div class="table-filter__marker">
              <img
                :src="checkMark"
                class="check-mark"
                :class="{ active: isActiveMarkActive('sizes', item.id) }"
                alt=""
              />
            </div>
            <p>{{ item.width }} x {{ item.height }}</p>
          </div>
        </div>

        <!-- Add other table-filter__column elements here -->

        <div class="table-filter__color-container" ref="tableFilterContainer">
          <p class="table-filter__title">{{ $t("color") }}</p>
          <div class="table-filter__color_row">
            <div
              class="table-filter__color-active"
              v-for="row in colors"
              :key="row.id"
              @click="toggleColorActive(row.id)"
              :class="{ active: activeColors.includes(row.id) }"
            >
              <div
                class="table-filter__color"
                :style="{ background: row.hexa_value }"
                :class="{ active: activeColors.includes(row.id) }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-filter__search-btn" @click="filterItems()">
        Подобрать
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatHexColor } from "@/use/prettify";
import Hammer from "hammerjs"; // Step 1: Import Hammer.jsF
export default {
  data() {
    return {
      formatHexColor,
      isActiveTopCircle: false,
      isActiveBotCircle: false,
      tableFilterMaxHeight: "0px",
      activeColors: [],
      checkMark: require("@/assets/img/Filter/check-mark.svg"),
      activeMarksDestination: [],
      activeMarksStyle: [],
      activeMarksPictures: [],
      activeMarksSizes: [],
      isMobile: false,

      firstPictureTypes: [],
      secondPictureTypes: [],
    };
  },
  async mounted() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      const tableFilterContainer = this.$refs.tableFilterContainer;
      const mc = new Hammer.Manager(tableFilterContainer);
      mc.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_LEFT }));
      mc.on("swipeleft", this.handleSwipeLeft);
    }
    this.getRooms(),
      this.getStyles(),
      this.getPictureTypes(),
      this.getSizes(),
      this.getColors();
  },
  watch: {
    pictureTypes() {
      for (let index = 0; index <= 3; index++) {
        this.firstPictureTypes.push(this.pictureTypes[index]);
      }
      for (let index = 4; index <= 5; index++) {
        this.secondPictureTypes.push(this.pictureTypes[index]);
      }
    },
  },
  computed: {
    ...mapGetters("filter", [
      "rooms",
      "colors",
      "pictureTypes",
      "styles",
      "sizes",
    ]),
    ...mapGetters("collections", [
      "collections",
      "infoCollections",
      "filteredCollections",
    ]),
  },
  methods: {
    ...mapActions("filter", [
      "getRooms",
      "getStyles",
      "getPictureTypes",
      "getSizes",
      "getColors",
    ]),
    ...mapActions("collections", [
      "getCollections",
      "getInfoCollections",
      "applyFilter",
    ]),
    resetFilters() {
      // Reset active marks
      this.activeMarksDestination = [];
      this.activeMarksStyle = [];
      this.activeMarksPictures = [];
      this.activeMarksSizes = [];

      // Reset active colors
      this.activeColors = [];
    },
    toggleColorActive(colorId) {
      if (this.activeColors.includes(colorId)) {
        // Если элемент уже активен, удаляем его из массива
        this.activeColors = this.activeColors.filter((id) => id !== colorId);
      } else {
        // Если элемент не активен, добавляем его в массив
        this.activeColors.push(colorId);
      }
    },
    async filterItems() {
      // Gather the selected filter options
      const filterOptions = {
        destination: this.activeMarksDestination,
        style: this.activeMarksStyle,
        picture_type: this.activeMarksPictures,
        size: this.activeMarksSizes,
        color: this.activeColors,
      };
      if (window.innerWidth <= 768) {
        this.isActiveTopCircle = false;
        this.isActiveBotCircle = false;
      }
      // Dispatch the action to apply the filter
      console.log(this.filteredCollections);
      await this.applyFilter(filterOptions);
    },
    isActiveMarkActive(column, markId) {
      let activeMarksArray = null;
      if (column === "destination") {
        activeMarksArray = this.activeMarksDestination;
      } else if (column === "style") {
        activeMarksArray = this.activeMarksStyle;
      } else if (column === "pictures") {
        activeMarksArray = this.activeMarksPictures;
      } else if (column === "sizes") {
        activeMarksArray = this.activeMarksSizes;
      }
      // Аналогично добавьте ветви для остальных столбцов

      return activeMarksArray ? activeMarksArray.includes(markId) : false;
    },
    toggleMarkActive(column, markId) {
      // В зависимости от значения column выбираем соответствующий массив
      let activeMarksArray = null;
      if (column === "destination") {
        activeMarksArray = this.activeMarksDestination;
      } else if (column === "style") {
        activeMarksArray = this.activeMarksStyle;
      } else if (column === "pictures") {
        activeMarksArray = this.activeMarksPictures;
      } else if (column === "sizes") {
        activeMarksArray = this.activeMarksSizes;
      }
      // Аналогично добавьте ветви для остальных столбцов

      if (activeMarksArray) {
        if (activeMarksArray.includes(markId)) {
          // Если элемент уже активен, удаляем его из массива
          activeMarksArray = activeMarksArray.filter((id) => id !== markId);
        } else {
          // Если элемент не активен, добавляем его в массив
          activeMarksArray.push(markId);
        }
      }

      // Обновляем соответствующий массив активных элементов после изменений
      if (column === "destination") {
        this.activeMarksDestination = activeMarksArray;
      } else if (column === "style") {
        this.activeMarksStyle = activeMarksArray;
      } else if (column === "pictures") {
        this.activeMarksPictures = activeMarksArray;
      } else if (column === "sizes") {
        this.activeMarksSizes = activeMarksArray;
      }
      // Аналогично добавьте ветви для остальных столбцов
    },
    handleSwipeLeft(event) {
      this.isActiveTopCircle = false;
      this.isActiveBotCircle = false;
    },
    // Добавьте метод isActiveMarkActive() для определения активности элемента

    toggleFilter() {
      this.isActiveTopCircle = !this.isActiveTopCircle;
      this.isActiveBotCircle = !this.isActiveBotCircle;

      if (this.isActiveTopCircle) {
        this.tableFilterMaxHeight = `${this.$refs.tableFilterContainer.scrollHeight}px`;
      } else {
        this.tableFilterMaxHeight = "0px";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.check-mark {
  transition: opacity 0.3s ease;

  opacity: 0;
  z-index: 1;
}

.check-mark.active {
  width: 15px;
  height: 15px;
  opacity: 1;
}
</style>
