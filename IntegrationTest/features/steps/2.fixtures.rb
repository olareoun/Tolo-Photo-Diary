module Fixtures

  include URL

  def fixture_on
    visit host + "/test/groups"
    visit host + "/test/guides/clear"
    visit host + "/test/users/clear"
    visit host + "/test/languages"
    visit host + "/test/emblems"
  end

  def load_guides
    visit host + "/test/guides"
  end

  def clear_groups
    visit host + "/test/groups/clear"
  end
end