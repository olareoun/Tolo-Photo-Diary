
include Tricks
include LoginTags

When /^I click in login link$/ do
  step %{I click 'login'}
  sleep 1
end

Then /^I can see a login modal$/ do
  modal.visible?.should be_true
end

Given /^I am in the home page logged$/ do
  step %{I am in zizerones\.com}
  clear_local_storage
  login_user
end

Then /^I can not see a login modal$/ do
  modal.visible?.should be_false
end

When /^I login with a wrong user$/ do
  user_not_found
  find('#login a').click
  sleep 1
  fill_in('username', :with => 'notvalid@notww.es')
  fill_in('password', :with => '123')
  find('#modal-button').click
end

When /^I login with a valid user$/ do
  user_found
  find('#login a').click
  sleep 1
  fill_in('username', :with => 'notvalid@notww.es')
  fill_in('password', :with => '123')
  find('#modal-button').click
end

Then /^I can see an user not found error$/ do
  find('#modal-feedback').text.should eql 'User not found'
end
