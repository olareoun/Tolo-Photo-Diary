require_relative 'slide'

module MobileSlides
	class Slides

		def initialize
			@slides = []
		end

		def empty?
			return @slides.empty?
		end

		def add_with note
			slide = Slide.new
			slide.put_elements note["elements"]
	        @slides << slide
		end

		def length
			@slides.length
		end

	    def to_html
	    	@slides.map{|slide| slide.to_html}.join
	    end
	end
end