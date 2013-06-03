ZZ.Components.EligibleTextarea = CUORE.Class(ZZ.Components.Input, {

    init: function(labelKey, placeholderKey, paramName) {
        ZZ.Components.EligibleTextarea.parent.init.call(this, labelKey, placeholderKey, paramName);
        this.renderer = new ZZ.Renderers.EligibleTextarea();
    },

    getOptions: function() {
        var options = _.map(this.value, function(value, key) {
            return key;
        });
        return options;
    },

    setValue: function(value) {
        if(value==='')return;
        _.each(value, function(value, key) {
            this.setI18NKey('zizerones.language.' + key);
        }, this);

        ZZ.Components.EligibleTextarea.parent.setValue.call(this, value);
    },

    getTextForOption: function(optionKey) {
        return this.value[optionKey];
    },

    updateOption: function(option, value) {
        this.value[option] = value;
        this.setValue(this.value);
    }
});