ZZ.Handlers.Factory = CUORE.Class(null, {

	init: function() {},

	setInputValue: function(paramName) {
		var handler = CUORE.Class(CUORE.Handler, {
			handle: function(message) {
				var value = message.answer[paramName] || '';
				this.owner.setInitialValue(_.clone(value));
			}
		});
		return new handler();
	},

	createCriteriaFactory: function(type) {
		var criteria = {};
		var handler = CUORE.Class(CUORE.Handler, {
			handle: function(value) {
				criteria[type] = value;
				this.owner.setValue(criteria);
			}
		});
		return new handler();
	}

});