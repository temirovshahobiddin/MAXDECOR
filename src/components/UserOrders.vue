<template>
  <section class="personalArea__table-order">
    <!-- Show this section when there are no orders -->
    <div v-if="cartItemCount === 0" class="personalArea__table-empty">
      <p class="table__empty-txt">У вас пока нет Заказов</p>
    </div>

    <!-- Show this section when there are orders -->
    <div v-else>
      <div class="personalArea__table-header">
        <div class="table-header_order">заказ</div>
        <div class="table-header_date">дата</div>
        <div class="table-header_quantity">Колличество</div>
        <div class="table-header_price">ЦЕНА</div>
        <div class="table-header_status">СТАТУС ЗАКАЗА</div>
      </div>

      <!-- Body таблицы -->
      <div class="personalArea__table-body">
        <!-- Loop through orders and render each row -->
        <div v-for="order in orders" :key="order.id" class="table-body__row">
          <div class="table-body__content">
            <div class="table-body_order">
              <div v-for="item in order.get_collection_articuls" :key="item">
                {{ item.collection }} - {{ item.articul }}
              </div>
            </div>
            <div class="table-body_date">{{ formatDate(order.created) }}</div>
            <div class="table-body_quantity">{{ order.quantity }}</div>
            <div class="table-body_price">
              {{ prettifySum(order.final_price) }}
            </div>
            <div
              class="table-body_status"
              :class="{ delivered: order.status === 'd' }"
            >
              {{ formatStatus(order.status) }}
            </div>
          </div>
          <div class="table-body_under-line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatDate, prettifySum } from "@/use/prettify";
export default {
  data: () => ({
    formatDate,
    prettifySum,
  }),
  computed: {
    ...mapGetters("orders", ["orders"]),
    cartItemCount() {
      // Check if this.orders is defined and not null, then calculate the count
      return this.orders ? Object.keys(this.orders).length : 0;
    },
  },

  methods: {
    ...mapActions("orders", ["getOrders"]),
    formatStatus(status) {
      if (status === "p") {
        return "В Процессе";
      } else if (status === "d") {
        return "Доставлено";
      } else {
        return status; // Если значение не "wp" или "pd", оставляем его без изменений
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style>
/* Add any necessary styles for the component here */
</style>
