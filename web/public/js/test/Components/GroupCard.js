describe('GroupCard', function() {
	var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.GroupCard();
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Card", function() {
        expect(aComponent).toBeInstanceOf(ZZ.Components.Card);
    });


    it('watch the inputs', function() {
        aComponent.setValue = jasmine.createSpy();

        aComponent.eventDispatch('COMPONENT_description_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_date_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_city_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_name_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_duration_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_separation-days_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_maximum_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_minimum_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_price_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_language_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_emblems_CHANGED', 'aValue');
        aComponent.eventDispatch('COMPONENT_image_CHANGED', 'aValue');

        expect(aComponent.setValue.calls.length).toEqual(12);
    });

    xit("if editMode retrieves the data on envinromentup", function(){
        var editMode=true;
        aComponent = new ZZ.Components.GroupCard(editMode);
        aComponent._getLocation = jasmine.createSpy().andReturn("http://anUrl/page.html?group=anId");
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        var aPage = {};
        aComponent.onEnvironmentUp();
        expect(aComponent.services.execute).toHaveBeenCalledWith('GROUPS','get','anId');
    });



    xit("auto Submits", function(){
        ZZ.Helpers.Session.getAuthData = jasmine.createSpy().andReturn({'userEmail':'', 'userid':''});
        aComponent = new ZZ.Components.GuideCard();
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.loaded=true;
        aComponent.eventDispatch('COMPONENT_name_CHANGED', 'aValue');
        var data= { identity: '' ,email : '', name : 'aValue' };
        expect(aComponent.services.execute).toHaveBeenCalledWith('GUIDES','update',data);
    });

    xit("feeds the values when retrieves the data", function(){
        var message = new CUORE.Message();
        message.putOnAnswer('experience', 2);
        message.putOnAnswer('work_area', 'Spain');
        aComponent.eventDispatch('GUIDES_get_EXECUTED', message);
        expect(aComponent.currentValues['experience']).toEqual(2);
        expect(aComponent.currentValues['work-area']).toEqual('Spain');
        expect(aComponent.loaded).toBeTruthy();
    });


    xit("get the profile id and email as an init parameters", function(){
        ZZ.Helpers.Session.getAuthData = jasmine.createSpy().andReturn({'userEmail':'anUser', 'userid':'anId'});
        aComponent.init();

        expect(aComponent.currentValues['identity']).toEqual('anId');
        expect(aComponent.currentValues['email']).toEqual('anUser');
    });
});