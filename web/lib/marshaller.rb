require 'json'
require 'evernote_oauth'
require_relative 'argument_exception'

class Marshaller
	def self.check(data)
	    raise ArgumentException, 'empty.json' if data.empty?
	    raise ArgumentException, 'empty.json.collection' if unmarshall(data).empty?
	end

	def self.unmarshall(json)
		begin
			parsed = JSON.parse(json)
			notes = parsed.map do |item|
				note = Evernote::EDAM::Type::Note.new
				note.title = item['title']
  				note.content = item['body']
				note
			end
			notes
		rescue
			raise ArgumentException, 'bad.formed.json'
		end
	end
end