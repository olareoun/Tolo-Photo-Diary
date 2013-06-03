include Fixtures

module AdminTags

  def all_guides
    all('#pending tr.guide')
  end

  def name_of_first_guide
    find('#pending tr:first td:first a')
  end

  def all_guide_profile_properties
    all('#profile tr th')
  end

  def all_guide_profile_values
    all('#profile tr td')
  end

  def accept_first_guide_button
    find('#pending tr:first td:nth-child(2) a:first')
  end

  def confirm_first_guide_button
    find('#pending tr:first td:nth-child(2) a.confirm')
  end

  def clear_local_storage
    page.execute_script("localStorage.clear()")
  end

end

include AdminTags
include URL

Given /^I am in zizerones admin page logged in as admin$/ do
  load_guides
  visit home_page
  find('#login a').click
  sleep 1
  fill_in('username', :with => 'zizerones@gmail.com')
  fill_in('password', :with => 'abcd')
  find('#modal-button').click
  visit admin_page
  sleep 1
end

Then /^I see the pending guides$/ do
  all_guides.size.should > 0
  clear_local_storage
end

When /^I select a guide$/ do
  name_of_first_guide.click
  sleep 1
end

Then /^I see his profile$/ do
  all_guide_profile_properties.size.should > 0
  all_guide_profile_values.size.should > 0
  clear_local_storage
end

When /^I accept a guide$/ do
  accept_first_guide_button.click
  confirm_first_guide_button.click
  sleep 1
end

Then /^it dissapears from the list$/ do
  all_guides.size.should eql 0
  clear_local_storage
end
