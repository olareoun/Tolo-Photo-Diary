ZZ.Services.Url = CUORE.Class(CUORE.Service, {

    urlParams: null,

	init: function() {
		ZZ.Services.Url.parent.init.call(this);
		this.name = 'URL';
		this.urlParams = ['tentative_date', 'place', 'language'];
	},

    changeUrlAndTitle: function(params) {
        var newLocation = this._getBaseUrl();
        var newTitle = "ZIZERONES | Groups for guided tours";

        _.each(params, function(value, key){

            if(_.contains(this.urlParams,key) ) {
                newLocation += key + "=" + value + "&";
                if(key === this.urlParams[0]) {
                    newTitle += " around the " + value;
                }
                if(key === this.urlParams[1]) {
                    newTitle += " in " + value;
                }
            }
        }, this);
        newLocation = encodeURI(newLocation.slice(0, newLocation.length - 1));

        document.title = newTitle;
        history.pushState(params, null, newLocation);
    },

    goHome: function(){
        document.location.href = 'index.html';
    },

    _getBaseUrl: function() {
        var parser = this._locationParser();

        return parser.protocol + "//" + parser.hostname + ":" + parser.port + parser.pathname + "?";
    },

    _locationParser: function() {
        var parser = document.createElement('a');
        parser.href = this._getLocation();
        return parser;
    },

    _getLocation: function() {
        return this.customLocation || document.location.href;
    }

});