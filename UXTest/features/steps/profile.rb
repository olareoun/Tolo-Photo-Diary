include Tricks
include HomeTags
include ProfileTags

Given /^I am a registered Zizerone$/ do
    step %{I am in zizerones\.com}
    login_user
    register_profile_link.should_not be_nil
end

When /^I want to see my profile$/ do
    register_profile_link.click()
end

Then /^I can see the fields of the profile$/ do
    load_user_profile

    has_name?
    has_email?
    has_license?
    has_residence?
    has_work_area?
    has_image?
    has_phone?
    has_experience?
    has_languages?
end


When /^I add a new language to the list$/ do
    load_user_profile
    introduction_options.size.should eql 1

    update_user_profile
end

Then /^I can see a new option for introductions$/ do
    introduction_options.size.should eql 2
end
