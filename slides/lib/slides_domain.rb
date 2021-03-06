require_relative 'slides'

module Slides
  class SlidesDomain
    def self.create(notes)
      slides = Slides.new
      notes.each do |note|
        slides.add_with(note)
      end
      slides
    end
  end
end