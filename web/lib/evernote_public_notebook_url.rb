require_relative 'evernote_url_exception'

class EvernotePublicNotebookUrl

	DOMAIN_PATTERN = /www\.evernote\.com|sandbox\.evernote\.com/ 
	PUBLIC_NOTEBOOK_PATH_PATTERN = /\/pub\/(\w+)\/(\w+)\/?\Z/

	def self.match(url)
		uri = URI(url)
		check(uri)
		scaned = uri.path.scan(PUBLIC_NOTEBOOK_PATH_PATTERN)[0]
		{'username' => scaned[0], 'notebookName' => scaned[1]}
	end

	def self.check(uri)
		raise EvernoteUrlException unless (uri.host =~ DOMAIN_PATTERN) && (uri.path =~ PUBLIC_NOTEBOOK_PATH_PATTERN)
	end

end