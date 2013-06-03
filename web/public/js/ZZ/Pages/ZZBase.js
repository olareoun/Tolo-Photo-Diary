ZZ.Pages.ZZBase = CUORE.Class(CUORE.Page, {


	initializeComponents: function() {
		this._addNavBar();
		this._loginModal();
		this.onEnvironmentUp();
	},

	initializeServices: function() {
		this.addService(new ZZ.Services.Users());
		this.addService(new ZZ.Services.Url());
	},

	onEnvironmentUp: function(){
		document.page = this;
		this._logoutWhenTokenExpired();
		CUORE.Bus.emit('LOGIN_logged_CHANGED');
		this._translateLiterals();
	},

	_logoutWhenTokenExpired: function(){
		if(!this.getToken()) return;

		var token_time = this.getToken().split('_')[1];
        var offset = 60 * 60 * 24;

        if(parseInt(token_time,10) + offset < this._secondsSinceEpoch())
			this.logout();
	},

	_secondsSinceEpoch: function(){
		return Math.floor((new Date()).getTime()/1000);
	},

	_loginModal: function() {
		this._addCard();
		var login = new ZZ.Components.Input('zizerones.login.login.label', 'zizerones.login.login.placeholder', 'username');
		this.addComponent(login, 'modal-login-field', CUORE.Behaviours.HIJACK);
		login.setName('username');
		var password = new ZZ.Components.Input('zizerones.login.password.label', 'zizerones.login.password.placeholder', 'password', 'password');
		this.addComponent(password, 'modal-password-field', CUORE.Behaviours.HIJACK);
		password.setName('password');
		var submit = this._createSubmitComponent();
		this.addComponent(submit, 'modal-button', CUORE.Behaviours.HIJACK);
		var feedback = new ZZ.Components.Feedback();
		feedback.addExecHandler('USERS_login_EXECUTED', 'addMessage');
		this.addComponent(feedback, 'modal-feedback', CUORE.Behaviours.HIJACK);
	},

	_addCard: function() {
		var card = new ZZ.Components.Card();
		card.setName('loginCard');
		card.sendTo('USERS', 'login');
		card.setMandatories(['username', 'password']);
		card.watchInputs(['username', 'password']);
		card.addExecHandler('BUTTON_submitButton_CLICKED', 'submitData');
		this.addComponent(card, 'modal-login', CUORE.Behaviours.APPEND);
	},

	_createSubmitComponent: function() {
		var submitButton = new ZZ.Components.ZButton('submitButton', 'zizerones.login.submit.label');
		submitButton.disable();
		submitButton.addExecHandler('CARD_loginCard_SATISFIED', 'enable');
		submitButton.addExecHandler('CARD_loginCard_UNSATISFIED', 'disable');
		return submitButton;
	},

	getLanguageLabel: function(langKey) {
		return ZZ.LANGUAGE_LABELS[langKey];
	},

	login: function(aToken, user) {
		localStorage.setItem('session_token', aToken);
		localStorage.setItem('session_user_id', user.id);
		localStorage.setItem('session_user_fullname', user.name);
		localStorage.setItem('session_user_email', user.email);
		localStorage.setItem('session_user_granted', user.granted);
	},

	logout: function() {
		localStorage.removeItem('session_token');
		localStorage.removeItem('session_user_id');
		localStorage.removeItem('session_user_fullname');
		localStorage.removeItem('session_user_email');
		localStorage.removeItem('session_user_granted');
	},

	isLogged: function() {
		return this.getToken();
	},

	isUserGranted: function(){
		return localStorage.getItem('session_user_granted') === 'true';
	},

	getToken: function() {
		return localStorage.getItem('session_token');
	},

	getUserId: function() {
		return localStorage.getItem('session_user_id');
	},

	getUserFullname: function() {
		return localStorage.getItem('session_user_fullname');
	},

	getUserEmail: function() {
		return localStorage.getItem('session_user_email');
	},

	_addNavBar: function() {
		var addGroup = new CUORE.Components.Link('addgroup.html', 'zizerones.addGroup.link');
		addGroup.addClass(ZZ.DISABLED_CLASS);
		addGroup.addHandler('LOGIN_logged_CHANGED', new ZZ.Handlers.AddGroup());
		this.addComponent(addGroup, 'addGroup', CUORE.Behaviours.HIJACK);

		var register = new ZZ.Components.RegisterMenuLink('registration.html', 'zizerones.registration.link', 'profile.html', 'zizerones.registration.logged.link');
		this.addComponent(register, 'register', CUORE.Behaviours.HIJACK);

		var login = new ZZ.Components.Login('zizerones.login', 'zizerones.logout');
		this.addComponent(login, 'login', CUORE.Behaviours.HIJACK);

		var modalLogin = new ZZ.Components.Modal();
		modalLogin.addExecHandler('BUTTON_login_CLICKED', 'show');
		this.addComponent(modalLogin, 'modal-login', CUORE.Behaviours.HIJACK);
	},

	//WARNING: NOT TESTED
	_translateLiterals: function(){
        var translator = document.createElement('span');
        translator.id='translator';
        document.getElementsByTagName('body')[0].appendChild(translator);

        var component = new CUORE.Component();
        this.addComponent(component, 'translator', CUORE.Behaviours.HIJACK);
        var componentsToI18N = $('[data-i18nkey]');

        componentsToI18N.each(function(){
            var key = $(this).data('i18nkey');
            var element = this;

            var handler = new CUORE.Handler();
            handler.handle = function(message){
              $(element)[0].innerHTML = message.answer.text;
            };

            component.addHandler('LABELS_getLabel_EXECUTED_' + key, handler);
            component.setI18NKey(key);
        });
    }

});

ZZ.Handlers.AddGroup = CUORE.Class(CUORE.Handler, {

	handle: function() {
		if(document.page.isLogged() && document.page.isUserGranted()){
			this.owner.removeClass(ZZ.DISABLED_CLASS);
		}else
			this.owner.addClass(ZZ.DISABLED_CLASS);
	}

});