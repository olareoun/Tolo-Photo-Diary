ZZ.Decorations.DatePicker = CUORE.Class(CUORE.Decoration, {

	postPaint: function(panel) {
		var input = panel.getElementsByTagName('input')[0];
		
		input.name = 'date-filter';
		var hiddenName = input.name + '_submit';

    var self = this;
		var callback = function() {
        self._hideIcon();
				var event = 'COMPONENT_' + $(input).attr('name') + '_CHANGED';
				var value = $('[name="' + hiddenName + '"]').val();
				CUORE.Bus.emit(event, value);
			};
    

		var options = {
			'onSelect': callback,
			'formatSubmit': 'mm-dd-yyyy'
		};

		var localAwareOptions = this._localeAwareOptions();
		for(var property in localAwareOptions) {
			options[property] = localAwareOptions[property];
		}

		CUORE.Dom.Event.remove(input, 'blur');
		$(input).pickadate(options);
	},

	postUpdate: function(updatedata, panel) {
		if(updatedata && !updatedata.value) return;
    
    this._hideIcon();
		var input = panel.getElementsByTagName('input')[0];
		var calendar = $(input).data('pickadate');

		var numbersDate = updatedata.value.match(/(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])\-((19|20)\d\d)/);
		var numbersTime = updatedata.value.match(/((19|20)\d\d)\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])T/);
		if(numbersDate) {
			calendar.setDate(numbersDate[3], numbersDate[1], numbersDate[2]);
		}
		if(numbersTime) {
			calendar.setDate(numbersTime[1], numbersTime[3], numbersTime[4]);
		}
	},

	_localeAwareOptions: function() {
		var options = {};
		var currentLocale = (navigator.language || navigator.browserLanguage);

		var months = ZZ.PICKADATE.MONTHS[currentLocale];
		if(months) {
			options.monthsFull = months;
		}

		var days = ZZ.PICKADATE.DAYS[currentLocale];
		if(days) {
			options.weekdaysShort = days;
		}

		if(currentLocale == 'es-ES') options.firstDay = 1;
		return options;
	},
  
  _hideIcon: function(){
      $('#wrapper-date-filter .icon').hide();
  }
});
