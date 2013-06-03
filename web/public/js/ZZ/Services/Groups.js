ZZ.Services.Groups = CUORE.Class(ZZ.Services.Authenticated, {

	init: function() {
		ZZ.Services.Groups.parent.init.call(this);
		this.name = 'GROUPS';
	},

	add: function(params, eventName) {
		params.admin = {};
		params.admin.name = document.page.getUserFullname();
		params.admin.id = document.page.getUserId();
		this.request(this.getBaseURL('add'), params, eventName);
	},

	update: function(params, eventName) {
		this.request(this.getBaseURL('update'), params, eventName);
	},

	getList: function(params, eventName) {
		params = this._setDateParam(params);
		this.request(this.getBaseURL('list'), params, eventName);
	},

	get: function(id, eventName) {
		this.request(this.getBaseURL('get'), {'identity':id}, eventName);
	},

	getBaseURL: function(method) {
		return this.baseURL + '/' + ZZ.GROUPS_PATH+ '/'+method;
	},

	redirect: function(params, eventName){
		var id = params.id;
		var url = '/groupprofile.html?group='+id;
		if (params.admin){
			url = '/addgroup.html?group='+id;
		}
		this._setLocation(url);
	},

	_setLocation: function(newLocation){
		window.location.href = newLocation;
	},

	_setDateParam: function(params) {
		if(params.date) {
			params.tentative_date = params.date;
			delete params.date;
		}
		return params;
	}

});