ZZ.Components.Password = CUORE.Class(ZZ.Components.Input, {

	init: function(labelKey, placeholderKey) {
		ZZ.Components.Password.parent.init.call(this, labelKey, placeholderKey);
		
		this.setI18NKey(ZZ.SHOW_PASS_KEY);
		this.renderer = new ZZ.Renderers.Password();
	}

});
