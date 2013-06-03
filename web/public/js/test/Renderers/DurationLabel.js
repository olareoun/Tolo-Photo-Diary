describe("Duration Label", function() {

  var container, aComponent;
  var anDurationLabel;

  afterEach(function() {
    document.getElementById('xhtmlToTest').innerHTML = '';
  });

  beforeEach(function() {
    anDurationLabel = new ZZ.Renderers.DurationLabel();
    container = TestHelper.createTestContainer();
    anDurationLabel.setContainer(container.id);

     aComponent = TestHelper.getDummyComponent();
    
    aComponent.getValue = jasmine.createSpy().andReturn(120);
    aComponent.getText = jasmine.createSpy().andReturn('units');
    this.addMatchers(CUORE.Matchers);
  });

  it('shows a Label',function(){
    aComponent.getLabelText = jasmine.createSpy().andReturn('aLabel');

    anDurationLabel.render(aComponent);


    var DOMElement = document.getElementById(container.id);

    expect(DOMElement.innerHTML).toContain('aLabel');

  });

  it('show duration label', function(){
    aComponent.getValue = jasmine.createSpy().andReturn(125);
    anDurationLabel.render(aComponent);

    var DOMElement = document.getElementById(container.id);
    expect(DOMElement.innerHTML).toContain('2 units 5 units');


  });

});