ZZ.Components.RegisterCard = CUORE.Class(ZZ.Components.Card, {

    init: function() {
        ZZ.Components.RegisterCard.parent.init.call(this);
        this.addExecHandler('GUIDES_add_EXECUTED', 'doLoginOnSuccess');
        this.addExecHandler('USERS_login_EXECUTED', 'doRedirectOnSuccess');
    },

    doLoginOnSuccess: function(aMessage) {
        if(this._isSentEmail(aMessage)) {
            return;
        }
        this.execute('USERS', 'login', this._loginValues());
    },

    doRedirectOnSuccess: function(aMessage) {
        if(! aMessage.getFromAnswer('error')){this._redirectToProfile();}
    },

    _loginValues: function() {
        return {
            'username': this.currentValues.email,
            'password': this.currentValues.password
        };
    },

    _isSentEmail: function(aMessage) {
        return(aMessage.getFromAnswer('email') !== this.currentValues.email);
    },

    _areMandatoriesSatisfied: function() {
        var mandatoriesAreFilled = ZZ.Components.RegisterCard.parent._areMandatoriesSatisfied.call(this);
        var email_regex = /^[a-zA-Z0-9._\-]+@([a-zA-Z0-9.\-]+\.)+[a-zA-Z0-9.\-]{2,4}$/;
        var emailIsValid = this.currentValues.email && this.currentValues.email.match(email_regex);
        return mandatoriesAreFilled && emailIsValid;
    },

    _redirectToProfile: function() {
        window.setTimeout(function() {
            window.location.href = 'profile.html';
        }, 2000);
    }
});