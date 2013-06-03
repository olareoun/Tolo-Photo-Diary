ZZ.Pages.Registration = CUORE.Class(ZZ.Pages.ZZBase, {

    initializeComponents: function() {
        ZZ.Pages.Registration.parent.initializeComponents.call(this);
        this._addRegisterCard();
        this._addSubmitButton();
        this._addNameInput();
        this._addEmailInput();
        this._addPasswordInput();
        this._addFeedBack();
    },

    initializeServices: function() {
        ZZ.Pages.Zizerones.parent.initializeServices.call(this);
        this.addService(new ZZ.Services.Guides());
    },

    _addRegisterCard: function() {
        var card = new ZZ.Components.RegisterCard();
        card.setName('register');
        card.sendTo('GUIDES', 'add');
        card.setMandatories(['name', 'email', 'password']);
        card.watchInputs(['name', 'email', 'password']);
        card.addExecHandler('BUTTON_submit_CLICKED', 'submitData');
        this.addComponent(card, 'card', CUORE.Behaviours.APPEND);
    },

    _addSubmitButton: function() {
        var submit = new ZZ.Components.ZButton('submit', 'zizerones.registration.submit');
        submit.disable();
        submit.addExecHandler('CARD_register_SATISFIED', 'enable');
        submit.addExecHandler('CARD_register_UNSATISFIED', 'disable');
        this.addComponent(submit, 'submit', CUORE.Behaviours.HIJACK);
    },

    _addNameInput: function() {
        var name = new ZZ.Components.Input('zizerones.registration.name.label', 'zizerones.registration.name.placeholder');
        this.addComponent(name, 'name', CUORE.Behaviours.HIJACK);
    },

    _addEmailInput: function() {
        var email = new ZZ.Components.Input('zizerones.registration.email.label', 'zizerones.registration.email.placeholder');
        email.addDecoration(new ZZ.Decorations.EmailInput());
        this.addComponent(email, 'email', CUORE.Behaviours.HIJACK);
    },

    _addPasswordInput: function() {
        var password = new ZZ.Components.Password('zizerones.registration.password.label', '');
        this.addComponent(password, 'password', CUORE.Behaviours.HIJACK);
    },

    _addFeedBack: function() {
        var feedback = new ZZ.Components.NewGuideFeedback();
        feedback.addExecHandler('GUIDES_add_EXECUTED', 'addMessage');
        this.addComponent(feedback, 'feedback', CUORE.Behaviours.HIJACK);
    }

});