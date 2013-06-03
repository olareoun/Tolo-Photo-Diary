describe("ZZ.Pages.Registration", function() {

    var aPage;

    beforeEach(function() {
        this.addMatchers(CUORE.Matchers);

        aPage = new ZZ.Pages.Registration("http://www.zizerones.com");
        aPage.getComponentWithDOMId = function(id) {
            var selectedComponent = null;

            this.components.each(function(component) {
                if(component.getName() === id) selectedComponent = component;
            });

            return selectedComponent;
        };

    });

    it("inherits Page", function() {
        expect(aPage).toBeInstanceOf(ZZ.Pages.ZZBase);
    });

    it("has an GUIDES Service", function() {
        expect(aPage.getService("GUIDES")).toBeInstanceOf(ZZ.Services.Guides);
    });
    it("has an USERS Service", function() {
        expect(aPage.getService("USERS")).toBeInstanceOf(ZZ.Services.Users);
    });

    describe("at instanciation", function() {

        it("has a card to control submit", function() {
            var component = aPage.getComponentWithDOMId('register');
            expect(component).toBeInstanceOf(ZZ.Components.RegisterCard);
        });

        it("has a button to submit", function() {
            var component = aPage.getComponentWithDOMId('submit');
            expect(component).toBeInstanceOf(CUORE.Components.Button);
        });

        it("has field for the name", function() {
            var component = aPage.getComponentWithDOMId('name');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });

        it("has field for the email", function() {
            var component = aPage.getComponentWithDOMId('email');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });

        it("has field for the password", function() {
            var component = aPage.getComponentWithDOMId('password');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });
    });

    describe("submit button", function() {
        it("activates when mandatories are signaled", function() {
            var component = aPage.getComponentWithDOMId('submit');
            component.enable = jasmine.createSpy();
            component.eventDispatch('CARD_register_SATISFIED', undefined);
            expect(component.enable).toHaveBeenCalled();
        });

        it("deactivates when no mandatories are signaled", function() {
            var component = aPage.getComponentWithDOMId('submit');
            component.disable = jasmine.createSpy();
            component.eventDispatch('CARD_register_UNSATISFIED', undefined);
            expect(component.disable).toHaveBeenCalled();
        });

    });

});