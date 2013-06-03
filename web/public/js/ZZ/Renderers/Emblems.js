ZZ.Renderers.Emblems = CUORE.Class(CUORE.Renderers.List, {

	init: function(eventName){
		ZZ.Renderers.Emblems.parent.init.call(this);
		this.eventName = eventName || 'COMPONENT_emblems_CHANGED';

	},

	_getBaseUrl: function() {
		var parser = document.createElement('a');
		parser.href = document.location.href;

		return parser.protocol + "//" + parser.hostname + ":" + parser.port;
	},

	paint: function(component) {
		ZZ.Renderers.Emblems.parent.paint.call(this, component);
		this._selectEmblems();

	},

	updateWhenDrawn: function(component) {
		ZZ.Renderers.Emblems.parent.updateWhenDrawn.call(this, component);
		this.setSelectedItems(component.selectedEmblems);
	},

	setSelectedItems: function(values){
		var self = this;
		_.each(values,function(emblemName){
			CUORE.Dom.addClass(self.panel.querySelector('li.'+emblemName), ZZ.SELECTED_CLASS);
		});
	},

	_sendEmblems: function(){
		var emblems = _.map(this.panel.querySelectorAll('li.'+ZZ.SELECTED_CLASS), function(element){
			return element.id;
		});
		CUORE.Bus.emit(this.eventName, emblems);
	},

	_selectEmblems: function() {

		var self = this;
		var callback = function(e) {
				if(e.target.classList.contains(ZZ.SELECTED_CLASS)) {
					CUORE.Dom.removeClass(e.target, ZZ.SELECTED_CLASS);
				} else {
					CUORE.Dom.addClass(e.target, ZZ.SELECTED_CLASS);
				}
				self._sendEmblems();
			};

		CUORE.Dom.Event.add(this.panel, 'click', callback);
	},

	_addItem: function(item) {
        var DOMitem = CUORE.Dom.createElement('li', null, this.panel);
		DOMitem.setAttribute('title', item);
		DOMitem.setAttribute('id', item);
		CUORE.Dom.addClass(DOMitem, item);
    }



});
