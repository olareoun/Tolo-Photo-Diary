
include Tricks
include Common
include RiverTags
When /^I am in the home page$/ do
  step %{I am in zizerones\.com}
end

Then /^I can see a loading message$/ do
  isLoading?.should be_true
end

Then /^I can not see a loading message$/ do
  isLoading?.should be_false
end

When /^river is loaded$/ do
  river.visible?.should be_true
end

When /^river is loading\.$/ do
  slow_charge
end

When /^there are a lot of groups$/ do
  show_groups_in_river
end

Then /^I can see the first twenty$/ do
  groups_in_river.should be <=20
end

When /^I scroll till the end$/ do
  reduce_window_to_ensure_scroll
  sleep(1)
  scroll
  sleep(1)
  scroll
  sleep(1)
end

Then /^river gets more groups$/ do
  groups_in_river.should be >20
end

Then /^the groups have images$/ do
  has_css?('#river div.group img').should be_true
end

Then /^the groups have the minimum$/ do
  has_css?('#river div.group .minimum').should be_true
end

Then /^the groups have the time$/ do
  has_css?('#river div.group .time').should be_true
end