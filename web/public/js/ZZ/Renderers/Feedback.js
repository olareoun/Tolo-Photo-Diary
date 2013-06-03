ZZ.Renderers.Feedback = CUORE.Class(CUORE.Renderers.LabelPanel, {

	paint: function(component) {
		ZZ.Renderers.Feedback.parent.paint.call(this, component);
		this._clickToDismiss(component);
	},

	showDisabledState: function(component) {
		this.removeClass(ZZ.DISABLED_CLASS);

		if(!component.isEnabled()) {
			this.addClass(ZZ.DISABLED_CLASS);
		}
	},

	_clickToDismiss: function(component) {
		var callback = CUORE.Core.bind(this.panel, function() {
			component.dismiss();
		});
		CUORE.Dom.Event.add(this.panel, 'click', callback);
	}

});