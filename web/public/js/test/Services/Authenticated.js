describe("Authenticated", function() {

    var service;

    beforeEach(function() {
        service = new ZZ.Services.Authenticated();
    });

    it('fills the header with authentication params', function() {
        var sessionData = {userEmail: 'aUserEmail',token: 'sessionToken'};
        ZZ.Helpers.Session.getAuthData = jasmine.createSpy().andReturn(sessionData);

        var message = service.wrapRequestParams({
            aKey: 'aValue'
        });


        expect(JSON.parse(message).header.username).toEqual('aUserEmail');
        expect(JSON.parse(message).header.token).toEqual('sessionToken');
    });
});