ZZ.Renderers.PendingProfile = CUORE.Class(CUORE.Renderer, {

    updateWhenDrawn: function(component) {
        ZZ.Renderers.PendingProfile.parent.updateWhenDrawn.call(this, component);
        this.panel.innerHTML = '';

        var profile = component.getProfile();

        if(!profile) this.panel.innerHTML = component.getText(ZZ.NO_SELECTED_KEY);

        var self = this;
        _.each(profile, function(value, key) {
            var row = document.createElement('tr');

            var propertyKey = document.createElement('th');
            propertyKey.innerHTML = key;
            row.appendChild(propertyKey);

            var propertyValue = document.createElement('td');
            propertyValue.innerHTML = JSON.stringify(value);
            row.appendChild(propertyValue);

            self.panel.appendChild(row);
        });
    }

});