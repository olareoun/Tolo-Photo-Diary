module Notebooks
	class Attachment

		attr_accessor :name, :mimeType, :bin

		def initialize(name, mimeType, bin)
			@name = name
			@mimeType = mimeType
			@bin = bin
		end

	end
end