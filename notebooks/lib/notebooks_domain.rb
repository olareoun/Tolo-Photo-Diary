module Notebooks
	class NotebooksDomain
		def self.get(user_name, notebook_name)
			notes = EvernoteHelper.getNotebook(user_name, notebook_name)
			Notebook.new notebook_name, notes
		end
	end
end
