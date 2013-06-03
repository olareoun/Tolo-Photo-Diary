describe("TextArea", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.TextArea();
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Input", function() {
        expect(aComponent).toBeInstanceOf(ZZ.Components.Input);
    });
    
    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.TextArea);
    });
    
});