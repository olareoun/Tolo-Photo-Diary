describe("Feedback Renderer", function() {

  var container, aComponent;
  var aFeedback;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    aFeedback = new ZZ.Renderers.Feedback();
    container = TestHelper.createTestContainer();
    aFeedback.setContainer(container.id);

    aComponent = TestHelper.getDummyComponent();
    this.addMatchers(CUORE.Matchers);
  });

  it("is a Cuore labelPanel renderer ", function() {
    expect(new ZZ.Renderers.Feedback() instanceof CUORE.Renderers.LabelPanel).toBeTruthy();
  });

  it("renders disabled with a 'hidden' class ", function() {
    aComponent.isEnabled = jasmine.createSpy().andReturn(false);
    aFeedback.render(aComponent);
    var DOMElement = document.getElementById(container.id);
    expect(DOMElement).toContainClass('hidden');
  });

  it("dismiss on click", function() {
    aComponent.dismiss = jasmine.createSpy();

    aFeedback.render(aComponent);
    var feedback = document.getElementById(container.id);
    CUORE.Dom.Event.hasEvents(feedback, 'click').should.be.true;
    CUORE.Dom.Event.fire(feedback, 'click');

    expect(aComponent.dismiss).toHaveBeenCalled();

  });

});