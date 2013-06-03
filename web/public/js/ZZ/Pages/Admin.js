ZZ.Pages.Admin = CUORE.Class(ZZ.Pages.ZZBase, {

	initializeServices: function() {
		ZZ.Pages.Zizerones.parent.initializeServices.call(this);
		this.addService(new ZZ.Services.Guides());
		this.addService(new ZZ.Services.Users());
	},

	initializeComponents: function() {
		this._addPending();
		this._addPendingProfile();

		ZZ.Pages.Admin.parent.initializeComponents.call(this);
	},

	_addPending: function() {
		var pendingGuides = new ZZ.Components.Pending();
		this.addComponent(pendingGuides, 'pending', CUORE.Behaviours.HIJACK);
	},

	_addPendingProfile: function() {
		var profile = new ZZ.Components.PendingProfile();
		this.addComponent(profile, 'profile', CUORE.Behaviours.HIJACK);
	}

});