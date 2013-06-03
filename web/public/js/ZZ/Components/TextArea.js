ZZ.Components.TextArea = CUORE.Class(ZZ.Components.Input, {

	init: function(labelKey, placeholderKey) {
		ZZ.Components.TextArea.parent.init.call(this, labelKey, placeholderKey);
		this.renderer = new ZZ.Renderers.TextArea();
	}

});