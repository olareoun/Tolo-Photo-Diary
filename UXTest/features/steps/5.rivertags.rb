module RiverTags
  def isLoading?
    find('#river div.loading').visible?
  end

  def river
    find('#river')
  end 

  def groups_in_river
    all('#river div.group').length
  end 

end