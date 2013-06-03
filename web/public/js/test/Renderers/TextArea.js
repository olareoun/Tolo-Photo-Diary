describe("TextArea", function() {

  var container, aComponent;
  var aTextArea = new ZZ.Renderers.TextArea();

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    container = TestHelper.createTestContainer();
    aTextArea.setContainer(container.id);

    aComponent = TestHelper.getDummyInput();
    this.addMatchers(CUORE.Matchers);
  });

  it("is a ZZ input renderer ", function() {
    expect(new ZZ.Renderers.TextArea()).toBeInstanceOf(ZZ.Renderers.Input);
  });

  it("renders a textArea", function() {
    aTextArea.render(aComponent);

    var DOMElement = document.getElementById(container.id);
    var area = DOMElement.getElementsByTagName('textarea')[0];

    expect(area).toBeDefined();
  });


});