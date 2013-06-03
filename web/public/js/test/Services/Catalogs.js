describe("ZZ.Services.Catalogs", function() {

	var aService;
	var aBaseURL = "http://www.zizerones.com";

	beforeEach(function() {
		aService = new ZZ.Services.Catalogs();
		aService.setBaseURL(aBaseURL);
		aService.request = jasmine.createSpy();
		this.addMatchers(CUORE.Matchers);
	});


	it("is an Authenticated Service", function() {
		expect(aService).toBeInstanceOf(ZZ.Services.Authenticated);
	});

	it('has an method in order to retrieve emblems list', function() {
		var endpoint = aBaseURL + "/catalog/emblems";
		var values = {};
		
		aService.execute('getEmblems',values);

		expect(aService.request).toHaveBeenCalledWith(endpoint, {}, 'CATALOGS_getEmblems_EXECUTED');
	});
    
    

});