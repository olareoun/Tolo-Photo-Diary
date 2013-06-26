@wip
Feature: audio support
  As Victor
  I want audio support
  So that audios in my notes could be played in the presentation

Scenario: note with audio file attached
  Given I am in notes2reveal
  When I create a presentation from a notebook with a note and a audio
  Then I can see the audio in the third vertical position

Scenario: note with several audio files attached
  Given I am in notes2reveal
  When I create a presentation from a notebook with a note and several audio files
  Then I can see the audios in consecutive vertical slides

