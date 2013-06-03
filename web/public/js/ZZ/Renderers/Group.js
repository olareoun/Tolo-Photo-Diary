ZZ.Renderers.Group = CUORE.Class(CUORE.Renderer, {

	paint: function(component) {
		this.addClass(ZZ.GROUP_WIDTH_CLASS);
		this.addClass(ZZ.GROUP_FORMAT_CLASS);
		this.addClass('group');

		var divID = this.innerDivName(component.getName());
		this.panel = CUORE.Dom.createElement(this.tagName, {
			id: divID
		}, this.getContainer());
		this.setCurrentClasses();

		this._addDate(component);
		this._addTime(component);
		this._addEmblems(component);
		this._addCity(component);
		this._addImage(component);
		this._addDescription(component);
		this._addPrice(component);
		this._addMoreInfoLink(component);
		this._addSeparation(component);
		this._addSigned(component);
	},

	setContainer: function(aContainer) {
		this.container = aContainer;
	},

	getContainer: function() {
		if (! this.cachedContainer) {
			this.cachedContainer = document.getElementById(this.container);
		}
		return this.cachedContainer ;
	},

	_addDate: function(component) {
		var container = CUORE.Dom.createElement('div',{className : "date"}, this.panel);
		var  day = CUORE.Dom.createElement('span', {className : "day"}, container);
		CUORE.Dom.createElement('br',null, container);
		var  month = CUORE.Dom.createElement('span', {className : "month"}, container);
		var dateComplete = component.date() || 'xx-xx';
		var dateArray = dateComplete.split('-');
		day.innerHTML = dateArray[1];
		month.innerHTML = component.month(parseInt(dateArray[0], 10)-1);
	},

	_addEmblems: function(component) {
		var container = CUORE.Dom.createElement('div',{className : "emblems"}, this.panel);
		var listEmblems = CUORE.Dom.createElement('ul',null,container);
		_.each(component.emblems(),function(emblem){
			var DOMitem = CUORE.Dom.createElement('li', null, listEmblems);
			DOMitem.setAttribute('title', emblem);
			CUORE.Dom.addClass(DOMitem, emblem);
		});
	},


	_addTime: function(component) {
		var time = CUORE.Dom.createElement('div', {className: 'time'}, this.panel);
		time.innerHTML = component.time();
	},

	_addCity: function(component) {
		var DOMitem = CUORE.Dom.createElement('h2', null, this.panel);
		DOMitem.innerHTML = component.city();
	},

	_addImage: function(component) {
		var DOMitem = CUORE.Dom.createElement('img', {'src':'/img/mascara_foto.png'}, this.panel);
	},

	_addDescription: function(component) {
		var DOMitem = CUORE.Dom.createElement('p', null, this.panel);
		DOMitem.innerHTML = component.description();
	},

	_addMoreInfoLink: function(component) {
		var DOMitem = CUORE.Dom.createElement('a', {className:'info'}, this.panel);
		DOMitem.innerHTML = component.moreInfoLabel();
		var callback = CUORE.Core.bind(DOMitem, function() {
			component.redirectToGroup();
		});
		CUORE.Dom.Event.add(DOMitem, 'click', callback);
	},

    _addSeparation: function(component) {
      CUORE.Dom.createElement('div', {className:'clearfix'}, this.panel);
      CUORE.Dom.createElement('hr', null, this.panel);
    },

    _addPrice: function(component) {
      var ribbon = CUORE.Dom.createElement('div', {className:'ribbon-wrapper price'}, this.panel);

      var price = CUORE.Dom.createElement('div', {className:'ribbon-front'}, ribbon);
      CUORE.Dom.createElement('div', {className:'ribbon-edge-bottomright'}, ribbon);
      price.innerHTML = component.price() + ' &euro;';
    },

    _addSigned: function(component){
		var container = CUORE.Dom.createElement('div',{className : "quorum"}, this.panel);
		var list = CUORE.Dom.createElement('ul',null,container);

		var signed = CUORE.Dom.createElement('li', {
			className: 'signed',
			title: component.signedLabel()
		}, list);
		signed.innerHTML = 0;

		var minimum = CUORE.Dom.createElement('li', {
			className: 'minimum',
			title: component.minimumLabel()
		}, list);
		minimum.innerHTML = component.minimum();
    }
});
