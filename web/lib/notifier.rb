class Notifier
	def self.message_for(alert_signal)
	    message = ''
	    message = alert_signal unless alert_signal.nil?
		message = 'We can not do a presentation with empty data.' if alert_signal == 'empty.json'
		message = 'We can not do a presentation with an empty notes collection.' if alert_signal == 'empty.json.collection'
		message
	end
end