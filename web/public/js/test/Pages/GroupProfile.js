describe('GroupProfile', function(){

  var aPage;

    beforeEach(function() {
        aPage = new ZZ.Pages.GroupProfile("http://www.zizerones.com");
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

    it("has an GROUPS Service", function() {
        expect(aPage.getService("GROUPS")).toBeInstanceOf(ZZ.Services.Groups);
    });

    describe("at instanciation", function() {

        beforeEach(function() {
            spyOn(aPage, 'addComponent');
            aPage._isEdition = jasmine.createSpy().andReturn(false);
            aPage.initializeComponents();
        });


        it("has description TextArea", function() {
            var component = aPage.getComponentWithDOMId('description');
            expect(component).toBeInstanceOf(ZZ.Components.TextArea);
        });

        it("has a date picker", function() {
            var component = aPage.getComponentWithDOMId('date');
            expect(component).toBeInstanceOf(ZZ.Components.Date);
        });

        it("has a city input", function() {
            var component = aPage.getComponentWithDOMId('city');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });

        it("has a group name", function() {
            var component = aPage.getComponentWithDOMId('name');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });

        it("has an input for the estimated duration", function() {
            var component = aPage.getComponentWithDOMId('duration');
            expect(component).toBeInstanceOf(ZZ.Components.DurationLabel);
        });

        it("has an input for image", function() {
            var component = aPage.getComponentWithDOMId('image');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });

        it("has an input for the price", function() {
            var component = aPage.getComponentWithDOMId('price');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });

        it("has  inputs for for minimum and maximum quorum", function() {
            var component = aPage.getComponentWithDOMId('minimum');
            expect(component).toBeInstanceOf(CUORE.Components.NumericSelector);
            component = aPage.getComponentWithDOMId('maximum');
            expect(component).toBeInstanceOf(CUORE.Components.NumericSelector);
            expect(component.getManagedEvents()).toContain('COMPONENT_minimum_CHANGED');
        });

        it("has an input for the number days of separation between groups if new group", function() {
            var component = aPage.getComponentWithDOMId('separation-days');
            expect(component).toBeInstanceOf(ZZ.Components.CheckedNumeric);
        });

        it("has a language selection", function() {
            var component = aPage.getComponentWithDOMId('language');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });

        it("has a emblems list", function() {
            var component = aPage.getComponentWithDOMId('emblems');
            expect(component).toBeInstanceOf(ZZ.Components.Emblems);
        });
        
    });

    it("request the group data if url has an id", function(){
        spyOn(aPage,'_executeService');

        aPage._getLocation = jasmine.createSpy();
        aPage.setUp();
        expect(aPage._executeService).not.toHaveBeenCalled();

        aPage._getLocation = jasmine.createSpy().andReturn("http://anUrl/page.html?group=anId");
        aPage.setUp();
        expect(aPage._executeService).toHaveBeenCalledWith('GROUPS','get','anId');
    });

    it("has all the data components disabled", function() {
        _.each(aPage.dataComponents, function(component) {
            expect(component.isEnabled()).toBe(false);
        });
    });

});