module Slides
  class SlidesDomain
    def self.create(data)
      slides = Slides.new
      data.each do |item|
        slides.add_with(item['title'], item['body'])
      end
      slides
    end
  end
end