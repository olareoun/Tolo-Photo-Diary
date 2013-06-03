describe('Login', function() {
	var aComponent;

    beforeEach(function() {
        document.page={};
        document.page.isLogged=jasmine.createSpy().andReturn(false);
        aComponent = new ZZ.Components.Login("loginKey","logoutKey");
        this.addMatchers(CUORE.Matchers);
    });

    it ('is a Link',function(){
        expect(aComponent).toBeInstanceOf(CUORE.Components.Link);
    });

    it ('has its own rendererr',function(){
         expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.Login);
    });

    it('returns the login key if not logged', function() {
        expect(aComponent.getLabelText()).toEqual('loginKey');
    });

    it('returns the logout key if  logged', function() {
        fakeLogin();
        expect(aComponent.getLabelText()).toEqual('logoutKey');
    });

    it('handles login ', function(){
        CUORE.Bus.emit=jasmine.createSpy();
        aComponent.updateRender = jasmine.createSpy();
        document.page.login=jasmine.createSpy();

        var aMessage = new CUORE.Message();
        aMessage.putOnAnswer('token','anyToken');
        aMessage.putOnAnswer('user','anyUsername');

        aComponent.eventDispatch('USERS_login_EXECUTED', aMessage);

        expect(aComponent.updateRender).toHaveBeenCalled();
        expect(document.page.login).toHaveBeenCalledWith('anyToken', 'anyUsername');
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('LOGIN_logged_CHANGED',undefined);
    });

     it('handles logout ', function(){
        CUORE.Bus.emit=jasmine.createSpy();
        aComponent.updateRender = jasmine.createSpy();
        aComponent.execute = jasmine.createSpy();
        fakeLogin();
        document.page.logout=jasmine.createSpy();

        aComponent.eventDispatch('USERS_logout_EXECUTED', null);


        expect(aComponent.execute).toHaveBeenCalledWith('URL', 'goHome');
        expect(document.page.logout).toHaveBeenCalled();
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('LOGIN_logged_CHANGED',undefined);
    });

    var fakeLogin= function(){
        document.page.isLogged=jasmine.createSpy().andReturn(true);
    };
});