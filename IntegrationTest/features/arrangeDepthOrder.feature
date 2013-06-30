Feature: Arrange depth order
	As Xavi 
	I want to spread the note elements in vertical slides 
	In order not to cramp all data in a single slide

Background:
 Given I am in notes2reveal

Scenario: Slide title in first vertical position
	When I create a presentation from a sandbox notebook
	Then first title matches first note title

Scenario: Slide title in first vertical position
	When I create a presentation from a sandbox notebook
	And I click down button
	Then I should see the content of the note
