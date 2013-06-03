ZZ.Decorations.Money = CUORE.Class(CUORE.Decoration, {
	postPaint: function(panel) {
		var input = panel.getElementsByTagName('input')[0];

		var inputmask = new Mask("###.00", "number");
		inputmask.attach(input);
	},

	postUpdate: function(updatedata, panel) {

	}
});