describe('RegisterCard', function() {
	var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.RegisterCard();
        this.addMatchers(CUORE.Matchers);
    });

    
    it("calls the login service when new guide is OK", function(){
    	aComponent.setValues({'email': 'test@email.es', 'password':'aPassword'});

    	var aMessage = new CUORE.Message();
    	var aResult = {'email': 'test@email.es'};
    	aMessage.answer=aResult;

    	aComponent.services = {};
    	aComponent.services.execute = jasmine.createSpy();

    	aComponent.eventDispatch('GUIDES_add_EXECUTED', aMessage);

    	expect(aComponent.services.execute).toHaveBeenCalledWith('USERS','login',{'username': 'test@email.es','password':'aPassword'},undefined);

    });

    it("Checks email validity", function(){
        aComponent.setMandatories(['email']);
        aComponent.setName('aName')
        //spyOn(CUORE.Bus, 'emit');
        aComponent.setValue('tal', 'pascual');
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('CARD_aName_UNSATISFIED', undefined);

        aComponent.setValue('email', 'bademail');
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('CARD_aName_UNSATISFIED', undefined);

        aComponent.setValue('email', 'good@email.com');
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('CARD_aName_SATISFIED', undefined);
    });



});