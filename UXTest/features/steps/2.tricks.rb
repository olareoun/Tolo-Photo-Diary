module Tricks

  def prevent_empty_river
     page.execute_script("document.page.theRiver.noMoreGroups = false;")
  end

  def slow_charge
    page.execute_script("Tricker.slowRiver()")
  end

  def lots_of_groups
    page.execute_script("Tricker.lotsOfGroups()")
  end

  def show_groups_in_river
    page.execute_script("Tricker.showGroupsInRiver()")
  end

  def clear_local_storage
  	page.execute_script("localStorage.clear()")
  end

  def login_user
    page.execute_script("Tricker.logInUser()")
  end

  def login_not_granted_user
    page.execute_script("Tricker.logInNotGrantedUser()")
  end

  def logout_user
    page.execute_script("Tricker.logoutUser()")
  end

  def load_user_profile
    sleep(1) #always used when the page is loading so we have to wait a little bit
    page.execute_script("Tricker.getProfile()")
  end

  def update_user_profile
    page.execute_script("Tricker.updateProfile()")
  end

  def create_pending_guides
    page.execute_script("Tricker.pendingGuides()")
  end

  def user_not_found
    page.execute_script("Tricker.userNotFound()")
  end

  def user_found
    page.execute_script("Tricker.userFound()")
  end

  def load_emblems
    page.execute_script("Tricker.loadEmblems()");
  end
end