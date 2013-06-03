ZZ.Components.Input = CUORE.Class(CUORE.Components.Input, {

  init: function(labelKey, placeholderKey, paramName, type) {
    ZZ.Components.Input.parent.init.call(this, labelKey, type);
    this.paramName = paramName;
    this.renderer = new ZZ.Renderers.Input();
    this.setPlaceHolder(placeholderKey);
  },

  onEnvironmentUp: function() {
    this._updateStateFromURL();
  },

  setPlaceHolder: function(key) {
    this.myPlaceHolder = key;
    this.setI18NKey(key);
  },

  getPlaceHolder: function() {
    if(!this.myPlaceHolder) return ZZ.EMPTY_STRING;
    return this.getText(this.myPlaceHolder);
  },

  setValue: function(value, ommitSignal) {
    ZZ.Components.Input.parent.setValue.call(this, value);
    var event = 'COMPONENT_' + this.getName() + '_CHANGED';
    if(!ommitSignal) {
      CUORE.Bus.emit(event, value);
    }
  },

  setInitialValue: function(value) {
    ZZ.Components.Input.parent.setValue.call(this, value);
  },

  setLocation: function(aLocation) {
    this.customLocation = aLocation;
  },

  refillOn: function(service, method) {
    eventName = service + '_' + method + '_EXECUTED';
    this.addHandler(eventName, new ZZ.Handlers.InputRefill());
  },

  _updateStateFromURL: function() {

    var parser = document.createElement('a');
    parser.href = this._getLocation();
    var paramRegExp = new RegExp(this.paramName + "=([^&]*)");

    var paramFound = parser.search.match(paramRegExp);
    if(paramFound) {
      this.setValue(decodeURI(paramFound[1]));
    }
  },

  _getLocation: function() {
    return this.customLocation || document.location.href;
  }


});

ZZ.Handlers.InputRefill = CUORE.Class(CUORE.Handler, {
  handle: function(message) {
    var key = this.owner.paramName;
    var value = message.getFromAnswer(key);
    if(value) {
      this.owner.setValue(value,true);
    } else {
      this.owner.setValue('',true);
    }
  }
});