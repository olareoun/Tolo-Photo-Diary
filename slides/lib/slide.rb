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
			html = ''
			html += '<section>' if composed
			html += '<section><h1>' + @title + '</h1></section>' unless @title.nil?
			html += '<section><p>' + @content + '</p></section>' unless @content.nil?
			html += '</section>' if composed
			html
		end

		def composed
			hasTitle && hasContent
 		end

 		def hasTitle
 			!@title.nil? && !@title.empty?
 		end

 		def hasContent
 			!@content.nil? && !@content.empty?
 		end

		def empty?
			to_s.empty?
		end

	end
end