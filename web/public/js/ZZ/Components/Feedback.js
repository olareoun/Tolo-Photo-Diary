ZZ.Components.Feedback = CUORE.Class(CUORE.Components.LabelPanel, {

  init: function(key) {
    ZZ.Components.Feedback.parent.init.call(this, key);
    this.renderer = new ZZ.Renderers.Feedback();
    this.addClass(ZZ.ALERT_CLASS);
    this.disable();
  },

  addMessage: function(message) {
    if(message.getFromAnswer('error')) {
      this._addError(message);
    } else {
      this._addSuccess(message);
    }
  },

  dismiss: function(key) {
    this.removeClass(ZZ.SUCCESS_CLASS);
    this.disable();
  },

  _addSuccess: function(message, successMessageKey) {
    successMessageKey = successMessageKey || 'Done';
    this.addClass(ZZ.SUCCESS_CLASS);
    this._enable(successMessageKey);
  },

  _addError: function(message) {
    var error = message.getFromAnswer('error');
    this.addClass(ZZ.ERROR_CLASS);
    this._enable(error);
  },

  _enable: function(key) {
    this.labelKey = key;
    this.setI18NKey(this.labelKey);
    this.enable();
  }
});

ZZ.Components.NewGuideFeedback = CUORE.Class(ZZ.Components.Feedback, {
  _addSuccess: function(message) {
    ZZ.Components.NewGuideFeedback.parent._addSuccess.call(this, message, 'zizerones.registration.success');
  }
});

ZZ.Components.NewGroupFeedback = CUORE.Class(ZZ.Components.Feedback, {
  _addSuccess: function(message) {
    ZZ.Components.NewGuideFeedback.parent._addSuccess.call(this, message, ZZ.SUCCESS_KEY);
  }
});