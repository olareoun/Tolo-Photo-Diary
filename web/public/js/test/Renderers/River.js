describe("River Renderer", function() {

    var container, aComponent;
    var aRiver;

    afterEach(function() {
        document.getElementById('xhtmlToTest').innerHTML = '';
    });

    beforeEach(function() {
        aRiver = new ZZ.Renderers.River();
        container = TestHelper.createTestContainer();
        aRiver.setContainer(container.id);

        aComponent = TestHelper.getDummyComponent();
        aComponent.isLoading = jasmine.createSpy().andReturn(true);
        aComponent.getLoadingText = jasmine.createSpy().andReturn('Loading ...');
        aComponent.groups = jasmine.createSpy().andReturn([new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group()]);
        this.addMatchers(CUORE.Matchers);
    });

    it("is a Cuore renderer ", function() {
        expect(new ZZ.Renderers.River()).toBeInstanceOf(CUORE.Renderer);
    });

    it("displays the loading message when loading", function() {
        aRiver.render(aComponent);
        var DOMElement = document.getElementById(container.id);
        var loading = DOMElement.lastChild;
        expect(loading).toContainClass('loading');
        expect(loading.textContent).toEqual('Loading ...');
    });

    it("hides the loading message when not loading", function() {
        aComponent.isLoading = jasmine.createSpy().andReturn(false);
        aRiver.render(aComponent);
        var DOMElement = document.getElementById(container.id);
        var loading = DOMElement.lastChild;
        expect(loading).toContainClass('hidden');
    });

    it("renders the groups inside rows 3 each", function() {
        aRiver.render(aComponent);
        var DOMElement = document.getElementById(container.id);
        var groupsContainerDOM = DOMElement.firstChild;
        var firstRow = groupsContainerDOM.children[0];
        expect(firstRow).toContainClass('row-fluid');
        expect(firstRow.children.length).toEqual(3);
        var secondRow = groupsContainerDOM.children[1];
        expect(secondRow).toContainClass('row-fluid');
        expect(secondRow.children.length).toEqual(1);
    });

    it("renders groups starting in the current row", function() {
        aRiver.render(aComponent);
        var DOMElement = document.getElementById(container.id);
        aComponent.groups = jasmine.createSpy().andReturn([new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group(), new ZZ.Components.Group()]);
        aRiver.update(aComponent);
        var groupsContainerDOM = DOMElement.firstChild;
        var secondRow = groupsContainerDOM.children[1];
        expect(secondRow).toContainClass('row-fluid');
        expect(secondRow.children.length).toEqual(3);
        var thirdRow = groupsContainerDOM.children[2];
        expect(thirdRow).toContainClass('row-fluid');
        expect(thirdRow.children.length).toEqual(2);
    });

    it('removes all the rows when the groups are empty', function(){
        aRiver.render(aComponent);
        aComponent.groups = jasmine.createSpy().andReturn([]);

        aRiver.updateWhenDrawn(aComponent);

        var rows = document.querySelector('.row-fluid')
        expect(rows).toBeNull();
    });

});