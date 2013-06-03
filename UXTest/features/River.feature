Feature: River
    As              user
    I want 			to see the groups created
    in order to 	choose which one fits my needs.

Scenario:
    Given   I am in the home page
    When    river is loading.
    Then    I can see a loading message

Scenario:
    Given   I am in the home page
    When    river is loaded
    Then    I can not see a loading message

Scenario:
    Given   I am in the home page
    When    there are a lot of groups
    And     river is loaded
    Then    I can see the first twenty

Scenario:
    Given   I am in the home page
    When    there are a lot of groups
    And 	river is loaded
    And 	I scroll till the end
    Then    river gets more groups

Scenario: Groups display image
    Given I am in the home page
    When  there are a lot of groups
    And   river is loaded
    Then  the groups have images

Scenario: Groups display the minimum
    Given I am in the home page
    When  there are a lot of groups
    And   river is loaded
    Then  the groups have the minimum

Scenario: Groups display the time
    Given I am in the home page
    When  there are a lot of groups
    And   river is loaded
    Then  the groups have the time