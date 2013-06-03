describe('GuideCard', function() {
	var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.GuideCard();
        this.addMatchers(CUORE.Matchers);
    });


    it("retrieves the guide data on envinromentup", function(){
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        var aPage = {};
        ZZ.Helpers.Session.getAuthData = jasmine.createSpy().andReturn({'userEmail':'anUser'});

        aComponent.onEnvironmentUp();

        expect(aComponent.services.execute).toHaveBeenCalledWith('GUIDES','get',{'username': 'anUser'});
    });

    it('watch the inputs', function() {
        aComponent.setValue = jasmine.createSpy();

        aComponent.eventDispatch('COMPONENT_name_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_license-number_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_residence_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_work-area_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_experience_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_phone_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_languages_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_introductions_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_imageprofile_CHANGED', 'aValue');

        expect(aComponent.setValue.calls.length).toEqual(9);
    });


    it("auto Submits", function(){
        ZZ.Helpers.Session.getAuthData = jasmine.createSpy().andReturn({'userEmail':'', 'userid':''});
        aComponent = new ZZ.Components.GuideCard();
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.loaded=true;
        aComponent.eventDispatch('COMPONENT_name_CHANGED', 'aValue');
        var data= { identity: '' ,email : '', name : 'aValue' };
        expect(aComponent.services.execute).toHaveBeenCalledWith('GUIDES','update',data);
    });

    it("feeds the values when retrieves the data", function(){
        var message = new CUORE.Message();
        message.putOnAnswer('experience', 2);
        message.putOnAnswer('work_area', 'Spain');
        aComponent.eventDispatch('GUIDES_get_EXECUTED', message);
        expect(aComponent.currentValues['experience']).toEqual(2);
        expect(aComponent.currentValues['work-area']).toEqual('Spain');
        expect(aComponent.loaded).toBeTruthy();
    });


    it("get the profile id and email as an init parameters", function(){
        ZZ.Helpers.Session.getAuthData = jasmine.createSpy().andReturn({'userEmail':'anUser', 'userid':'anId'});
        aComponent.init();

        expect(aComponent.currentValues['identity']).toEqual('anId');
        expect(aComponent.currentValues['email']).toEqual('anUser');
    });
});