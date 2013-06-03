Feature: Register as zizerones
    As zizerone
    I want to register
    In order to be able to create groups and make offers.

Background: At registration Page
    Given   I am in the home page not logged
    And     I want to register a zizerones

Scenario:
    Then    I am in the 'registration' page

Scenario: no filled fields
    Then    the registration button is disabled

Scenario: all mandatories filled
    When    I fill the registration mandatory fields
    Then    the registration button is enabled

Scenario: wrong Email entered
    When    I fill the registration mandatory fields
    And     the mail is wrong
    Then    the registration button is disabled

Scenario: password with masking
    When    I fill the password
    And     the checkbox is unchecked
    Then    I can see the password is ofuscated

Scenario: password with unmasking
    When    I fill the password
    And     the checkbox is checked
    Then    I can see the password is plain

Scenario: creation successfully
    When    I fill the registration mandatory fields
    And     the email is different of others
    And     I submit the form
    Then    I can see a successfully message
    And     I am in the 'profile' page

Scenario: emails already registered
    When    I fill the registration mandatory fields
    And     another user has the same email
    And     I submit the form
    Then    I can see a email is already assigned message

Scenario: Cannot add a group
    When    I fill the registration mandatory fields
    And     the email is different of others
    And     I submit the form
    Then    I am in the 'profile' page
    And     I cant create a group


