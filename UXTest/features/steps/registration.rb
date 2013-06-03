include RegistrationTags
include HomeTags
include Tricks

When /^I want to register a zizerones$/ do
  step %{I click 'register'}
end

Then /^the registration button is disabled$/ do
  page.has_css?('#submit').should be_true
end

Then /^the registration button is enabled$/ do
end

When /^I fill the registration mandatory fields$/ do
  within('#card') do
    fill_in('name', :with => 'The name')
    fill_in('email', :with => 'zize@rones.com')
    fill_in('password', :with => 'this_is_the_pass')
  end
end

When /^the mail is wrong$/ do
  fill_in('email', :with => 'wrongemail')
  fill_in('name', :with => 'The name')
  sleep(1)
  page.has_css?('#email.control-group.error').should be_true
end


When /^I fill the password$/ do
  within('#card') do
    fill_in('password', :with => 'this_is_the_pass')
  end
end

When /^the checkbox is unchecked$/ do
  uncheck('showPass')
end

Then /^I can see the password is ofuscated$/ do
  page.has_css?('#password input[type="password"].hidden').should be_false
  page.has_css?('#password input[type="text"].hidden').should be_true
end

When /^the checkbox is checked$/ do
  check('showPass')
end

Then /^I can see the password is plain$/ do
  page.has_css?('#password input[type="password"].hidden').should be_true
  page.has_css?('#password input[type="text"].hidden').should be_false
end

When /^the email is different of others$/ do
  random_email = "email" + DateTime.now.to_time.to_i.to_s + "@zizerones.es"
  fill_in('email', :with => random_email)
end

Then /^I can see a successfully message$/ do
  sleep(1)
  feedbackIsShowed?.should be_true
  feedback.text.should eq('Guide successfully saved')
  clear_local_storage
end

When /^another user has the same email$/ do
  random_email = "email" + DateTime.now.to_time.to_i.to_s + "@zizerones.es"
  fill_in('email', :with => random_email)
  find('#submit').click()
end

Then /^I can see a email is already assigned message$/ do
  sleep(1)
  feedbackIsShowed?.should be_true
  feedback.text.should eq('Guide with email in use')
end

Then /^I cant create a group$/ do
  login_not_granted_user
  addgroup_hidden?.should be_true
end
