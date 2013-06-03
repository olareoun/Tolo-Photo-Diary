require 'capybara/cucumber'
require 'capybara/rspec'

Capybara.register_driver :selenium_default do |app|
  Capybara::Selenium::Driver

  profile = Selenium::WebDriver::Firefox::Profile.new
  profile['intl.accept_languages'] = "en"

  Capybara::Selenium::Driver::new(app, {:browser => :firefox, :profile => profile })
end


Capybara.default_wait_time = 5
Capybara.default_driver = :selenium_default