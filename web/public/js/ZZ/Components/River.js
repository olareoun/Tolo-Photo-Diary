ZZ.Components.River = CUORE.Class(CUORE.Component, {

	init: function(key) {
		ZZ.Components.River.parent.init.call(this, key);
		this.renderer = new ZZ.Renderers.River();
		this._reset();
		this.loading = false;
		this.waiting = false;
		this.setI18NKey(ZZ.LOADING_KEY);
		this.addHandler('GROUPS_getList_EXECUTED', new ZZ.Handlers.River());
	},

	isLoading: function() {
		return this.loading;
	},

	hasNoMoreGroups: function() {
		return this.noMoreGroups;
	},

	loadGroups: function(jsonArray) {
		this._responseReceived();
		if(jsonArray.length === 0) {
			this.noMoreGroups = true;
		}

		_.each(jsonArray, function(daJson){
			var aGroup = this._createGroup(daJson);
			aGroup.setProperties(daJson);
			this.loadedGroups.push(aGroup);
		}, this);

		this._nowShowing();
	},

	_createGroup: function(data) {
		var aGroup = new ZZ.Components.Group(data.identity, data.city, data.date);
		aGroup.services = this.services;
		aGroup.init(data.identity, data.city, data.date);
		return aGroup;
	},

	groups: function() {
		return this.loadedGroups;
	},

	reset: function() {
		this._nowLoading();
		this._reset();
	},

	moreGroups: function(paramsToSubmit) {
		if(this.hasNoMoreGroups() || this._isWaitingForPreviuosMoreGroupCall()) return;
		this._nowLoading();
		this._waitingForAnswer();
		this.services.execute('GROUPS', 'getList', this._retrieveQueryData(paramsToSubmit));
	},

	getLoadingText: function() {
		return this.getText(ZZ.LOADING_KEY) || ZZ.LOADING_KEY;
	},

	_reset: function() {
		this.loadedGroups = [];
		this.noMoreGroups = false;
	},

	_nowLoading: function() {
		this._changeLoadingState(true);
	},

	_nowShowing: function() {
		this._changeLoadingState(false);
	},

	_changeLoadingState: function(newState) {
		this.loading = newState;
		this.updateRender();
	},

	_isWaitingForPreviuosMoreGroupCall: function(){
		return this.waiting;
	},

	_waitingForAnswer: function() {
		this.waiting = true;
	},

	_responseReceived: function() {
		this.waiting = false;
	},

	_retrieveQueryData: function(someParams) {
		var lastGroup = this.loadedGroups[this.loadedGroups.length - 1];
		var data = this.lastQuery || {};

		if(someParams) {
			data = _.clone(someParams);
		}
		data.limit = 20;
		if(lastGroup) {
			data.from_group = lastGroup.identity();
		}

		this.lastQuery = data;
		return data;
	}

});

ZZ.Handlers.River = CUORE.Class(CUORE.Handler, {
	handle: function(message) {
		this.getOwner().loadGroups(message.getAnswer());
	}
});
