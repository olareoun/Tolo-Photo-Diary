ZZ.Renderers.TextArea = CUORE.Class(ZZ.Renderers.Input, {

	paint: function(component) {
		ZZ.Renderers.TextArea.parent.paint.call(this, component);
		this.panel.removeChild(this.DOMInput);
		this.DOMInput = CUORE.Dom.createElement('textarea', {}, this.panel);
		this._autoSubmit(component);
	}

});