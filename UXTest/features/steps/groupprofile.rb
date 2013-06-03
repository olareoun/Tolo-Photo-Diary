include Tricks
include Common
include RiverTags

When /^I click in a group$/ do
	show_groups_in_river
    first('#river div.group a').click
end

Then /^I can see its information$/ do
    has_css?('#groupprofile-page').should be_true

    find('textarea [name="description"]').text.should_not be_nil
    find('input [name="city"]').text.should_not be_nil
    find('#duration').text.should_not be_nil
    has_css?('#image img').should be_true
end