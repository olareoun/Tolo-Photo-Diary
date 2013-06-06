require 'sinatra/base'
require 'json'

require_relative '../slides/lib/slide'
require_relative '../slides/lib/slides_domain'
require_relative 'lib/notifier'
require_relative 'lib/data_parser'

class Web < Sinatra::Base
  set :public_folder, './web/public'
  set :static, true

  get '/index.html' do
    erb :index , :layout => :home_layout
  end

  get '/' do
    @message = Notifier.message_for params['alert_signal']
    erb :index , :layout => :home_layout
  end

  post '/generate' do
    begin
      the_json = DataParser.parse(params['json_field'])
      @slides = Slides::SlidesDomain.create(the_json)
      erb :presentation , :layout => :reveal_js
    rescue ArgumentException => e
      redirect '/?alert_signal=' + e.exception_key
    end
  end

end
