Feature: See a group
	As              a user
    I want          to see details of a group
    in order to     find the group that fits my needs

Scenario:
    Given   I am a registered guide
    And     I add a group
    And     I am in the home page
    When    I click in a group
    Then    I can see its profile