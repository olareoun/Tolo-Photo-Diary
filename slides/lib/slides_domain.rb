module Slides
  class SlidesDomain
    def self.create(data)
      slides = Slides.new
      data.each do |item|
        slides.add_with(item['title'], item['body'])
      end
      slides.not_empty
    end
  end
end