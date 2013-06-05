Given /^I got a json with notes$/ do
  visit 'http://localhost:3000/'
end

When /^I send it to the notes2reveal$/ do
  the_json = '[{"title": "a title", "body": "some content"}, {"title": "another title", "body": "more content"}, {"title": "one more title", "body": "yet more content"}]'
  fill_in('json_field', :with => the_json)
  find('#submit').click
end

Then(/^I got a reveal presentation with my notes$/) do
  page.has_css?("div.reveal").should be_true
  page.has_css?("div.slides").should be_true
  page.all("div.slides section", :visible => false).length.should == 3
  page.first("div.slides section h1").text.should == 'a title'.upcase
  page.first("div.slides section p").text.should == 'some content'
end
