include Tricks
include Common
include AddGroupTags

When /^I am adding a group$/ do
	step %{I click 'addGroup'}
end

Then /^the submit button is disabled$/ do
  submit_button_is_disabled?.should be_true
end

Then /^the submit button is enabled$/ do
  submit_button_is_disabled?.should be_false
end

When /^I fill the mandatory fields$/ do
  fill_in('description', :with => 'A Description')
  fill_in('name', :with => 'A Name')
  fill_in('city', :with => 'a City')
  fill_in('price', :with => '2.0')
  calendar.click
  today.click
  find('a.chzn-single').click
  find('#select_languages_chzn_o_1').click
  blur_form
end

When /^I put a mandatory field blank$/ do
  fill_in('description', :with => '')
  fill_in('city', :with => 'a City')
end

When /^the checkbox 'repetition' is unchecked$/ do
  uncheck('repetition')
end

Then /^the days to repeated is disabled$/ do
  separation_days['disabled'].should be_true
end

When /^the checkbox 'repetition' is checked$/ do
  check('repetition')
end

Then /^the days to repeated is enabled$/ do
  separation_days['disabled'].should be_nil
end

When /^i put a minimum quorum$/ do
  find('#minimum a.plusButton').click
  find('#minimum a.plusButton').click
  find('#minimum a.plusButton').click
end

Then /^inferior limit of maximum quorum is the minimum set$/ do
  find('#quorum input[name="maximum"]').value.should eql 3.to_s
end

Then /^I can select more than one emblem$/ do
  all('#emblems-filter li').size.should > 0

  first('#emblems-filter li').click
  all('#emblems-filter li')[1].click
  has_css?('#emblems-filter .selected', :count => 2).should be_true
end

Then /^I can see an image input$/ do
  image_input?.should be_true
end
