include Fixtures
include URL

def groups_in_river
  all('#river div.group').length
end

def date_of_first_group_in_river
  first('#river div.group .date')
end

def date_of_last_group_in_river
  groups = all('#river div.group .date')
  groups[groups.length()-1]
end

def today
	  (DateTime.now ).strftime("%d")
end

def five_days_ago
  (DateTime.now - 5 ).strftime("%d")
end

def days_in_future days
  (DateTime.now + days).strftime("%d")
end

def blur_filter
  find('#landing').click
end

def logout
  page.execute_script("localStorage.clear()")
end

Given /^I am in zizerones\.com$/ do
	fixture_on
  visit home_page
  sleep 1
end


When /^I add a group$/ do
  clear_groups
  visit add_group_page
  fill_in('description', :with => 'A Description')
  fill_in('name', :with => 'A Name')
  find('input[name="date"]').click
  find('div.pickadate__day--today').click
  fill_in('city', :with => 'a City')
  fill_in('name', :with => 'A Name')
  fill_in('price', :with => '2.0')
  click_button('submit')
  sleep 1
end

When /^I add a guide$/ do
  visit registration_page
  within('#card') do
    fill_in('name', :with => 'John Smith')
    fill_in('email', :with => 'notvalid@faildomain.es')
    fill_in('password', :with => 'password')
    click_button('submit')
  end
  sleep 1
end


Then /^I can see a message of confirmation$/ do
  find('#feedback').visible?.should be_true
end

When /^I am in the home page$/ do
  visit home_page
end

Then /^I can see eleven groups$/ do

  groups_in_river.should be 11
end

Then /^they are order by closeness to today$/ do
  date_of_first_group_in_river.should have_content today
  date_of_last_group_in_river.should have_content five_days_ago
end

When /^put Ibiza in filter$/ do
  fill_in('place-filter',:with=>'Ibiza')
  blur_filter
end

When /^put english in filter$/ do
  find('div[id="select_languages_chzn"] a').click
  find('li[id="select_languages_chzn_o_6"]').click
  blur_filter
end

Then /^I see eleven groups$/ do
  sleep 1
  groups_in_river.should be 11
end

When /^put today in filter$/ do
  find('input[name="date-filter"]').click
  find('div.pickadate__day--today').click
  blur_filter
end

Then /^they are order by closeness to date$/ do
  date_of_first_group_in_river.should have_content today
  date_of_last_group_in_river.should have_content days_in_future(2)
end

Then /^they are ordered by date$/ do
  date_of_first_group_in_river.should have_content today
  date_of_last_group_in_river.should have_content days_in_future (5)
end

Given /^I am a registered guide$/ do
  fixture_on
  step %{I add a guide}
end


When /^I add a group with separation days$/ do
  clear_groups
  visit add_group_page
  fill_in('description', :with => 'A Description')
  fill_in('name', :with => 'A Name')
  find('input[name="date"]').click
  find('div.pickadate__day--today').click
  fill_in('city', :with => 'a City')
  fill_in('name', :with => 'A Name')
  fill_in('price', :with => '2.0')
  check('repetition')
  click_button('submit')
  sleep 1
end

Then /^I see same group created 4 times in the river$/ do
  groups_in_river.should be 4
  date_of_first_group_in_river.should have_content today
  date_of_last_group_in_river.should have_content days_in_future (21)
end


When /^I am in the home page logged$/ do
  fixture_on
  load_guides
  logout
  visit home_page
  find('#login a').click
  sleep 1
  fill_in('username', :with => 'thisisamail@notww.es')
  fill_in('password', :with => '123')
  find('#modal-button').click
end

Then /^I can see logout button$/ do
  has_css?('#login a.logout').should be_true
end

And /^I can see profile button$/ do
  has_css?('#register a [href="profile.html"]').should be_true
end

And /^I login with wrong user$/ do
  fixture_on
  load_guides
  logout
  visit home_page
  find('#login a').click
  sleep 1
  fill_in('username', :with => 'notvalid@notww.es')
  fill_in('password', :with => '123')
  find('#modal-button').click
end

Then /^I can see an user not found error$/ do
  find('#modal-feedback').text.should eql 'User not found'
end

When /^I logout$/ do
  find('#login a').click
end

Then /^I can see login button$/ do
  has_css?('#login a.login').should be_true
end

When /^I add a group with quorum$/ do
  clear_groups
  visit add_group_page
  fill_in('description', :with => 'A Description')
  fill_in('name', :with => 'A Name')
  find('input[name="date"]').click
  find('div.pickadate__day--today').click
  fill_in('city', :with => 'a City')
  fill_in('name', :with => 'A Name')
  find('#minimum a.plusButton').click
  find('#minimum a.plusButton').click
  find('#minimum a.plusButton').click
  find('#maximum a.plusButton').click
  click_button('submit')
  sleep 1
end

Then /^I can see the quorum numbers$/ do
 find('#quorum input[name="minimum"]').value.should eql 3.to_s
 find('#quorum input[name="maximum"]').value.should eql 4.to_s
end

When /^filter by an existing emblem$/ do
  find('#emblems-filter .history').click
end

When /^filter by an non existing emblem$/ do
  find('#emblems-filter .shoppings').click
end

Then /^I cant see any group$/ do
  groups_in_river.should be 0
end

When /^I add a group with price$/ do
  clear_groups
  visit add_group_page
  fill_in('description', :with => 'A Description')
  fill_in('name', :with => 'A Name')
  find('input[name="date"]').click
  find('div.pickadate__day--today').click
  fill_in('city', :with => 'a City')
  fill_in('name', :with => 'A Name')
  fill_in('price', :with => '25.00')
  click_button('submit')
  sleep 1
end

Then /^I can see the price$/ do
  find('#price input').value.should eql '25.00'
end

When /^I click in a group$/ do
  sleep 1
  first('#river div.group a').click
end

Then /^I can see its profile$/ do
  has_css?('#addGroup-page').should be_true

  find('textarea [name="description"]').value.should eql 'A Description'
  find('input [name="city"]').value.should eql 'a City'
end
