require_relative 'evernote_helper'
require_relative 'notebook'

module Notebooks
	class NotebooksDomain
		def self.get(host, user_name, notebook_name, sortedIds = nil)
			notes = EvernoteHelper.getNotebook(host, user_name, notebook_name) if sortedIds.nil?
			notes = EvernoteHelper.getNotesByIds(host, user_name, sortedIds) unless sortedIds.nil?
			Notebook.new notebook_name, notes
		end
	end
end
