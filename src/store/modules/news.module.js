import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        news: {},
        infoNews: {}

    }),
    mutations: {
        setNews(state, news) {
            const newsWithIsActive = news.map(product => ({
                ...product,
                isActive: false,
            }));
            state.news = newsWithIsActive;
        },
        setInfoNews(state, infoNews) {
            state.infoNews = infoNews
        }
    },
    actions: {
        async getNews({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/news/list/", {
                    headers: {
                        'content-language': "ru"
                    }
                });
                if (res.status === 200) {
                    commit("setNews", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getInfoNews({
            commit,
            state
        }, newsId) {
            state.isLoading = true;
            try {
                const res = await axios.get(`/news/retrieve/${newsId}`, {
                    headers: {
                        'content-language': "ru",
                    },
                });
                if (res.status === 200) {
                    commit("setInfoNews", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },


    },
    getters: {
        news(state) {
            return state.news;
        },
        infoNews(state) {
            return state.infoNews;
        },
    },
};