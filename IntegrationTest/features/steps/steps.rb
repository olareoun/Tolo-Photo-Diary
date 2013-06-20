SANDBOX_URL = 'https://sandbox.evernote.com/pub/olareoun/mipublicnotebook'
ARRANGE_SANDBOX_URL = 'https://sandbox.evernote.com/pub/olareoun/arrangenotebook'
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

Given(/^I got an evernote public notebook url$/) do
  fill_in('publicUrl', :with => ARRANGE_SANDBOX_URL)
end

When(/^I go to arrange$/) do
  find('#submit').click
end

When(/^I send it to the notes2reveal$/) do
  visit 'http://localhost:3000/generate?publicUrl=' + @url
end

When(/^I create a presentation from evernote$/) do
  visit 'http://localhost:3000/generate?publicUrl=' + EVERNOTE_URL
end

When(/^I look for an alert$/) do
end

When(/^I look for a field to insert a public evernote url$/) do
end

When(/^I create a presentation from sandbox$/) do
  visit 'http://localhost:3000/generate?publicUrl=' + SANDBOX_URL
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

Then(/^I can see a list with the titles of my notes$/) do
  page.has_css?("ul").should be_true
  page.all("ul li").length.should == 4
  page.find('ul').text.should include('nota1', 'nota2', 'nota3', 'nota4') 
end

Then(/^I can see a sortable list with the titles of my notes$/) do
  page.has_css?("ul#sortable").should be_true
  page.all("ul li").length.should == 4
  page.find('ul').text.should include('nota1', 'nota2', 'nota3', 'nota4') 
  page.evaluate_script("$('#sortable').sortable('toArray').toString()").empty?.should be_false
end

Then(/^I have a button to generate presentation$/) do
  page.find('button#generate').should be_true
end

Given(/^I am in the arrange page$/) do
  find('#submit').click
end

Given(/^I change the order of the slides$/) do
  page.execute_script('$("#sortable li").sort(function(a, b){return ($(b).text()) > ($(a).text());}).appendTo("#sortable")')
  page.execute_script('$("#sortable").trigger("sortupdate")')
  page.evaluate_script("$('#sortable').sortable('toArray').toString()").empty?.should be_false
end

When(/^I send it to generate$/) do
  find('#generate').click
end

Then(/^the slides are generated in that order$/) do
  page.has_css?("div.reveal").should be_true
  page.has_css?("div.slides").should be_true
  page.all("div.slides section", :visible => false).length.should == 4
  page.first("div.slides section h1").text.should == 'nota4'.upcase
  page.find('div.navigate-right').click
  sleep 1
  page.first("div.slides section h1").text.should == 'nota3'.upcase
  page.find('div.navigate-right').click
  sleep 1
  page.first("div.slides section h1").text.should == 'nota2'.upcase
  page.find('div.navigate-right').click
  sleep 1
  page.first("div.slides section h1").text.should == 'nota1'.upcase
end