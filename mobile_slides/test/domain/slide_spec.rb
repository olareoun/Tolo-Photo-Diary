require 'rspec'
require_relative '../../lib/slide'

describe 'Slide' do

	it 'has content'  do
		slide = Slides::Slide.new
		slide.entitle('title')
		slide.putContent('content')
		slide.to_s.should == 'title - content'
	end

	describe 'expressing as string' do
		it 'when complete' do
			slide = Slides::Slide.new
			slide.entitle('my title')
			slide.putContent('some content')
			slide.to_s.should == 'my title - some content'
		end

		it 'when empty' do
			Slides::Slide.new.to_s.should == ''
		end

		it 'when has just title' do
			slide = Slides::Slide.new

			slide.entitle('my title')
			slide.to_s.should == 'my title'
		end

		it 'when has just body' do
			slide = Slides::Slide.new

			slide.putContent('some content')
			slide.to_s.should == 'some content'
		end
	end

	describe 'expressing as html' do
		it 'when complete' do
			slide = Slides::Slide.new
			slide.entitle('my title')
			slide.putContent('some content')
			slide.to_html.should == '<section class="n2e-slide-horizontal"><section class="n2e-slide-title"><h1 class="overflow">my title</h1></section><section class="n2e-slide-content"><div class="container">some content</div></section></section>'
		end

		it 'when empty' do
			Slides::Slide.new.to_html.should == '<section class="n2e-slide-horizontal"></section>'
		end

		it 'when has just title' do
			slide = Slides::Slide.new

			slide.entitle('my title')
			slide.to_html.should == '<section class="n2e-slide-horizontal"><section class="n2e-slide-title"><h1 class="overflow">my title</h1></section></section>'
		end

		it 'when has just body' do
			slide = Slides::Slide.new

			slide.putContent('some content')
			slide.to_html.should == '<section class="n2e-slide-horizontal"><section class="n2e-slide-content"><div class="container">some content</div></section></section>'
		end
	end


end
