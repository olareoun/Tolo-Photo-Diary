describe("ZZ.Pages.Admin", function() {

    var aPage;

    beforeEach(function() {
        aPage = new ZZ.Pages.Admin("http://www.zizerones.com");
        aPage.getComponentWithDOMId = function(id) {
            var selectedComponent = null;

            this.components.each(function(component) {
                if(component.getName() === id) selectedComponent = component;
            });

            return selectedComponent;
        };
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Page", function() {
        expect(aPage).toBeInstanceOf(ZZ.Pages.ZZBase);
    });

    it("has an GUIDES Service", function() {
        expect(aPage.getService("GUIDES")).toBeInstanceOf(ZZ.Services.Guides);
    });

    describe("at instanciation", function() {

        beforeEach(function() {
            spyOn(aPage, 'addComponent');
            aPage.initializeComponents();
        });

        it("has a pending list", function() {
            var component = aPage.getComponentWithDOMId('pending');
            expect(component).toBeInstanceOf(ZZ.Components.Pending);
        });

        it("has a profile viewer", function() {
            var component = aPage.getComponentWithDOMId('profile');
            expect(component).toBeInstanceOf(ZZ.Components.PendingProfile);
        });

    });

});