ZZ.Pages.Zizerones = CUORE.Class(ZZ.Pages.ZZBase, {

    initializeServices: function() {
        ZZ.Pages.Zizerones.parent.initializeServices.call(this);
        this.addService(new ZZ.Services.Groups());
        this.addService(new ZZ.Services.Url());
        this.addService(new ZZ.Services.Catalogs());
    },

    initializeComponents: function() {
        ZZ.Pages.Zizerones.parent.initializeComponents.call(this);
        this._addRiver();
        this._addFilterBar();
    },

    setUp: function() {
        ZZ.Pages.Zizerones.parent.setUp.call(this);
        this._detectAutoScroll();
    },

    _addRiver: function() {
        this.theRiver = new ZZ.Components.River();
        this.theRiver.addExecHandler("COMPONENT_date-filter_CHANGED", 'reset');
        this.theRiver.addExecHandler("COMPONENT_place-filter_CHANGED", 'reset');
        this.theRiver.addExecHandler("COMPONENT_language-filter_CHANGED", 'reset');
        this.theRiver.addExecHandler("COMPONENT_emblems_CHANGED", 'reset');
        this.theRiver.addExecHandler("SCROLL_detection_DONE", 'moreGroups');
        this.theRiver.addExecHandler("CRITERIA_SELECTED", 'moreGroups');
        this.addComponent(this.theRiver, 'river', CUORE.Behaviours.HIJACK);
    },

    _addFilterBar: function() {
        this._addDateSelection();
        this._addPlaceSelection();
        this._addLanguageSelection();
        this._addSearchCriteria();
        this._addEmblemsList();
    },

    _addDateSelection: function() {
        this.date = new ZZ.Components.Date('', 'zizerones.home.date.placeholder', 'tentative_date');
        this.date.addDecoration(new ZZ.Decorations.DatePicker());
        this.addComponent(this.date, 'date-filter', CUORE.Behaviours.HIJACK);
    },

    _addPlaceSelection: function() {
        this.place = new ZZ.Components.Input('', 'zizerones.home.place.placeholder','place');
        this.place.addDecoration(new ZZ.Decorations.AutoSuggest());
        this.addComponent(this.place, 'place-filter', CUORE.Behaviours.HIJACK);
    },

    _addLanguageSelection: function() {
        this.language = new ZZ.Components.Input('zizerones.home.language-filter.label', 'zizerones.home.language.placeholder','language');
        this.language.addDecoration(new ZZ.Decorations.LanguagesChosen('single','COMPONENT_language-filter_CHANGED'));
        this.addComponent(this.language, 'language-filter', CUORE.Behaviours.HIJACK);
    },

    _addEmblemsList: function() {
        //we need to load from url: Emblems should be an input not a list
        this.emblemList = new ZZ.Components.Emblems('emblems');
        this.addComponent(this.emblemList, 'emblems-filter', CUORE.Behaviours.HIJACK);
    },

    _addSearchCriteria: function() {
        var search = new ZZ.Components.Criteria();
        var dateHandler = this._searchHandlerFactory('tentative_date');
        var placeHandler = this._searchHandlerFactory('place');
        var languageHandler = this._searchHandlerFactory('language');
        var emblemsHandler = this._searchHandlerFactory('emblems');

        search.addHandler("COMPONENT_date-filter_CHANGED", new dateHandler());
        search.addHandler("COMPONENT_place-filter_CHANGED", new placeHandler());
        search.addHandler("COMPONENT_language-filter_CHANGED", new languageHandler());
        search.addHandler("COMPONENT_emblems_CHANGED", new emblemsHandler());
        this.addComponent(search, 'search-coordinator', CUORE.Behaviours.HIJACK);
    },

    _detectAutoScroll: function() {
        $(window).scroll(function() {
            var documentHeight = $(document).height();
            if(document.height) {
                documentHeight = document.height;
            }
            if($(window).scrollTop() > (documentHeight - $(window).height()) * 0.8) {
                CUORE.Bus.emit("SCROLL_detection_DONE", null);
            }
        });
    },

    _searchHandlerFactory: function(type) {
        var criteria = {};
        return CUORE.Class(CUORE.Handler, {
            handle: function(value) {
                criteria[type] = value;
                this.owner.setCriteria(criteria);
            }
        });
    }

});
