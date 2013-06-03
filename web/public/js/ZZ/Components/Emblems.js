ZZ.Components.Emblems = CUORE.Class(CUORE.Components.List, {

	init: function(name) {
		ZZ.Components.Emblems.parent.init.call(this);
		this.selectedEmblems = [];
		this.name = name;
		this.renderer = new ZZ.Renderers.Emblems('COMPONENT_'+this.name+'_CHANGED');

	},
	onEnvironmentUp: function() {
		this.addHandler('CATALOGS_getEmblems_EXECUTED', new ZZ.Handlers.Emblems());

		this.services.execute('CATALOGS', 'getEmblems', {});

	},

    setValue: function (value) {
        this.selectedEmblems = value;
        this.notifyChanges();
    },

    notifyChanges: function(){
		CUORE.Bus.emit('COMPONENT_' + this.name + '_CHANGED', this.selectedEmblems);
    }

});

ZZ.Handlers.Emblems = CUORE.Class(CUORE.Handler, {
	handle: function(message) {
		this.getOwner().fillList(message.getAnswer());
	}
});