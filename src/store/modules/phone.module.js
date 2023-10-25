import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        phone: {},
  

    }),
    mutations: {
        setPhone(state, phone) {
            state.phone = phone;
        }
    },
    actions: {
        async getPhone({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/about/phone_numbers");
                if (res.status === 200) {
                    commit("setPhone", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        phone(state) {
            return state.phone;
        },
    },
};