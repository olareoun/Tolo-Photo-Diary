Given /^i open the specrunner$/ do
  visit "http://localhost:3000/js/test/SpecRunner.html"
end

When /^i run it$/ do
  page.has_content?('Jasmine').should be_true
end

Then /^i see all test running succesfully$/ do
	if page.has_selector?('.specDetail.failed')
		then
			fails = all('.specDetail.failed')
			fails.each do |theFail|
				puts "-------------------------------------------------------------------------"
				puts theFail.find('.description').text
				puts theFail.find('.resultMessage.fail').text
				puts "-------------------------------------------------------------------------"
				puts
			end
		end
  page.has_selector?('.specDetail.failed').should be_false
end
