require 'rspec'
require 'json'

require_relative '../../lib/slides_domain'

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
    @slides[1].to_s.should == 'another title - more content'
    @slides[2].to_s.should == 'one more title - yet more content'
  end

  describe 'does not create empty slides' do
    it 'when no proper slide data' do
      the_json = '[{"title": "a title", "body": "some content"}, {"bla": "another title", "ble": "more content"}, {"title": "one more title", "body": "yet more content"}]'
      parsed_data = JSON.parse(the_json)
      @slides = Slides::SlidesDomain.create(parsed_data)
      @slides.length.should == 2
      @slides[0].to_s.should == 'a title - some content'
      @slides[1].to_s.should == 'one more title - yet more content'
    end
  end

end

