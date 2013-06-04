module Slides
  class SlidesDomain
    def self.create(data)
      slides = data.map do |item|
        slide = Slide.new
        slide.entitle(item['title'])
        slide.putContent(item['body'])
        slide
      end
    end
  end
end