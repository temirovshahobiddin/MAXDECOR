import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        contacts: {},
    }),
    mutations: {
        setContacts(state, contacts) {
            state.contacts = contacts.map(contact => {
                // Check if the social_media array contains a "Telegram" entry
                const telegramSocialMedia = contact.social_media.find(sm => sm.social_media === "Telegram");
                const youtubeSocialMedia = contact.social_media.find(sm => sm.social_media === "YouTube");
                const InstagramSocialMedia = contact.social_media.find(sm => sm.social_media === "Instagram");
                // If "Telegram" entry exists, add the "icon" property
                if (telegramSocialMedia) {
                    telegramSocialMedia.icon = "fab fa-telegram-plane";
                    youtubeSocialMedia.icon = "fab fa-youtube";
                    InstagramSocialMedia.icon = "fab fa-instagram"
                }

                return contact;
            });
        },

    },
    actions: {
        async getContacts({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/about/contacts/");
                if (res.status === 200) {
                    commit("setContacts", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },

    },
    getters: {
        contacts(state) {
            return state.contacts;
        },

    },
};