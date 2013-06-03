describe("ZZ.Pages.Profile", function() {

    var aPage;

    beforeEach(function() {

        aPage = new ZZ.Pages.Profile("http://www.zizerones.com");

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

    it("has an GROUPS Service", function() {
        expect(aPage.getService("GROUPS")).toBeInstanceOf(ZZ.Services.Groups);
    });


    describe("at instanciation", function() {

        it("has GuideCard component", function() {
            var component = aPage.getComponentWithDOMId('guideCard');
            expect(component).toBeInstanceOf(ZZ.Components.GuideCard);
        });

        it("has a Register Button", function() {
            var component = aPage.getComponentWithDOMId('register');
            expect(component).toBeInstanceOf(ZZ.Components.RegisterMenuLink);
        });

        it("has field for the name", function() {
            var component = aPage.getComponentWithDOMId('name');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('name');
        });

        it("has field for the email", function() {
            var component = aPage.getComponentWithDOMId('email');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('email');
        });


        it("has field for the license number", function() {
            var component = aPage.getComponentWithDOMId('license-number');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('license_number');
        });

        it("has field for the city of residence", function() {
            var component = aPage.getComponentWithDOMId('residence');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('residence');
        });

        it("has field for the work area", function() {
            var component = aPage.getComponentWithDOMId('work-area');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('work_area');
        });

        it("has field for the experience in years", function() {
            var component = aPage.getComponentWithDOMId('experience');
            expect(component).toBeInstanceOf(CUORE.Components.NumericSelector);
        });

        it("has field for the phone number", function() {
            var component = aPage.getComponentWithDOMId('phone');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('phone');
        });

        it("has field for the image profile", function() {
            var component = aPage.getComponentWithDOMId('imageprofile');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('imageprofile');
        });

        it("has field for the introductions profile", function() {
            var component = aPage.getComponentWithDOMId('introductions');
            expect(component).toBeInstanceOf(ZZ.Components.EligibleTextarea);
        });

        it("has a filtered river", function() {
            var component = aPage.getComponentWithDOMId('river');
            expect(component).toBeInstanceOf(ZZ.Components.River);
        });
    });

});