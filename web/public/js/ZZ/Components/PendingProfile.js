ZZ.Components.PendingProfile = CUORE.Class(CUORE.Component, {

    init: function() {
        ZZ.Components.PendingProfile.parent.init.call(this);
        this.setI18NKey(ZZ.NO_SELECTED_KEY);
        this.renderer = new ZZ.Renderers.PendingProfile();
        this.profile = null;

        this.addHandler('GUIDES_get_EXECUTED', new ZZ.Handlers.PendingProfile());
    },

    getProfile: function() {
        return this.profile;
    }

});

ZZ.Handlers.PendingProfile = CUORE.Class(CUORE.Handler, {

    handle: function(message) {
        this.owner.profile = _.clone(message.getAnswer());
        this.owner.updateRender();
    }
});