import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        company: {},

        companyStats: {},
    }),
    mutations: {
        setCompany(state, company) {
            const isOpenCompany = company.map((item) => ({
                ...item,
                isOpen: false,
            }));

            state.company = isOpenCompany;
        },
        setCompanyStats(state, companyStats) {

            state.companyStats = companyStats;
        }
    },
    actions: {
        async getCompany({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/about/company_histories/");
                if (res.status === 200) {
                    commit("setCompany", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getCompanyStats({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/about/company_stats/");
                if (res.status === 200) {
                    commit("setCompanyStats", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        company(state) {
            return state.company;
        },
        companyStats(state) {
            return state.companyStats;
        },
    },
};