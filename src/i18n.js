import Vue from "vue";
import VueI18n from "vue-i18n";
import axios from 'axios';

Vue.use(VueI18n);

function loadLocaleMessages() {
    const locales = require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

function setAxiosBaseUrl(locale) {
    axios.defaults.baseURL = `https://api.maxdecor.uz/${locale}/api/v1/`;
}
const i18n = new VueI18n({
    locale: localStorage.getItem("locale") || "ru",
    fallbackLocale: localStorage.getItem("locale") || "ru",
    messages: loadLocaleMessages(),
});
setAxiosBaseUrl(i18n.locale);

i18n.watch = {
    locale(newLocale) {
        setAxiosBaseUrl(newLocale);
    },
};
// Update the locale in localStorage when the language is changed
i18n.locale = localStorage.getItem("locale") || "ru";

export default i18n;