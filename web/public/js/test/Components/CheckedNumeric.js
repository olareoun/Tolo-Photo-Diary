describe("CheckedNumeric", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.CheckedNumeric();
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits NumericSelector", function() {
        expect(aComponent).toBeInstanceOf(CUORE.Components.NumericSelector);
    });

    it("has repetition values by default", function() {
        expect(aComponent.getLimInf()).toEqual(1);
        expect(aComponent.getLimSup()).toEqual(30);
        expect(aComponent.getValue()).toEqual(7);
        expect(aComponent.isEnabled()).toBeFalsy();
    });

    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.CheckedNumeric);
    });

    it("ask for the post label", function() {
        aComponent.setI18NKey = jasmine.createSpy();
        aComponent.init("aLabel", "anotherLabel");
        expect(aComponent.setI18NKey).toHaveBeenCalledWith("anotherLabel");
    });

    it("notify changes when enabled", function() {
        aComponent.notifyChanges = jasmine.createSpy();
        aComponent.enable();
        expect(aComponent.notifyChanges).toHaveBeenCalled();
    });

    it("notify when disabled", function() {
        aComponent.notifyDisabled = jasmine.createSpy();
        aComponent.disable();
        expect(aComponent.notifyDisabled).toHaveBeenCalled();
    });
});