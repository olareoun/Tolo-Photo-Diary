Feature: add Group
    As 	a User
    I 	want to add a group
    So 	I could recruit guides and visitors

Scenario:
    Given   I am a registered guide
    When    I add a group
    Then    I can see a message of confirmation

Scenario: create a group with quorum
    Given   I am a registered guide
    When    I add a group with quorum
    Then    I can see the quorum numbers

Scenario: create a repeated group as zizerone
    Given   I am a registered guide
    When    I add a group with separation days
    And     I am in the home page
    Then    I see same group created 4 times in the river

Scenario: create a group with price
    Given   I am a registered guide
    When    I add a group with price
    Then    I can see the price
