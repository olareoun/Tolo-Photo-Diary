require 'sinatra/base'
require 'json'

require_relative '../slides/lib/slide'
require_relative '../slides/lib/slides_domain'
require_relative 'lib/notifier'

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
    param_json = params['json_field']
    redirect '/?alert_signal=' + 'empty.json' if param_json.empty?
    @slides = Slides::SlidesDomain.create(JSON.parse(param_json))
    erb :presentation , :layout => :reveal_js
  end

end
