CUORE.Dom.ready(function() {

  CUORE.Bus.enableDebug();

  ZZ.labelsCache();

  document.page = new ZZ.Pages.Profile("");
  document.page.draw();
});
