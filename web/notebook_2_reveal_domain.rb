require_relative '../slides/lib/slides_domain'
require_relative '../notebooks/lib/notebooks_domain'

class Notebook2RevealDomain

  def getNotes(url, sortedIds = nil)
      Notebooks::NotebooksDomain.get(url, sortedIds).getNotes
  end

  def createSlides(url, sortedIds = nil)
      notes = getNotes(url, sortedIds)
      Slides::SlidesDomain.create(notes)
  end

end