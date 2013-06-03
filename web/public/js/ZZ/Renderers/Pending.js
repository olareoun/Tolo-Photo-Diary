ZZ.Renderers.Pending = CUORE.Class(CUORE.Renderers.List, {

    init: function() {
        ZZ.Renderers.Pending.parent.init.call(this);
        this.setTagName('DIV');
    },

    updateWhenDrawn: function(component) {
        this.panel.innerHTML = "";
        for(var i = 0, len = component.size(); i < len; i++) {
            this._addItem(component.item(i), component, i);
        }
    },

    _addItem: function(item, component) {
        var DOMitem = CUORE.Dom.createElement('tr', null, this.panel);
        CUORE.Dom.addClass(DOMitem, ZZ.GUIDE_CLASS);

        var tdText = document.createElement('td');
        var text = this._createNameLabel(component, item);

        var tdActions = document.createElement('td');
        var acceptButton = this._createAcceptButton(component);
        var rejectButton = this._createRejectButton(component);
        var message = this._createMessageArea();
        var sendButton = this._createSendButton(component, item);

        tdText.appendChild(text);
        tdActions.appendChild(acceptButton);
        tdActions.appendChild(rejectButton);
        tdActions.appendChild(message);
        tdActions.appendChild(sendButton);

        DOMitem.appendChild(tdText);
        DOMitem.appendChild(tdActions);
    },

    _createNameLabel: function(component, item) {
        var text = document.createElement('a');
        text.innerHTML = item.name;
        text['data-username'] = item.username;

        CUORE.Dom.Event.add(text, 'click', function() {
            component.profile(text['data-username']);
        });

        return text;
    },

    _createAcceptButton: function(component) {
        return this._createActionButton(component.getAcceptText(), component.ACTION_ACCEPT);
    },

    _createRejectButton: function(component) {
        return this._createActionButton(component.getRejectText(), component.ACTION_REJECT);
    },

    _createActionButton: function(text, action) {
        var button = document.createElement('a');
        button.innerHTML = text;
        button.classList.add(ZZ.BUTTON_CLASS);

        CUORE.Dom.Event.add(button, 'click', function() {
            button.parentNode.querySelector('textarea').classList.remove(ZZ.DISABLED_CLASS);

            var sendButton = button.parentNode.querySelectorAll('a')[2];
            sendButton.classList.remove(ZZ.DISABLED_CLASS);
            sendButton['data-action'] = action;
        });

        return button;
    },

    _createMessageArea: function() {
        var text = document.createElement('textarea');
        text.className = ZZ.DISABLED_CLASS;
        return text;
    },

    _createSendButton: function(component, item) {
        var button = document.createElement('a');
        button.innerHTML = component.getSendText();
        button.classList.add('confirm');
        button.classList.add(ZZ.DISABLED_CLASS);
        button.classList.add(ZZ.BUTTON_CLASS);
        button['data-username'] = item.username;

        CUORE.Dom.Event.add(button, 'click', function() {
            var message = button.parentNode.querySelector('textarea').value;
            component.grant(button['data-action'], button['data-username'], message);
        });

        return button;
    }

});