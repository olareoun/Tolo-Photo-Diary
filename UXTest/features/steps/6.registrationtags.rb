module RegistrationTags
  def feedbackIsShowed?
    find('#feedback').visible?
  end

  def feedback
    find('#feedback')
  end 

end