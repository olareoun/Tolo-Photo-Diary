module Slides
  class SlidesDomain
    def self.create(data)
      slides = data.map do |item|
        create_slide(item['title'], item['body'])
      end
      not_empty(slides)
    end

    def self.create_slide(title, content)
        slide = Slide.new
        slide.entitle(title)
        slide.putContent(content)
        slide
    end

    def self.not_empty(slides)
      slides.find_all{|item| !item.empty?}
    end
  end
end