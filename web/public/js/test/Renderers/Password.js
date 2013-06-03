describe("Password", function() {

  var container, aComponent;
  var anInput;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    anInput = new ZZ.Renderers.Password();
    container = TestHelper.createTestContainer();
    anInput.setContainer(container.id);

    aComponent = TestHelper.getDummyInput();
    aComponent.type = 'password';
    aComponent.getText = jasmine.createSpy().andReturn("aText");
    aComponent.getValue = jasmine.createSpy().andReturn("");
    aComponent.setValue = jasmine.createSpy();
    this.addMatchers(CUORE.Matchers);
  });

  it("is a ZZ input renderer ", function() {
    expect(new ZZ.Renderers.Password()).toBeInstanceOf(ZZ.Renderers.Input);
  });

  it("renders with type password ", function() {
    anInput.render(aComponent);
    var input = getMainInput();
    expect(input.type).toEqual('password');

  });

  it("renders a type text that doesnot shows ", function() {
    anInput.render(aComponent);
    var input = getPlainInput();
    expect(input.type).toEqual('text');
    expect(input).toContainClass('hidden');
  });

  it("renders a checkbox with a label ", function() {
    anInput.render(aComponent);
    var check = getCheckbox();
    var label = getLabel();
    expect(check.type).toEqual('checkbox');
    expect(label.innerHTML).toEqual('aText');
  });

  it("switches visibility of inputs on checkin ", function() {
    anInput.render(aComponent);
    var check = getCheckbox();
    var main = getMainInput();
    var plain = getPlainInput();
    check.setAttribute('checked', true);
    CUORE.Dom.Event.fire(check, 'change');
    expect(main).toContainClass('hidden');
    expect(plain).not.toContainClass('hidden');
  });

  it("syncs value between inputs ", function() {
    aComponent.getValue = jasmine.createSpy().andReturn("aValue");
    anInput.render(aComponent);
    var main = getMainInput();
    var plain = getPlainInput();
    expect(main.value).toEqual('aValue');
    expect(plain.value).toEqual('aValue');
  });

  it("actualizes values on blur", function() {
    aComponent.setValue = jasmine.createSpy();
    anInput.render(aComponent);
    var main = getMainInput();
    var plain = getPlainInput();
    expect(CUORE.Dom.Event.hasEvents(main, 'blur')).toBeTruthy();
    expect(CUORE.Dom.Event.hasEvents(plain, 'blur')).toBeTruthy();
    main.value = 'aValue';
    CUORE.Dom.Event.fire(main, 'blur');
    plain.value = 'anotherValue';
    CUORE.Dom.Event.fire(plain, 'blur');
    expect(aComponent.setValue).toHaveBeenCalledWith('aValue');
    expect(aComponent.setValue).toHaveBeenCalledWith('anotherValue');
  });

  var getInput = function(number) {
      var DOMElement = document.getElementById(container.id);
      var input = DOMElement.getElementsByTagName('input')[number];
      return input;
    };
  var getLabel = function() {
      var DOMElement = document.getElementById(container.id);
      var input = DOMElement.getElementsByTagName('span')[0];
      return input;
    };
  var getMainInput = function() {
      return getInput(0);
    };

  var getPlainInput = function() {
      return getInput(1);
    };

  var getCheckbox = function() {
      return getInput(2);
    };
});