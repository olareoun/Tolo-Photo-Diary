module Slides
  class SlidesDomain
    def self.create(data)
      slides = Slides.new
      data.each do |note|
        slides.add_with(note.title, note.content)
      end
      slides
    end
  end
end