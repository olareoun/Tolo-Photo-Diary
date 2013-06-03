include Tricks
include Common

Given /^I am in zizerones\.com$/ do
  clear_local_storage
  clean_database
  visit home_URL  
  prevent_empty_river
end

Given /^I am in the home page not logged$/ do
  visit home_URL
  logout_user
  sleep 1
end

When /^I click '([^"]*)'$/ do |link|
  find('#'+link+' a').click()
end

When /^I submit the form$/ do
  find('#submit').click()
end

Then /^I am in the '([^"]*)' page$/ do |page_name|
  has_css?('#'+page_name+'-page').should be_true
end
