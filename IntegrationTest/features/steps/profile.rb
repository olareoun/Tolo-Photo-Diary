module ProfileTags

    def has_groups?
        has_css?('#river div.group')
    end

    def license_input
        find('#license-number input')
    end

    def unfocus_license_input
        page.execute_script("$('#license-number input').trigger('blur');")
    end
end

include ProfileTags

When /^I go to my profile$/ do
  visit profile_page
end

When /^I change my profile$/ do
  fill_in('license-number', :with=>'A-BBCCDD')
  unfocus_license_input
end

Then /^I can see a group$/ do
  has_groups?.should be_true
end

And /^I go out and in again$/ do
  visit profile_page
end

Then /^my profile is already changed$/ do
  license_input.value.should eql 'A-BBCCDD'
end
