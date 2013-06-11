module Slides
	class Slides

		def initialize
			@slides = []
		end

		def empty?
			return @slides.empty?
		end

		def add_with(title, content)
			slide = Slide.new
	        slide.entitle(title)
	        slide.putContent(content)
	        @slides << slide
		end

		def contains(slide)
			!@slides.find_all{|item| item.has(slide.title, slide.content)}.empty?
		end

	    def not_empty
 		    @slides.find_all{|item| !item.empty?}
	    end

	    def to_a
	    	@slides
	    end
	end
end