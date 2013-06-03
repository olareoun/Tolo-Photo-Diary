ZZ.Renderers.EligibleTextarea = CUORE.Class(ZZ.Renderers.Input, {

    paint: function(component) {
        ZZ.Renderers.EligibleTextarea.parent.paint.call(this, component);

        this._cleanOldInput();
        this._createText(component);
        this._createSelect(component);
    },
    
    updateWhenDrawn: function(component) {
        this.text.setAttribute('placeholder', component.getPlaceHolder());
        this.label.innerHTML = component.getInputText();

        this._updateSelectOptions(component);
        this._updateTextArea(component)();
    },

    _createSelect: function(component) {
        this.select = document.createElement('select');
        this.panel.appendChild(this.select);

        var updateTextArea = CUORE.Core.bind(this, this._updateTextArea(component));
        CUORE.Dom.Event.add(this.select, 'change', updateTextArea);
    },

    _cleanOldInput: function() {
        this.panel.removeChild(this.DOMInput);
    },

    _updateTextArea: function(component) {

        var self = this;
        return function() {
            if(self.select.children.length === 0) return;
            var selected = self.select.children[self.select.selectedIndex].value;
            self.text.value = component.getTextForOption(selected);
        };
    },


    _createText: function(component) {
        var text = document.createElement('textarea');
        this.panel.appendChild(text);

        var updateValue = CUORE.Core.bind(this, function() {
            var selected = this.select.children[this.select.selectedIndex].value;
            component.updateOption(selected, this.text.value);
        });
        CUORE.Dom.Event.add(text, 'blur', updateValue);

        this.text = text;
    },

    _updateSelectOptions: function(component) {
        this.select.innerHTML = '';
        var select = this.select;

        var options = component.getOptions();
        _.each(options, function(value) {
            var domOption = document.createElement('option');
            domOption.value = value;
            domOption.innerHTML = component.getText(document.page.getLanguageLabel(value));
            select.appendChild(domOption);
        });
    }
});