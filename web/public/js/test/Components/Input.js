describe("Input", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.Input();
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Input", function() {
        expect(aComponent).toBeInstanceOf(CUORE.Components.Input);
    });


    it("allows to set the placeholder text ", function() {
        aComponent.setPlaceHolder('aName');
        expect(aComponent.getPlaceHolder()).toEqual('aName');
    });

    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.Input);
    });

    it("emits event when the value is changed", function() {
        var expectedEvent = "COMPONENT_" + aComponent.name + "_CHANGED";
        var expectedValue = 'aValue';
        spyOn(CUORE.Bus, 'emit');

        aComponent.setValue(expectedValue);

        expect(CUORE.Bus.emit).toHaveBeenCalledWith(expectedEvent, expectedValue);
    });

    it('has a builtIn Strategy for refilling', function() {
        aComponent = new ZZ.Components.Input();
        aComponent.paramName = 'aName';
        spyOn(aComponent, 'setValue');

        var aMessage = new CUORE.Message();
        var aResult = {
            'aName': 'aValue'
        };
        aMessage.answer = aResult;

        aComponent.refillOn('SERVICE', 'method');
        aComponent.eventDispatch('SERVICE_method_EXECUTED', aMessage);

        expect(aComponent.setValue).toHaveBeenCalledWith('aValue',true);
    });

    describe("fill the value from the url", function() {

        it('handles when the url contains a value for it', function() {
            var paramToListen = 'aParamName';
            aComponent = new ZZ.Components.Input('label', 'placeholder', paramToListen);
            spyOn(aComponent, 'setValue');
            aComponent.setLocation('http://aLocation?' + paramToListen + '=aValue');

            aComponent.init('label', 'placeholder', paramToListen);
            aComponent.onEnvironmentUp();
            expect(aComponent.setValue).toHaveBeenCalledWith('aValue');
        });

        it('decodes the url param value with special characters', function() {
            var paramToListen = 'aParamName';
            aComponent = new ZZ.Components.Input('label', 'placeholder', paramToListen);
            spyOn(aComponent, 'setValue');
            aComponent.setLocation('http://aLocation?' + paramToListen + '=a%20Value');

            aComponent.init('label', 'placeholder', paramToListen);
            aComponent.onEnvironmentUp();
            expect(aComponent.setValue).toHaveBeenCalledWith('a Value');
        });

        it('handles when the url doesnt contains a value for it', function() {

            var paramToListen = 'aParamName';
            aComponent = new ZZ.Components.Input('label', 'placeholder', paramToListen);
            spyOn(aComponent, 'setValue');
            aComponent.setLocation('http://aLocation');

            aComponent.init('label', 'placeholder', paramToListen)

            expect(aComponent.setValue).not.toHaveBeenCalled();
        });

    });

    describe("fill the value from a profile event ", function() {

        it('sets its value from message', function() {
            var paramToListen = 'aParamName';
            aComponent = new ZZ.Components.Input('label', 'placeholder', paramToListen);
            spyOn(aComponent, 'setInitialValue');

            var aMessage = new CUORE.Message();
            var aResult = {
                'aParamName': 'aValue',
                'anotherParam': 'otherValue'
            };
            aMessage.answer = aResult;

            var handler = new ZZ.Handlers.Factory().setInputValue('aParamName');
            aComponent.addHandler('GUIDES_get_EXECUTED', handler);

            aComponent.eventDispatch('GUIDES_get_EXECUTED', aMessage);

            expect(aComponent.setInitialValue).toHaveBeenCalledWith('aValue');
        });
    });

});