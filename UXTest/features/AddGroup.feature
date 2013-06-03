Feature: AddGroup
    As 	a User
    I 	I want to add a group
    So 	I could recruit guides and visitors

Background:Adding a Group
    Given   I am created languages
    And     I have created emblems
    And     I am in the home page logged
    And     I click 'addGroup'

Scenario:
    Then    I am in the 'addGroup' page

Scenario:
    Then    the submit button is disabled

Scenario:
    When    I fill the mandatory fields
    Then    the submit button is enabled

Scenario:
    When    I fill the mandatory fields
    And     I put a mandatory field blank
    Then    the submit button is disabled

Scenario:
    When    the checkbox 'repetition' is unchecked
    Then    the days to repeated is disabled

Scenario:
    When    the checkbox 'repetition' is checked
    Then    the days to repeated is enabled

Scenario:
    When    i put a minimum quorum
    Then    inferior limit of maximum quorum is the minimum set

Scenario: Emblems selection
    Then    I can select more than one emblem

Scenario: Submit an image
    Then    I can see an image input