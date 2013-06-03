include Tricks
include Common
include HomeTags

Then /^I can see an input for filter by a date$/ do
  filter_date.visible?.should be_true
end

When /^I use a URL with date filter$/ do
  visit home_URL + "?tentative_date=12-06-2012"
end

Then /^I can see that date in the filter$/ do
  filter_date.value.should eq('6 December, 2012')
end


When /^I put a filter by date$/ do
  filter_date.click
  today.click
end

Then /^I can see that date in the title$/ do
  theValue = filter_date_submit.value
  title.should match(/around the #{theValue}/)
end

Then /^I can bookmark that date filter$/ do
  theValue = filter_date_submit.value
  parameter = 'tentative_date=' + theValue
  query.should have_content(parameter)
end

Then /^I can see an input for filter by a place$/ do
  filter_place.visible?.should be_true
end

When /^I use a URL with place filter$/ do
  visit home_URL + "?place=aPlace"
end

Then /^I can see that place in the filter$/ do
  filter_place.value.should eq('aPlace')
end

When /^I put a filter by place$/ do
  filter_place.set 'aPlace'
  blur_filter
  sleep(1)
end

Then /^I can bookmark that place filter$/ do
  query.should have_content('place=aPlace')
end

Then /^I can see the place in the title$/ do
  title.should match(/in aPlace/)
end

When /^I click clear filters$/ do
  find('#clear-filters').click
end

Then /^river is unfiltered$/ do
  query.should eq('language=english')
end

Then /^I can see an select for filter by a language$/ do
  filter_language.visible?.should be_true
end

When /^I use a URL with language filter$/ do
  visit home_URL + "?language=english"
end

Then /^I can see that language in the filter$/ do
  filter_language_value.text.should eq('English')
end

When /^I put a filter by language$/ do
  filter_language.click
  find('li#select_languages_chzn_o_6').click
  blur_filter
  sleep(1)
end

Then /^I can bookmark that language filter$/ do
  query.should eq('language=english')
end

Given /^I am created languages$/ do
  visit host + "/test/languages"
end

Given /^I have created emblems$/ do
  visit host + "/test/emblems"
end

Then /^I can see an select for filter by emblems$/ do
  all('#emblems-filter li').size.should > 0

  first('#emblems-filter li').click  
  has_css?('#emblems-filter .selected', :count => 1).should be_true

end