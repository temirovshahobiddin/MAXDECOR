    import axios from "axios";

    export default {
        namespaced: true,
        state: () => ({
            collections: {},
            hitCollections: {},
            infoCollection: {},
            footerHitCollections: {},
            footerNewCollections: {},
            filteredCollections: [],
            isLoading: false,
            bannerPage: [],
            saleCollections: {},

        }),
        mutations: {
            setCollections(state, collections) {
                const collectionsWithIsActive = collections.map(product => ({
                    ...product,
                    isActive: false,
                    favActive: false,

                }));
                state.collections = collectionsWithIsActive;
            },
            setHitCollections(state, hitCollections) {
                state.hitCollections = hitCollections
            },
            setSaleCollections(state, saleCollections) {
                state.saleCollections = saleCollections
            },
            setInfoCollection(state, infoCollection) {
                const articulsWithIsActive = infoCollection.articuls.map((articul) => ({
                    ...articul,
                    isActive: false,

                }));

                // Preserve the structure of the infoCollection object and add favActive
                state.infoCollection = {
                    ...infoCollection,
                    articuls: articulsWithIsActive,
                    favActive: false,
                };
            },
            setFilteredCollections(state, сollections) {
                state.filteredCollections = сollections;
            },
            setFooterHitCollections(state, footerHitCollections) {
                state.footerHitCollections = footerHitCollections;
            },
            setFooterNewCollections(state, footerNewCollections) {
                state.footerNewCollections = footerNewCollections;
            },
            setBannerPage(state, bannerPage) {
                state.bannerPage = bannerPage
            }
        },
        actions: {
            async getCollections({
                commit,
                state
            }, page) {
                state.isLoading = true;
                try {
                    const res = await axios.get(`/store/collections/list/`, {
                        headers: {
                            'content-language': 'ru'
                        }
                    });
                    if (res.status === 200) {
                        // Sort collections by status
                        const sortedCollections = res.data.sort((a, b) => {
                            // Define the order of statuses here
                            const statusOrder = ['New', 'Hit'];
                            const statusA = a.status || '';
                            const statusB = b.status || '';

                            // Assign a default value to statuses not in the order
                            const orderA = statusOrder.indexOf(statusA) !== -1 ? statusOrder.indexOf(statusA) : statusOrder.length;
                            const orderB = statusOrder.indexOf(statusB) !== -1 ? statusOrder.indexOf(statusB) : statusOrder.length;

                            return orderA - orderB;
                        });
                        commit("setCollections", sortedCollections);
                    }
                } catch (error) {
                    console.error(error);
                }
                state.isLoading = false;
            },

            async getCombinedCollections({
                commit,
                state
            }) {
                state.isLoading = true;
                try {
                    const [hitRes, news] = await Promise.all([
                        axios.get(`/store/collections/list/?is_header=true`, {
                            headers: {
                                'content-language': "ru"
                            }
                        }),

                        axios.get(`/news/list/?is_header=true`, {
                            headers: {
                                'content-language': "ru"
                            }
                        })
                    ]);

                    if (hitRes.status === 200 && news.status === 200) {
                        const combinedData = [...hitRes.data, ...news.data];
                        commit("setBannerPage", combinedData);
                    }
                } catch (error) {
                    console.error(error);
                }
                state.isLoading = false;
            },
            async getHitCollections({
                commit,
                state
            }) {
                state.isLoading = true;
                try {

                    const res = await axios.get(`/store/collections/list/?status=Hit`, {
                        headers: {
                            'content-language': "ru"
                        }
                    });
                    if (res.status === 200) {
                        commit("setBannerPage", res.data);

                    }
                } catch (error) {
                    console.error(error);
                }
                state.isLoading = false;
            },
            async getHitCollections({
                commit,
                state
            }) {
                state.isLoading = true;
                try {

                    const res = await axios.get(`/news/list/?is_header=true`, {
                        headers: {
                            'content-language': "ru"
                        }
                    });
                    if (res.status === 200) {
                        commit("setBannerPage", res.data);

                    }
                } catch (error) {
                    console.error(error);
                }
                state.isLoading = false;
            },
            async getFooterHitCollections({
                commit,
                state
            }) {
                state.isLoading = true;
                try {
                    const res = await axios.get(`/store/collections/list/?status=Hit`, {
                        headers: {
                            'content-language': 'ru',
                        },
                    });
                    if (res.status === 200) {
                        const firstSixProducts = res.data.slice(0, 6); // Get the first 6 products
                        commit('setFooterHitCollections', firstSixProducts);
                    }
                } catch (error) {
                    console.error(error);
                }
                state.isLoading = false;
            },
            async getFooterNewCollections({
                commit,
                state
            }) {
                state.isLoading = true;
                try {
                    const res = await axios.get(`/store/collections/list/?status=New`, {
                        headers: {
                            'content-language': 'ru',
                        },
                    });
                    if (res.status === 200) {
                        const firstSixProducts = res.data.slice(0, 6); // Get the first 6 products
                        commit('setFooterNewCollections', firstSixProducts);
                    }
                } catch (error) {
                    console.error(error);
                }
                state.isLoading = false;
            },

            async getSaleCollections({
                commit,
                state
            }) {
                state.isLoading = true;
                try {

                    const res = await axios.get(`/store/collections/list/?status=Sale`, {
                        headers: {
                            'content-language': "ru"
                        }
                    });
                    if (res.status === 200) {
                        commit("setSaleCollections", res.data);

                    }
                } catch (error) {
                    console.error(error);
                }
                state.isLoading = false;
            },
            async getInfoCollection({
                commit,
                state
            }, productId) {
                state.isLoading = true;
                try {
                    const res = await axios.get(`/store/collections/retrieve/${productId}/`, {
                        headers: {
                            'content-language': "ru",
                        },
                    });
                    if (res.status === 200) {
                        commit("setInfoCollection", res.data);

                    }
                } catch (error) {
                    console.error(error);
                }
            },
            async applyFilter({
                commit,
                state
            }, filterOptions) {
                state.isLoading = true
                setTimeout(async () => {
                    try {
                        const queryParams = [];

                        if (filterOptions.color && filterOptions.color.length > 0) {
                            queryParams.push(`color=${filterOptions.color.join('&color=')}`);
                        }

                        if (filterOptions.destination && filterOptions.destination.length > 0) {
                            queryParams.push(`target_room=${filterOptions.destination.join('&target_room=')}`);
                        }

                        if (filterOptions.style && filterOptions.style.length > 0) {
                            queryParams.push(`style=${filterOptions.style.join('&style=')}`);
                        }

                        if (filterOptions.pictures && filterOptions.pictures.length > 0) {
                            queryParams.push(`picture_type=${filterOptions.pictures.join('&picture_type=')}`);
                        }

                        if (filterOptions.sizes && filterOptions.sizes.length > 0) {
                            queryParams.push(`size=${filterOptions.sizes.join('&size=')}`);
                        }

                        const queryString = queryParams.join('&');

                        const res = await axios.get(`/store/collections/list?${queryString}`, {
                            headers: {
                                'content-language': 'ru',
                            },
                        });

                        if (res.status === 200) {
                            commit("setFilteredCollections", res.data);
                        }
                    } catch (error) {
                        console.error(error);
                    }



                    state.isLoading = false;
                }, 1000);

            },
        },
        getters: {
            collections(state) {
                return state.collections;
            },
            hitCollections(state) {
                return state.hitCollections;
            },
            infoCollection(state) {
                return state.infoCollection;
            },
            footerHitCollections(state) {
                return state.footerHitCollections;
            },
            footerNewCollections(state) {
                return state.footerNewCollections;
            },
            bannerPage(state) {
                return state.bannerPage;
            },
            filteredCollections: (state) => state.filteredCollections,
            isLoading(state) {
                return state.isLoading;
            },
            saleCollections(state) {
                return state.saleCollections
            }
        },
    };