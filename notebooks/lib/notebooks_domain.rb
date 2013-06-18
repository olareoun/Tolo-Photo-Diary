require_relative 'evernote_helper'
require_relative 'notebook'

module Notebooks
	class NotebooksDomain
		def self.get(host, user_name, notebook_name)
			notes = EvernoteHelper.getNotebook(host, user_name, notebook_name)
			Notebook.new notebook_name, notes
		end
	end
end
