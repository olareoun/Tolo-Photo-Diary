ZZ.Components.Login = CUORE.Class(CUORE.Components.Link, {

	init: function(loginKey, logoutKey) {
		this.loginKey = loginKey;
		this.logoutKey = logoutKey;
		ZZ.Components.Login.parent.init.call(this, '#', loginKey);
		this.setRenderer(new ZZ.Renderers.Login());
		this.setI18NKey(logoutKey);
		this.addHandler('USERS_login_EXECUTED', new ZZ.Handlers.Login());
		this.addExecHandler('USERS_logout_EXECUTED', 'doLogout');
	},

	

	getLabelText: function() {
		var theKey = this.loginKey;
		if(this.logged()) {
			theKey = this.logoutKey;
		}
		return this.getText(theKey);
	},

	doLogin: function(token, user) {
		document.page.login(token, user);
		CUORE.Bus.emit('LOGIN_logged_CHANGED', undefined);
		this.updateRender();
	},

	doLogout: function(token) {
		document.page.logout();
		CUORE.Bus.emit('LOGIN_logged_CHANGED', undefined);
		this.execute('URL', 'goHome');
	},

	logged: function() {
		return document.page && document.page.isLogged();
	}

});

ZZ.Handlers.Login = CUORE.Class(CUORE.Handler, {

	handle: function(aMessage) {
		var token = aMessage.getFromAnswer('token');
		var user = aMessage.getFromAnswer('user');
		if(!token) return;
		this.owner.doLogin(token, user);
	}

});