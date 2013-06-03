ZZ.Renderers.Button = CUORE.Class(CUORE.Renderers.Button, {

  paint: function(component) {
    this.setTagName('button');
    this._adjustBehaviour(component);
    CUORE.Renderers.Button.parent.paint.call(this, component);

    this.span = this.panel;
    this.updateWhenDrawn(component);
  },

  _adjustBehaviour: function(component) {
    var notAnAnchor = this.container.tagName !== 'BUTTON';
    if(notAnAnchor && component.doYouHijack()) {
      component.behave(CUORE.Behaviours.APPEND);
    }
  }

});
