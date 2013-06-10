require 'json'
require_relative 'argument_exception'

class Marshaller
	def self.check(data)
	    raise ArgumentException, 'empty.json' if data.empty?
	    raise ArgumentException, 'empty.json.collection' if unmarshall(data).empty?
	end

	def self.unmarshall(json)
		begin
			JSON.parse(json)
		rescue
			raise ArgumentException, 'bad.formed.json'
		end
	end
end