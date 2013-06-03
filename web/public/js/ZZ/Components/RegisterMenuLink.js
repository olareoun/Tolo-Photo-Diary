ZZ.Components.RegisterMenuLink = CUORE.Class(CUORE.Components.Link, {

	init: function(defaultUrl, defaultKey, loggedUrl, loggedKey) {
		ZZ.Components.RegisterMenuLink.parent.init.call(this, defaultUrl, defaultKey);
		this.addExecHandler('LOGIN_logged_CHANGED', 'updateRender');
		this.loggedKey = loggedKey;
		this.setI18NKey(this.loggedKey);
		this.loggedUrl = loggedUrl;
	},

	getLabelText: function() {
		var label = this.key;

		if(this._logged()) {
			label = this.loggedKey;
		}

		return this.getText(label);
	},

	getURL: function() {
		var url =this.url;
		if(this._logged()) {
			url = this.loggedUrl;
		}
		return url;
	},

	_logged: function() {
		return document.page.isLogged();
	}


});