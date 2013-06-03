describe("Pending", function() {

	var aComponent;

	beforeEach(function() {
		aComponent = new ZZ.Components.Pending();
		aComponent.services = {};
		aComponent.services.execute = jasmine.createSpy();
		this.addMatchers(CUORE.Matchers);
	});

	it("inherits List", function() {
		expect(aComponent).toBeInstanceOf(CUORE.Components.List);
	});

	it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.Pending);
    });

	it("calls for the guide list", function() {
		aComponent.onEnvironmentUp();
		expect(aComponent.services.execute).toHaveBeenCalledWith('USERS', 'pending', null);
	});

	it("calls for the guide profile", function() {
		aComponent.execute = jasmine.createSpy();
		aComponent.profile('1234');
		expect(aComponent.execute).toHaveBeenCalledWith('GUIDES', 'get', {username: '1234'});
	});

	it("manages the retrieved list", function() {
		var jsonArrayOfGroups = [{
			'name': 'John Doe',
			'identity': '126'
		}, {
			'name': 'Bill Pullman',
			'identity': '125'
		}, {
			'name': 'Jaime Wall',
			'identity': '1234'
		}];

		var aMessage = new CUORE.Message();

		aComponent.fillList = jasmine.createSpy();
		aComponent.onEnvironmentUp();

		aMessage.answer=jsonArrayOfGroups;
		aComponent.eventDispatch('USERS_pending_EXECUTED', aMessage);

		expect(aComponent.fillList).toHaveBeenCalledWith(jsonArrayOfGroups);
	});

	it("manages the retrieved list when a guide is accepted", function() {
		var aMessage = new CUORE.Message();

		aComponent.fillList = jasmine.createSpy();
		aComponent.onEnvironmentUp();

		aComponent.eventDispatch('USERS_grantAccess_EXECUTED', aMessage);
		expect(aComponent.services.execute).toHaveBeenCalledWith('USERS', 'pending', null);
	});

	it("manages the retrieved list when a guide is rejected", function() {
		var aMessage = new CUORE.Message();

		aComponent.fillList = jasmine.createSpy();
		aComponent.onEnvironmentUp();

		aComponent.eventDispatch('USERS_rejectAccess_EXECUTED', aMessage);
		expect(aComponent.services.execute).toHaveBeenCalledWith('USERS', 'pending', null);
	});

	it('retrieves labels for buttons', function(){
		aComponent.setI18NKey = jasmine.createSpy('setI18NKey')

		aComponent.onEnvironmentUp();

		expect(aComponent.setI18NKey).toHaveBeenCalledWith('zizerones.admin.acceptguide');
		expect(aComponent.setI18NKey).toHaveBeenCalledWith('zizerones.admin.rejectguide');
		expect(aComponent.setI18NKey).toHaveBeenCalledWith('zizerones.admin.sendmessage');
	});

	it('accepts the guide', function(){
		aComponent.execute = jasmine.createSpy();

		aComponent.grant(aComponent.ACTION_ACCEPT, '12345', 'a message');

		expect(aComponent.execute).toHaveBeenCalledWith('USERS', 'grantAccess', {username: '12345', message: 'a message'});
	});

	it('rejects the guide', function(){
		aComponent.execute = jasmine.createSpy();

		aComponent.grant(aComponent.ACTION_REJECT, '12345', 'a message');

		expect(aComponent.execute).toHaveBeenCalledWith('USERS', 'rejectAccess', {username: '12345', message: 'a message'});
	});

});