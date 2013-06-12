module Slides
	class Slides

		def initialize
			@slides = []
		end

		def empty?
			return @slides.empty?
		end

		def add_with(title, content)
			return if not_valid(title) && not_valid(content)
			slide = Slide.new
	        slide.entitle(title)
	        slide.putContent(content)
	        @slides << slide
		end

		def length
			@slides.length
		end

		def not_valid(str)
			str.nil? || str.empty?
		end

	    def to_html
	    	@slides.map{|slide| slide.to_html}.join
	    end
	end
end