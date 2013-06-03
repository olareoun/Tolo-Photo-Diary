module HomeTags

  def filter_date
    find('#date-filter input [name="date-filter"]')
  end

  def filter_date_submit
    find('#date-filter input [name="date-filter_submit"]')
  end

  def filter_place
    find('#place-filter input [type="text"]')
  end

  def filter_language
    find('div[id="select_languages_chzn"] a')
  end

  def filter_language_value
    find('div#select_languages_chzn a span')
  end

  def title
    find("head title").text
  end

  def blur_filter
    find('#landing').click
  end

  def register_profile_link
    find('#register a [href="profile.html"]')
  end

  def addgroup_hidden?
    has_css?('#addGroup.hidden')
  end
end

