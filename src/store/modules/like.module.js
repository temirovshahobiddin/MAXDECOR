import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        like: [],
        isLoading: false,

    }),
    mutations: {
        setLike(state, data) {
            state.like = data;
        },
    },
    actions: {
        async getLike({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/users/like_product/list/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                if (res.status === 200) {
                    commit("setLike", res.data);

                }
            } catch (error) {
                console.error(error);
            }
            state.isLoading = false;
        },
        async addLike({
            commit,
            dispatch,
            state

        }, id) {
            state.isLoading = true;
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`
                }

                const config = {
                    method: 'GET',
                    data: id,
                    withCredentials: true,
                    headers: headers,
                };

                // Only add the Authorization header if token is available


                await axios(`/users/like_product/${id}/`, config);
                dispatch('getLike');
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
            state.isLoading = false;

        }
    },
    getters: {
        like(state) {
            return state.like;
        },
        isLoading(state) {
            return state.isLoading;
        },
    },
};