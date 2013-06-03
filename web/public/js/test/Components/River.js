describe("River", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.River('aKey');
        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Component", function() {
        expect(aComponent).toBeInstanceOf(CUORE.Component);
    });

    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.River);
    });

    it('knows its loading key', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.setI18NKey = jasmine.createSpy();
        aComponent.init();
        expect(aComponent.setI18NKey).toHaveBeenCalledWith('zizerones.river.loading');
        expect(aComponent.getLoadingText()).toEqual('zizerones.river.loading');
    });

    it("handles groups response properly", function() {
        var jsonArrayOfGroups = [{
            'description': 'aDescription',
            'city': 'aCity',
            'date': 'aDate',
            'language': 'spanish'
        }, {
            'description': 'anotherDescription',
            'city': 'anotherCity',
            'date': 'anotherDate',
            'language': 'english'
        }];
        var theMessage = new CUORE.Message();
        var eventName = "GROUPS_getList_EXECUTED";
        aComponent.loadGroups = jasmine.createSpy();

        theMessage.answer= jsonArrayOfGroups;
        aComponent.eventDispatch(eventName, theMessage);

        expect(aComponent.loadGroups).toHaveBeenCalledWith(jsonArrayOfGroups);
    });

    it("creates a group for each element received", function() {
        var jsonArrayOfGroups = [{
            'description': 'aDescription',
            'city': 'aCity',
            'date': 'aDate',
            'language': 'spanish'
        }, {
            'description': 'anotherDescription',
            'city': 'anotherCity',
            'date': 'anotherDate',
            'language': 'english'
        }];
        var theMessage = new CUORE.Message();
        var eventName = "GROUPS_getList_EXECUTED";

        theMessage.answer= jsonArrayOfGroups;
        aComponent.eventDispatch(eventName, theMessage);

        var firstGroup = aComponent.groups()[0];
        expect(firstGroup.description()).toEqual('aDescription');
        expect(firstGroup.city()).toEqual('aCity');
        expect(firstGroup.date()).toEqual('aDate');
        expect(firstGroup.language()).toEqual('spanish');
    });



    it('loads response creating group objects in an array', function() {
        var jsonArrayOfGroups = [{
            'description': 'aDescription',
            'city': 'aCity',
            'date': 'aDate'
        }, {
            'description': 'aDescription',
            'city': 'aCity',
            'date': 'aDate'
        }, {
            'description': 'aDescription',
            'city': 'aCity',
            'date': 'aDate'
        }];
        aComponent.loadGroups(jsonArrayOfGroups);
        expect(aComponent.groups()).toHaveSameLength(jsonArrayOfGroups);
        expect(aComponent.isLoading()).toBeFalsy();

        var aGroup = aComponent.groups()[0];
        expect(aGroup).toBeInstanceOf(ZZ.Components.Group);
    });

    it('can ask for another page of groups', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();

        var theGroup = new ZZ.Components.Group('anIdentity');
        aComponent.loadedGroups = [new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group(), theGroup];

        aComponent.moreGroups({
            aCriteria: 'value'
        });

        var theArguments = aComponent.services.execute.mostRecentCall.args;
        var data = theArguments[2];

        expect(aComponent.services.execute).toHaveBeenCalled();
        expect(aComponent.isLoading()).toBeTruthy();
        expect(theArguments[0]).toEqual('GROUPS');
        expect(theArguments[1]).toEqual('getList');
        expect(data.from_group).toEqual('anIdentity');
        expect(data.limit).toEqual(20);
        expect(data.aCriteria).toEqual('value');
    });


    it('triggers update when loads groups', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.updateRender = jasmine.createSpy();

        aComponent.loadGroups(['aGroup']);

        expect(aComponent.updateRender).toHaveBeenCalled();
    });

    it('triggers loading when asking for more groups', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.updateRender = jasmine.createSpy();

        aComponent.moreGroups();
        aComponent.loadGroups(['aGroup']);
        aComponent.moreGroups();

        expect(aComponent.isLoading()).toBeTruthy();
        expect(aComponent.updateRender).toHaveBeenCalled();
    });

    it('has a reset', function() {
        aComponent.updateRender = jasmine.createSpy();

        aComponent.loadGroups(['aGroup']);
        aComponent.reset();

        expect(aComponent.updateRender).toHaveBeenCalled();
        expect(aComponent.groups()).toBeEmpty();
        expect(aComponent.isLoading()).toBeTruthy();
        expect(aComponent.hasNoMoreGroups()).toBeFalsy();
    });

    it('no more groups to load set flag true', function(){

        aComponent.loadGroups([]);

        expect(aComponent.hasNoMoreGroups()).toBeTruthy();
        expect(aComponent.isLoading()).toBeFalsy();
    });

    it('no triggers update when no more groups to load', function(){
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();

        aComponent.loadGroups([]);
        aComponent.moreGroups();

        expect(aComponent.services.execute).not.toHaveBeenCalled();
        expect(aComponent.hasNoMoreGroups()).toBeTruthy();
        expect(aComponent.isLoading()).toBeFalsy();
    });

    it('no triggers loading when asking for more groups if there are not more', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.updateRender = jasmine.createSpy();

        aComponent.moreGroups();
        aComponent.loadGroups([]);
        aComponent.moreGroups();

        expect(aComponent.isLoading()).toBeFalsy();
        expect(aComponent.hasNoMoreGroups()).toBeTruthy();
        expect(aComponent.updateRender).toHaveBeenCalled();
    });

    it('no triggers loading when waiting for previuos loading', function() {
        aComponent.services = {};
        aComponent.services.execute = jasmine.createSpy();
        aComponent.updateRender = jasmine.createSpy();
        aComponent.waiting = true;

        aComponent.moreGroups();

        expect(aComponent.services.execute).not.toHaveBeenCalled();
    });



});