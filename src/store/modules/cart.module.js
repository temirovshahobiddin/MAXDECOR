import axios from "axios";

axios.defaults.withCredentials = true;

export default {
    namespaced: true,
    state: () => ({
        cart: [],
        isLoading: false,
    }),
    mutations: {
        setCart(state, cart) {
            state.cart = cart;
        },
    },
    actions: {
        async getCart({
            commit,
            state
        }) {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
                const headers = token ? {
                    Authorization: `Bearer ${token}`
                } : {};

                let url = '/cart/cart_items/list/';

                if (!token) {
                    const device_id = localStorage.getItem('device_id');
                    url += `?device_id=${device_id}`;
                }

                const res = await axios.get(url, {
                    withCredentials: true,
                    headers: headers,
                });

                if (res.status === 200) {
                    commit("setCart", res.data);
                }
            } catch (error) {
                console.error("Error getting cart:", error);
            }
        },
        async addCart({
            dispatch
        }, cart) {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? {
                    Authorization: `Bearer ${token}`
                } : {};

                const config = {
                    method: 'POST',
                    data: cart,
                    withCredentials: true,
                    headers: headers,
                };

                // Only add the Authorization header if token is available
                if (!token) {
                    delete config.headers.Authorization;
                }

                await axios('/cart/cart_items/create/', config);
                dispatch('getCart');
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        },
        async updateCart({
            dispatch
        }, cartItem) {
            try {
                const token = localStorage.getItem('token');
                const device_id = localStorage.getItem('device_id');
                const headers = token ? {
                    Authorization: `Bearer ${token}`
                } : {};
                const updatedCartItem = {
                    quantity: cartItem.quantity,
                }
                const config = {
                    method: "PATCH",
                    data: updatedCartItem,
                    withCredentials: true,
                    headers: headers,
                };

                // Add device_id to URL if no token
                const url = token ?
                    `/cart/cart_items/update/${cartItem.id}/` :
                    `/cart/cart_items/update/${cartItem.id}/?device_id=${device_id}`;

                await axios(url, config);
                dispatch('getCart');
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        },
        async deleteCart({
            commit,
            dispatch,
            state
        }, itemId) {
            state.isLoading = true;
            try {
                const device_id = localStorage.getItem('device_id');
                const token = localStorage.getItem('token');
                const headers = token ? {
                    Authorization: `Bearer ${token}`
                } : {};

                const url = token ?
                    `/cart/cart_items/delete/${itemId}/` :
                    `/cart/cart_items/delete/${itemId}/?device_id=${device_id}`;

                await axios.delete(url, {
                    withCredentials: true,
                    headers: headers,
                });

                const updatedCart = state.cart.filter(item => item.id !== itemId);
                commit("setCart", updatedCart);
                dispatch("getCart");
            } catch (error) {
                console.error("Error deleting cart item:", error);
            }
            state.isLoading = false;
        },
        async clearCart({
            commit,
            dispatch,
            state
        }) {
            state.isLoading = true;
            try {
                const device_id = localStorage.getItem('device_id');
                const token = localStorage.getItem('token');
                const headers = token ? {
                    Authorization: `Bearer ${token}`
                } : {};
                const url = token ?
                    `/cart/cart_items/delete/all/` :
                    `cart/cart_items/delete/all/?device_id=${device_id}}`;

                await axios.delete(url, {
                    withCredentials: true,
                    headers: headers
                });
                commit("setCart", []); // Set the cart to an empty array
                dispatch("getCart"); // Refresh the cart after deletion
            } catch (error) {
                console.error("Error clearing cart:", error);
            }
            state.isLoading = false;
        },
    },
    getters: {
        cart(state) {
            return state.cart;
        },
        isLoading(state) {
            return state.isLoading;
        },
    },
};