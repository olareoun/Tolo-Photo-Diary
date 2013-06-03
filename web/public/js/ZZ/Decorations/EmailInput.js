ZZ.Decorations.EmailInput = CUORE.Class(CUORE.Decoration, {

    postPaint: function(panel) {
        var input = panel.getElementsByTagName('input')[0];

        var callback = function() {
                var event = 'COMPONENT_' + $(input).attr('name') + '_CHANGED';
                var value = input.value;

                var email_regex = /^[a-zA-Z0-9._\-]+@([a-zA-Z0-9.\-]+\.)+[a-zA-Z0-9.\-]{2,4}$/;

                input.parentNode.className = "";

                if(!value.match(email_regex)) {
                    input.parentNode.className = "control-group error";
                    value = "";
                }

                CUORE.Bus.emit(event, value);
            };

        input.type = 'email';
        input.required = 'true';
        CUORE.Dom.Event.remove(input, 'blur');
        CUORE.Dom.Event.add(input, 'blur', callback);
    },

    postUpdate: function() {}
});