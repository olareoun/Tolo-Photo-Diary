Feature: Zizerone profile
    As Zizerone
    I want to put information in my profile
    In order to comunicate to users my suitability for their groups.

Scenario: Change Profile
   Given I am a registered guide
   When I change my profile
   And I go out and in again
   Then my profile is already changed

Scenario: See my groups
   Given I am a registered guide
   When I add a group
   And I go to my profile
   Then I can see a group
