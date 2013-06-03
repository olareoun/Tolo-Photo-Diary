describe("Modal", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.Modal();
        this.addMatchers(CUORE.Matchers);
    });

    it('inherits Component', function() {
        expect(aComponent).toBeInstanceOf(CUORE.Component);
    });

    it('has its own renderer', function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.Modal);
    });

    it('shows the modal', function() {
        spyOn(aComponent.renderer, 'show');

        aComponent.show();
        expect(aComponent.renderer.show).toHaveBeenCalled();
    });

    it('closes when logged', function() {
        spyOn(aComponent.renderer, 'hide');

        var aMessage = new CUORE.Message();
        aMessage.putOnAnswer('token','anyToken');
        aMessage.putOnAnswer('username','anyUsername');

        aComponent.eventDispatch('USERS_login_EXECUTED', aMessage);

        expect(aComponent.renderer.hide).toHaveBeenCalled();
    });

});