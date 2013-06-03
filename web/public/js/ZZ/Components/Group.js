ZZ.Components.Group = CUORE.Class(CUORE.Component, {

	init: function(identity, aCity, aDate) {
		ZZ.Components.Group.parent.init.call(this);
		this.renderer = new ZZ.Renderers.Group();
		this.groupId = identity;
		this.myDate = aDate;
		this.myCity = aCity;

		this._loadKeys();

		this.propertiesToLoad = ['description', 'identity', 'language', 'image', 'price', 'emblems', 'minimum', 'time', 'admin'];
		this.properties = {};
	},

	_loadKeys: function(){
		this.moreInfoKey = 'zizerones.groups.moreinfo.label';
		this.setI18NKey('zizerones.home.hours');
		this.setI18NKey('zizerones.home.minutes');
		this.setI18NKey('zizerones.home.signed');
		this.setI18NKey('zizerones.home.minimum');
		this.setI18NKey('zizerones.short_months');
		this.setI18NKey(this.moreInfoKey);
		this.editKey = 'zizerones.groups.edit.label';
		this.setI18NKey(this.editKey);
	},

	minimumLabel: function(){
		return this.getText('zizerones.home.minimum');
	},


	signedLabel: function(){
		return this.getText('zizerones.home.signed');
	},

	setProperties: function(aJson){
		this.properties = {};
		_.each(this.propertiesToLoad, function(element){
			this.properties[element] = aJson[element];
		}, this);
		this.updateRender();
	},

	month: function(month){
		var months = this.getText('zizerones.short_months');
		return months[month];
	},

	date: function() {
		return this.myDate;
	},

	minimum: function() {
		return this.properties.minimum || 0;
	},

	time: function() {
		return this.properties.time || '00:00';
	},


	city: function() {
		return this.myCity;
	},

	price: function() {

		return this.properties.price;
	},

	language: function() {
		return this.properties.language || '';
	},

	image: function() {
		return this.properties.image;
	},

	description: function() {
		return this.properties.description || '';
	},

	emblems: function() {
		return this.properties.emblems || [];
	},

	moreInfoLabel: function() {
		var key = this.moreInfoKey;
		if (this.isLoggedUserTheAdmin()){
			key = this.editKey;
		}
		return this.getText(key);
	},

	identity: function() {
		return this.groupId;
	},

	isLoggedUserTheAdmin: function() {
		var loggedUser = ZZ.Helpers.Session.getAuthData().userid;
		if(!loggedUser || !this.properties.admin) return false;
		return loggedUser === this.properties.admin.id;
	},

	redirectToGroup: function(){
		var params = {'id':this.groupId, 'admin':this.isLoggedUserTheAdmin()};
		this.execute('GROUPS', 'redirect', params);
	}
});
