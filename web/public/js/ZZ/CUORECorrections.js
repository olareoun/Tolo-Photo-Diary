CUORE.Dom = (function(doc, undefined) {

	var ready = function(callback) {
			var checkLoaded = setInterval(function() {
				if(doc.body && doc.getElementById) {
					clearInterval(checkLoaded);
					callback();
				}
			}, 10);
		};

	var addClass = function(element, cssClass) {
			if(!hasClass(element, cssClass)) {
				element.className += ' ' + cssClass;
			}
		};

	var removeClass = function(element, cssClass) {
			if(hasClass(element, cssClass)) {
				var currentClasses = _allClasses(cssClass);
				element.className = element.className.replace(currentClasses, ' ').replace(/\s+/g, ' ').replace(/^\s|\s$/, '');
			}
		};

	var hasClass = function(element, cssClass) {
			var currentClasses = _allClasses(cssClass);
			var matchedClasses = element.className.match(currentClasses);
			var result = false;

			if(matchedClasses !== null) result = true;

			return result;
		};

	var createElement = function(name, members, parent) {
			var elem = doc.createElement(name);

			if(CUORE.Core.toType(members) === 'object') {
				for(var m in members) {
					if(CUORE.Core.isOwnProperty(members, m)) {
						elem[m] = members[m];
					}
				}
			}

			if(parent)
				parent.appendChild(elem);

			return elem;
		};

	var _allClasses = function(cssClass) {
			return new RegExp('(\\s|^)' + cssClass + '(\\s|$)');
		};

	return {
		ready: ready,
		addClass: addClass,
		removeClass: removeClass,
		hasClass: hasClass,
		createElement: createElement
	};

})(document);

CUORE.Dom.Event = (function(undefined) {

	var _eventManager = {
		add: function(element, eventName, functionToExecute) {
			this._initializeStructure(element, eventName);

			element.events[eventName].push(functionToExecute);
		},

		remove: function(element, eventName) {
			if(this.hasEvents(element, eventName)) {
				element.events[eventName] = [];
			}
		},

		fire: function(element, eventName) {
			if(!this.hasEvents(element, eventName)) return;

			var callbacks = element.events[eventName];
			for(var i = 0, len = callbacks.length; i < len; i++) {
				callbacks[i].call(element);
			}
		},

		hasEvents: function(element, eventName) {
			var elementHasEvents = (element.events && element.events[eventName] && element.events[eventName].length > 0);

			return(elementHasEvents) ? true : false;
		},

		_initializeStructure: function(element, eventName) {
			if(!element.events) {
				element.events = {};
			}
			if(!element.events[eventName]) {
				element.events[eventName] = [];
			}
		}
	};

	var add = function(el, type, fn) {
			_eventManager.add(el, type, fn);
			_addEventListener(el, type, fn);
		};

	var remove = function(el, type, fn) {
			_removeEventListener(el, type, fn);
			_eventManager.remove(el, type);
		};

	var stopDefault = function(el, type) {
			add(el, type, function(event) {
				if(!event) return;

				if(_hasIE8EventSystem(event)) {
					event.returnValue = false;
					event.cancelBubble = true;
				} else {
					event.preventDefault();
					event.stopPropagation();
				}
			});
		};

	var hasEvents = function(el, type) {
			return _eventManager.hasEvents(el, type);
		};

	var fire = function(el, type) {
			_eventManager.fire(el, type);
		};

	var _hasIE8EventSystem = function(event) {
			return(!event.preventDefault && !event.stopPropagation);
		};

	var _addEventListener = function(el, type, fn) {

			if(_isW3cListener()) {
				el.addEventListener(type, fn, false);
			}

			if(_isIEListener()) {
				el.attachEvent('on' + type, fn);
			}

			if(!_isIEListener() && !_isW3cListener()) {
				el['on' + type] = fn;
			}
		};

	var _removeEventListener = function(el, type, fn) {

			if(_isW3cListener()) {
				_removeMultipleEventListener(el, type);
			}

			if(_isIEListener()) {
				_removeMultipleDetachEvent(el, type);
			}

			if(!_isIEListener() && !_isW3cListener()) {
				el['on' + type] = null;
			}
		};

	var _isW3cListener = function() {
			return(typeof window.addEventListener === 'function');
		};

	var _isIEListener = function() {
			if(_isW3cListener()) return false;

			return(typeof document.attachEvent === 'function' || typeof document.attachEvent === 'object');
		};

	var _removeMultipleEventListener = function(element, eventName) {
			if(!_eventManager.hasEvents(element, eventName)) return;

			var callbacks = element.events[eventName];
			for(var i = 0, len = callbacks.length; i < len; i++) {
				element.removeEventListener(eventName, callbacks[i], false);
			}
		};

	var _removeMultipleDetachEvent = function(element, eventName) {
			if(!_eventManager.hasEvents(element, eventName)) return;

			var callbacks = element.events[eventName];
			for(var i = 0, len = callbacks.length; i < len; i++) {
				element.detachEvent('on' + eventName, callbacks[i]);
			}
		};

	return {
		add: add,
		remove: remove,
		hasEvents: hasEvents,
		fire: fire,
		stopDefault: stopDefault
	};

})();

CUORE.Components.NumericSelector.prototype.notifyChanges = function(ommitSignal) {
	var bus = this.getBus();
	var dataValue = parseInt(this.getValue(), 10);

	if(!ommitSignal)
		bus.emit('COMPONENT_' + this.name + '_CHANGED', dataValue);
};


CUORE.Components.NumericSelector.prototype.setValue = function(aValue, ommitSignal) {
        var normalizedValue = this._normalizeValue(aValue);
        CUORE.Components.NumericSelector.parent.setValue.call(this, normalizedValue);

        this.updateRender();
        this.notifyChanges(ommitSignal);
    };


CUORE.Components.NumericSelector.prototype.draw = function() {
        CUORE.Components.NumericSelector.parent.draw.call(this);
        this.setValue(this.getValue(), true);
};

CUORE.Renderers.NumericSelector.prototype.paint= function (component) {
        CUORE.Renderers.NumericSelector.parent.paint.call(this, component);
 this.buttonPanel = CUORE.Dom.createElement('span', {
        }, this.panel);

        this._decorateInput();
        this._addMinusButton(component);
        this._addPlusButton(component);
    };
    
CUORE.Renderers.NumericSelector.prototype._addMinusButton= function (component) {
        var componentMinus = CUORE.Core.bind(component, component.minus);

        this.minusButton = CUORE.Dom.createElement('a', {
            href: '#',
            className: 'minusButton',
            innerHTML: '<span>-</span>'
        }, this.buttonPanel);

        CUORE.Dom.Event.stopDefault(this.minusButton, 'click');
        CUORE.Dom.Event.add(this.minusButton, 'click', componentMinus);
    };

CUORE.Renderers.NumericSelector.prototype._addPlusButton= function (component) {
        var componentPlus = CUORE.Core.bind(component, component.plus);

        this.plusButton = CUORE.Dom.createElement('a', {
            href: '#',
            className: 'plusButton',
            innerHTML: '<span>+</span>'
        }, this.buttonPanel);

        CUORE.Dom.Event.stopDefault(this.plusButton, 'click');
        CUORE.Dom.Event.add(this.plusButton, 'click', componentPlus);
    };



CUORE.Message.prototype.getAnswer = function() {
	return this.answer;
};

CUORE.Renderer.prototype.update = function(component) {
	if(this.panel){ this.updateWhenDrawn(component);
		this._postUpdate();}
};

CUORE.Renderer.prototype._postUpdate = function() {
	this._executeForAllDecorators('postUpdate');
};

CUORE.Renderer.prototype._executeForAllDecorators = function(callbackName) {
	for(var i = 0, len = this.decorators.length; i < len; i++) {
		this.decorators[i][callbackName](this.panel);
	}
};
