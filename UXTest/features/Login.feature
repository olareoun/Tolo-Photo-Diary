Feature: Login
    As              user
    I want 			to login
    in order to 	see my elections.

Scenario:
    Given   I am in the home page not logged
    When    I click in login link
    Then    I can see a login modal

Scenario:
    Given   I am in the home page logged
    When    I click in login link
    Then    I can not see a login modal

Scenario:
    Given   I am in the home page not logged
    When    I login with a wrong user
    Then    I can see an user not found error

Scenario:
    Given   I am in the home page not logged
    When    I login with a valid user
    Then    I can not see a login modal
