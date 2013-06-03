ZZ.Renderers.CheckedNumeric = CUORE.Class(CUORE.Renderers.NumericSelector, {

	paint: function(component) {
		ZZ.Renderers.CheckedNumeric.parent.paint.call(this, component);

		this._createElements();

		var self = this;
		CUORE.Dom.Event.add(this.checkBox, 'change', function() {
			self.updateWhenDrawn(component);
			if(self.checkBox.checked) {
				component.enable();
			} else {
				component.disable();
			}
		});

	},

	updateWhenDrawn: function(component) {
		ZZ.Renderers.CheckedNumeric.parent.updateWhenDrawn.call(this, component);
		this.DOMInput.setAttribute('name', component.getName());
		this.showLabel.innerHTML = component.getText(component.postLabelKey);

	},

	_createElements: function() {

		this.checkBox = CUORE.Dom.createElement('input', {
			'type': 'checkbox',
			'name': 'repetition'
		}, this.panel);
		this.showLabel = CUORE.Dom.createElement('span', {}, this.panel);
	}


});
