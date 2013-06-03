Feature: Filters
    As              a user
    I want          to filter groups selecting a date or a range of dates
    in order to     find the group that fits my needs

Scenario:
    Given I am in the home page
    Then  I can see an input for filter by a date

Scenario:
    Given I am in the home page
    Then  I can see an input for filter by a place

Scenario:
    Given I am in the home page
    When  I use a URL with place filter
    Then  I can see that place in the filter

Scenario:
    Given I am in the home page
    When  I put a filter by place
    Then  I can bookmark that place filter

Scenario:
    Given I am in the home page
    When  I put a filter by place
    Then  I can see the place in the title

Scenario:
    Given I am in the home page
    When  I use a URL with date filter
    Then  I can see that date in the filter

Scenario:
    Given I am in the home page
    When  I put a filter by date
    Then  I can bookmark that date filter

Scenario:
    Given I am in the home page
    When  I put a filter by date
    Then  I can see that date in the title

Scenario:
    Given I am in the home page
    And   I put a filter by date
    And   I put a filter by place
    When  I click clear filters
    Then  river is unfiltered

Scenario:
    Given I am created languages
    And   I am in the home page
    Then  I can see an select for filter by a language

Scenario:
    Given I am created languages
    And   I am in the home page
    When  I use a URL with language filter
    Then  I can see that language in the filter

Scenario:
    Given I am created languages
    And   I am in the home page
    When  I put a filter by language
    Then  I can bookmark that language filter

Scenario: Filter by emblems
    Given I have created emblems
    And   I am in the home page
    Then  I can see an select for filter by emblems