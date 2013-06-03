describe("ZZ.Pages.zizerones", function() {

    var aPage;

    beforeEach(function() {
        this.addMatchers(CUORE.Matchers);

        aPage = new ZZ.Pages.Zizerones("http://www.zizerones.com");
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


    describe("at instanciation", function() {
        it("has add Group Button", function() {
            var component = aPage.getComponentWithDOMId('addGroup');
            expect(component).toBeInstanceOf(CUORE.Components.Link);
        });

        it("has an input date for filtering", function() {
            var component = aPage.getComponentWithDOMId('date-filter');
            expect(component).toBeInstanceOf(ZZ.Components.Date);
            expect(component.paramName).toEqual('tentative_date');
        });

        it("has a search coordinator", function() {
            var component = aPage.getComponentWithDOMId('search-coordinator');
            expect(component).toBeInstanceOf(ZZ.Components.Criteria);
        });

        it("has a place input search", function() {
            var component = aPage.getComponentWithDOMId('place-filter');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('place');
        });

        it("has a river", function() {
            var component = aPage.getComponentWithDOMId('river');
            expect(component).toBeInstanceOf(ZZ.Components.River);
        });

        it("has a language input search", function() {
            var component = aPage.getComponentWithDOMId('language-filter');
            expect(component).toBeInstanceOf(ZZ.Components.Input);
            expect(component.paramName).toEqual('language');
        });

        it("has a emblems input search", function() {
            var component = aPage.getComponentWithDOMId('emblems-filter');
            expect(component).toBeInstanceOf(ZZ.Components.Emblems);
            //expect(component.paramName).toEqual('emblems');
        });
    });

    describe("The river component", function() {

        it("handles the date search filter", function() {
            var component = aPage.getComponentWithDOMId('river');
            spyOn(component, 'reset');

            component.eventDispatch("COMPONENT_date-filter_CHANGED", 'aDateValue');

            expect(component.reset).toHaveBeenCalled();
        });

        it("handles the place search filter", function() {
            var component = aPage.getComponentWithDOMId('river');
            spyOn(component, 'reset');

            component.eventDispatch("COMPONENT_place-filter_CHANGED", 'aPlaceValue');

            expect(component.reset).toHaveBeenCalled();
        });

        it("handles the language search filter", function() {
            var component = aPage.getComponentWithDOMId('river');
            spyOn(component, 'reset');

            component.eventDispatch("COMPONENT_language-filter_CHANGED", 'aLanguage');

            expect(component.reset).toHaveBeenCalled();
        });

        it("handles the scroll event", function() {
            var component = aPage.getComponentWithDOMId('river');
            spyOn(component, 'moreGroups');

            component.eventDispatch("SCROLL_detection_DONE", {});

            expect(component.moreGroups).toHaveBeenCalled();
        });

        it("handles when some search performed", function() {
            var component = aPage.getComponentWithDOMId('river');
            spyOn(component, 'moreGroups');

            component.eventDispatch("CRITERIA_SELECTED", 'params');

            expect(component.moreGroups).toHaveBeenCalledWith('params');
        });
    });

    describe("The Search coordinator", function() {
        it("handles the date search filter", function() {
            var searchForm = aPage.getComponentWithDOMId('search-coordinator');
            spyOn(searchForm, 'setCriteria');

            searchForm.eventDispatch("COMPONENT_date-filter_CHANGED", 'aDateValue');

            expect(searchForm.setCriteria).toHaveBeenCalledWith({
                tentative_date: 'aDateValue'
            });
        });

        it("handles the place search filter", function() {
            var searchForm = aPage.getComponentWithDOMId('search-coordinator');
            spyOn(searchForm, 'setCriteria');

            searchForm.eventDispatch("COMPONENT_place-filter_CHANGED", 'aPlaceValue');

            expect(searchForm.setCriteria).toHaveBeenCalledWith({
                place: 'aPlaceValue'
            });
        });

        it("handles the language search filter", function() {
            var searchForm = aPage.getComponentWithDOMId('search-coordinator');
            spyOn(searchForm, 'setCriteria');

            searchForm.eventDispatch("COMPONENT_language-filter_CHANGED", 'aLanguageValue');

            expect(searchForm.setCriteria).toHaveBeenCalledWith({
                language: 'aLanguageValue'
            });
        });

         it("handles the emblems search filter", function() {
            var searchForm = aPage.getComponentWithDOMId('search-coordinator');
            spyOn(searchForm, 'setCriteria');

            searchForm.eventDispatch("COMPONENT_emblems_CHANGED", 'anEmblem');

            expect(searchForm.setCriteria).toHaveBeenCalledWith({
                emblems: 'anEmblem'
            });
        });
    });


    it("set the autodetection of scroll", function() {
        aPage._detectAutoScroll = jasmine.createSpy();
        aPage.setUp();
        expect(aPage._detectAutoScroll).toHaveBeenCalled();
    });

});