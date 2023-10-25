import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        social: {},


    }),
    mutations: {
        setSocial(state, social) {
            state.social = social;
        }
    },
    actions: {
        async getSocial({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/about/social_medias/");
                if (res.status === 200) {
                    commit("setSocial", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        social(state) {
            return state.social;
        },
    },
};