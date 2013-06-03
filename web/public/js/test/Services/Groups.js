describe("ZZ.Services.Groups", function() {

	var aService;
	var aBaseURL = "http://www.zizerones.com";

	beforeEach(function() {
		TestHelper.useFakeXMLHttpRequest();
		aService = new ZZ.Services.Groups();
		aService.setBaseURL(aBaseURL);
		this.addMatchers(CUORE.Matchers);
	});

	afterEach(function() {
		TestHelper.restoreFakeXMLHttpRequest();
	});

	it("is an Authenticated Service", function() {
		expect(aService).toBeInstanceOf(ZZ.Services.Authenticated);
	});

	it('has an addgroup method', function() {
		document.page = {};
		document.page.getUserFullname = jasmine.createSpy('getUserFullname').andReturn('aUserName');
		document.page.getUserId = jasmine.createSpy('getUserId').andReturn('aUserId');
		aService.request = jasmine.createSpy();
		var endpoint = aBaseURL + "/groups/add";
		var values = {
			tal: 'pascual'
		};
		aService.execute('add', values);

		expect(aService.request).toHaveBeenCalledWith(endpoint, {
			tal: 'pascual',
			admin : { name : 'aUserName', id : 'aUserId' }
		}, 'GROUPS_add_EXECUTED');
	});

	it('has a list method that manages some params', function() {
		aService.request = jasmine.createSpy();
		var endpoint = aBaseURL + "/groups/list";
		var values = {
			'date': 'aDate'
		};
		aService.execute('getList', values);

		expect(aService.request).toHaveBeenCalledWith(endpoint, {
			tentative_date: 'aDate'
		}, 'GROUPS_getList_EXECUTED');
	});
    
    it('redirects to a group', function(){
		aService._setLocation = jasmine.createSpy();

        aService.redirect({'id':'anId','admin':false},'anyEvent');
        expect(aService._setLocation).toHaveBeenCalledWith('/groupprofile.html?group=anId');
		
        aService.redirect({'id':'anId','admin':true},'anyEvent');
        expect(aService._setLocation).toHaveBeenCalledWith('/addgroup.html?group=anId');
    });

	it('gets a group data', function() {
		aService.request = jasmine.createSpy();
		var endpoint = aBaseURL + "/groups/get";
		aService.execute('get', 'anId');

		expect(aService.request).toHaveBeenCalledWith(endpoint, {
			identity: 'anId'
		}, 'GROUPS_get_EXECUTED');
	});

	it('has an updategroup method', function() {
		aService.request = jasmine.createSpy();
		var endpoint = aBaseURL + "/groups/update";
		var values = {
			tal: 'pascual'
		};
		aService.execute('update', values);

		expect(aService.request).toHaveBeenCalledWith(endpoint, {
			tal: 'pascual'
		}, 'GROUPS_update_EXECUTED');
	});

});