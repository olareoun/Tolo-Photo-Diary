describe("Group", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.Group('anId','aCity','aDate');
        this.addMatchers(CUORE.Matchers);
        ZZ.Helpers.Session.getAuthData = jasmine.createSpy().andReturn({'userid':'anId'});
    });

    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.Group);
    });

    it("inherits Component", function() {
        expect(aComponent).toBeInstanceOf(CUORE.Component);
    });

    it("instanciates with city and date", function() {
        aComponent = new ZZ.Components.Group('anId','aCity','aDate');
        expect(aComponent.city()).toEqual('aCity');
        expect(aComponent.date()).toEqual('aDate');
    });

    it("has a description", function() {
        aComponent.updateRender = jasmine.createSpy();
        expect(aComponent.description()).toEqual('');
        aComponent.setProperties({description: 'aDescription'});
        expect(aComponent.description()).toEqual('aDescription');
        expect(aComponent.updateRender).toHaveBeenCalled();
    });

    it("has a list of emblems", function() {
        aComponent.updateRender=jasmine.createSpy();
        expect(aComponent.emblems()).toEqual([]);
        aComponent.setProperties({emblems: ['anEmblem']});

        expect(aComponent.emblems()).toEqual(['anEmblem']);
        expect(aComponent.updateRender).toHaveBeenCalled();
    });

    it("has a language", function() {
        aComponent.updateRender=jasmine.createSpy();
        expect(aComponent.language()).toEqual('');
        aComponent.setProperties({language: 'aLanguage'});
        expect(aComponent.language()).toEqual('aLanguage');
        expect(aComponent.updateRender).toHaveBeenCalled();
    });

    it("has a identity", function() {
        expect(aComponent.identity()).toEqual('anId');
    });


    it('has a moreInfoLabel', function() {
        spyOn(aComponent,'setI18NKey');
        aComponent.getText = jasmine.createSpy().andReturn('aLabel');

        aComponent.init('aCity','aDate');
        var keyInfo = 'zizerones.groups.moreinfo.label';
        expect(aComponent.setI18NKey).toHaveBeenCalledWith(keyInfo);
        var keyEdit = 'zizerones.groups.edit.label';
        expect(aComponent.setI18NKey).toHaveBeenCalledWith(keyEdit);

        aComponent.isLoggedUserTheAdmin = jasmine.createSpy().andReturn(false);
        var label = aComponent.moreInfoLabel();
        expect(aComponent.getText).toHaveBeenCalledWith(keyInfo);
        expect(label).toEqual('aLabel');

        aComponent.isLoggedUserTheAdmin = jasmine.createSpy().andReturn(true);
        label = aComponent.moreInfoLabel();
        expect(aComponent.getText).toHaveBeenCalledWith(keyEdit);
        expect(label).toEqual('aLabel');
    });

    it('should call redirect to groups page with group id', function(){
        spyOn(aComponent,'execute');

        aComponent.isLoggedUserTheAdmin = jasmine.createSpy().andReturn(false);
        aComponent.redirectToGroup();
        expect(aComponent.execute).toHaveBeenCalledWith('GROUPS', 'redirect', {'id':'anId','admin':false});

        aComponent.isLoggedUserTheAdmin = jasmine.createSpy().andReturn(true);
        aComponent.redirectToGroup();
        expect(aComponent.execute).toHaveBeenCalledWith('GROUPS', 'redirect', {'id':'anId','admin':true});
    });
});