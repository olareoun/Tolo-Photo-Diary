ZZ.Renderers.River = CUORE.Class(CUORE.Renderer, {

	init: function() {
		ZZ.Renderers.River.parent.init.call(this);
		this.numberOfGroups = 0;
		this.rows = [];
	},

	paint: function(component) {
		ZZ.Renderers.River.parent.paint.call(this, component);
		this._addRowsContainer();
		this._addLoading(component);
	},

	updateWhenDrawn: function(component) {
		this._removeAllRows(component.groups());

		var startNumber = this.numberOfGroups;

		this._updateLoadingState(component);
		this._addGroups(component);
		this._addRowsToPanel();
		this._drawGroups(component, startNumber);
	},

	_addRowsContainer: function() {
		var DOMitem = CUORE.Dom.createElement('span', null, this.container);
		this.rowContainer = DOMitem;

	},

	_addLoading: function(component) {
		var DOMitem = CUORE.Dom.createElement('div', null, this.container);
		CUORE.Dom.addClass(DOMitem, ZZ.PROMINENT_CLASS);
		CUORE.Dom.addClass(DOMitem, 'loading');
		var banner = CUORE.Dom.createElement('h3', null, DOMitem);
		banner.innerHTML = component.getLoadingText();
		this.loading = DOMitem;
	},

	_removeAllRows: function(groups) {
		if(groups.length > 0) return;

		_.each(this.rows, function(row){
			if(row.parentNode)
				row.parentNode.removeChild(row);
			
		}, this);
		this.numberOfGroups = 0;
		this.rows = [];
	},

	_drawGroups: function(component, startNumber) {
		var daGroups = component.groups();

		for(var i = startNumber; i < daGroups.length; i++) {
			daGroups[i].draw();
		}
	},

	_addRowsToPanel: function() {
		_.each(this.rows, function(row){
			this.rowContainer.appendChild(row);
		}, this);
	},

	_addGroups: function(component) {

		var startNumber = this.numberOfGroups;
		var daGroups = component.groups();
		var numberOfRows = this.rows.length;

		var row = this._newRow(this.rows.length + 1);
		var groupsAddedInRow = 0;

		if(this._thereIsARowStarted()) {
			row = this.rows[numberOfRows - 1];
			groupsAddedInRow = row.children.length;
		}

		for(var i = startNumber; i < daGroups.length; i++) {

			daGroups[i].setContainer(row.id);

			this.numberOfGroups++;
			groupsAddedInRow++;

			if(groupsAddedInRow == ZZ.GROUPS_BY_ROW) {
				this.rows.push(row);
				row = this._newRow(this.rows.length + 1);
				groupsAddedInRow = 0;
			}

		}

		if(groupsAddedInRow > 0) this.rows.push(row);
	},

	_thereIsARowStarted: function() {
		var numberOfRows = this.rows.length;
		if(numberOfRows < 1) return false;
		var lastRow = this.rows[numberOfRows - 1];
		return lastRow.children.length < ZZ.GROUPS_BY_ROW;
	},

	_newRow: function(rowNumber) {
		var row = CUORE.Dom.createElement('div', {
			'className': ZZ.FLUID_ROW_CLASS,
			'id': 'riverrow' + rowNumber
		}, null);
		return row;
	},

	_updateLoadingState: function(component) {
		CUORE.Dom.removeClass(this.loading, ZZ.DISABLED_CLASS);
		if(!component.isLoading()) {
			CUORE.Dom.addClass(this.loading, ZZ.DISABLED_CLASS);
		}

	}
});