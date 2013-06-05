@wip
Feature: Get reveal presentation
    As  user of evernote
    I   want to get a reveal prentation with my notes
    So  I could communicate my captured notes

Background:
 Given I am in notes2reveal

Scenario:
	Given I got an empty json
    When I send it to the notes2reveal
    Then I get back to the form
#    And I see an alert message

Scenario:
	Given I got a json with notes
    When I send it to the notes2reveal
    Then I got a reveal presentation with my notes
