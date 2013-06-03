module ProfileTags

  def filter_date
    find('#date-filter input [name="date-filter"]')
  end

  def filter_date_submit
    find('#date-filter input [name="date-filter_submit"]')
  end

  def has_name?
    page.has_css?('#name').should be_true
  end

  def has_email?
    page.has_css?('#email').should be_true
  end

  def has_license?
    page.has_css?('#license-number').should be_true
  end

  def has_residence?
    page.has_css?('#residence').should be_true
  end

  def has_work_area?
    page.has_css?('#work-area').should be_true
  end

  def has_image?
    page.has_css?('#imageprofile').should be_true
    page.has_css?('#imageprofile input[type="file"]').should be_true
  end

  def has_phone?
    page.has_css?('#phone').should be_true
  end

  def has_experience?
    page.has_css?('#experience input[type="text"]').should be_true
  end

  def has_languages?
    page.has_css?('#languages').should be_true
    page.has_css?('span#languages select', :visible => false).should be_true
  end

  def has_introduction?
    page.has_css?('#introductions select').should be_true
    page.has_css?('#introductions textarea').should be_true
  end

  def introduction_options
    all('#introductions select option')
  end
end