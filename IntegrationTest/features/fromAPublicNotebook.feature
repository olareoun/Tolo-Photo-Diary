Feature: from a public notebook
    As  user of evernote
    I   want to obtain a presentation from a public evernote notebook
    So  I do not have to handle my credentials

Background:
 Given I am in notes2reveal

Scenario: There is a form where i can paste a public notebook URL
	When I look for a field to insert a public evernote url
	Then I can see it

Scenario: Every slide uses the note title as title
	When I create a presentation from sandbox
	Then first title matches first note title
	And second title matches second note title

@wip
Scenario: Every slide uses the note title as title
	When I create a presentation from evernote
	Then first title matches first note title in evernote
	And second title matches second note title in evernote
	And third title matches third note title in evernote
