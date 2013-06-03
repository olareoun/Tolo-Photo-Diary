ZZ.Components.Number = CUORE.Class(ZZ.Components.Input, {

	init: function(labelKey, placeHolder, paramName) {
		ZZ.Components.Number.parent.init.call(this,labelKey,placeHolder,paramName);
		this.type = 'number';
	}

});