describe("ZZ.Pages.ZZBase", function() {

    var aPage;

    beforeEach(function() {
        aPage = new ZZ.Pages.ZZBase("http://www.zizerones.com");

        aPage.getComponentWithDOMId = function(id) {
            var selectedComponent = null;

            this.components.each(function(component) {
                if(component.getName() === id) selectedComponent = component;
            });

            return selectedComponent;
        };

        this.addMatchers(CUORE.Matchers);
    });

    it("inherits Page", function() {
        expect(aPage).toBeInstanceOf(CUORE.Page);
    });

    it("has an URL Service", function() {
        expect(aPage.getService("URL")).toBeInstanceOf(ZZ.Services.Url);
    });

    it("has an USERS Service", function() {
        expect(aPage.getService("USERS")).toBeInstanceOf(ZZ.Services.Users);
    });

    it("emits a login event when ready", function(){
        spyOn(CUORE.Bus, 'emit');
        aPage.initializeComponents();
        expect(CUORE.Bus.emit).toHaveBeenCalledWith('LOGIN_logged_CHANGED');
    });

    it("manages login", function() {
        aPage.login('aToken', {'id':'anID', 'name':'aName', 'email':'anEmail', 'granted': true});
        expect(aPage.isLogged()).toBeTruthy();
        expect(aPage.getToken()).toEqual('aToken');
        expect(aPage.getUserId()).toEqual('anID');
        expect(aPage.getUserFullname()).toEqual('aName');
        expect(aPage.getUserEmail()).toEqual('anEmail');
        expect(aPage.isUserGranted()).toEqual(true);
        expect(localStorage.getItem('session_token')).toEqual('aToken');
        expect(localStorage.getItem('session_user_id')).toEqual('anID');
        expect(localStorage.getItem('session_user_fullname')).toEqual('aName');
        expect(localStorage.getItem('session_user_email')).toEqual('anEmail');
        expect(localStorage.getItem('session_user_granted')).toEqual('true');
        aPage.logout();
        expect(aPage.isLogged()).toBeFalsy();
        expect(aPage.getToken()).toEqual(undefined);
        expect(aPage.getUserId()).toEqual(undefined);
        expect(aPage.getUserFullname()).toEqual(undefined);
        expect(aPage.getUserEmail()).toEqual(undefined);
        expect(aPage.isUserGranted()).toEqual(false);
        expect(localStorage.getItem('session_token')).toEqual(undefined);
        expect(localStorage.getItem('session_user_id')).toEqual(undefined);
        expect(localStorage.getItem('session_user_fullname')).toEqual(undefined);
        expect(localStorage.getItem('session_user_email')).toEqual(undefined);
        expect(localStorage.getItem('session_user_granted')).toEqual(undefined);
    });

    it("logouts when the token expires", function(){
        aPage.login('xxx_10_XXX', {'id':'anID', 'name':'aName', 'email':'anEmail', 'granted': true});

        aPage._secondsSinceEpoch = jasmine.createSpy().andReturn(111);
        aPage.onEnvironmentUp();
        expect(aPage.getToken()).toEqual('xxx_10_XXX');

        aPage._secondsSinceEpoch = jasmine.createSpy().andReturn(90000);
        aPage.onEnvironmentUp();
        expect(aPage.getToken()).toEqual(undefined);
    });

    describe("at instanciation", function() {
        beforeEach(function() {
            spyOn(aPage, 'addComponent');
            aPage.initializeComponents();
        });

        it("has a Card", function() {
            var component = aPage.getComponentWithDOMId('loginCard');
            expect(component).toBeInstanceOf(ZZ.Components.Card);
        });

        it("has a Register Button", function() {
            var component = aPage.getComponentWithDOMId('register');
            expect(component).toBeInstanceOf(ZZ.Components.RegisterMenuLink);
        });

        it("has a Add Group Button", function() {
            var component = aPage.getComponentWithDOMId('addGroup');
            expect(component).toBeInstanceOf(CUORE.Components.Link);
        });

        it("handles the login event", function(){
            var component = aPage.getComponentWithDOMId('addGroup');
            document.page = {};
            document.page.isLogged = jasmine.createSpy().andReturn(true);
            document.page.isUserGranted = jasmine.createSpy().andReturn(true);

            component.removeClass = jasmine.createSpy();

            component.eventDispatch('LOGIN_logged_CHANGED');

            expect(component.removeClass).toHaveBeenCalledWith('hidden');
        });

        it("has a Login Button", function() {
            var component = aPage.getComponentWithDOMId('login');
            expect(component).toBeInstanceOf(ZZ.Components.Login);
        });

        it('has a login modal', function() {
            var component = aPage.getComponentWithDOMId('modal-login');
            expect(component).toBeInstanceOf(ZZ.Components.Modal);
        });

        describe('has a login modal with', function() {
            it('a login input', function() {
                var component = aPage.getComponentWithDOMId('username');
                expect(component).toBeInstanceOf(ZZ.Components.Input);
            });
            it('a password input', function() {
                var component = aPage.getComponentWithDOMId('password');
                expect(component).toBeInstanceOf(ZZ.Components.Input);
            });
            it('a submit button', function() {
                var component = aPage.getComponentWithDOMId('modal-button');
                expect(component).toBeInstanceOf(ZZ.Components.ZButton);
            });
            it('a feedback', function() {
                var component = aPage.getComponentWithDOMId('modal-feedback');
                expect(component).toBeInstanceOf(ZZ.Components.Feedback);
            });
        });
    });

    describe("Modal component", function() {
        it('handles when login button is clicked', function() {
            var component = aPage.getComponentWithDOMId('modal-login');
            spyOn(component, 'show');

            component.eventDispatch("BUTTON_login_CLICKED", undefined);

            expect(component.show).toHaveBeenCalled();
        });

        it("activates when mandatories are signaled", function() {
            var component = aPage.getComponentWithDOMId('modal-button');
            component.enable = jasmine.createSpy();
            component.eventDispatch('CARD_loginCard_SATISFIED', undefined);
            expect(component.enable).toHaveBeenCalled();
        });

        it("deactivates when no mandatories are signaled", function() {
            var component = aPage.getComponentWithDOMId('modal-button');
            component.disable = jasmine.createSpy();
            component.eventDispatch('CARD_loginCard_UNSATISFIED', undefined);
            expect(component.disable).toHaveBeenCalled();
        });
    });


});