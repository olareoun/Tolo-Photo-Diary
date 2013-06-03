describe("Emblems", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.Emblems('emblems');
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits List", function() {
        expect(aComponent).toBeInstanceOf(CUORE.Components.List);
    });

    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.Emblems);
    });

    it("notify changes when selected any element", function() {
        aComponent.notifyChanges = jasmine.createSpy();
        aComponent.setValue('anItem');
        expect(aComponent.notifyChanges).toHaveBeenCalled();
    });

    it('emits event when some item is selected', function() {
        var emblemsSelected = ['aValue', 'anotherValue'];

        aComponent.setValue(emblemsSelected);
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('COMPONENT_' + aComponent.name + '_CHANGED', emblemsSelected);
    });

    it("handles emblems response properly", function() {

        aComponent.onEnvironmentUp();
        expect(aComponent.services.execute).toHaveBeenCalledWith('CATALOGS', 'getEmblems', {});

    });


});