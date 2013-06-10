require_relative '../../web/lib/marshaller'

require 'rack/test'
require 'rspec'

describe 'Marshaller' do
	it 'raises ArgumentException empty.json when empty json' do
		expect{Marshaller.check('')}.to raise_error(ArgumentException)
	end

	it 'raises ArgumentException empty.json.collection when empty json collection' do
		expect{Marshaller.check('[]')}.to raise_error(ArgumentException)
	end

	it 'raises ArgumentException bad.formed.json when bad formed json' do
		expect{Marshaller.check('{{"title": "my title", "body": "my body"}{}}}')}.to raise_error(ArgumentException)
	end

	it 'returns unmarshalled json' do
		Marshaller.unmarshall('[{"title": "title1", "body": "body1"}]').should_not be_nil
	end
end