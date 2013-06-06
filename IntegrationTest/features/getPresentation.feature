@wip
Feature: Get reveal presentation
    As  user of evernote
    I   want to get a reveal prentation with my notes
    So  I could communicate my captured notes

Background:
 Given I am in notes2reveal

Scenario:
	When I look for an alert
	Then I can not see any alert

Scenario:
	Given I got an empty json
    When I send it to the notes2reveal
    Then I get back to the form
    And I see an alert message "We can not do a presentation with empty data."

Scenario:
	Given I got an empty json collection
    When I send it to the notes2reveal
    Then I get back to the form
    And I see an alert message "We can not do a presentation with an empty notes collection."

Scenario:
	Given I got a bad formed json
    When I send it to the notes2reveal
    Then I get back to the form
    And I see an alert message "We can not do a presentation with a bad formed json."

Scenario:
	Given I got a json with notes
    When I send it to the notes2reveal
    Then I got a reveal presentation with my notes
