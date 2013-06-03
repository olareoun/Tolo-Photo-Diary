ZZ.Components.GroupCard = CUORE.Class(ZZ.Components.Card, {

	init: function(editMode) {
		ZZ.Components.GroupCard.parent.init.call(this);
		this.setName('groupCard');
		this.watchInputs(['description','date','time','city','name',
											'duration','separation-days','minimum','maximum',
											'price','language','emblems','image']);
		this.setMandatories(['description', 'date', 'city', 'name', 'language', 'price']);
		this.sendTo('GROUPS','add');
		this.addExecHandler('BUTTON_submit_CLICKED', 'submitData');
	},

	setValue: function(name, value) {
        console.log(name,value);
        ZZ.Components.GroupCard.parent.setValue.call(this,name,value);
   },

	onEnvironmentUp: function() {
			this.services.execute('GROUPS', 'get', this._groupfromURL());
	},

	_groupfromURL: function() {
		var location = this._getLocation();
		var paramRegExp = new RegExp("group=([^&]*)");
		var paramFound = location.match(paramRegExp);
		if(paramFound) {
			return paramFound[1];
		}
	},

	_getLocation: function() {
		return document.location.href;
	}

});