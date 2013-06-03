ZZ.Renderers.Image = CUORE.Class(CUORE.Renderer, {

  updateWhenDrawn: function(component) {
    ZZ.Renderers.Image.parent.updateWhenDrawn.call(this, component);
    var image = document.createElement('img');
    image.src = component.value;
    this.panel.appendChild(image);
  }



});