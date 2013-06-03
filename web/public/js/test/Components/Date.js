describe("Date", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.Date();
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Input", function() {
        expect(aComponent).toBeInstanceOf(ZZ.Components.Input);
    });

    it("has an input type date", function() {
        expect(aComponent.type).toEqual('date');
    });
});