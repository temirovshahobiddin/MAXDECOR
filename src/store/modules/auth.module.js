import Vue from 'vue'
import Vuex from 'vuex'


export default {
    namespaced: true,
    state: {
        token: '',
        refresh: '',
        isAuthenticated: false,
        loginError: ''
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('token')) {
                state.toke = localStorage.getItem('token')
                state.isAuthenticated = true
            } else {
                state.token = '',
                    state.isAuthenticated = false
            }
        },
        setToken(state, token) {
            state.token = token,
                state.isAuthenticated = true,
                state.loginError = ''
        },
        removeToken(state) {
            state.token = '',
                isAuthenticated = false

        },
        setLoginError(state, errorMessage) {
            state.loginError = errorMessage; // Set the login error message
        },
    },
    getters: {
        loggedIn(state) {
            return state.token != null
        },
        loginError(state) {
            return state.loginError;
        },
    },
    actions: {}
}