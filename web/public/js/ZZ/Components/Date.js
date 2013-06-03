ZZ.Components.Date = CUORE.Class(ZZ.Components.Input, {

	init: function(labelKey, placeholderKey, urlParam) {
		ZZ.Components.Date.parent.init.call(this, labelKey, placeholderKey, urlParam);
		this.type = 'date';
	}

});