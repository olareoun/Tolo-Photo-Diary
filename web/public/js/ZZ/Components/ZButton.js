ZZ.Components.ZButton = CUORE.Class(CUORE.Components.Button, {

    init: function(buttonName, key) {
        ZZ.Components.ZButton.parent.init.call(this, buttonName, key);
        this.renderer = new ZZ.Renderers.Button();
    }

});