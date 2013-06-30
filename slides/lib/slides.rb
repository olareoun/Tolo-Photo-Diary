require_relative 'slide'

module Slides
	class Slides

		def initialize
			@slides = []
		end

		def empty?
			return @slides.empty?
		end

		def add_with(note)
			return if note.notValid?
			slide = Slide.new
	        slide.entitle(note.getTitle)
	        slide.putContent(note.getContent)
	        slide.putImages(note.getImages) if note.hasImages?
	        slide.putAudio(note.getAudio) if note.hasAudio?
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