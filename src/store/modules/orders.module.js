import axios from "axios";
import Swal from "sweetalert2";
export default {
    namespaced: true,
    state: () => ({
        orders: {},
        responseUrl: {}

    }),
    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
        },
        setResponseUrl(state, responseUrl) {
            state.responseUrl = responseUrl;
        }
    },
    actions: {
        async getOrders({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/orders/list/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                if (res.status === 200) {
                    commit("setOrders", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async addOrder({
            commit,
            state
        }, orderData) {
            try {
                const res = await axios.post("/orders/create/", orderData);
                commit("setOrders", res.data);
                console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Успех!",
                    text: "Ваш заказ успешно оформлен",
                    footer: "Ждите Звонка оператора", // Этот текст будет отображаться внизу уведомления
                    showConfirmButton: false, // Убираем кнопку "OK", чтобы оповещение исчезло автоматически
                    timer: 2000, // Через сколько миллисекунд оповещение исчезнет (в данном случае, через 2 секунды)
                });
                return res.data;


            } catch (error) {
                console.error("Error adding inquiry:", error);
                throw error;

            }

        },
    },
    getters: {
        orders(state) {
            return state.orders;
        },
    },
};