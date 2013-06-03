Feature: AcceptGuide
    As  a manager of zizerones.com
    I   want to accept or deny access to zizerones to guides
    So  I could keep the quality and minimize risks

Background:
    Given   I am in zizerones admin page logged in as admin

Scenario:
    When I select a guide
    Then I see his profile

Scenario:
    When I accept a guide
    Then it dissapears from the list

Scenario:
    Then I see the pending guides