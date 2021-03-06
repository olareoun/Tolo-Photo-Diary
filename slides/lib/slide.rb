require 'crafty'
require 'htmlentities'

module Slides
	class Slide

		include Crafty::HTML::All

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
			html = section class: ['n2e-slide-horizontal'] do
				renderTitle if hasTitle
				renderContent if hasContent
				renderImages
				renderAudios
			end
			HTMLEntities.new.decode(html)
		end

		def renderContent
			if hasContent
				section class: ['n2e-slide-content'] do
					div class: ['container'] do
						@content
					end
				end
			end
		end

		def renderTitle
			if hasTitle 
				section class: ['n2e-slide-title'] do
					h1 class: ['overflow'] do
						@title
					end
				end
			end
		end

		def renderAudios
			return if @audio.nil?
			@audio.each do |audio|
				renderAudio audio
			end
		end

		def renderImages
			return if @images.nil?
			@images.each do |image|
				renderImage image
			end
		end

		def renderImage(image)
			src = 'data:' + image.mimeType + ';base64,' + Base64.encode64(image.bin)
			section do
				img src: [src] do
				end
			end
		end

		def renderAudio(audio)
			src = 'data:' + audio.mimeType + ';base64,' + Base64.encode64(audio.bin)
			section do
				audio do
					source src: [src], type: [audio.mimeType]
				end
			end
		end

 		def hasTitle
 			!@title.nil? && !@title.empty?
 		end

 		def hasContent
 			!@content.nil? && !@content.empty? && !contentWithoutHtmlTags.empty?
 		end

 		def contentWithoutHtmlTags
 			@content.gsub(%r{</?[^>]+?>}, '')
 		end

		def empty?
			to_s.empty?
		end

	end
end