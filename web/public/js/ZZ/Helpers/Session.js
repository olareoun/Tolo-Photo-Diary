ZZ.Helpers.Session = (function() {

    var USERID_KEY = 'userid';
    var TOKEN_KEY = 'token';

    function getFromLocalStorage(key) {
        return localStorage.getItem(key) || '';
    }

    function getAuthData() {
        return {
            'userid': getFromLocalStorage('session_user_id') || '',
            'userEmail': getFromLocalStorage('session_user_email') || '',
            'token': getFromLocalStorage('session_token') || ''
        };
    }

    return {
        getAuthData: getAuthData
    };
}());