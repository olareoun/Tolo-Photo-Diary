Feature: image support
  As Victor
  I want image support
  So that images in my notes are shown in the presentation

Scenario: note with image attached
  Given I am in notes2reveal
  When I create a presentation from a notebook with a note and a image
  Then I can see the image in the third vertical position

Scenario: note with images attached
  Given I am in notes2reveal
  When I create a presentation from a notebook with a note and several images
  Then I can see consecutive vertical slides

Scenario: note with gif image attached
  Given I am in notes2reveal
  When I create a presentation from a notebook with a note and a gif image
  Then I can see the image in the third vertical position

Scenario: note with png image attached
  Given I am in notes2reveal
  When I create a presentation from a notebook with a note and a png image
  Then I can see the image in the third vertical position
