require_relative '../../evernote/lib/evernote_helper'
require_relative 'notebook'
require_relative 'note'
require_relative 'notebook_not_found_exception'

module Notebooks
	class NotebooksDomain
		def self.get(publicUrl, sortedIds = nil)
			begin
				evernoteHelper = EvernoteHelper.new publicUrl
				evernoteNotes = evernoteHelper.getNotebook(sortedIds)
				notes = evernoteNotes.map {|evernoteNote| Notebooks::Note.new evernoteNote}
				Notebook.new evernoteHelper.getNotebookName, notes
			rescue Evernote::EDAM::Error::EDAMNotFoundException
				raise NotebookNotFoundException
			end
		end
	end
end
