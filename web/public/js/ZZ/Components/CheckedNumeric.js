ZZ.Components.CheckedNumeric = CUORE.Class(CUORE.Components.NumericSelector, {

	init: function(preLabelKey, postLabelKey, name) {
		ZZ.Components.CheckedNumeric.parent.init.call(this, preLabelKey);
		this.notificationsDisabled = true;
		this.setName(name);
		this.setValue(7);
		this.setIncrementer(1);
		this.setLimInf(1);
		this.setLimSup(30);
		this.setI18NKey(postLabelKey);
		this.postLabelKey = postLabelKey;
		this.renderer = new ZZ.Renderers.CheckedNumeric();

		this.disable();
	},

	notifyDisabled: function() {
		CUORE.Bus.emit('COMPONENT_' + this.name + '_CHANGED', undefined);
	},

	enable: function() {
		ZZ.Components.CheckedNumeric.parent.enable.call(this);
		this.notificationsDisabled = false;
		this.notifyChanges();
	},

	disable: function() {
		ZZ.Components.CheckedNumeric.parent.disable.call(this);
		this.notificationsDisabled = true;
		this.notifyDisabled();
	},

	notifyChanges: function() {
		if(this.notificationsDisabled) {
			return;
		}
		var dataValue = parseInt(this.getValue(), 10);


		CUORE.Bus.emit('COMPONENT_' + this.name + '_CHANGED', dataValue);
	}


});