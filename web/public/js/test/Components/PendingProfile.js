describe('PendingProfile', function() {

    beforeEach(function() {
        this.addMatchers(CUORE.Matchers);
    });

    it('has a custom renderer', function() {
        var component = new ZZ.Components.PendingProfile();
        expect(component.renderer).toBeInstanceOf(ZZ.Renderers.PendingProfile);
    });

    it('handles the profile event', function() {
        var component = new ZZ.Components.PendingProfile();

        var message = new CUORE.Message();
        message.answer= {name: 'Juan'};

        component.eventDispatch('GUIDES_get_EXECUTED', message);

        expect(component.getProfile()).toEqual({
            name: 'Juan'
        })
    });

});