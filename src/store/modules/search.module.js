import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        searchedResponse: {},
        isLoading: false,
    }),
    mutations: {
        setSearch(state, searchedResponse) {
            state.searchedResponse = searchedResponse;
        },

    },
    actions: {
        async getSearch({
            commit,
            state
        }, termin) {
            state.isLoading = true;
            try {
                const res = await axios.get(`/store/articul/list/?s=${termin}`);
                if (res.status === 200) {
                    commit("setSearch", res.data);
                }
            } catch (error) {
                console.error(error);
            }
            state.isLoading = false;
        },

    },
    getters: {
        searchedResponse(state) {
            return state.searchedResponse;
        },
        isLoading(state) {
            return state.isLoading;
        },

    },
};