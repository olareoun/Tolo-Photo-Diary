require 'json'
require_relative '../../notebooks/lib/note'
require_relative 'bad_argument_exception'

class Marshaller
	def self.check(data)
	    raise BadArgumentException, 'empty.json' if data.empty?
	    raise BadArgumentException, 'empty.json.collection' if unmarshall(data).empty?
	end

	def self.unmarshall(json)
		begin
			parsed = JSON.parse(json)
			notes = parsed.map do |item|
				Notebooks::Note.new item
			end
			notes
		rescue
			raise BadArgumentException, 'bad.formed.json'
		end
	end

end