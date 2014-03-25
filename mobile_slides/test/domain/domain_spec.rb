require 'rspec'

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

  context 'with Evernote Note Collection' do

    let(:slides){      
      the_collection = []
      the_collection << createNote('title 1', 'content 1')
      the_collection << createNote('title 2', 'content 2')
      the_collection << createNote('title 3', 'content 3')
      Slides::SlidesDomain.create(the_collection)
    }

    it_behaves_like "creating slides"

  end

end

def createNote(title, content)
  note = Notebooks::Note.new
  note.entitle(title)
  note.putContent(content)
  note
end

