import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        rooms: {},
        colors: {},
        pictureTypes: {},
        styles: {},
        sizes: {},

    }),
    mutations: {
        setRooms(state, rooms) {
            state.rooms = rooms;
        },
        setStyles(state, styles) {
            state.styles = styles;
        },
        setPictureTypes(state, pictureTypes) {
            state.pictureTypes = pictureTypes;
        },
        setSizes(state, sizes) {
            state.sizes = sizes;
        },
        setColors(state, colors) {
            state.colors = colors;
        },
    },
    actions: {
        async getRooms({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/store/target_rooms/list/");
                if (res.status === 200) {
                    commit("setRooms", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getStyles({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/store/styles/list/");
                if (res.status === 200) {
                    commit("setStyles", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getPictureTypes({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/store/picture_types/list/");
                if (res.status === 200) {
                    commit("setPictureTypes", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getSizes({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/store/sizes/list/");
                if (res.status === 200) {
                    commit("setSizes", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getColors({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/store/colors/list/");
                if (res.status === 200) {
                    commit("setColors", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        
        
    },
    getters: {
        rooms(state) {
            return state.rooms;
        },
        styles(state) {
            return state.styles;
        },
        pictureTypes(state) {
            return state.pictureTypes;
        },
        sizes(state) {
            return state.sizes;
        },
        styles(state) {
            return state.styles;
        },
        colors(state) {
            return state.colors;
        },
    },
};