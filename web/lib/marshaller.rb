require 'json'
require_relative '../../notebooks/lib/note'
require_relative 'bad_argument_exception'

class Marshaller
	def self.check(data)
	    raise BadArgumentException, 'empty.json' if data.empty?
	    raise BadArgumentException, 'empty.json.collection' if unmarshall(data).empty?
	end

	def self.unmarshall(json)
		parsed = parse(json)
		notes = parsed.map do |item|
			note = Notebooks::Note.new
			note.entitle(item['title'])
			note.putContent(item['content'])
			note
		end
		notes
	end

	def self.parse(json)
		begin
			parsed = JSON.parse(json)
			parsed
		rescue
			raise BadArgumentException, 'bad.formed.json'
		end
	end

end