Feature: River filtering
    As 	a User
    I 	want to filter groups in the river
    So 	I could find the group that fits my needs

Scenario:
    Given   I am in zizerones.com
	When   	I am in the home page
	And 	put Ibiza in filter
	And 	put english in filter
	Then  	I see eleven groups

Scenario:
    Given   I am in zizerones.com
	When   	I am in the home page
	And 	put today in filter
	And 	put Ibiza in filter
	And 	put english in filter
	Then  	I see eleven groups
	And 	they are ordered by date

Scenario:
    Given   I am in zizerones.com
	When   	I am in the home page
	And 	put english in filter
	Then  	I see eleven groups

Scenario: Filter by emblem return results
    Given   I am in zizerones.com
    When    I am in the home page
    And     filter by an existing emblem
    Then    I see eleven groups

Scenario: Filter by emblem doesnt return results
    Given   I am in zizerones.com
    When    I am in the home page
    And     filter by an non existing emblem
    Then    I cant see any group