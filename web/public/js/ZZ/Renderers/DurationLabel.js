ZZ.Renderers.DurationLabel = CUORE.Class(CUORE.Renderers.LabelPanel, {

	updateWhenDrawn: function(component) {
        ZZ.Renderers.DurationLabel.parent.updateWhenDrawn.call(this, component);

        if(!component.getValue())
			return;
        var hours = Math.floor(component.getValue()/60);
		var minutes = component.getValue()%60;
		var text = '';
		if (hours>0){
			text =  hours.toString() + ' ' + component.getText('zizerones.home.hours')+' ';
		}
		if(minutes>0){
			text += minutes.toString() + ' ' +  component.getText('zizerones.home.minutes');
		}
		this.panel.innerHTML += ' '+text;



    }


});