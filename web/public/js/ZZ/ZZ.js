var ZZ = ZZ || {};

ZZ.VERSION = '0.1';

ZZ.Pages = ZZ.Pages || {};
ZZ.Components = ZZ.Components || {};
ZZ.Handlers = ZZ.Handlers || {};
ZZ.Services = ZZ.Services || {};
ZZ.Renderers = ZZ.Renderers || {};
ZZ.Decorations = ZZ.Decorations || {};
ZZ.Helpers = ZZ.Helpers || {};

ZZ.EMPTY_STRING = '';
ZZ.SUCCESS_CLASS = 'alert-success';
ZZ.SUCCESS_KEY = 'zizerones.addGroup.success';
ZZ.ERROR_CLASS = 'alert-error';
ZZ.LOADING_KEY = 'zizerones.river.loading';
ZZ.NO_SELECTED_KEY='zizerones.admin.noguideselected';
ZZ.SHOW_PASS_KEY = 'zizerones.show.password';
ZZ.NO_DISPLAY_CLASS = 'hidden';
ZZ.DISABLED_CLASS = 'hidden';
ZZ.BUTTON_CLASS = 'btn';
ZZ.PROMINENT_CLASS = 'hero-unit';
ZZ.ALERT_CLASS = 'alert';
ZZ.GUIDE_CLASS = 'guide';
ZZ.SELECTED_CLASS = 'selected';
ZZ.GROUPS_PATH = 'groups';
ZZ.GUIDES_PATH = 'guides';
ZZ.CATALOGS_PATH = 'catalog';
ZZ.AUTH_PATH = 'auth';
ZZ.GROUP_WIDTH_CLASS = 'span4';
ZZ.GROUP_FORMAT_CLASS = 'thumbnail';
ZZ.GROUPS_BY_ROW = 3;
ZZ.FLUID_ROW_CLASS = 'row-fluid';
ZZ.MODAL_MODAL_CLASS = 'modal';
ZZ.MODAL_HIDE_CLASS = 'hide';
ZZ.MODAL_FADE_CLASS = 'fade';
ZZ.MODAL_IN_CLASS = 'in';
ZZ.MODAL_HEADER_CLASS = 'modal-header';
ZZ.MODAL_BODY_CLASS = 'modal-body';
ZZ.MODAL_FOOTER_CLASS = 'modal-footer';

ZZ.PICKADATE = {};
ZZ.PICKADATE.MONTHS = {};
ZZ.PICKADATE.MONTHS['es-ES'] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
ZZ.PICKADATE.DAYS = {};
ZZ.PICKADATE.DAYS['es-ES'] = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

ZZ.LANGUAGE_LOCALE = {
    'ar': 'arabic',
    'ar-DZ': 'arabic',
    'ar-OM': 'arabic',
    'ar-LY': 'arabic',
    'ar-AE': 'arabic',
    'ar-IQ': 'arabic',
    'ar-YE': 'arabic',
    'ar-QA': 'arabic',
    'ar-LB': 'arabic',
    'ar-KW': 'arabic',
    'ar-SA': 'arabic',
    'ar-SD': 'arabic',
    'ar-SY': 'arabic',
    'ar-BH': 'arabic',
    'ar-TN': 'arabic',
    'ar-JO': 'arabic',
    'ar-EG': 'arabic',
    'ar-MA': 'arabic',
    'be': 'english',
    'be-BY': 'english',
    'bg': 'bulgarian',
    'bg-BG': 'bulgarian',
    'ca': 'spanish',
    'ca-ES': 'spanish',
    'cs': 'english',
    'cs-CZ': 'english',
    'da': 'english',
    'da-DK': 'english',
    'de': 'german',
    'de-DE': 'german',
    'de-LU': 'german',
    'de-CH': 'german',
    'de-AT': 'german',
    'el': 'greek',
    'el-GR': 'greek',
    'el-CY': 'greek',
    'en': 'english',
    'en-PH': 'english',
    'en-GB': 'english',
    'en-NZ': 'english',
    'en-ZA': 'english',
    'en-IE': 'english',
    'en-AU': 'english',
    'en-CA': 'english',
    'en-SG': 'english',
    'en-IN': 'english',
    'en-US': 'english',
    'en-MT': 'english',
    'es': 'spanish',
    'es-US': 'spanish',
    'es-MX': 'spanish',
    'es-UY': 'spanish',
    'es-PE': 'spanish',
    'es-PA': 'spanish',
    'es-GT': 'spanish',
    'es-NI': 'spanish',
    'es-ES': 'spanish',
    'es-VE': 'spanish',
    'es-DO': 'spanish',
    'es-CO': 'spanish',
    'es-PY': 'spanish',
    'es-HN': 'spanish',
    'es-PR': 'spanish',
    'es-AR': 'spanish',
    'es-CR': 'spanish',
    'es-CL': 'spanish',
    'es-EC': 'spanish',
    'es-BO': 'spanish',
    'es-SV': 'spanish',
    'et': 'english',
    'et-EE': 'english',
    'fi': 'english',
    'fi-FI': 'english',
    'fr': 'french',
    'fr-LU': 'french',
    'fr-CH': 'french',
    'fr-BE': 'french',
    'fr-CA': 'french',
    'fr-FR': 'french',
    'ga': 'english',
    'ga-IE': 'english',
    'hi-IN': 'english',
    'hr': 'croatian',
    'hr-HR': 'croatian',
    'hu': 'hungarian',
    'hu-HU': 'hungarian',
    'in': 'english',
    'in-ID': 'english',
    'is': 'english',
    'is-IS': 'english',
    'it': 'italian',
    'it-IT': 'italian',
    'it-CH': 'italian',
    'iw': 'hebrew',
    'iw-IL': 'hebrew',
    'ja': 'japanese',
    'ja-JP': 'japanese',
    'ja-JP-JP': 'japanese',
    'ko': 'english',
    'ko-KR': 'english',
    'lt-LT': 'english',
    'lt': 'english',
    'lv': 'english',
    'lv-LV': 'english',
    'ms': 'english',
    'ms-MY': 'english',
    'mt': 'english',
    'mt-MT': 'english',
    'mk': 'english',
    'mk-MK': 'english',
    'nl': 'dutch',
    'nl-NL': 'dutch',
    'nl-BE': 'dutch',
    'no': 'norwegian',
    'no-NO': 'norwegian',
    'no-NO-NY': 'norwegian',
    'pl': 'polish',
    'pl-PL': 'polish',
    'pt': 'portuguese',
    'pt-PT': 'portuguese',
    'pt-BR': 'portuguese',
    'ro': 'english',
    'ro-RO': 'english',
    'ru': 'russian',
    'ru-RU': 'russian',
    'sk': 'english',
    'sk-SK': 'english',
    'sl': 'english',
    'sl-SI': 'english',
    'sq': 'english',
    'sq-AL': 'english',
    'sr': 'serbian',
    'sr-BA': 'serbian',
    'sr-CS': 'serbian',
    'sr-RS': 'serbian',
    'sr-ME': 'serbian',
    'sv': 'swedish',
    'sv-SE': 'swedish',
    'th': 'english',
    'th-TH-TH': 'english',
    'th-TH': 'english',
    'tr': 'english',
    'tr-TR': 'english',
    'uk': 'ukranian',
    'uk-UA': 'ukranian',
    'vi': 'english',
    'vi-VN': 'english',
    'zh': 'chinese',
    'zh-TW': 'chinese',
    'zh-SG': 'chinese',
    'zh-CN': 'chinese',
    'zh-HK': 'chinese'
};

ZZ.LANGUAGE_LABELS = {
    spanish: 'zizerones.language.spanish',
    english: 'zizerones.language.english',
    french: 'zizerones.language.french',
    german: 'zizerones.language.german',
    italian: 'zizerones.language.italian',
    portuguese: 'zizerones.language.portuguese',
    arabic: 'zizerones.language.arabic',
    japanese: 'zizerones.language.japanese',
    chinese: 'zizerones.language.chinese',
    dutch: 'zizerones.language.dutch',
    swedish: 'zizerones.language.swedish',
    norwegian: 'zizerones.language.norwegian',
    greek: 'zizerones.language.greek',
    hebrew: 'zizerones.language.hebrew',
    russian: 'zizerones.language.russian',
    ukrainian: 'zizerones.language.ukrainian',
    polish: 'zizerones.language.polish',
    hungarian: 'zizerones.language.hungarian',
    bulgarian: 'zizerones.language.bulgarian',
    serbian: 'zizerones.language.serbian',
    croatian: 'zizerones.language.croatian',
    bosnian: 'zizerones.language.bosnian'
};