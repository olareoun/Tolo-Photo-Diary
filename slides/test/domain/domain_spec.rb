require 'rspec'
require 'json'

require_relative '../../lib/slides_domain'
require_relative '../../lib/slide'

describe 'Slides Domain' do

  the_json = '[{"title": "a title", "body": "some content"}, {"title": "another title", "body": "more content"}, {"title": "one more title", "body": "yet more content"}]'
  parsed_data = JSON.parse(the_json)

  before(:each) do
    @slides = Slides::SlidesDomain.create(parsed_data)
  end

  it 'creates the right amount of slides' do
    @slides.length.should == 3 
  end

  it 'creates each slide' do
    @slides[0].to_s.should == 'a title - some content'
  end

end

