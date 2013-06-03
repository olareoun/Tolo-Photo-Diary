describe("Feedback", function() {

    var aComponent;

    beforeEach(function() {
        aComponent = new ZZ.Components.NewGroupFeedback();
        this.addMatchers(CUORE.Matchers);
        spyComponent();
    });

    it("inherits LabelPanel", function() {
        expect(aComponent).toBeInstanceOf(CUORE.Components.LabelPanel);
    });

    it("has its own renderer", function() {
        expect(aComponent.renderer).toBeInstanceOf(ZZ.Renderers.Feedback);
    });

    it("can add a success notification with a message key ", function() {
        var aMessage=new CUORE.Message();
        aMessage.putOnAnswer('result','tal');
        aComponent.addMessage(aMessage);

        expect(aComponent.addClass).toHaveBeenCalledWith('alert-success');
        expect(aComponent.updateRender).toHaveBeenCalled();
        expect(aComponent.setI18NKey).toHaveBeenCalled();
        expect(aComponent.isEnabled()).toBeTruthy();
    });

    it("can add an error notification with a message key ", function() {
        var aMessage=new CUORE.Message();
        aMessage.putOnAnswer('error','tal');
        aComponent.addMessage(aMessage);

        expect(aComponent.addClass).toHaveBeenCalledWith('alert-error');
        expect(aComponent.updateRender).toHaveBeenCalled();
        expect(aComponent.setI18NKey).toHaveBeenCalledWith('tal');
        expect(aComponent.isEnabled()).toBeTruthy();
    });

    it("starts disabled", function() {
        expect(aComponent.isEnabled()).toBeFalsy();
    });

    it("can be dismiss", function() {
        aComponent.dismiss();
        expect(aComponent.isEnabled()).toBeFalsy();
        expect(aComponent.removeClass).toHaveBeenCalledWith('alert-success');
        expect(aComponent.updateRender).toHaveBeenCalled();
    });

    var spyComponent =function() {
        aComponent.removeClass = jasmine.createSpy();
        aComponent.addClass = jasmine.createSpy();
        aComponent.updateRender = jasmine.createSpy();
        aComponent.setI18NKey = jasmine.createSpy();
    }
});