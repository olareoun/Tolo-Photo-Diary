describe("Login", function() {

  var container, aComponent;
  var anInput;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    aLogin = new ZZ.Renderers.Login();
    container = TestHelper.createTestContainer();
    aLogin.setContainer(container.id);

    aComponent = TestHelper.getDummyComponent();
    this.addMatchers(CUORE.Matchers);
  });

  it("is a Cuore input renderer ", function() {
    expect(new ZZ.Renderers.Login()).toBeInstanceOf(CUORE.Renderers.Link);
  });

  it(" emmits a logout when clicked and logged", function() {
    aComponent.execute = jasmine.createSpy();
    aComponent.logged=jasmine.createSpy().andReturn(true);
    aLogin.render(aComponent);
    var DOMElement = document.getElementById(container.id);
    var anchor = DOMElement.getElementsByTagName('a')[0];
    CUORE.Dom.Event.fire(anchor,'click');
    expect(aComponent.execute).toHaveBeenCalledWith('USERS','logout',undefined, true);
  });

  it(" emmits a login when clicked and not logged", function() {
    CUORE.Bus.emit=jasmine.createSpy();
    aComponent.logged=jasmine.createSpy().andReturn(false);
    aLogin.render(aComponent);
    var DOMElement = document.getElementById(container.id);
    var anchor = DOMElement.getElementsByTagName('a')[0];
    CUORE.Dom.Event.fire(anchor,'click');
    expect(CUORE.Bus.emit).toHaveBeenCalledWith('BUTTON_login_CLICKED',undefined);
  });


});