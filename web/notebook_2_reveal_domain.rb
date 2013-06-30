require_relative '../slides/lib/slides_domain'
require_relative '../notebooks/lib/notebooks_domain'

class Notebook2RevealDomain

  def getNotes(url, sortedIds = nil)
      if url.nil? || url.empty?
        raise BadArgumentException, 'empty.url'
      else
        notes = Notebooks::NotebooksDomain.get(url, sortedIds).getNotes
      end
      notes
  end

  def createSlides(url, sortedIds = nil)
      notes = getNotes(url, sortedIds)
      Slides::SlidesDomain.create(notes)
  end

end