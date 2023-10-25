import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        addresses: {},
        isLoading: false

    }),
    mutations: {
        setAddresses(state, addresses) {
            state.addresses = addresses;
        }
    },
    actions: {
        async getAddresses({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/about/addresses");
                if (res.status === 200) {
                    commit("setAddresses", res.data);

                }
            } catch (error) {
                console.error(error);
            }
            state.isLoading = false;
        },
    },
    getters: {
        addresses(state) {
            return state.addresses;
        },
    },
};