ZZ.Components.SubmitButton = CUORE.Class(CUORE.Components.Button, {

    init: function(buttonName, key) {
        ZZ.Components.SubmitButton.parent.init.call(this, buttonName, key);
        this.renderer = new ZZ.Renderers.Button();
        this.currentValues = {};
        this.mandatoryValues = [];
        this.addExecHandler('BUTTON_' + buttonName + '_CLICKED', 'submitData');
    },

    setValue: function(objectParam) {
        this.currentValues = _.extend(this.currentValues,objectParam);
        this._enableIfReadyForSubmission();
    },

    getValue: function(key) {
        return this.currentValues[key];
    },

    sendTo: function(serviceName, serviceMethod) {
        this.serviceName = serviceName;
        this.serviceMethod = serviceMethod;
    },

    submitData: function() {
        this.services.execute(this.serviceName, this.serviceMethod, this.currentValues);
    },

    setMandatories: function(mandatories) {
        this.mandatoryValues = mandatories;
    },

    _enableIfReadyForSubmission: function() {
        this.disable();
        if(this._areMandatoriesFilled()) {
            this.enable();
        }
    },

    _areMandatoriesFilled: function() {
        if(this.mandatoryValues.length === 0) return true;

        var self = this;
        var mandatoriesAreFilled = _.filter(this.mandatoryValues, function(key) {
            return !self.currentValues[key];

        });

        return mandatoriesAreFilled.length === 0;
    }
});
