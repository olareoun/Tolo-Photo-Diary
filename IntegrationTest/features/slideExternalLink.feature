@wip
Feature: links in slide content
  As Victor
  I want to have links in my notes
  So that then they can be clicked in the presentation

Scenario: links rendered
  Given I am in notes2reveal
  When I create a presentation from a notebook with a note and a link
  Then I can see the link in the content slide