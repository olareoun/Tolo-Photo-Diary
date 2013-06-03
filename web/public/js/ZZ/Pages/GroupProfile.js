ZZ.Pages.GroupProfile = CUORE.Class(ZZ.Pages.ZZBase, {

    setUp: function() {
        ZZ.Pages.Group.parent.setUp.call(this);
    },

    initializeServices: function() {
        ZZ.Pages.Zizerones.parent.initializeServices.call(this);
        this.addService(new ZZ.Services.Groups());
        this.addService(new ZZ.Services.Catalogs());
    },

    initializeComponents: function() {
        ZZ.Pages.Group.parent.initializeComponents.call(this);

        this._addDescription();
        this._addDate();
        this._addTime();
        this._addCity();
        this._addName();
        this._addSubmit();
        this._addFeedBack();
        this._addDuration();
        this._addQuorum();
        this._addPrice();
        this._addLanguageSelection();
        this._addEmblemsList();
        this._addImageInput();
        this._addGroupCard();
    },


    _addGroupCard: function() {
        var card = new ZZ.Components.GroupCard();
        this.addComponent(card, 'card', CUORE.Behaviours.APPEND);
    },



    _addDescription: function() {
        var description = new ZZ.Components.TextArea('zizerones.addGroup.description.label', 'zizerones.addGroup.description.placeholder', 'description');
        description.refillOn('GROUPS','get');
        this.addComponent(description, 'description', CUORE.Behaviours.HIJACK);
    },

    _addDate: function() {
        var date = new ZZ.Components.Date('zizerones.addGroup.date.label', 'zizerones.addGroup.date.placeholder', 'date');
        date.addDecoration(new ZZ.Decorations.DatePicker());
        date.refillOn('GROUPS','get');
        this.addComponent(date, 'date', CUORE.Behaviours.HIJACK);
    },

    _addTime: function() {
        var time = new ZZ.Components.Input('zizerones.addGroup.time.label', 'zizerones.addGroup.time.placeholder', 'time');
        time.addDecoration(new ZZ.Decorations.Time());
        time.refillOn('GROUPS','get');
        this.addComponent(time, 'time', CUORE.Behaviours.HIJACK);
    },

    _addCity: function() {
        var city = new ZZ.Components.Input('zizerones.addGroup.city.label', 'zizerones.addGroup.city.placeholder', 'city');
        city.addDecoration(new ZZ.Decorations.AutoSuggest());
        city.refillOn('GROUPS','get');
        this.addComponent(city, 'city', CUORE.Behaviours.HIJACK);
    },

    _addName: function() {
        var name = new ZZ.Components.Input('zizerones.addGroup.name.label', 'zizerones.addGroup.name.placeholder', 'name');
        name.refillOn('GROUPS','get');
        this.addComponent(name, 'name', CUORE.Behaviours.HIJACK);
    },

    _addPrice: function() {
        var price = new ZZ.Components.Input('zizerones.addGroup.price.label', 'zizerones.addGroup.price.placeholder', 'price');
        price.addDecoration(new ZZ.Decorations.Money());
        price.refillOn('GROUPS','get');
        this.addComponent(price, 'price', CUORE.Behaviours.HIJACK);
    },



    _addQuorum: function() {
        var minimum = this._standarSelector('minimum');
        this.addComponent(minimum, 'minimum-quorum', CUORE.Behaviours.APPEND);
       


        var maximum = this._standarSelector('maximum');
        this.addComponent(maximum, 'maximum-quorum', CUORE.Behaviours.APPEND);
        
        maximum.addExecHandler('COMPONENT_minimum_CHANGED', 'setLimInf');
    },


    _standarSelector: function(name) {
        var selector = new CUORE.Components.NumericSelector('zizerones.addGroup.' + name + '.label');
        selector.refillOn = ZZ.Components.Input.prototype.refillOn;
        selector.setValue(0);
        selector.setIncrementer(1);
        selector.setLimInf(0);
        selector.setLimSup(100);
        selector.setFormName(name);
        selector.setName(name);
        selector.refillOn('GROUPS','get');
        return selector;
    },

   

    _addEmblemsList: function() {
        var emblemList = new ZZ.Components.Emblems('emblems');
        emblemList.refillOn = ZZ.Components.Input.prototype.refillOn;
        emblemList.refillOn('GROUPS','get');
        this.addComponent(emblemList, 'emblems-filter', CUORE.Behaviours.HIJACK);
    },

    _addImageInput: function() {
        var image = new ZZ.Components.Input('zizerones.addGroup.image.label', "empty");
        image.setRenderer(new ZZ.Renderers.Image());
        image.refillOn('GROUPS','get');
        this.addComponent(image, 'image', CUORE.Behaviours.HIJACK);
    },

    _addDuration: function() {
        var duration = new ZZ.Components.DurationLabel('zizerones.groupProfile.duration');
        duration.refillOn = ZZ.Components.Input.prototype.refillOn;
        duration.refillOn('GROUPS','get');
        this.addComponent(duration, 'duration', CUORE.Behaviours.HIJACK);
    },

    _addSubmit: function() {},
    _addFeedBack: function() {},



    _addLanguageSelection: function() {
        var language = new ZZ.Components.Input('zizerones.addGroup.language.label', 'zizerones.addGroup.language.placeholder', 'language');
        language.addDecoration(new ZZ.Decorations.LanguagesChosen('single', 'COMPONENT_language_CHANGED'));
        language.refillOn('GROUPS','get');
        this.addComponent(language, 'languages', CUORE.Behaviours.HIJACK);
    },

});