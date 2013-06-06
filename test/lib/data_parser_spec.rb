require_relative '../../web/lib/data_parser'

require 'rack/test'
require 'rspec'

describe 'Data Parser' do
	it 'raises ArgumentException empty.json when empty json' do
		expect{DataParser.parse('')}.to raise_error(ArgumentException)
	end
	it 'raises ArgumentException empty.json.collection when empty json collection' do
		expect{DataParser.parse('[]')}.to raise_error(ArgumentException)
	end

	it 'returns parsed json' do
		DataParser.parse('[{"title": "title1", "body": "body1"}]').should_not be_nil
	end
end
