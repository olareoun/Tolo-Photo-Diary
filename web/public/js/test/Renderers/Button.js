describe("Button Renderer", function() {

  var container, aComponent;
  var aButton;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    aButton = new ZZ.Renderers.Button();
    container = TestHelper.createTestContainer();
    aButton.setContainer(container.id);

    aComponent = TestHelper.getDummyButton();
    this.addMatchers(CUORE.Matchers);
  });

  it("is a Cuore button renderer ", function() {
    expect(new ZZ.Renderers.Button()).toBeInstanceOf(CUORE.Renderers.Button);
  });

  it("is a Cuore button renderer ", function() {
    aButton.render(aComponent);
    var DOMElement = document.getElementById(container.id);
    var button = DOMElement.getElementsByTagName('button')[0];
    expect(button.childNodes).toBeEmpty();
  });

});