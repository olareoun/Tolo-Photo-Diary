module Notebooks
	class Note

		def initialize(note)
			@note = note if note.instance_of? Evernote::EDAM::Type::Note
			@note = createNote(note) unless note.instance_of? Evernote::EDAM::Type::Note
		end

		def createNote(noteHash)
			note = Evernote::EDAM::Type::Note.new
			note.title = noteHash['title']
			note.content = noteHash['content']
			note
		end

		def getTitle
			@note.title
		end

		def getContent
			@note.content
		end

	end
end