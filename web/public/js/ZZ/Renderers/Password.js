ZZ.Renderers.Password = CUORE.Class(ZZ.Renderers.Input, {

	paint: function(component) {
		ZZ.Renderers.Input.parent.paint.call(this, component);

		this._createElements();
		this._autoSubmit(component);

		var self = this;
		CUORE.Dom.Event.add(this.checkBox, 'change', function() {
			self.updateWhenDrawn(component);
			if(self.checkBox.checked) {
				self.plainInput.focus();
			} else {
				self.DOMInput.focus();
			}
		});

		CUORE.Dom.addClass(this.plainInput, 'hidden');
	},

	updateWhenDrawn: function(component) {
		ZZ.Renderers.Input.parent.updateWhenDrawn.call(this, component);
		this.DOMInput.setAttribute('placeholder', component.getPlaceHolder());
		this.DOMInput.setAttribute('name', component.getName());
		this._assignValues(component);
		this.showLabel.innerHTML = component.getText(ZZ.SHOW_PASS_KEY);
		this._manageVisibility();
		this.updateData = {
			value: this.getValue()
		};
	},

	_createElements: function() {
    this.panel.removeChild(this.DOMInput);
    
    var wrapper = CUORE.Dom.createElement('div',{className: 'wrapper-password'},this.panel);
    
    this.DOMInput = CUORE.Dom.createElement('input', {
			'type': 'password'
		}, wrapper);
		this.plainInput = CUORE.Dom.createElement('input', {
			'type': 'text'
		}, wrapper);
    
    CUORE.Dom.createElement('div', {
			'className': 'clearfix'
		}, wrapper);

		this.checkBox = CUORE.Dom.createElement('input', {
			'type': 'checkbox',
			'name': 'showPass'
		}, this.panel);

		this.showLabel = CUORE.Dom.createElement('span', {className: 'check-view-password'}, this.panel);
	},

	_assignValues: function(component) {
		this.DOMInput.value = component.getValue();
		this.plainInput.value = component.getValue();
	},

	_autoSubmit: function(component) {
		var passwordCallback = CUORE.Core.bind(this.DOMInput, function() {
			component.setValue(this.value);
		});
		var plainCallback = CUORE.Core.bind(this.plainInput, function() {
			component.setValue(this.value);
		});
		CUORE.Dom.Event.add(this.DOMInput, 'blur', passwordCallback);
		CUORE.Dom.Event.add(this.plainInput, 'blur', plainCallback);
	},

	_manageVisibility: function() {
		if(this.checkBox.checked) {
			this._hiddenPassword();
		} else {
			this._hiddenPlain();
		}
	},

	_hiddenPlain: function() {
		CUORE.Dom.removeClass(this.DOMInput, ZZ.NO_DISPLAY_CLASS);
		CUORE.Dom.addClass(this.plainInput, ZZ.NO_DISPLAY_CLASS);

	},

	_hiddenPassword: function() {
		CUORE.Dom.addClass(this.DOMInput, ZZ.NO_DISPLAY_CLASS);
		CUORE.Dom.removeClass(this.plainInput, ZZ.NO_DISPLAY_CLASS);


	}
});
