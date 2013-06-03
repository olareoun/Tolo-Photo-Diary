TestHelper = {

	createTestContainer: function() {
		var container = document.createElement('div');
		container.id = "testingContainer";
		var panel = document.getElementById("xhtmlToTest");
		panel.appendChild(container);

		return container;
	},

	getDummyComponent: function() {
		var aComponent = {};

		aComponent.isEnabled = jasmine.createSpy().andReturn(true);
		aComponent.getLabelText = jasmine.createSpy().andReturn('anyText');
		aComponent.doYouReplace = jasmine.createSpy().andReturn(true);
		aComponent.doYouHijack = jasmine.createSpy().andReturn(true);
		aComponent.getContainer = jasmine.createSpy().andReturn("testingContainer");
		aComponent.getURL = jasmine.createSpy().andReturn('anyURL');
		aComponent.getName = jasmine.createSpy().andReturn('aName');

		return aComponent;
	},

	getDummyButton: function() {
		var aComponent = this.getDummyComponent();
		aComponent.getButtonName = jasmine.createSpy().andReturn('');
		aComponent.getName = jasmine.createSpy().andReturn('');
		aComponent.getButtonText = jasmine.createSpy().andReturn('');
		aComponent.behave = jasmine.createSpy();
		aComponent.doYouHijack = jasmine.createSpy().andReturn(false);
		return aComponent;
	},

	getDummyInput: function() {
		var aComponent = this.getDummyComponent();
		aComponent.doYouHijack = jasmine.createSpy().andReturn(false);
		aComponent.getName = jasmine.createSpy().andReturn('aName');
		aComponent.getInputText = jasmine.createSpy().andReturn('aName');
		aComponent.getFormName = jasmine.createSpy().andReturn('aName');
		aComponent.getPlaceHolder = jasmine.createSpy().andReturn('aPlaceHolder');

		return aComponent;
	},

	getDummyList: function() {
		var aComponent = this.getDummyComponent();
		aComponent.doYouHijack = jasmine.createSpy().andReturn(false);
		aComponent.getName = jasmine.createSpy().andReturn('aName');
		aComponent.size = jasmine.createSpy().andReturn(0);
		aComponent.item = jasmine.createSpy().andReturn('anItem');

		return aComponent;
	},


	useFakeXMLHttpRequest: function() {
		xhr = sinon.useFakeXMLHttpRequest();
		requests = [];
		xhr.onCreate = function(xhr) {
			requests.push(xhr);
		};
		CUORE.Core.createXHR = jasmine.createSpy().andReturn(xhr);
	},

	lastRequest: function() {
		var last = requests[requests.length - 1];
		return last;
	},

	restoreFakeXMLHttpRequest: function() {
		xhr.restore();
	}
};