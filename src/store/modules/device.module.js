import axios from "axios";
import {
    v4 as uuidv4
} from "uuid"; // Import v4 as uuidv4

export default {
    namespaced: true,
    state: () => ({
        device_id: localStorage.getItem("device_id") || "",
        csrf: ""
    }),
    mutations: {

        setDeviceId(state, deviceId) {
            state.device_id = deviceId;
            localStorage.setItem("device_id", deviceId); // Store device_id in localStorage
        },
        setCsrf(state, csrf) {
            state.csrf = csrf;
            localStorage.setItem("csrf", csrf)
        },
    },
    actions: {

        generateDeviceId({
            state,
            commit
        }) {
            if (!state.device_id) { // Generate and set device_id only if it doesn't exist
                const deviceId = uuidv4(); // Generate a UUID v4
                commit("setDeviceId", deviceId);
            }
        },
        async getCsrf({
            commit,
            dispatch,
            state
        }) {

            try {
                const res = await axios.get("/common/csrf_get/", {});
                if (res.status === 200) {
                    commit("setCsrf", res.data.token);
                }
            } catch (error) {
                console.error(error);
            }
            state.isLoading = false;
        },


    },
    getters: {
        getDeviceId(state) {
            return state.device_id;
        },
        csrf(state) {
            return state.csrf;
        },
    },
};