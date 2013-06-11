module Slides
	class Slide

		attr_accessor :title, :content

		def initialize 
		end

		def entitle aTitle
			@title = aTitle
		end

		def putContent aContent
			@content = aContent
		end

		def to_s
			description = ''
			description += @title.to_s unless @title.nil?
			description += ' - ' unless (description.empty? || @content.nil?)
			description += @content.to_s unless @content.nil?
			description
		end

		def to_html
			html = '<section>'
			html += '<h1>' + @title + '</h1>' unless @title.nil?
			html += '<p>' + @content + '</p>' unless @content.nil?
			html += '</section>'
			html
		end

		def empty?
			to_s.empty?
		end

		def has(title, content)
			@title == title && @content = content
		end

	end
end