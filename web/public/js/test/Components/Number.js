describe("Number", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.Number();
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Input", function() {
        expect(aComponent).toBeInstanceOf(ZZ.Components.Input);
    });

    it("has an input type number", function() {
        expect(aComponent.type).toEqual('number');
    });
});