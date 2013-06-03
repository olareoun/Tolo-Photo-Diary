ZZ.Services.Guides = CUORE.Class(ZZ.Services.Authenticated, {

    init: function() {
        ZZ.Services.Guides.parent.init.call(this);
        this.name = 'GUIDES';
    },

    add: function(params, eventName) {
        this._callService('/add', params, eventName);
    },

    update: function(params, eventName) {
        this._callService('/update', params, eventName);
    },

    get: function(params, eventName) {
        this._callService('/profile', params, eventName);
    },

    getBaseURL: function() {
        return this.baseURL + '/' + ZZ.GUIDES_PATH;
    },

    _callService: function(service, params, eventName) {
        var url = this.getBaseURL() + service;
        this.request(url, params, eventName);
    }

});