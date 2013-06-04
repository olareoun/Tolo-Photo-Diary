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
    redirect('/presentation/index.html')
  end

end
