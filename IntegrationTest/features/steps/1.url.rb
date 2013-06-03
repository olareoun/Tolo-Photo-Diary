module URL

  def host
    return ENV['INTEGRATION_URL'] || 'http://localhost:3000'
  end

  def admin_page
    host + "/admin.html"
  end

  def home_page
    host + "/index.html"
  end

  def add_group_page
    host + "/addgroup.html"
  end

  def registration_page
    host + "/registration.html"
  end

  def profile_page
    host + "/profile.html"
  end

end