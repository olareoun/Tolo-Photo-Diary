Given /^I am in notes2reveal$/ do
  visit 'http://localhost:3000/'
end

Given /^I got a json with notes$/ do
  @the_json = '[{"title": "a title", "body": "some content"}, {"title": "another title", "body": "more content"}, {"title": "one more title", "body": "yet more content"}]'
end

Given(/^I got an empty json$/) do
  @the_json = ''
end

When /^I send it to the notes2reveal$/ do
  fill_in('json_field', :with => @the_json)
  find('#submit').click
end

Then(/^I got a reveal presentation with my notes$/) do
  page.has_css?("div.reveal").should be_true
  page.has_css?("div.slides").should be_true
  page.all("div.slides section", :visible => false).length.should == 3
  page.first("div.slides section h1").text.should == 'a title'.upcase
  page.first("div.slides section p").text.should == 'some content'
end

Then(/^I get back to the form$/) do
  page.current_path.should eq '/'
end

Then(/^I see an alert message$/) do
  page.has_css?("div.alert").should be_true
  page.find("div.alert").should have_content('We can not do a presentation with empty data.')
end

When(/^I look for an alert$/) do
end

Then(/^I can not see any alert$/) do
  page.has_css?("div.alert").should be_false
end
