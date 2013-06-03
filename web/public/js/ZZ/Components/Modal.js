ZZ.Components.Modal = CUORE.Class(CUORE.Component, {

    init: function() {
        ZZ.Components.Modal.parent.init.call(this);
        this.setRenderer(new ZZ.Renderers.Modal());
        this.addHandler('USERS_login_EXECUTED', new ZZ.Handlers.ModalLogin());
    },

    show: function() {
        this.renderer.show();
    },

    hide: function() {
        this.renderer.hide();
    }

});

ZZ.Handlers.ModalLogin = CUORE.Class(CUORE.Handler, {

    handle: function(aMessage) {
        var token = aMessage.getFromAnswer('token');
        if(!token) return;
        this.owner.hide();
    }

});