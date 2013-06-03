describe("Password", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.Password();
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Input", function() {
        expect(aComponent).toBeInstanceOf(ZZ.Components.Input);
    });
    
    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.Password);
    });
    
    it("has its message key", function() {
        aComponent.setI18NKey=jasmine.createSpy();
        aComponent.init();
        expect(aComponent.setI18NKey).toHaveBeenCalledWith(ZZ.SHOW_PASS_KEY);
    });
});
