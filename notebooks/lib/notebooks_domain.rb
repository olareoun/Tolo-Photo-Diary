require 'evernote_oauth'

require_relative 'evernote_helper'
require_relative 'notebook'
require_relative 'extractor'
require_relative 'public_url'

module Notebooks
	class NotebooksDomain
		def self.get(publicUrl, sortedIds = nil)
			url = PublicUrl.new publicUrl
			notes = EvernoteHelper.getNotebook(url, sortedIds)
			Notebook.new url.notebook_name, notes
		end
	end
end
