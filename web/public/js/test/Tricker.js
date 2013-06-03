Tricker = {

	slowRiver: function() {
		var daPage = document.page;
		var daService = daPage.getService('GROUPS');
		daService.getList = function() {};
		daPage.theRiver.noMoreGroups = false;
		daPage.theRiver.moreGroups();
	},

	lotsOfGroups: function() {
		var daPage = document.page;
		daPage.theRiver.noMoreGroups = false;
		var daService = daPage.getService('GROUPS');

		daService.getList = function() {
			var simpleGroup = {
				'description': 'aDescription',
				'city': 'aCity',
				'date': 'aDate',
				'image': '/img/logo.png'
			};
			var jsonArrayOfGroups = [];
			for(var i = 1; i <= 20; i++) {
				jsonArrayOfGroups.push(simpleGroup);
			}
			var message = new CUORE.Message();
			var eventName = "GROUPS_getList_EXECUTED";
			message.answer= jsonArrayOfGroups;
			console.log(message);
			CUORE.Bus.emit(eventName, message);
		};

	},

	showGroupsInRiver: function(){
        Tricker.lotsOfGroups();
		var daPage = document.page;
		daPage.theRiver.noMoreGroups = false;
		var daService = daPage.getService('GROUPS');
		daService.getList();

	},

	getProfile: function() {
		var daService = document.page.getService('GUIDES');
		daService.get = function() {
			var profile = {
				'languages': ['spanish'],
				'introductions': {
					'spanish': "the best introduction"
				}
			};

			var message = new CUORE.Message();
			var eventName = "GUIDES_get_EXECUTED";
			message.answer=profile;
			console.log(message);
			CUORE.Bus.emit(eventName, message);
		};

		daService.get();
	},

	updateProfile: function() {
		var daService = document.page.getService('GUIDES');
		daService.update = function() {
			var profile = {
				'languages': ['spanish', 'english'],
				'introductions': {
					'spanish': "mi presentacion",
					'english': "my introduction"
				}
			};

			var message = new CUORE.Message();
			var eventName = "GUIDES_update_EXECUTED";
			message.answer= profile;
			console.log(message);
			CUORE.Bus.emit(eventName, message);
		};

		daService.update();
	},

	pendingGuides: function() {
		var daService = document.page.getService('USERS');
		daService.pending = function() {
			var guide = {
				'name': 'John Smith'
			};
			var guides = [guide, guide, guide, guide, guide];
			var message = new CUORE.Message();
			var eventName = "USERS_pending_EXECUTED";
			message.answer= guides;
			console.log(message);
			CUORE.Bus.emit(eventName, message);
		};

		daService.pending();
	},

	userNotFound: function() {
		var daService = document.page.getService('USERS');
		daService.login = function() {
			var message = new CUORE.Message();
			var eventName = "USERS_login_EXECUTED";
			message.putOnAnswer('error', 'User not found');
			console.log(message);
			CUORE.Bus.emit(eventName, message);
		};

	},

	userFound: function() {
		var daService = document.page.getService('USERS');
		daService.login = function() {
			var message = new CUORE.Message();
			var eventName = "USERS_login_EXECUTED";
			message.putOnAnswer('token', 'aToken');
			var user = { 'name': 'aUsername', 'granted': true}
			message.putOnAnswer('user', user);
			console.log('USER LOGGED', message);
			CUORE.Bus.emit(eventName, message);
		};

	},

	logInUser: function() {
		document.page.login('aToken', {name: 'anUser', granted: true});
		CUORE.Bus.emit('LOGIN_logged_CHANGED', null);
	},

	logInNotGrantedUser: function() {
		document.page.login('aToken', {name: 'anUser', granted: false});
		CUORE.Bus.emit('LOGIN_logged_CHANGED', null);
	},

	logoutUser: function() {
		document.page.logout();
		CUORE.Bus.emit('LOGIN_logged_CHANGED', null);
	},

	loadEmblems: function() {
		var daService = document.page.getService('CATALOGS');
		daService.getEmblems = function() {
			var message = new CUORE.Message();
			var eventName = "CATALOGS_getEmblems_EXECUTED";
			message.answer =['anEmblem','anotherEmblem'];
			console.log(message);
			CUORE.Bus.emit(eventName, message);
		};
	}

};