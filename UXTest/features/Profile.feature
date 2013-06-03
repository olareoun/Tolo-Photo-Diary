Feature: Zizerone profile
    As Zizerone
    I want to put information in my profile
    In order to comunicate to users my suitability for their groups.

Background: Logged in user
    Given I am a registered Zizerone
    When I want to see my profile

Scenario: visit the profile page
    Then I am in the 'profile' page

Scenario: display the fields
    Then I can see the fields of the profile

Scenario: update the languages
    When I add a new language to the list
    Then I can see a new option for introductions

