describe("Emblems Renderer", function() {

  var container, aComponent;
  var aList;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    aList = new ZZ.Renderers.Emblems();
    container = TestHelper.createTestContainer();
    aList.setContainer(container.id);

    aComponent = TestHelper.getDummyList();
    aComponent.fillList = jasmine.createSpy();
    aComponent.list = jasmine.createSpy().andReturn(['aValue', 'anotherValue']);
    this.addMatchers(CUORE.Matchers);
  });

  it("is a Cuore list renderer ", function() {
    expect(new ZZ.Renderers.Emblems()).toBeInstanceOf(CUORE.Renderers.List);
  });

  it("is a Cuore list renderer with a list", function() {
    aList.render(aComponent);
    var DOMElement = document.getElementById(container.id);
    var list = DOMElement.getElementsByTagName('ul')[0];
    expect(list.childNodes).toBeEmpty();

  });


});