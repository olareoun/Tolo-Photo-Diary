describe("CheckedNumeric", function() {

  var container, aComponent;
  var anInput;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    anInput = new ZZ.Renderers.CheckedNumeric();
    container = TestHelper.createTestContainer();
    anInput.setContainer(container.id);

    aComponent = TestHelper.getDummyInput();
    aComponent.getText = jasmine.createSpy().andReturn("aText");
    aComponent.getValue = jasmine.createSpy().andReturn("");
    aComponent.setValue = jasmine.createSpy();
    aComponent.disable = jasmine.createSpy();
    aComponent.enable = jasmine.createSpy();
    this.addMatchers(CUORE.Matchers);
  });

  it("is a ZZ CheckedNumeric renderer ", function() {
    expect(new ZZ.Renderers.CheckedNumeric()).toBeInstanceOf(CUORE.Renderers.NumericSelector);
  });

  it("renders a checkbox with a label ", function() {
    anInput.render(aComponent);
    var check = getCheckbox();
    var label = getLabel();
    expect(check.type).toEqual('checkbox');
    expect(label.innerHTML).toEqual('aText');
  });

  it("switches enabled component on checkin ", function() {
    
    anInput.render(aComponent);
    var check = getCheckbox();
    check.setAttribute('checked', true);
    CUORE.Dom.Event.fire(check, 'change');
    expect(aComponent.enable).toHaveBeenCalled();
  });

  it("switches disabled component on checkin ", function() {
    
    anInput.render(aComponent);
    var check = getCheckbox();
    check.removeAttribute('checked');
    CUORE.Dom.Event.fire(check, 'change');
    expect(aComponent.disable).toHaveBeenCalled();
  });


  var getInput = function(number) {
    var DOMElement = document.getElementById(container.id);
    var input = DOMElement.getElementsByTagName('input')[number];
    return input;
  };
  var getLabel = function() {
    var DOMElement = document.getElementById(container.id);
    var input = DOMElement.getElementsByTagName('span')[3];
    return input;
  };

  var getCheckbox = function() {
    return getInput(1);
  };
});
