describe('RegisterMenuLink', function() {
	var aComponent;

    beforeEach(function() {
        document.page={};
        document.page.isLogged=jasmine.createSpy().andReturn(false);
        localStorage.clear();
        aComponent = new ZZ.Components.RegisterMenuLink('aLink', 'aKey', 'anotherLink', 'anotherKey');
        this.addMatchers(CUORE.Matchers);
    });

    it('returns the default key if not logged', function() {
        expect(aComponent.getLabelText()).toEqual('aKey');
    });

    it('returns the default url if not logged', function() {
        expect(aComponent.getURL()).toEqual('aLink');
    });

    it('changes states  when handle a login event', function(){
        aComponent.updateRender = jasmine.createSpy();
        aComponent.eventDispatch('LOGIN_logged_CHANGED', undefined);
        expect(aComponent.updateRender).toHaveBeenCalled();
    });

    it('changes label and url if it is already logged', function(){
        aComponent = new ZZ.Components.RegisterMenuLink('aLink', 'aKey', 'anotherLink', 'anotherKey');
        aComponent._logged=jasmine.createSpy().andReturn(true);

        expect(aComponent.getLabelText()).toEqual('anotherKey');
        expect(aComponent.getURL()).toEqual('anotherLink');
    });

});