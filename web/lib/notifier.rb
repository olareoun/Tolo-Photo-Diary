class Notifier

	Messages = {
		'empty.json' => 'We can not do a presentation with empty data.',
		'empty.json.collection' => 'We can not do a presentation with an empty notes collection.',
		'bad.formed.json' => 'We can not do a presentation with a bad formed json.'
	}

	def self.message_for(alert_signal)
	    message = ''
	    message = Messages[alert_signal] unless Messages[alert_signal].nil?
		message
	end
end