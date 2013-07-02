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
	When I try to create a presentation from a empty
    Then I get back to the form
    And I see an alert message "We need a public evernote notebook url to make your presentation."

Scenario:
	When I try to create a presentation from a non evernote public notebook
    Then I get back to the form
    And I see an alert message "We can not do a presentation with a non evernote public notebook url."

@wip
Scenario:
	When I try to create a presentation from a non existing evernote public notebook
    Then I get back to the form
    And I see an alert message "Could not find that notebook. Be sure that it exists and it is public."

Scenario: There is a form where i can paste a public notebook URL
	When I look for a field to insert a public evernote url
	Then I can see it

Scenario: Right amount of horizontal slides
	When I create a presentation from a sandbox notebook
	Then I should get a presentation with 2 horizontal slides

Scenario: Every slide uses the note title as title
	When I create a presentation from a sandbox notebook
	Then first title matches first note title
	And second title matches second note title

Scenario: Every slide uses the note title as title
	When I create a presentation from a evernote notebook
	Then first title matches first note title in evernote
	And second title matches second note title in evernote
	And third title matches third note title in evernote

Scenario: Do not generate vertical content slide when note content empty
	When I create a presentation from a notebook with a note with just title
	Then no vertical slide for content is generated