CUORE.Dom.ready(function() {
     function translateLiterals(){
         var translator = document.createElement('span');
          translator.id='translator';
          document.getElementsByTagName('body')[0].appendChild(translator);
          
          var component = new CUORE.Component();
          document.page.addComponent(component, 'translator', CUORE.Behaviours.HIJACK); 
          var componentsToI18N = $('[data-i18nkey]');
      
        componentsToI18N.each(function(){
            var key = $(this).data('i18nkey');
            var element = this;
            
            var handler = new CUORE.Handler();
            handler.handle = function(message){
              $(element).html(message.answer.text); 
            }
            
            component.addHandler('LABELS_getLabel_EXECUTED_' + key, handler);
            component.setI18NKey(key);
        });     
     }

      CUORE.Bus.enableDebug();
      ZZ.labelsCache();

      document.page = new ZZ.Pages.Registration("");
      document.page.draw();
      
      translateLiterals();
});
