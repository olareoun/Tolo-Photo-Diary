ZZ.Components.DurationLabel = CUORE.Class(CUORE.Components.LabelPanel, {

	init: function(labelKey) {
		ZZ.Components.DurationLabel.parent.init.call(this);
		this.renderer = new ZZ.Renderers.DurationLabel();
		this.labelKey = labelKey;

	},

	onEnvironmentUp: function(){
		this.setI18NKey('zizerones.home.hours');
		this.setI18NKey('zizerones.home.minutes');
		this.setI18NKey(this.labelKey);
	},

	setValue: function(value){
		this.value = value;
		this.updateRender();
	},

	getValue: function(){
		return this.value;
	}



});