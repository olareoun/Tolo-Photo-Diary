require_relative "./evernote_helper"

module Notebooks
	class Notebook
		attr_accessor :name, :notes
		def initialize(name, notes)
			@name = name
			@notes = notes
		end
	end
end