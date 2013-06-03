ZZ.Services.Catalogs = CUORE.Class(ZZ.Services.Authenticated, {

	init: function() {
		ZZ.Services.Catalogs.parent.init.call(this);
		this.name = 'CATALOGS';
	},

	getEmblems: function(params, eventName) {
		var url = this.getBaseURL() + '/emblems';
		this.request(url, params, eventName);
	},

	getBaseURL: function() {
		return this.baseURL + '/' + ZZ.CATALOGS_PATH;
	}

	

});