SANDBOX_URL = 'https://sandbox.evernote.com/pub/olareoun/mipublicnotebook'

Given /^I am in notes2reveal$/ do
  visit 'http://localhost:3000/'
end

Given /^I got a json with notes$/ do
  @the_json = '[{"title": "a title", "content": "some content"}, {"title": "another title", "content": "more content"}, {"title": "one more title", "content": "yet more content"}]'
end

Given(/^I got an empty json$/) do
  @the_json = ''
end

Given(/^I got an empty json collection$/) do
  @the_json = '[]'
end

Given(/^I got a bad formed json$/) do
  @the_json = '{{"title": "my title", "content": "my body"}{}}}'
end

Given(/^I got a json with notes some of the with no standard data$/) do
  @the_json = '[{"title": "a title", "content": "some content"}, {"bla": "another title", "ble": "more content"}, {"title": "one more title", "content": "yet more content"}]'
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

Then(/^I see an alert message "(.*?)"$/) do |alert_message|
  page.has_css?("div.alert").should be_true
  page.find("div.alert").should have_content(alert_message)
end

When(/^I look for an alert$/) do
end

Then(/^I can not see any alert$/) do
  page.has_css?("div.alert").should be_false
end

Then(/^I got a reveal presentation with no empty notes$/) do
  page.has_css?("div.reveal").should be_true
  page.has_css?("div.slides").should be_true
  page.all("div.slides section", :visible => false).length.should == 2
end

When(/^I look for a field to insert a public evernote url$/) do
end

Then(/^I can see it$/) do
  page.find('#publicUrl').should be_true
end

When(/^I create a presentation from sandbox$/) do
  fill_in('publicUrl', :with => SANDBOX_URL)
  find('#submit').click
end

Then(/^first title matches first note title$/) do
  page.has_css?("div.reveal").should be_true
  page.has_css?("div.slides").should be_true
  page.all("div.slides section", :visible => false).length.should == 2
  page.first("div.slides section h1").text.should == 'segunda nota del publico'.upcase
end

Then(/^second title matches second note title$/) do
  page.find('div.navigate-right').click
  sleep 1
  page.first("div.slides section h1").text.should == 'primera nota del publico'.upcase
end
