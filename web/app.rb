require 'sinatra/base'
require 'json'

class Web < Sinatra::Base
  set :public_folder, './web/public'
  set :static, true

  get '/index.html' do
    erb :index , :layout => :home_layout
  end

  get '/' do
    erb :index , :layout => :home_layout
  end

  post '/generate' do
    @slides = JSON.parse(params['json_field'])
    erb :presentation , :layout => :reveal_js
  end

end
