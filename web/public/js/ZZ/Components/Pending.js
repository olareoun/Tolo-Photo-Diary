ZZ.Components.Pending = CUORE.Class(CUORE.Components.List, {

	init: function() {
		ZZ.Components.Pending.parent.init.call(this);
		this.renderer = new ZZ.Renderers.Pending();

		this.acceptKey = 'zizerones.admin.acceptguide';
		this.rejectKey = 'zizerones.admin.rejectguide';
		this.sendKey = 'zizerones.admin.sendmessage';
	},

	grant: function(action, guideUsername, textMessage) {
		var params = {
			username: guideUsername,
			message: textMessage
		};

		var method = 'rejectAccess';
		if(action === this.ACTION_ACCEPT) {
			method = 'grantAccess';
		}
		this.execute('USERS', method, params);

	},

	profile: function(username) {
		this.execute('GUIDES', 'get', {
			username: username
		});
	},

	onEnvironmentUp: function() {
		this.addHandler('USERS_pending_EXECUTED', new ZZ.Handlers.Pending());
		this.addHandler('USERS_grantAccess_EXECUTED', new ZZ.Handlers.Granted());
		this.addHandler('USERS_rejectAccess_EXECUTED', new ZZ.Handlers.Granted());

		this.services.execute("USERS", 'pending', null);

		this.setI18NKey(this.acceptKey);
		this.setI18NKey(this.rejectKey);
		this.setI18NKey(this.sendKey);
	},

	getAcceptText: function() {
		return this.getText(this.acceptKey);
	},

	getRejectText: function() {
		return this.getText(this.rejectKey);
	},

	getSendText: function() {
		return this.getText(this.sendKey);
	},

	ACTION_ACCEPT: 'accept',
	ACTION_REJECT: 'reject'

});


ZZ.Handlers.Pending = CUORE.Class(CUORE.Handler, {

	handle: function(message) {
		var list = message.getAnswer();
		this.owner.fillList(list);
	}
});

ZZ.Handlers.Granted = CUORE.Class(CUORE.Handler, {

	handle: function(message) {
		this.owner.services.execute("USERS", 'pending', null);
	}
});