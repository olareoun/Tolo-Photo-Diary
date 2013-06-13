module Slides
  class SlidesDomain
    def self.create(data)
      slides = Slides.new
      data.each do |item|
        slides.add_with(item['title'], item['body'])
      end
      slides
    end
    def self.create_with_notes(data)
      slides = Slides.new
      data.each do |note|
        slides.add_with(note.title, note.content)
      end
      slides
    end
  end
end