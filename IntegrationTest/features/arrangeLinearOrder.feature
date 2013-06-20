Feature: arrage linear order
	As evernote user
	I want to sort my notes
	So that the presentation is generated in that order

Background:
	Given I am in notes2reveal
	And I got an evernote public notebook url

Scenario: list with the titles of my notes
	When I go to arrange
	Then I can see a list with the titles of my notes

Scenario: SORTABLE list with the titles of my notes
	When I go to arrange
	Then I can see a sortable list with the titles of my notes

Scenario: generate presentation following that order
	Given I am in the arrange page
	And I change the order of the slides
	When I send it to generate
	Then the slides are generated in that order