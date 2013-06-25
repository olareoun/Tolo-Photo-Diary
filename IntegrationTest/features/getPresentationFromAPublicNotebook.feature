Feature: Get reveal presentation from a public notebook
    As  user of evernote
    I   want to obtain a presentation from a public evernote notebook
    So  I do not have to handle my credentials
    And  I could communicate my captured notes

Background:
 Given I am in notes2reveal

Scenario:
	When I look for an alert
	Then I can not see any alert

Scenario:
	Given I got an empty url
    When I send it to the notes2reveal
    Then I get back to the form
    And I see an alert message "We need a public evernote notebook url to make your presentation."

Scenario:
	Given I got a non evernote public notebook url
    When I send it to the notes2reveal
    Then I get back to the form
    And I see an alert message "We can not do a presentation with a non evernote public notebook url."

Scenario: There is a form where i can paste a public notebook URL
	When I look for a field to insert a public evernote url
	Then I can see it

Scenario: Every slide uses the note title as title
	When I create a presentation from sandbox
	Then first title matches first note title
	And second title matches second note title

Scenario: Every slide uses the note title as title
	When I create a presentation from evernote
	Then first title matches first note title in evernote
	And second title matches second note title in evernote
	And third title matches third note title in evernote

@wip
Scenario: Do not generate vertical content slide when note content empty
	When I create a presentation from evernote with a note with just title
	Then no vertical slide for content is generated