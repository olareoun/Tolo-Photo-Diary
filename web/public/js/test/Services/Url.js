describe("ZZ.Services.Url", function() {

	var aService;
	var aBaseURL = "http://www.zizerones.com";

	beforeEach(function() {
		aService = new ZZ.Services.Url();
		aService.setBaseURL(aBaseURL);
		this.addMatchers(CUORE.Matchers);
	});

	it("is a Service", function() {
		expect(aService).toBeInstanceOf(CUORE.Service);
	});

	it('changes the url with the received params', function() {
        var params = {
            firstParam: 'aValue',
            secondParam: 'another Value'
        };
        spyOn(history, 'pushState');

        aService.urlParams = ['firstParam','secondParam'];
        aService.execute('changeUrlAndTitle', params);

        var newUrl = history.pushState.mostRecentCall.args[2];

        expect(history.pushState).toHaveBeenCalled();
        expect(newUrl.indexOf("firstParam=aValue&secondParam=another%20Value") > -1).toBeTruthy();
    });

    it('changes the title when receive a param with place and/or date', function() {
        var params = {
            tentative_date: 'aDate',
            place: 'aPlace'
        };
        spyOn(history, 'pushState');

        aService.urlParams = ['tentative_date','place'];

        aService.execute('changeUrlAndTitle', params);

        expect(document.title).toMatch(/around the aDate/);
        expect(document.title).toMatch(/in aPlace/);
    });

    it('changes the url when receive an empty param ', function() {
        var params = {};
        spyOn(history, 'pushState');

        aService.execute('changeUrlAndTitle', params);

        var newUrl = history.pushState.mostRecentCall.args[2];
        expect(newUrl).toMatch(/SpecRunner.html$/);
    });

    it('adds to url only the criteria params that it knows', function(){
        var params = {
            aCriteria: 'aValue',
            notKnownCriteria: 'otherValue'
        };
        spyOn(history, 'pushState');

        aService.urlParams = ['aCriteria'];
        aService.execute('changeUrlAndTitle', params);

        var newUrl = history.pushState.mostRecentCall.args[2];

        expect(newUrl.indexOf("aCriteria=aValue") > -1).toBeTruthy();
        expect(newUrl.indexOf("otherValue") == -1).toBeTruthy();
        expect(newUrl.indexOf("notKnownCriteria") == -1).toBeTruthy();
    });
});