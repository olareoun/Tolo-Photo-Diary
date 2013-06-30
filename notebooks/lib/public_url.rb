require_relative 'bad_argument_exception'

module Notebooks
	class PublicUrl

		attr_accessor :user_name, :notebook_name, :host

		def initialize(publicUrl)
			raise BadArgumentException, 'empty.url' if publicUrl.nil? || publicUrl.empty?
	        @user_name = Extractor.extractUsername(publicUrl)
	        @notebook_name = Extractor.extractNotebookName(publicUrl)
	        @host = Extractor.extractHost(publicUrl)
		end
		
	end
end