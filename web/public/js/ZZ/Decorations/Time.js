ZZ.Decorations.Time = CUORE.Class(CUORE.Decoration, {
    postPaint: function(panel) {
        var input = panel.getElementsByTagName('input')[0];

        var inputmask = new Mask("##:##");
        inputmask.attach(input);
    },

    postUpdate: function(updatedata, panel) {

    }
});