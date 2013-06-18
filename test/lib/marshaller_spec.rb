require_relative '../../web/lib/marshaller'

require 'rack/test'
require 'rspec'

describe 'Marshaller' do
	it 'raises BadArgumentException empty.json when empty json' do
		expect{Marshaller.check('')}.to raise_error(BadArgumentException)
	end

	it 'raises BadArgumentException empty.json.collection when empty json collection' do
		expect{Marshaller.check('[]')}.to raise_error(BadArgumentException)
	end

	it 'raises BadArgumentException bad.formed.json when bad formed json' do
		expect{Marshaller.check('{{"title": "my title", "content": "my body"}{}}}')}.to raise_error(BadArgumentException)
	end

	it 'returns unmarshalled json' do
		notes = Marshaller.unmarshall('[{"title": "title1", "content": "body1"}]')
		notes.should_not be_nil
		notes.length.should == 1
		(notes[0].instance_of? Notebooks::Note).should be_true
		notes[0].getTitle().should == 'title1'
		notes[0].getContent().should == 'body1'
	end
end
