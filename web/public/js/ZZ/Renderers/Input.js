ZZ.Renderers.Input = CUORE.Class(CUORE.Renderers.Input, {

  paint: function(component) {
    ZZ.Renderers.Input.parent.paint.call(this, component);
    this._autoSubmit(component);
  },

  updateWhenDrawn: function(component) {
    ZZ.Renderers.Input.parent.updateWhenDrawn.call(this, component);
    this.DOMInput.setAttribute('placeholder', component.getPlaceHolder());
    this.DOMInput.setAttribute('name', component.getName());

    this.updateData = {
      value: this.getValue()
    };
    
  },

  _autoSubmit: function(component) {
    var callback = CUORE.Core.bind(this.DOMInput, function() {
      component.setValue(this.value);
    });
    CUORE.Dom.Event.add(this.DOMInput, 'blur', callback);
  },

  _postUpdate: function() {
    _.each(this.decorators, function(decorator){
        decorator.postUpdate(this.updateData, this.panel);
      }, this);
    
  }

});
