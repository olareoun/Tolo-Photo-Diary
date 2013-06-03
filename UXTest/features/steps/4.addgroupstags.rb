module AddGroupTags

  def submit_button_is_disabled?
    page.has_css?('button.disabled[type="submit"]')
  end

  def calendar
    find('input[name="date"]')
  end

  def blur_form
    find('#addGroup-page').click
  end

  def separation_days
  	find('input[name="separation-days"]')
  end
  def image_input?
    has_css?('#image')
  end
end
