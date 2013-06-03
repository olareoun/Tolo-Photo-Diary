ZZ.Renderers.Login = CUORE.Class(CUORE.Renderers.Link, {

  paint: function(component) {
    ZZ.Renderers.Login.parent.paint.call(this, component);
  },

  updateWhenDrawn: function(component) {
    ZZ.Renderers.Login.parent.updateWhenDrawn.call(this, component);
    CUORE.Dom.Event.remove(this.anchor, 'click');

    if(component.logged()){
      CUORE.Dom.removeClass(this.anchor, 'login');
      CUORE.Dom.addClass(this.anchor, 'logout');
    }
    else{
      CUORE.Dom.removeClass(this.anchor, 'logout');
      CUORE.Dom.addClass(this.anchor, 'login');
    }

    CUORE.Dom.Event.add(this.anchor, 'click', function() {
      if(component.logged()) {
        component.execute("USERS", "logout", undefined, true);
      } else {
        CUORE.Bus.emit('BUTTON_login_CLICKED', undefined);
      }
    });
  }

});