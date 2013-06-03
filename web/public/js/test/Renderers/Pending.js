describe("Pending Renderer", function() {
    var aComponent, aContainer;
    var aPending;

    afterEach(function() {
        document.getElementById('xhtmlToTest').innerHTML = '';
    });

    beforeEach(function() {
        aPending = new ZZ.Renderers.Pending();

        aContainer = TestHelper.createTestContainer();
        aPending.setContainer(aContainer.id);

        aComponent = TestHelper.getDummyComponent();
        aComponent.size = jasmine.createSpy().andReturn(5);
        aComponent.item = jasmine.createSpy().andReturn({
            'name': 'Pepe Smith',
            'username': '1234'
        });

        aComponent.getAcceptText = jasmine.createSpy('accept guide');
        aComponent.getRejectText = jasmine.createSpy('reject guide');
        aComponent.getSendText = jasmine.createSpy('send');
        aComponent.grant = jasmine.createSpy('grant');
        aComponent.profile = jasmine.createSpy('profile');
        aComponent.ACTION_ACCEPT = 'accept';
        aComponent.ACTION_REJECT = 'reject';

        this.addMatchers(CUORE.Matchers);
    });

    it("is a Cuore renderer ", function() {
        expect(aPending).toBeInstanceOf(CUORE.Renderers.List);
    });

    it("renders list in a tr", function() {
        aComponent.doYouHijack = jasmine.createSpy().andReturn(false);
        aPending.render(aComponent);
        var firstChild = aContainer.childNodes[0];
        expect(firstChild.tagName).toEqual('DIV');
    });

    it("renders each item as guide", function() {
        aPending.render(aComponent);
        expect(aContainer.childNodes.length).toEqual(5);
        expect(aContainer.firstChild).toContainClass('guide');
        expect(aContainer.firstChild.tagName).toEqual('TR');
    });

    it("renders accept and reject button", function() {
        aPending.render(aComponent);
        var anItem = aContainer.firstChild;

        expect(acceptButton(anItem)).toBeDefined();
        expect(rejectButton(anItem)).toBeDefined();

        expect(aComponent.getAcceptText).toHaveBeenCalled();
        expect(aComponent.getRejectText).toHaveBeenCalled();
    });

    it("renders a text area that is hidden", function() {
        aPending.render(aComponent);
        var anItem = aContainer.firstChild;

        var textarea = textArea(anItem);
        expect(textarea.classList.contains('hidden')).toBeTruthy();
    });


    it("renders a button to confirm that is hidden", function() {
        aPending.render(aComponent);
        var anItem = aContainer.firstChild;

        expect(sendButton(anItem).classList.contains('hidden')).toBeTruthy();
    });

    it("enables textarea and sendbutton when acceptbutton clicked", function() {
        aPending.render(aComponent);
        var anItem = aContainer.firstChild;

        CUORE.Dom.Event.fire(acceptButton(anItem), 'click');

        expect(sendButton(anItem).classList.contains('hidden')).toBeFalsy();
        expect(textArea(anItem).classList.contains('hidden')).toBeFalsy();
    });

    it("enables textarea and sendbutton when rejectbutton clicked", function() {
        aPending.render(aComponent);
        var anItem = aContainer.firstChild;

        CUORE.Dom.Event.fire(rejectButton(anItem), 'click');

        expect(sendButton(anItem).classList.contains('hidden')).toBeFalsy();
        expect(textArea(anItem).classList.contains('hidden')).toBeFalsy();
    });

    it("sets the action to the send button", function() {
        aPending.render(aComponent);
        var anItem = aContainer.firstChild;

        CUORE.Dom.Event.fire(acceptButton(anItem), 'click');
        expect(sendButton(anItem)['data-action']).toEqual('accept');

        CUORE.Dom.Event.fire(rejectButton(anItem), 'click');
        expect(sendButton(anItem)['data-action']).toEqual('reject');
    });

    it("sets the guide identity to the send button", function() {
        aPending.render(aComponent);
        var anItem = aContainer.firstChild;

        expect(sendButton(anItem)['data-username']).toEqual('1234');
    });

    it("send button calls the component", function() {
        aPending.render(aComponent);
        var anItem = aContainer.firstChild;

        CUORE.Dom.Event.fire(acceptButton(anItem), 'click');
        textArea(anItem).value = 'some text to the guide'

        CUORE.Dom.Event.fire(sendButton(anItem), 'click');

        expect(aComponent.grant).toHaveBeenCalledWith('accept', '1234', 'some text to the guide');
    });

    it("the name link calls the component", function() {
        aPending.render(aComponent);
        var name = aContainer.querySelector('tr:nth-child(1) td:nth-child(1) a');

        CUORE.Dom.Event.fire(name, 'click');

        expect(aComponent.profile).toHaveBeenCalledWith('1234');
    });

    var acceptButton = function(row){
        return row.children[1].getElementsByTagName('A')[0];
    };

    var rejectButton = function(row){
        return row.children[1].getElementsByTagName('A')[1];
    };

    var textArea = function(row){
        return row.children[1].getElementsByTagName('TEXTAREA')[0];
    };

    var sendButton = function(row){
        return row.children[1].getElementsByTagName('A')[2];
    };





});