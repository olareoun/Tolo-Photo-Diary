describe("Modal", function() {

  var container, aComponent;
  var aModal;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    aModal = new ZZ.Renderers.Modal();
    container = TestHelper.createTestContainer();
    aModal.setContainer(container.id);

    aComponent = TestHelper.getDummyComponent();
    document.page = {};
    document.page.addComponent = jasmine.createSpy('addComponent');

    this.addMatchers(CUORE.Matchers);
  });

  it('is a Cuore renderer ', function() {
    expect(new ZZ.Renderers.Modal()).toBeInstanceOf(CUORE.Renderer);
  });

  it('has modal default classes and attributes', function() {
    aModal.render(aComponent);
    expect(container).toContainClass('modal');
    expect(container).toContainClass('hide');
    expect(container).toContainClass('fade');
    expect(container.getAttribute('role')).toEqual('dialog');
    expect(container.getAttribute('aria-labelledby')).toEqual('login');
    expect(container.getAttribute('aria-hidden')).toBeTruthy();
  });

});