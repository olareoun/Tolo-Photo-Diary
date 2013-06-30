require_relative '../../evernote/lib/evernote_helper'
require_relative 'notebook'
require_relative 'note'

module Notebooks
	class NotebooksDomain
		def self.get(publicUrl, sortedIds = nil)
			evernoteHelper = EvernoteHelper.new publicUrl
			evernoteNotes = evernoteHelper.getNotebook(sortedIds)
			notes = evernoteNotes.map {|evernoteNote| Notebooks::Note.new evernoteNote}
			Notebook.new evernoteHelper.getNotebookName, notes
		end
	end
end
