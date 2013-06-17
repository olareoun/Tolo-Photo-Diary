require 'rspec'
require 'evernote_oauth'
require_relative '../../lib/note'

describe 'Note' do
	it 'when created with not null Evernote Note should have same title and content' do
		evnote = Evernote::EDAM::Type::Note.new
		evnote.title = 'title'
		evnote.content = 'content'
		note = Notebooks::Note.new(evnote)
		note.getTitle().should == 'title'
		note.getContent().should == 'content'
	end

	it 'when created with nil parameter' do
		note = Notebooks::Note.new({'title' => 'title', 'content' => 'content'})
		note.getTitle().should == 'title'
		note.getContent().should == 'content'
	end
end