describe('Card', function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.Card();
        aComponent.setName('aName');
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Component", function() {
        expect(aComponent).toBeInstanceOf(CUORE.Component);
    });

    it("sends data to the service ", function() {
        aComponent.sendTo('aServiceName', 'aServiceMethod');
        aComponent.setValues({
            aKey: 'aDescription'
        });
        aComponent.setValue('anotherKey', 'anotherDescription');
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();

        aComponent.submitData();

        expect(aComponent.services.execute).toHaveBeenCalled();
        expect(aComponent.services.execute.calls.length).toEqual(1);
        var theArguments = aComponent.services.execute.mostRecentCall.args;
        var theMessage = theArguments[2];

        expect(theArguments[0]).toEqual('aServiceName');
        expect(theArguments[1]).toEqual('aServiceMethod');
        expect(theMessage['aKey']).toEqual('aDescription');
        expect(theMessage['anotherKey']).toEqual('anotherDescription');
    });

    it("sends to the service dispatching", function() {
        aComponent.sendTo('aServiceName', 'aServiceMethod');
        aComponent.setValues({
            aKey: 'aDescription'
        });
        aComponent.setValue('anotherKey', 'anotherDescription');
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.addExecHandler('tal','submitData');
        aComponent.eventDispatch('tal');

        expect(aComponent.services.execute).toHaveBeenCalled();
        expect(aComponent.services.execute.calls.length).toEqual(1);
    });

    it('signals mandatories completion', function() {
        aComponent.setMandatories(['aField']);
        spyOn(CUORE.Bus, 'emit');

        aComponent.setValue('aKey', 'aDescription');
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('CARD_aName_UNSATISFIED', undefined);

        aComponent.setValue('aField', 'aDescription');
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('CARD_aName_SATISFIED', undefined);
    });

    it('signals mandatories only if there are mandatories set', function() {
        spyOn(CUORE.Bus, 'emit');
        aComponent.setValue('aField', 'aDescription');
        expect(CUORE.Bus.emit).not.toHaveBeenCalledWith();
    });

    it('can react to change signaling', function() {
        aComponent.setValue = jasmine.createSpy();
        aComponent.watchInput('anInput');

        aComponent.eventDispatch('COMPONENT_anInput_CHANGED', 'aValue');
        expect(aComponent.setValue).toHaveBeenCalledWith('anInput', 'aValue');
    });

    it('can react to changes signaling', function() {
        aComponent.setValue = jasmine.createSpy();
        aComponent.watchInputs(['anInput', 'anotherInput']);

        expect(aComponent.getManagedEvents()).toContain('COMPONENT_anInput_CHANGED');
    });

    it(' has an autosubmit mode ', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.setValue('aKey', 'aDescription');
        expect(aComponent.services.execute).not.toHaveBeenCalled();
        aComponent.beginToAutoSubmit();
        aComponent.setValue('anotherKey', 'anotherDescription');
        expect(aComponent.services.execute).toHaveBeenCalled();
    });

    it(' autosubmits only in real changes', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.beginToAutoSubmit();
        aComponent.setValue('anotherKey', 'anotherDescription');
        expect(aComponent.services.execute).toHaveBeenCalled();
        aComponent.setValue('anotherKey', 'anotherDescription');
        expect(aComponent.services.execute).toHaveBeenCalled();
    });

    it('doesnt submits when mandatories not present', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.setMandatories(['aField']);
        aComponent.setValue('aKey', 'aDescription');
        aComponent.submitData();
        expect(aComponent.services.execute).not.toHaveBeenCalled();
        aComponent.setValue('aField', 'someField');
        aComponent.submitData();
        expect(aComponent.services.execute).toHaveBeenCalled();
    });

});