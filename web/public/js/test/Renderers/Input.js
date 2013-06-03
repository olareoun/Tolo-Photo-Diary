describe("Input", function() {

  var container, aComponent;
  var anInput;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    anInput = new ZZ.Renderers.Input();
    container = TestHelper.createTestContainer();
    anInput.setContainer(container.id);

    aComponent = TestHelper.getDummyInput();
    this.addMatchers(CUORE.Matchers);
  });

  it("is a Cuore input renderer ", function() {
    expect(new ZZ.Renderers.Input()).toBeInstanceOf(CUORE.Renderers.Input);
  });

  it("renders placeholder ", function() {
    anInput.render(aComponent);
    var input = getInput();
    expect(input.getAttribute('placeholder')).toEqual('aPlaceHolder');

  });

  it("renders name ", function() {
    anInput.render(aComponent);
    var input = getInput();
    expect(input.getAttribute('name')).toEqual('aName');

  });

  it("actualizes value on blur", function() {
    aComponent.setValue = jasmine.createSpy();

    anInput.render(aComponent);
    var input = getInput();
    CUORE.Dom.Event.hasEvents(input, 'blur').should.be.true;
    input.value = 'aValue';

    CUORE.Dom.Event.fire(input, 'blur');

    expect(aComponent.setValue).toHaveBeenCalledWith('aValue');

  });

  var getInput = function() {
      var DOMElement = document.getElementById(container.id);
      var input = DOMElement.getElementsByTagName('input')[0];
      return input;
    };
});