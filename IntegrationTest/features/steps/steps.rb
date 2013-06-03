Given /^I got a json with notes$/ do
  visit 'http://localhost:3000/'
end

When /^I send it to the notes2reveal$/ do
	the_json = '{{title: "note1", body: "body1"}, {title: "note2", body: "body2"}}'
  fill_in('json_field', :with => the_json)
  find('#submit').click
end

Then /^I got a reveal presentation$/ do
	current_path.should == 'http://blabla'
end
