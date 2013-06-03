describe("ZZ.Pages.Group", function() {

    var aPage;

    beforeEach(function() {
        aPage = new ZZ.Pages.Group("http://www.zizerones.com");
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

        it("has a group Card", function() {
            var component = aPage.getComponentWithDOMId('groupCard');
            expect(component).toBeInstanceOf(ZZ.Components.GroupCard);
        });

        it("has description TextArea", function() {
            var component = aPage.getComponentWithDOMId('description');
            expect(component).toBeInstanceOf(ZZ.Components.TextArea);
        });

        it("has a date picker", function() {
            var component = aPage.getComponentWithDOMId('date');
            expect(component).toBeInstanceOf(ZZ.Components.Date);
        });

        it("has a time input", function() {
            var component = aPage.getComponentWithDOMId('time');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
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
            expect(component).toBeInstanceOf(CUORE.Components.NumericSelector);
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

        it("has a button for submission", function() {
            var component = aPage.getComponentWithDOMId('submit');
            expect(component).toBeInstanceOf(ZZ.Components.ZButton);
            expect(component.labelKey).toEqual('zizerones.addGroup.submit');
        });

        it("has a feedbackPanel", function() {
            var component = aPage.getComponentWithDOMId('feedback');
            expect(component).toBeInstanceOf(ZZ.Components.Feedback);
        });

        it("has a language selection", function() {
            var component = aPage.getComponentWithDOMId('languages');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
        });

        it("has a emblems list", function() {
            var component = aPage.getComponentWithDOMId('emblems-filter');
            expect(component).toBeInstanceOf(ZZ.Components.Emblems);
        });


        xdescribe("the Button", function() {

            var theButton;

            beforeEach(function() {
                theButton = aPage.getComponentWithDOMId('submit');
                theButton.submitData = jasmine.createSpy();
            });

            it("manages all field change events", function() {
                expect(theButton.getManagedEvents()).toContain('COMPONENT_description_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_date_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_city_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_name_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_separation-days_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_minimum_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_maximum_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_emblems_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_image_CHANGED');
                expect(theButton.getManagedEvents()).toContain('COMPONENT_time_CHANGED');
            });


            it("handles when the description is written", function() {
                var component = aPage.getComponentWithDOMId('submit');
                spyOn(component, 'setValue');

                component.eventDispatch('COMPONENT_description_CHANGED', 'someParams');

                expect(component.setValue).toHaveBeenCalledWith({
                    'description': 'someParams'
                });
            });

            it("handles when the city is written", function() {
                var component = aPage.getComponentWithDOMId('submit');
                spyOn(component, 'setValue');

                component.eventDispatch('COMPONENT_city_CHANGED', 'someParams');

                expect(component.setValue).toHaveBeenCalledWith({
                    'city': 'someParams'
                });
            });

            it("handles when the date is written", function() {
                var component = aPage.getComponentWithDOMId('submit');
                spyOn(component, 'setValue');

                component.eventDispatch('COMPONENT_date_CHANGED', 'someParams');

                expect(component.setValue).toHaveBeenCalledWith({
                    'date': 'someParams'
                });
            });

            it("starts in disabled state", function() {
                expect(theButton.isEnabled()).toBeFalsy();
            });

            it("handles submission calling a Service", function() {
                theButton.eventDispatch('BUTTON_submit_CLICKED', null);
                expect(theButton.submitData).toHaveBeenCalled();
            });


        });

        describe(" the Feedback panel", function() {

            var theFeedback;

            beforeEach(function() {
                theFeedback = aPage.getComponentWithDOMId('feedback');
                theFeedback.addMessage = jasmine.createSpy();
            });

            it("handles the success ", function() {
                theFeedback.eventDispatch('GROUPS_add_EXECUTED', 'successKey');
                expect(theFeedback.addMessage).toHaveBeenCalledWith('successKey');
                theFeedback.eventDispatch('GROUPS_update_EXECUTED', 'successUpdateKey');
                expect(theFeedback.addMessage).toHaveBeenCalledWith('successUpdateKey');
            });

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


});
