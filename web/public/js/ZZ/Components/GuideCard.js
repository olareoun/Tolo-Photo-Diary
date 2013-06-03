ZZ.Components.GuideCard = CUORE.Class(ZZ.Components.Card, {

    init: function() {
        this.loaded = false;
        ZZ.Components.GuideCard.parent.init.call(this);
        this.setName('guideCard');
        this.currentValues.identity = ZZ.Helpers.Session.getAuthData().userid;
        this.currentValues.email = ZZ.Helpers.Session.getAuthData().userEmail;

        this.inputNames = [  'name',
                            'license-number',
                            'residence',
                            'work-area',
                            'experience',
                            'phone',
                            'languages',
                            'introductions',
                            'imageprofile'];

        this.sendTo('GUIDES','update');
        this.watchInputs(this.inputNames);
        this.beginToAutoSubmit();

        this.addHandler('GUIDES_get_EXECUTED', new ZZ.Handlers.GuideCard());
    },

    onEnvironmentUp: function() {
        this.getData();
    },

    setValue: function(name, value) {
        if(_.isObject(value) && _.isEqual(this.currentValues[name], value)) return;
        if(!_.isObject(value) && this.currentValues[name] === value) return;

        this._setCurrentValue(name, value);

        this._checkMandatories();
        if(this.autoSubmit && this.loaded) {
            this.submitData();
        }
    },
    getData: function() {
        var username = ZZ.Helpers.Session.getAuthData().userEmail;
        this.services.execute('GUIDES', 'get', {
            'username': username
        });
    },

    _setCurrentValue: function(name, value){
        if(_.isObject(value)) this.currentValues[name] = _.clone(value);
        else this.currentValues[name] = value;
    }
});

ZZ.Handlers.GuideCard = CUORE.Class(CUORE.Handler, {
    handle: function(message){
      _.each(this.owner.inputNames, function(input) {
            var messageField = input.replace('-', '_');
            if(message.answer[messageField]){
                this._setCurrentValue(input, message.answer[messageField]);
            }
        }, this.owner);
        this.owner.loaded = true;
    }
});