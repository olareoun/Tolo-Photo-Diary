describe("ZZ.Services.Guides", function() {

    var aService;

    beforeEach(function() {
        aService = new ZZ.Services.Guides();
        aService.request = jasmine.createSpy();
        this.addMatchers(CUORE.Matchers);
    });

    it("is a Authenticated Service", function() {
        expect(aService).toBeInstanceOf(ZZ.Services.Authenticated);
    });

    it('has an addguide method ', function() {
        var endpoint = "/guides/add";
        var values = {
            'tal': 'pascual'
        };
        aService.execute('add', values);

        expect(aService.request).toHaveBeenCalledWith(endpoint, {
            tal: 'pascual'
        }, 'GUIDES_add_EXECUTED');
    });

    it('has an update guide method ', function() {
        var endpoint = "/guides/update";
        var values = {
            'tal': 'pascual'
        };
        aService.execute('update', values);

        expect(aService.request).toHaveBeenCalledWith(endpoint, {
            tal: 'pascual'
        }, 'GUIDES_update_EXECUTED');
    });

    it('has a get guide method ', function() {
        var endpoint = "/guides/profile";
        var values = {
            'id': 'any'
        };
        aService.execute('get', values);

        expect(aService.request).toHaveBeenCalledWith(endpoint, {
            id: 'any'
        }, 'GUIDES_get_EXECUTED');
    });

});