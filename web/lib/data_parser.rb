require 'json'
require_relative 'argument_exception'

class DataParser
	def self.parse(data)
		begin
		    raise ArgumentException, 'empty.json' if data.empty?

		    the_json = JSON.parse(data)
		    raise ArgumentException, 'empty.json.collection' if the_json.empty?

		    the_json
		rescue
			raise ArgumentException, 'bad.formed.json'
		end
	end
end