require_relative "./evernote_helper"

module Notebooks
	class Notebook
		def initialize(name, notes)
			@name = name
			@notes = notes
		end

		def getNotes
			@notes
		end

		def getName
			@name
		end
	end
end