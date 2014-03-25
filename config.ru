require File.join(File.dirname(__FILE__), 'web/app.rb')
require File.join(File.dirname(__FILE__), 'web/presentation_services.rb')

map "/" do
   run Web
end

map "/presentation" do
   run PresentationServices
end

