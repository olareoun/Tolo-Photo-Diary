describe('SubmitButton', function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.SubmitButton('submit');
        this.addMatchers(CUORE.Matchers);
    });


    it("sends data to the service ", function() {
        aComponent.sendTo('aServiceName', 'aServiceMethod');
        aComponent.setValue({aKey: 'aDescription'});

        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();

        aComponent.submitData();

        expect(aComponent.services.execute).toHaveBeenCalled();
        var theArguments = aComponent.services.execute.mostRecentCall.args;
        var theMessage = theArguments[2];

        expect(theArguments[0]).toEqual('aServiceName');
        expect(theArguments[1]).toEqual('aServiceMethod');
        expect(theMessage['aKey']).toEqual('aDescription');
    });

    it('enables the button when all mandatories are filled', function(){
        aComponent.setMandatories(['aField']);
        spyOn(aComponent, 'enable');
        spyOn(aComponent, 'updateRender');

        aComponent.setValue({aKey: 'aDescription'});
        expect(aComponent.enable).not.toHaveBeenCalled();

        aComponent.setValue({aField: 'aDescription'});
        expect(aComponent.enable).toHaveBeenCalled();
    });

    it('sends the data when button is clicked', function(){
        spyOn(aComponent, 'submitData');

        aComponent.eventDispatch('BUTTON_submit_CLICKED');

        expect(aComponent.submitData).toHaveBeenCalled();
    });

});