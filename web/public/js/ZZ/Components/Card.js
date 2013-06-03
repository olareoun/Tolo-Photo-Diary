ZZ.Components.Card = CUORE.Class(CUORE.Component, {

    init: function() {
        ZZ.Components.Card.parent.init.call(this);
        this.currentValues = {};
        this.mandatoryValues = [];
        this.autoSubmit = false;
    },

    sendTo: function(serviceName, serviceMethod) {
        this.serviceName = serviceName;
        this.serviceMethod = serviceMethod;
    },

    setValue: function(name, value) {
        if(this.currentValues[name] === value) {
            return;
        }
        this.currentValues[name] = value;
        this._checkMandatories();
        if(this.autoSubmit) {
            this.submitData();
        }
    },

    setValues: function(valueMap) {
        _.each(valueMap, function(value, key) {
            this.setValue(key, value);
        }, this);
    },

    setMandatories: function(mandatories) {
        this.mandatoryValues = mandatories;
    },

    submitData: function() {
        if(!this._areMandatoriesSatisfied()) {
            return;
        }
        this.services.execute(this.serviceName, this.serviceMethod, this.currentValues);
    },

    beginToAutoSubmit: function() {
        this.autoSubmit = true;
    },

    _checkMandatories: function() {
        if(this.mandatoryValues.length === 0) {
            return;
        }
        var state = 'UNSATISFIED';

        if(this._areMandatoriesSatisfied()) {
            state = 'SATISFIED';
        }
        CUORE.Bus.emit('CARD_' + this.getName() + '_' + state, undefined);
    },

    _areMandatoriesSatisfied: function() {
        var mandatoriesAreFilled = _.filter(this.mandatoryValues, function(key) {
            return !_.has(this.currentValues, key);
        }, this);
        return(mandatoriesAreFilled.length === 0);
    },

    watchInput: function(inputName) {
        var eventName = 'COMPONENT_' + inputName + '_CHANGED';
        var theHandler = new CUORE.Handler();
        theHandler.handle = function(inputValue) {
            this.owner.setValue(inputName, inputValue);
        };
        this.addHandler(eventName, theHandler);
    },

    watchInputs: function(inputs) {
        _.each(inputs, function(inputName) {
            this.watchInput(inputName);
        }, this);
    }

});