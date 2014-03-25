require 'crafty'
require 'htmlentities'

module MobileSlides
	class Slide

		include Crafty::HTML::All

		def initialize 
		end

		def put_elements elements
			@elements = elements
		end

		def to_html
			html = section class: ['n2e-slide-horizontal'] do
				@elements.each do |element|
					renderElement element
				end
			end
			HTMLEntities.new.decode(html)
		end

		def renderElement element
			renderTitle element["source"] if element["type"].eql? 'title'
			renderContent element["source"] if element["type"].eql? 'content'
			renderImage element["source"] if element["type"].eql? 'image'
			''
		end

		def renderContent content
			section class: ['n2e-slide-content'] do
				div class: ['container'] do
					content
				end
			end
		end

		def renderTitle title
			section class: ['n2e-slide-title'] do
				h1 class: ['overflow'] do
					title
				end
			end
		end

		def renderImage image
			src = image
			section do
				img src: [src] do
				end
			end
		end

		def empty?
			to_s.empty?
		end

	end
end