module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/scss/vars/_variables.scss";`
            }
        }
    },

    pluginOptions: {
      i18n: {
        locale: 'ru',
        fallbackLocale: 'ru',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
};
