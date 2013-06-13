require 'rspec'
require 'json'
require "evernote_oauth"

require_relative '../../lib/slides_domain'

describe 'Slides Domain' do

  shared_examples_for "creating slides" do
    it 'creates the right amount of slides' do
      slides.length.should == 3 
    end

    it 'creates each slide' do
      slides.to_html.should match('title 1')
      slides.to_html.should match('content 1')
      slides.to_html.should match('title 2')
      slides.to_html.should match('content 2')
      slides.to_html.should match('title 3')
      slides.to_html.should match('content 3')
    end

  end

  context 'with json' do

    let(:slides){
      the_json = '[{"title": "title 1", "body": "content 1"}, {"title": "title 2", "body": "content 2"}, {"title": "title 3", "body": "content 3"}]'
      parsed_data = JSON.parse(the_json)
      Slides::SlidesDomain.create(parsed_data)
    }

    it_behaves_like 'creating slides'

    describe 'does not create empty slides' do
      it 'when no proper slide data' do
        the_json = '[{"title": "title 1", "body": "content 1"}, {"bla": "title 2", "ble": "content 2"}, {"title": "title 3", "body": "content 3"}]'
        parsed_data = JSON.parse(the_json)
        @slides = Slides::SlidesDomain.create(parsed_data)
        @slides.to_html.should match('title 1')
        @slides.to_html.should match('content 1')
        @slides.to_html.should match('title 3')
        @slides.to_html.should match('content 3')
        @slides.to_html.should_not match('title 2')
        @slides.to_html.should_not match('content 2')
      end
    end
  end

  context 'with Evernote Note Collection' do

    let(:slides){      
      the_collection = []
      the_collection << createNote('title 1', 'content 1')
      the_collection << createNote('title 2', 'content 2')
      the_collection << createNote('title 3', 'content 3')
      Slides::SlidesDomain.create_with_notes(the_collection)
    }

    it_behaves_like "creating slides"

  end

end

def createNote(title, content)
  note = Evernote::EDAM::Type::Note.new
  note.title = title
  note.content = content
  note
end

