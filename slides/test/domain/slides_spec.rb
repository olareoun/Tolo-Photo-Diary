require 'rspec'

require_relative '../../lib/slides'

describe 'Slides' do

	it 'empty when just initialized' do
		Slides::Slides.new.empty?.should be_true
	end

	it 'is not empty when add_slide with title and/or content' do
		slides = Slides::Slides.new
		slides.add_with('title', 'content')
		slides.empty?.should be_false
	end

	it 'contains an slide with title and content when add_with title and content' do
		slides = Slides::Slides.new
		slides.add_with('title', 'content')
		slide = Slides::Slide.new
		slide.entitle('title')
		slide.putContent('content')
		slides.to_html.should match('title')
		slides.to_html.should match('content')
	end

end