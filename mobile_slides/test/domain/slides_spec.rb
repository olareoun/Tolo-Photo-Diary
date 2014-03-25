require 'rspec'

require_relative '../../lib/slides'

describe 'Slides' do

	it 'empty when just initialized' do
		Slides::Slides.new.empty?.should be_true
	end

	describe 'adding notes' do

		before(:each){
			@note = Notebooks::Note.new
			@note.entitle('title')
			@note.putContent('content')
		}

		it 'is not empty when add_slide with title and/or content' do
			slides = Slides::Slides.new
			slides.add_with(@note)
			slides.empty?.should be_false
		end

		it 'contains an slide with title and content when add_with title and content' do
			slides = Slides::Slides.new
			slides.add_with(@note)
			slides.to_html.should match('title')
			slides.to_html.should match('content')
		end

	end

end