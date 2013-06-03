Feature: AcceptGuide
    As 	a manager of zizerones.com
    I 	want to accept or deny access to zizerones to guides
    So 	I could keep the quality and minimize risks

Background:In Admin page
    Given   I am in zizerones.com
    And     I go 'admin'


Scenario:
    Then    I am in the 'admin' page

Scenario:
    Then I can see the pending guides list
    And  there are guides in the list

Scenario:
    When I select a guide
    Then I can see its profile