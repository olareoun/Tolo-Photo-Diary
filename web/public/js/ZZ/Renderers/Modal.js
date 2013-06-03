ZZ.Renderers.Modal = CUORE.Class(CUORE.Renderer, {

  draw: function (component) {
    this.paint(component);
    this._postPaint();
  },

  paint: function(component) {
    ZZ.Renderers.Modal.parent.paint.call(this, component);
    this._addAttributesToContainer();
  },

  show: function() {
    $(this.getContainer()).modal('show');
  },

  hide: function() {
    $(this.getContainer()).modal('hide');
  },

  _addAttributesToContainer: function(){
    this.addClass(ZZ.MODAL_MODAL_CLASS);
    this.addClass(ZZ.MODAL_HIDE_CLASS);
    this.addClass(ZZ.MODAL_FADE_CLASS);

    var container = this.getContainer();
    container.setAttribute('aria-hidden', true);
    container.setAttribute('role', 'dialog');
    container.setAttribute('aria-labelledby', 'login');
  }


});