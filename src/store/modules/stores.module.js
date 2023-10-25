import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        stores: {},


    }),
    mutations: {
        setStores(state, stores) {
            state.stores = stores;
        }
    },
    actions: {
        async getStores({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/store/stores/list/");
                if (res.status === 200) {
                    commit("setStores", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        stores(state) {
            return state.stores;
        },
    },
};