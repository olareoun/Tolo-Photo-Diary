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

		def putImages images
			@images = images
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
			html += '<section><h1>' + @title + '</h1></section>' unless !hasTitle
			html += '<section><p>' + @content + '</p></section>' unless !hasContent
			html += renderImages unless @images.nil?
			html += '</section>' if composed
			html
		end

		def renderImages
			rendered = ''
			@images.each do |image|
				rendered += '<section><img src="data:image/;base64,' + Base64.encode64(image) + '" width="600" heigth="500"/></section>'
			end
			rendered
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