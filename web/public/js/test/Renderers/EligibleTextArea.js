describe("EligibleTextarea", function() {

    var input, container, aComponent, domContainer;

    beforeEach(function() {
        input = new ZZ.Renderers.EligibleTextarea();
        container = TestHelper.createTestContainer();
        input.setContainer(container.id);
        aComponent = TestHelper.getDummyInput();
        domContainer = document.getElementById(container.id);

        aComponent.getOptions = jasmine.createSpy('getOptions').andReturn(['optionA', 'optionB']);
        aComponent.getTextForOption = jasmine.createSpy('getTextForOption').andReturn('a really long text');
        aComponent.updateOption = jasmine.createSpy('updateOption');
        aComponent.getText = jasmine.createSpy('getText');
        document.page.getLanguageLabel = jasmine.createSpy('getLanguageLabel');
    });

    it('renders a select', function() {
        input.render(aComponent);

        var select = domContainer.getElementsByTagName('SELECT');
        expect(select.length).toEqual(1);
    });

    it('renders a textarea', function() {
        input.render(aComponent);

        var areas = domContainer.getElementsByTagName('TEXTAREA');
        expect(areas.length).toEqual(1);
    });

    it('renders the options', function() {
        input.render(aComponent);

        var options = domContainer.getElementsByTagName('SELECT')[0].getElementsByTagName('OPTION');
        expect(options.length).toEqual(2);
        expect(options[0].value).toEqual('optionA');
        expect(options[1].value).toEqual('optionB');
        expect(document.page.getLanguageLabel).toHaveBeenCalledWith('optionA');
        expect(document.page.getLanguageLabel).toHaveBeenCalledWith('optionB');
    });

    it('loads text for the initial selected option', function() {
        input.render(aComponent);

        var area = domContainer.getElementsByTagName('TEXTAREA')[0];

        expect(aComponent.getTextForOption).toHaveBeenCalledWith('optionA');
        expect(area.value).toEqual('a really long text');
    });

    it('when option changes, textarea render correct value', function() {
        input.render(aComponent);

        var select = domContainer.getElementsByTagName('SELECT')[0];
        CUORE.Dom.Event.fire(select, 'change');

        var area = domContainer.getElementsByTagName('TEXTAREA')[0];

        expect(aComponent.getTextForOption).toHaveBeenCalledWith('optionA');
        expect(area.value).toEqual('a really long text');
    });

    it('emits update event when text blur', function() {
        input.render(aComponent);

        var area = domContainer.getElementsByTagName('TEXTAREA')[0];

        CUORE.Dom.Event.fire(area, 'blur');

        expect(aComponent.updateOption).toHaveBeenCalledWith('optionA', 'a really long text');
    });
});