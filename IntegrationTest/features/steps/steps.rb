Given /^I got a json with notes$/ do
  visit 'http://localhost:3000/'
end

When /^I send it to the notes2reveal$/ do
  the_json = '{{title: "note1", body: "body1"}, {title: "note2", body: "body2"}}'
  fill_in('json_field', :with => the_json)
  find('#submit').click
end

Then /^I go to the presentation$/ do
	current_path.should == '/presentation/index.html'
end

Then(/^I got a reveal presentation with my notes$/) do
  page.has_css?("div.reveal").should be_true
  page.has_css?("div.slides").should be_true
  page.has_css?("div.slides section", :count => 2)
  page.first("div.slides section h1").text == 'note1'
  page.first("div.slides section p").text == 'body1'
end
