module Common
  def today
    find('div.pickadate__day--today')
  end

  def reduce_window_to_ensure_scroll
    Capybara.current_session.driver.browser.manage.window.resize_to(500, 500)
  end
  
  def scroll
    page.execute_script "window.scrollBy(0,10000)"
  end

  def clean_database
    visit 'http://localhost:3000/test/groups/clear'
  end
  
  def home_URL
    "http://localhost:3000/index.html"
  end

  def host
    return ENV['INTEGRATION_URL'] || 'http://localhost:3000'
  end

  def query
    uri = URI.parse(Capybara.current_url)
    uri.query
  end

end