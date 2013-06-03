ZZ.Components.Criteria = CUORE.Class(CUORE.Component, {

    urlParams: null,

    init: function() {
        ZZ.Components.Criteria.parent.init.call(this);
        this.currentCriteria = {};
        this.urlParams = ['tentative_date', 'place', 'language'];

        this.addHandler('GROUPS_getList_EXECUTED', new ZZ.Handlers.Criteria());
    },

    onEnvironmentUp: function() {
        this.setCriteria(this._criteriaFromUrlParser());
    },

    setCriteria: function(someCriteria) {
        this.currentCriteria= _.extend(this.currentCriteria, someCriteria);
        if (!_.isEmpty(this.currentCriteria)){
            CUORE.Bus.emit('CRITERIA_SELECTED', this.currentCriteria);
        }
    },

    changeUrlAndTitle: function(criteria) {
        this.services.execute('URL', 'changeUrlAndTitle', criteria);
    },

    setLocation: function(aLocation) {
        this.customLocation = aLocation;
    },

    _locationParser: function() {
        var parser = document.createElement('a');
        parser.href = this._getLocation();
        return parser;
    },

    _getLocation: function() {
        return this.customLocation || document.location.href;
    },

    _criteriaFromUrlParser: function() {
        var parser = this._locationParser();

        var criteria = [];

        _.each(this.urlParams, function(element){
            var paramValue = this._getParamValue(element, parser.search);
            if(paramValue) {
                criteria[element] = decodeURI(paramValue);
            }
        }, this);
        return criteria;
    },

    _getParamValue: function(key, params) {
        var paramRegExp = new RegExp(key + "=([^&]*)");
        var paramFound = params.match(paramRegExp);
        if(!paramFound) return;
        return params.match(paramRegExp)[1];
    }
});

ZZ.Handlers.Criteria = CUORE.Class(CUORE.Handler, {
    handle: function(message) {
        var criteria = message.query;
        this.owner.changeUrlAndTitle(criteria);
    }
});