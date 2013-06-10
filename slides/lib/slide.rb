module Slides
	class Slide

		attr_accessor :title, :body

		def initialize 
		end

		def entitle aTitle
			@title = aTitle
		end

		def putContent aContent
			@body = aContent
		end

		def to_s
			description = ''
			description += @title.to_s unless @title.nil?
			description += ' - ' unless (description.empty? || @body.nil?)
			description += @body.to_s unless @body.nil?
			description
		end

		def to_html
			html = '<section>'
			html += '<h1>' + @title + '</h1>' unless @title.nil?
			html += '<p>' + @body + '</p>' unless @body.nil?
			html += '</section>'
			html
		end

		def empty?
			to_s.empty?
		end

	end
end