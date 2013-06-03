describe("Duration Label", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.DurationLabel();
        this.addMatchers(CUORE.Matchers);
        
    });

    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.DurationLabel);
    });

    it("inherits LabelPanel", function() {
        expect(aComponent).toBeInstanceOf(CUORE.Components.LabelPanel);
    });

    it('retrieves labels',function(){
        spyOn(aComponent, 'setI18NKey');
        aComponent.onEnvironmentUp();
        expect(aComponent.setI18NKey).toHaveBeenCalledWith('zizerones.home.hours');
        expect(aComponent.setI18NKey).toHaveBeenCalledWith('zizerones.home.minutes');
    });

    it('has a value', function(){
        aComponent.setValue('aValue');

        expect(aComponent.getValue()).toEqual('aValue');
    });


});