module Slides
	class Slide

		EN_NOTE_EMPTY_CONTENT = '<en-note><div><br clear="none"/></div></en-note>'

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

		def putAudio audio
			@audio = audio
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
			html += renderAudio unless @audio.nil?
			html += '</section>' if composed
			html
		end

		def renderAudio
			rendered = ''
			@audio.each do |audio|
				rendered += '<section>' + audio.name + '<div><audio controls data-autoplay><source src="data:' + audio.mimeType + ';base64,' + Base64.encode64(audio.bin) + '" type="' + audio.mimeType + '"></audio></div></section>'
			end
			rendered
		end

		def renderImages
			rendered = ''
			@images.each do |image|
				rendered += '<section><img src="data:' + image.mimeType + ';base64,' + Base64.encode64(image.bin) + '" width="600" heigth="500"/></section>'
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
 			@content = @content.gsub(EN_NOTE_EMPTY_CONTENT, '') if !@content.nil?
 			!@content.nil? && !@content.empty?
 		end

		def empty?
			to_s.empty?
		end

	end
end