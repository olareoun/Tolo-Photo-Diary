describe("Group Renderer", function() {

  var container, aComponent;
  var aGroup;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    aGroup = new ZZ.Renderers.Group();
    container = TestHelper.createTestContainer();
    aGroup.setContainer(container.id);

    aComponent = TestHelper.getDummyComponent();
    aComponent.date=jasmine.createSpy().andReturn('01-01');
    aComponent.month=jasmine.createSpy().andReturn('Ene');
    aComponent.city=jasmine.createSpy().andReturn('aCity');
    aComponent.price=jasmine.createSpy().andReturn('aPrice');
    aComponent.description=jasmine.createSpy().andReturn('aDescription');
    aComponent.image=jasmine.createSpy().andReturn('aImage');
    aComponent.language=jasmine.createSpy().andReturn('aLanguage');
    aComponent.emblems=jasmine.createSpy().andReturn(['anEmblem']);
    aComponent.image=jasmine.createSpy().andReturn('aImage');
    aComponent.minimum=jasmine.createSpy().andReturn(120);
    aComponent.time = jasmine.createSpy().andReturn('time');
    aComponent.getText=jasmine.createSpy().andReturn('hours');
    aComponent.moreInfoLabel=jasmine.createSpy().andReturn('moreInfo');
    aComponent.signedLabel=jasmine.createSpy().andReturn('signedLabel');
    aComponent.minimumLabel=jasmine.createSpy().andReturn('minimumLabel');
    aComponent.isLoggedUserTheAdmin=jasmine.createSpy().andReturn(false);
    aComponent.redirectToGroup=jasmine.createSpy();
    this.addMatchers(CUORE.Matchers);
  });

  it("is a Cuore renderer ", function() {
    expect(new ZZ.Renderers.Group()).toBeInstanceOf(CUORE.Renderer);
  });

  it("renders with correct classes", function() {
    aGroup.render(aComponent);
    var DOMElement = document.getElementById(container.id).firstChild;
    expect(DOMElement).toContainClass('span4');
    expect(DOMElement).toContainClass('thumbnail');
    expect(DOMElement).toContainClass('group');
  });

  it("renders the date", function() {
    aGroup.render(aComponent);
    var DOMElement = document.getElementById(container.id).firstChild;
    var date = DOMElement.getElementsByTagName('div');

    expect(date[0].textContent).toContain('01Ene');
  });

  it("renders the city", function() {
    aGroup.render(aComponent);
    var DOMElement = document.getElementById(container.id).firstChild;
    var city = DOMElement.getElementsByTagName('h2');
    expect(city[0].textContent).toEqual('aCity');
  });

  it("renders the minimum", function() {
    aGroup.render(aComponent);
    var DOMElement = document.getElementById(container.id).firstChild;
    var minimum = DOMElement.querySelector('.minimum');
    expect(minimum.innerHTML).toEqual('120');
  });

  it("renders the description", function() {
    aGroup.render(aComponent);
    var DOMElement = document.getElementById(container.id).firstChild;
    var description = DOMElement.getElementsByTagName('p');
    expect(description[0].textContent).toEqual('aDescription');
  });

  it("renders the emblems", function() {
    aGroup.render(aComponent);
    var DOMElement = document.getElementById(container.id).firstChild;
    var emblem = DOMElement.getElementsByTagName('li');
    expect(emblem[0].title).toEqual('anEmblem');
  });


  it("renders more info link", function() {
    aGroup.render(aComponent);
    var DOMElement = document.getElementById(container.id).firstChild;
    var moreInfo = DOMElement.getElementsByTagName('a')[0];
    expect(moreInfo.textContent).toEqual('moreInfo');

    CUORE.Dom.Event.hasEvents(moreInfo, 'click').should.be.true;

    CUORE.Dom.Event.fire(moreInfo, 'click');
    expect(aComponent.redirectToGroup).toHaveBeenCalled();
  });
});
