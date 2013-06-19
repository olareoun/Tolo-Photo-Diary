class Notifier

	Messages = {
		'empty.url' => 'We need a public evernote notebook url to make your presentation.',
		'no.evernote.url' => 'We can not do a presentation with a non evernote public notebook url.',
	}

	def self.message_for(alert_signal)
	    message = Messages[alert_signal]
		message = '' if message.nil?
		message
	end
end