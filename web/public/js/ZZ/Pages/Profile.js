ZZ.Pages.Profile = CUORE.Class(ZZ.Pages.ZZBase, {

	initializeComponents: function() {
		ZZ.Pages.Profile.parent.initializeComponents.call(this);
		this._addForm();
		document.page = this;
		this._addGuideCard();
		this._addRiver();
	},

	initializeServices: function() {
		ZZ.Pages.Zizerones.parent.initializeServices.call(this);
		this.addService(new ZZ.Services.Guides());
		this.addService(new ZZ.Services.Groups());
	},

	_addRiver: function() {
		this.theRiver = new ZZ.Components.River();
		this.addComponent(this.theRiver, 'river', CUORE.Behaviours.HIJACK);
		this.theRiver.moreGroups({
			guide: {
				id: document.page.getUserId(),
				name: document.page.getUserFullname()
			}
		});
	},

	_addGuideCard: function() {
		var card = new ZZ.Components.GuideCard();
		this.addComponent(card, 'card', CUORE.Behaviours.APPEND);
	},

	_addForm: function() {
		this._addName();
		this._addEmail();
		this._addLicenseNumber();
		this._addResidence();
		this._addWorkArea();
		this._addExperience();
		this._addPhone();
		this._addLanguages();
		this._addImage();
		this._addIntroductions();
	},

	_addName: function() {
		var name = new ZZ.Components.Input('zizerones.guide.name.label', 'zizerones.guide.name.placeholder', 'name');
		name.refillOn('GUIDES', 'get');
		this.addComponent(name, 'name', CUORE.Behaviours.HIJACK);
	},

	_addEmail: function() {
		var email = new ZZ.Components.Input('zizerones.guide.email.label', 'zizerones.guide.email.placeholder', 'email');
		email.refillOn('GUIDES', 'get');
		email.disable();
		this.addComponent(email, 'email', CUORE.Behaviours.HIJACK);
	},

	_addLicenseNumber: function() {
		var licenseNumber = new ZZ.Components.Input('zizerones.guide.licenseNumber.label', 'zizerones.guide.licenseNumber.placeholder', 'license_number');
		licenseNumber.refillOn('GUIDES', 'get');
		this.addComponent(licenseNumber, 'license-number', CUORE.Behaviours.HIJACK);
	},

	_addResidence: function() {
		var residence = new ZZ.Components.Input('zizerones.guide.residence.label', 'zizerones.guide.residence.placeholder', 'residence');
		residence.refillOn('GUIDES', 'get');
		this.addComponent(residence, 'residence', CUORE.Behaviours.HIJACK);
	},

	_addWorkArea: function() {
		var workArea = new ZZ.Components.Input('zizerones.guide.workArea.label', 'zizerones.guide.workArea.placeholder', 'work_area');
		workArea.refillOn('GUIDES', 'get');
		this.addComponent(workArea, 'work-area', CUORE.Behaviours.HIJACK);
	},

	_addExperience: function() {
		var experience = new CUORE.Components.NumericSelector('zizerones.guide.experience.label');
		experience.refillOn = ZZ.Components.Input.prototype.refillOn;
		experience.paramName = 'experience';
		experience.setValue(0);
		experience.setIncrementer(1);
		experience.setLimInf(0);
		experience.setLimSup(100);
		experience.setFormName('years_experience');
		experience.setName('years_experience');
		experience.refillOn('GUIDES', 'get');
		this.addComponent(experience, 'experience', CUORE.Behaviours.HIJACK);
	},

	_addPhone: function() {
		var phone = new ZZ.Components.Input('zizerones.guide.phone.label', 'zizerones.guide.phone.placeholder', 'phone');

		phone.refillOn('GUIDES', 'get');
		phone.addDecoration(new ZZ.Decorations.Phone());
		this.addComponent(phone, 'phone', CUORE.Behaviours.HIJACK);
	},

	_addLanguages: function() {
		var languages = new ZZ.Components.Input('zizerones.guide.languages.label', 'zizerones.guide.languages.placeholder', 'languages');
		languages.addDecoration(new ZZ.Decorations.LanguagesChosen());
		languages.refillOn('GUIDES', 'get');
		this.addComponent(languages, 'languages', CUORE.Behaviours.HIJACK);
	},

	_addImage: function() {
		var param = 'imageprofile';
		var image = new ZZ.Components.Input('zizerones.guide.profile_image.label', "empty", param);
		image.addDecoration(new ZZ.Decorations.ImageUploader('user'));
		image.refillOn('GUIDES', 'get');
		this.addComponent(image, param, CUORE.Behaviours.HIJACK);
	},

	_addIntroductions: function() {
		var introduction = new ZZ.Components.EligibleTextarea('zizerones.guide.introduction.label', 'zizerones.guide.introduction.placeholder', 'introductions');
		introduction.refillOn('GUIDES', 'get');
		introduction.refillOn('GUIDES', 'update');

		var theHandler = new CUORE.Handler();
		theHandler.handle = function(language) {
			var defaultValues = _.map([language], function() {
				return "";
			});
			this.owner.setValue(_.object([language], defaultValues));
		};

		introduction.addHandler('COMPONENT_languages_CHANGED', theHandler);
		this.addComponent(introduction, 'introductions', CUORE.Behaviours.HIJACK);
	}

});