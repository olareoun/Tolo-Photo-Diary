ZZ.Services.Users = CUORE.Class(ZZ.Services.Authenticated, {

    init: function() {
        ZZ.Services.Users.parent.init.call(this);
        this.name = 'USERS';
    },

    login: function(params, eventName) {
        var url = this.getBaseURL() + '/login';
        this.request(url, params, eventName);
    },

    logout: function(params, eventName) {
        document.page.logout();
        CUORE.Bus.emit(eventName, undefined);
    },

    pending: function(params, eventName) {
        var url = this.getBaseURL() + '/admin/pending';
        this.request(url, params, eventName);
    },

    grantAccess: function(params, eventName) {
        params.grant = true;
        this._grant(params, eventName);
    },

    rejectAccess: function(params, eventName) {
        params.grant = false;
        this._grant(params, eventName);
    },

    _grant: function(params, eventName) {
        var url = this.getBaseURL() + '/admin/grant';
        this.request(url, params, eventName);
    },

    getBaseURL: function() {
        return this.baseURL + '/' + ZZ.AUTH_PATH;
    }
});