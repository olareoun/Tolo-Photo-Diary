@wip
Feature: Get reveal presentation
    As  user of evernote
    I   want to get a reveal prentation with my notes
    So  I could communicate my captured notes

Scenario:
	Given I got a json with notes
    When I send it to the notes2reveal
    Then I go to the presentation

Scenario:
	Given I got a json with notes
    When I send it to the notes2reveal
    Then I got a reveal presentation with my notes
