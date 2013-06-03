ZZ.Pages.Group = CUORE.Class(ZZ.Pages.ZZBase, {


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
    
    this._addSeparationDays();
  },


  _addGroupCard: function() {
    var card = new ZZ.Components.GroupCard();
    this.addComponent(card, 'card', CUORE.Behaviours.APPEND);
  },

  _addImageInput: function() {
    var image = new ZZ.Components.Input('zizerones.addGroup.image.label', "empty",'image');
    image.addDecoration(new ZZ.Decorations.ImageUploader('group'));
    this.addComponent(image, 'image', CUORE.Behaviours.HIJACK);
  },

  _addDescription: function() {
    var description = new ZZ.Components.TextArea('zizerones.addGroup.description.label', 'zizerones.addGroup.description.placeholder','description');
    this.addComponent(description,'description',CUORE.Behaviours.HIJACK);
  },

  _addDate: function() {
    var date = new ZZ.Components.Date('zizerones.addGroup.date.label', 'zizerones.addGroup.date.placeholder','date');
    date.addDecoration(new ZZ.Decorations.DatePicker());
    this.addComponent(date,'date',CUORE.Behaviours.HIJACK);
  },

  _addTime: function() {
    var time = new ZZ.Components.Input('zizerones.addGroup.time.label', 'zizerones.addGroup.time.placeholder','time');
    time.addDecoration(new ZZ.Decorations.Time());
    this.addComponent(time, 'time',CUORE.Behaviours.HIJACK);
  },

  _addCity: function() {
    var city = new ZZ.Components.Input('zizerones.addGroup.city.label', 'zizerones.addGroup.city.placeholder','city');
    city.addDecoration(new ZZ.Decorations.AutoSuggest());
    this.addComponent(city, 'city',CUORE.Behaviours.HIJACK);
  },

  _addName: function() {
    var name = new ZZ.Components.Input('zizerones.addGroup.name.label', 'zizerones.addGroup.name.placeholder','name');
    this.addComponent(name, 'name',CUORE.Behaviours.HIJACK);
  },

  _addPrice: function() {
    var price = new ZZ.Components.Input('zizerones.addGroup.price.label', 'zizerones.addGroup.price.placeholder','price');
    price.addDecoration(new ZZ.Decorations.Money());
    this.addComponent(price, 'price',CUORE.Behaviours.HIJACK);
  },

  _addDuration: function() {
    var duration = new CUORE.Components.NumericSelector('zizerones.addGroup.duration.label','duration');
    duration.setValue(10);
    duration.setIncrementer(10);
    duration.setLimInf(10);
    duration.setLimSup(300);
    this.addComponent(duration, 'duration',CUORE.Behaviours.HIJACK);
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
    selector.setValue(0);
    selector.setIncrementer(1);
    selector.setLimInf(0);
    selector.setLimSup(100);
    selector.setFormName(name);
    selector.setName(name);
    return selector;
  },

  _addSeparationDays: function() {
    var separationDays = new ZZ.Components.CheckedNumeric('zizerones.addGroup.separationDays.label', 'zizerones.addGroup.repetition.label', 'separation-days');
    this.addComponent(separationDays, 'separation-days',CUORE.Behaviours.HIJACK);
  },

  _addEmblemsList: function() {
    var emblemList = new ZZ.Components.Emblems('emblems');
    this.addComponent(emblemList, 'emblems-filter',CUORE.Behaviours.HIJACK);
  },

  _addSubmit: function() {
    var submit = new ZZ.Components.ZButton('submit', 'zizerones.addGroup.submit');
    submit.disable();
    submit.addExecHandler('CARD_groupCard_SATISFIED', 'enable');
    submit.addExecHandler('CARD_groupCard_UNSATISFIED', 'disable');
    this.addComponent(submit, 'submit', CUORE.Behaviours.HIJACK);
  },

  _addFeedBack: function() {
    var feedback = new ZZ.Components.NewGroupFeedback();
    feedback.addExecHandler('GROUPS_add_EXECUTED', 'addMessage');
    feedback.addExecHandler('GROUPS_update_EXECUTED', 'addMessage');
    this.addComponent(feedback, 'feedback', CUORE.Behaviours.HIJACK);
  },

  _addLanguageSelection: function() {
    var language = new ZZ.Components.Input('zizerones.addGroup.language.label', 'zizerones.addGroup.language.placeholder', 'language');
    language.addDecoration(new ZZ.Decorations.LanguagesChosen('single','COMPONENT_language_CHANGED'));
    this.addComponent(language, 'languages',CUORE.Behaviours.HIJACK);
  },


  _askForGroup: function() {
      var group = this._groupIdFromUrl();
      if(group) {
          this._executeService('GROUPS','get', group);
      }
  },

  _groupIdFromUrl: function() {
      var parser = document.createElement('a');
      parser.href = this._getLocation();
      var paramRegExp = new RegExp("group=([^&]*)");

      var paramFound = parser.search.match(paramRegExp);
      if (paramFound){
        return paramFound[1];
      }
  },

  _executeService: function(name, operation, params){
      this.services.execute(name,operation, params);
  },

  _getLocation: function() {
      return document.location.href;
  },

  _isEdition: function(){
    return this._groupIdFromUrl();
  }


});

ZZ.Handlers.Refill = CUORE.Class(CUORE.Handler, {
  handle: function(message) {
    var key = this.owner.getName();
    var value = message.getFromAnswer(key);
    if(value) {
      this.owner.setValue(value);
    }else{
      this.owner.setValue('');
    }
  }
});

ZZ.Handlers.GroupData = CUORE.Class(CUORE.Handler, {
  handle: function(message) {
    var data = {
      identity: message.getFromAnswer('identity'),
      admin: message.getFromAnswer('admin'),
      guide: message.getFromAnswer('guide')
    };
    this.owner.setValue(data);
  }
});
