ZZ.Decorations.LanguagesChosen = CUORE.Class(CUORE.Decoration, {


	init: function(multiple, eventName) {
		this.single = multiple;
		this.eventName = eventName;
	},

	postPaint: function(panel) {

		var self = this;

		var callback = function(data) {
				self._insertLanguages(panel, data, self.eventName);
				self._changeSelectedValues();
			};
		CUORE.Core.requestGet(this._getBaseUrl() + "/catalog/languages", {}, callback);
	},

	postUpdate: function(updatedata, panel) {
		this.values = updatedata.value.split(',');
		if (!updatedata.value){
			var defaultLanguage = ZZ.Helpers.Locale.browserLanguage();
			this.values = [defaultLanguage];
			var event = this.eventName || 'COMPONENT_languages_CHANGED';
			CUORE.Bus.emit(event, defaultLanguage);
		}

		this._changeSelectedValues();
	},

	_getBaseUrl: function() {
		var parser = document.createElement('a');
		parser.href = document.location.href;

		return parser.protocol + "//" + parser.hostname + ":" + parser.port;
	},

	_insertLanguages: function(panel, languages, eventName) {

		var select = this._createLanguagesSelection(panel);
		for(var i = 0; i < languages.length; i++) {
			select.appendChild(this._option(languages[i]));
		}


		var sendLanguages = function() {
				var event = eventName || 'COMPONENT_languages_CHANGED';
				var value = $(select).val();

				CUORE.Bus.emit(event, value);

				$(select).trigger("liszt:updated");
			};

		$(select).chosen().change(sendLanguages);

	},

	_option: function(language){
		var option = document.createElement('option');
		option.text = this._getText(document.page.getLanguageLabel(language)) || "";
		option.value = language;
		return option;
	},

	_createLanguagesSelection: function(panel) {
		var input = panel.getElementsByTagName('input')[0];
		CUORE.Dom.addClass(input, ZZ.NO_DISPLAY_CLASS);
		var select = document.createElement('select');

		select.setAttribute("data-placeholder", this._getText('zizerones.guide.languages.placeholder'));
		select.style.width = "350px;";
		if(!this.single) {
			select.setAttribute("multiple", "multiple");
		}
		select.classList.add("chzn-select");
		select.id = "select-languages";
		select.name = "languages_select";

		panel.appendChild(select);

		return select;
	},

	_getText: function(key) {
		var currentLocale = (navigator.language || navigator.browserLanguage);

		return document.labels[currentLocale][key];
	},

	_changeSelectedValues: function() {
		$('#select-languages').val(this.values);
		$('#select-languages').trigger("liszt:updated");
	}
});