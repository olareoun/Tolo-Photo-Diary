include Tricks
include Common

def guides_in_list
  all('#pending tr.guide').length
end

Given /^I go 'admin'$/ do
  visit 'http://localhost:3000/admin.html'
end

Then /^I can see the pending guides list$/ do
  create_pending_guides
  find('#pending').visible?.should be_true

  accept_button = find('#pending tr:first td:nth-child(2) a:first')
  reject_button = find('#pending tr:first td:nth-child(2) a:nth-child(2)')

  accept_button.visible?.should be_true
  reject_button.visible?.should be_true

end

Then /^there are guides in the list$/ do
  create_pending_guides
  guides_in_list.should be 5
end

When /^I select a guide$/ do
  create_pending_guides
  load_user_profile
  name = find('#pending tr:first td:first a')
  name.click
end

Then /^I can see its profile$/ do
  property_selector = '#profile tr:first th'
  value_selector = '#profile tr:first td'

  page.has_css?(property_selector).should be_true
  page.has_css?(value_selector).should be_true
end