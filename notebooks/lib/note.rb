require 'evernote_oauth'

module Notebooks
	EN_XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>'
	EN_NOTE_HEADER = '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">'
	EN_NOTE_EMPTY_CONTENT = '<en-note><div><br clear="none"/></div></en-note>'
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
			return '' if @note.content.nil?
			content = @note.content.gsub(EN_XML_HEADER, '')
			content = content.gsub(EN_NOTE_HEADER, '')
			content = content.gsub(EN_NOTE_EMPTY_CONTENT, '')
			content = content.gsub(/\n/, '')
			content
		end

		def getId()
			@note.guid
		end

	end
end