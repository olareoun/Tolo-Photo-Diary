module Notebooks
	class PublicUrl
		attr_accessor :user_name, :notebook_name, :host
		def initialize(publicUrl)
	        @user_name = Extractor.extractUsername(publicUrl)
	        @notebook_name = Extractor.extractNotebookName(publicUrl)
	        @host = Extractor.extractHost(publicUrl)
		end
	end
end