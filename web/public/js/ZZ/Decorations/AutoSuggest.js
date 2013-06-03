ZZ.Decorations.AutoSuggest = CUORE.Class(CUORE.Decoration, {
	postPaint: function(panel) {
		var input = panel.getElementsByTagName('input')[0];
		CUORE.Dom.Event.remove(input, 'blur');

		var autoSubmit = CUORE.Core.bind(input, function() {
			var event = 'COMPONENT_' + $(input).attr('name') + '_CHANGED';
			var value = $(input).val();
			if($('ul.typeahead').css('display') != 'none') {
				value = $('ul.typeahead li.active').text();
				$(input).val(value);
			}
			CUORE.Bus.emit(event, value);
		});
		CUORE.Dom.Event.add(input, 'blur', autoSubmit);

		$(input).attr('data-provide', 'typeahead');
		var callback = function(data) {
				$(input).typeahead({
					source: data.places
				});
			};
		CUORE.Core.requestGet(this._getBaseUrl() + "/catalog/places", {}, callback);
	},

	_getBaseUrl: function() {
		var parser = document.createElement('a');
		parser.href = document.location.href;

		return parser.protocol + "//" + parser.hostname + ":" + parser.port;
	},

	postUpdate: function(updatedata, panel) {

	}
});