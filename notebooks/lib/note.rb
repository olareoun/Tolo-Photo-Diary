require 'evernote_oauth'

module Notebooks
	class Note

		def initialize(note = nil)
			@note = Evernote::EDAM::Type::Note.new
			@note = note if note.instance_of? Evernote::EDAM::Type::Note
		end

		def entitle(title)
			@note.title = title
		end

		def putContent(content)
			@note.content = content
		end

		def getTitle
			@note.title
		end

		def getContent
			@note.content
		end

	end
end