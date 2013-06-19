SANDBOX_URL = 'https://sandbox.evernote.com/pub/olareoun/mipublicnotebook'
EVERNOTE_URL = 'https://www.evernote.com/pub/wilthor/wilthorsnotebook'

Given /^I am in notes2reveal$/ do
  visit 'http://localhost:3000/'
end

Given(/^I got an empty url$/) do
  @url = ''
end

Given(/^I got a non evernote public notebook url$/) do
  @url = 'wwww.notevernotedomain.com/pub/xaviuzz/tal'
end

When /^I send it to the notes2reveal$/ do
  fill_in('publicUrl', :with => @url)
  find('#submit').click
end

When(/^I create a presentation from evernote$/) do
  fill_in('publicUrl', :with => EVERNOTE_URL)
  find('#submit').click
end

When(/^I look for an alert$/) do
end

When(/^I look for a field to insert a public evernote url$/) do
end

When(/^I create a presentation from sandbox$/) do
  fill_in('publicUrl', :with => SANDBOX_URL)
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

Then(/^I can not see any alert$/) do
  page.has_css?("div.alert").should be_false
end

Then(/^I got a reveal presentation with no empty notes$/) do
  page.has_css?("div.reveal").should be_true
  page.has_css?("div.slides").should be_true
  page.all("div.slides section", :visible => false).length.should == 2
end

Then(/^I can see it$/) do
  page.find('#publicUrl').should be_true
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

Then(/^first title matches first note title in evernote$/) do
  page.has_css?("div.reveal").should be_true
  page.has_css?("div.slides").should be_true
  page.all("div.slides section", :visible => false).length.should == 3
  page.first("div.slides section h1").text.should == 'Otra nota'.upcase
end

Then(/^second title matches second note title in evernote$/) do
  page.find('div.navigate-right').click
  sleep 1
  page.first("div.slides section h1").text.should == 'nota solo texto'.upcase
end

Then(/^third title matches third note title in evernote$/) do
  page.find('div.navigate-right').click
  sleep 1
  page.first("div.slides section h1").text.should == 'nana'.upcase
end


