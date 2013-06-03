ZZ.Helpers.Locale = (function () {

    function browserLanguage() {
        var currentLocale = (navigator.language || navigator.browserLanguage);
        return ZZ.LANGUAGE_LOCALE[currentLocale];
    }

    return {
        browserLanguage: browserLanguage
    };
}());
