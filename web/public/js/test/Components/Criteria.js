describe('SearchCriteriaForm', function() {

    var form;

    beforeEach(function() {
        form = new ZZ.Components.Criteria();
    });


    it('emits event when some search filter is selected', function() {
        spyOn(CUORE.Bus, 'emit');
        var search = {
            criteria: 'aValue'
        };

        form.setCriteria(search);
        
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('CRITERIA_SELECTED', search);
    });

    it('calls service to change the url when a new search is performed', function() {
        form.services = {};
        form.services.execute = jasmine.createSpy();
        var someSearchCriteria = {
            aCriteria: 'aValue',
            anotherCriteria: 'anotherValue'
        };

        var message = new CUORE.Message();
        message.putMapOnQuery(someSearchCriteria);
        form.urlParams = ['aCriteria','anotherCriteria'];

        form.eventDispatch('GROUPS_getList_EXECUTED', message);

        var theArguments = form.services.execute.mostRecentCall.args;
        expect(form.services.execute).toHaveBeenCalled();
        expect(theArguments[0]).toEqual('URL');
        expect(theArguments[1]).toEqual('changeUrlAndTitle');
        expect(theArguments[2]).toEqual(someSearchCriteria);
    });


    it('calls service to change the title when a new search is performed with place and/or date', function() {
        form.services = {};
        form.services.execute = jasmine.createSpy();
        var someSearchCriteria = {
            tentative_date: 'aDate',
            place: 'aPlace'
        };

        var message = new CUORE.Message();
        message.putMapOnQuery(someSearchCriteria);
        form.urlParams = ['tentative_date','place'];

        form.eventDispatch('GROUPS_getList_EXECUTED', message);

        var theArguments = form.services.execute.mostRecentCall.args;
        expect(form.services.execute).toHaveBeenCalled();
        expect(theArguments[0]).toEqual('URL');
        expect(theArguments[1]).toEqual('changeUrlAndTitle');
        expect(theArguments[2]).toEqual(someSearchCriteria);
    });

    it('calls service with the params in the url when initialization', function(){
        form.urlParams = ['aCriteria'];
        form.setLocation("http://anUrl?aCriteria=123");

        form.setCriteria = jasmine.createSpy();

        form.onEnvironmentUp();

        expect(form.setCriteria).toHaveBeenCalledWith({aCriteria:"123"});
    });

    it('encodes the url params with a special characters', function(){
        form.urlParams = ['aCriteria'];
        form.setLocation("http://anUrl?aCriteria=a%20value");

        form.setCriteria = jasmine.createSpy();

        form.onEnvironmentUp();

        expect(form.setCriteria).toHaveBeenCalledWith({aCriteria:"a value"});
    });
});