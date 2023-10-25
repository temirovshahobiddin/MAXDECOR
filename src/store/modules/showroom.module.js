import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        showroom: {},
    }),
    mutations: {
        setShowroom(state, showroom) {
            state.showroom = showroom;
        },

    },
    actions: {
        async getShowroom({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/about/showroom/");
                if (res.status === 200) {
                    commit("setShowroom", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },

    },
    getters: {
        showroom(state) {
            return state.showroom;
        },

    },
};