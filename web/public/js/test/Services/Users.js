describe("ZZ.Services.Users", function() {

    var aService;

    beforeEach(function() {
        aService = new ZZ.Services.Users();
        aService.request = jasmine.createSpy();
        this.addMatchers(CUORE.Matchers);
    });

    it("is a Authenticated Service", function() {
        expect(aService).toBeInstanceOf(ZZ.Services.Authenticated);
    });

    it('has a login method ', function() {
        var endpoint = "/auth/login";
        var values = {
            'email': 'pascual@hola.com',
            'password':'a_password'
        };
        aService.execute('login', values);

        expect(aService.request).toHaveBeenCalledWith(endpoint, {
            email: 'pascual@hola.com',
            password: 'a_password'
        }, 'USERS_login_EXECUTED');
    });

    it("has a logout method", function(){
        spyOn(CUORE.Bus, 'emit');
        document.page = {};
        document.page.logout = jasmine.createSpy();
        aService.execute('logout', {});
        expect(document.page.logout).toHaveBeenCalled();
        expect(CUORE.Bus.emit).toHaveBeenCalledWith("USERS_logout_EXECUTED", undefined);
    });

    it('has a grantAccess guide method', function() {
        var endpoint = "/auth/admin/grant";
        var values = {
            username: '12345',
            message: 'a text message'
        };
        aService.execute('grantAccess', values);

        expect(aService.request).toHaveBeenCalledWith(endpoint, {
            username: '12345',
            message: 'a text message',
            grant: true
        }, 'USERS_grantAccess_EXECUTED');
    });

    it('has a rejectAccess guide method', function() {
        var endpoint = "/auth/admin/grant";
        var values = {
            username: '12345',
            message: 'a text message'
        };
        aService.execute('rejectAccess', values);

        expect(aService.request).toHaveBeenCalledWith(endpoint, {
            username: '12345',
            message: 'a text message',
            grant: false
        }, 'USERS_rejectAccess_EXECUTED');
    });

});