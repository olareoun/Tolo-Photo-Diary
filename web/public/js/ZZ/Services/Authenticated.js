ZZ.Services.Authenticated = CUORE.Class(CUORE.Service, {

    init: function() {
        ZZ.Services.Authenticated.parent.init.call(this);
    },

    wrapRequestParams: function(params) {
        var theMessage = new CUORE.Message();
        theMessage.putMapOnQuery(params);

        theMessage = this._setHeader(theMessage);
        return theMessage.asJson();
    },

    _setHeader: function(theMessage) {
        var data = ZZ.Helpers.Session.getAuthData();

        theMessage.putOnHeader('username', data.userEmail);
        theMessage.putOnHeader('token', data.token);

        return theMessage;
    }

});