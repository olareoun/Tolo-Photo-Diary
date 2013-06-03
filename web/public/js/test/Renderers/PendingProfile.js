describe("PendingProfile Renderer", function() {

  var container, aComponent;
  var renderer;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    renderer = new ZZ.Renderers.PendingProfile();
    container = TestHelper.createTestContainer();
    renderer.setContainer(container.id);

    aComponent = TestHelper.getDummyComponent();
    aComponent.getProfile = jasmine.createSpy('profile').andReturn({name: 'Pepico'});
    this.addMatchers(CUORE.Matchers);
  });

  it("renders the properties of the profile", function() {
    renderer.render(aComponent);
    var panel = document.getElementById(container.id);

    var key = panel.querySelector('tr:nth-child(1) th:nth-child(1)');
    var value = panel.querySelector('tr:nth-child(1) td:nth-child(2)');

    expect(key.innerHTML).toEqual('name');
    expect(value.innerHTML).toEqual('"Pepico"');
  });

});