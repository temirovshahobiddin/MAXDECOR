import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        register: [],
    }),
    mutations: {
        setRegister(state, registerData) {
            state.inquiries.push(registerData);
        },
    },
    actions: {
        async addRegister({
            commit,
            state
        }, formData) {
            try {
                const res = await axios.post("/inquiries/register", formData);
                commit("setRegister", res.data);

                return res.data;

            } catch (error) {
                throw error;
            }

        },



    },
    getters: {
        register(state) {
            return state.register;
        },
    },
};